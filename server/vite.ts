import express, { type Express } from "express";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer, createLogger } from "vite";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { type Server } from "http";
import viteConfig from "../vite.config";
import { nanoid } from "nanoid";
import {
  buildExcerpt,
  pageDescriptions,
  pageTitles,
} from "@shared/metaContent";
import { storage } from "./storage";
import { getSeoForPath, seoByPath } from "@shared/seo";

const viteLogger = createLogger();

const BLOG_PREFIX = "/blog/";
const KNOWN_PATHS = new Set(Object.keys(seoByPath));
const DEFAULT_ORIGIN = "https://www.chriswongdds.com";

type HtmlMeta = {
  title: string;
  description: string;
  canonicalPath: string;
  ogImage: string;
};

async function isKnownPagePath(pathname: string): Promise<boolean> {
  if (KNOWN_PATHS.has(pathname)) return true;

  if (pathname.startsWith(BLOG_PREFIX) && pathname !== "/blog") {
    const slug = pathname.slice(BLOG_PREFIX.length);
    if (!slug) return false;
    const post = await storage.getBlogPostBySlug(slug);
    return Boolean(post);
  }

  return false;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function normalizePathname(url: string): string {
  const pathname = url.split(/[?#]/)[0] || "/";
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

async function resolveMetaForUrl(url: string): Promise<HtmlMeta> {
  const pathname = normalizePathname(url);
  const defaultSeo = getSeoForPath("/");
  const fallbackOgImage = defaultSeo.ogImage ?? "/images/dr_wong_polaroids.png";

  if (pathname.startsWith(BLOG_PREFIX) && pathname !== "/blog") {
    const slug = pathname.slice(BLOG_PREFIX.length);
    if (slug) {
      const post = await storage.getBlogPostBySlug(slug);
      if (post) {
        return {
          title: `${post.title} | Dr. Wong DDS`,
          description: buildExcerpt(post.content),
          canonicalPath: pathname,
          ogImage: post.image || fallbackOgImage,
        };
      }
    }
  }

  if (KNOWN_PATHS.has(pathname)) {
    const seo = getSeoForPath(pathname);
    return {
      title: seo.title,
      description: seo.description,
      canonicalPath: seo.canonicalPath,
      ogImage: seo.ogImage ?? fallbackOgImage,
    };
  }

  return {
    title: pageTitles.notFound,
    description: pageDescriptions.notFound,
    canonicalPath: pathname,
    ogImage: fallbackOgImage,
  };
}

function resolveAbsoluteUrl(value: string): string {
  if (value.startsWith("http")) return value;
  const normalized = value.startsWith("/") ? value : `/${value}`;
  return `${DEFAULT_ORIGIN}${normalized}`;
}

function injectMeta(template: string, meta: HtmlMeta): string {
  const canonicalUrl = resolveAbsoluteUrl(meta.canonicalPath || "/");
  const ogImageUrl = resolveAbsoluteUrl(
    meta.ogImage || "/images/dr_wong_polaroids.png",
  );
  return template
    .replace(/__META_TITLE__/g, escapeHtml(meta.title))
    .replace(/__META_DESCRIPTION__/g, escapeHtml(meta.description))
    .replace(/__CANONICAL_URL__/g, escapeHtml(canonicalUrl))
    .replace(/__OG_IMAGE__/g, escapeHtml(ogImageUrl));
}

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const pathname = normalizePathname(url);
      const isKnown = await isKnownPagePath(pathname);
      if (!isKnown && path.extname(pathname)) {
        return res.status(404).end();
      }

      const clientTemplate = path.resolve(
        __dirname,
        "..",
        "client",
        "index.html",
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      const meta = await resolveMetaForUrl(url);
      template = injectMeta(template, meta);
      const page = await vite.transformIndexHtml(url, template);
      res
        .status(isKnown ? 200 : 404)
        .set({ "Content-Type": "text/html" })
        .end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  const prerenderedPath = path.resolve(distPath, "prerendered");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  const oneYearMs = 1000 * 60 * 60 * 24 * 365;
  const oneYearSeconds = Math.floor(oneYearMs / 1000);

  app.use(
    express.static(distPath, {
      index: false,
      maxAge: oneYearMs,
      setHeaders(res, filePath) {
        if (
          filePath.endsWith(`${path.sep}robots.txt`) ||
          filePath.endsWith(`${path.sep}sitemap.xml`) ||
          filePath.endsWith(`${path.sep}llms.txt`)
        ) {
          res.setHeader(
            "Cache-Control",
            "no-store, no-cache, must-revalidate, max-age=0",
          );
          res.setHeader("Pragma", "no-cache");
          res.setHeader("Expires", "0");
          return;
        }

        if (filePath.endsWith(".html")) {
          res.setHeader(
            "Cache-Control",
            "no-store, no-cache, must-revalidate, max-age=0",
          );
          res.setHeader("Pragma", "no-cache");
          res.setHeader("Expires", "0");
          return;
        }

        if (filePath.includes(`${path.sep}assets${path.sep}`)) {
          res.setHeader(
            "Cache-Control",
            `public, max-age=${oneYearSeconds}, immutable`,
          );
        }
      },
    }),
  );

  // fall through to index.html if the file doesn't exist
  const indexHtmlPath = path.resolve(distPath, "index.html");
  app.use("*", async (req, res, next) => {
    try {
      const pathname = normalizePathname(req.originalUrl);
      const isKnown = await isKnownPagePath(pathname);
      if (!isKnown && path.extname(pathname)) {
        return res.status(404).end();
      }

      const prerenderedFile =
        pathname === "/"
          ? "index.html"
          : `${pathname.slice(1).replace(/\//g, "_")}.html`;
      const prerenderedHtmlPath = path.resolve(
        prerenderedPath,
        prerenderedFile,
      );

      let template = await fs.promises.readFile(
        fs.existsSync(prerenderedHtmlPath)
          ? prerenderedHtmlPath
          : indexHtmlPath,
        "utf-8",
      );
      const meta = await resolveMetaForUrl(req.originalUrl);
      template = injectMeta(template, meta);
      res
        .status(isKnown ? 200 : 404)
        .set({
          "Content-Type": "text/html",
          "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
          Pragma: "no-cache",
          Expires: "0",
        })
        .send(template);
    } catch (error) {
      next(error);
    }
  });
}
