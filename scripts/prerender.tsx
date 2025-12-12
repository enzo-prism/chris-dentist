import fs from "fs";
import path from "path";
import React from "react";
import { renderToString } from "react-dom/server";
import { QueryClient } from "@tanstack/react-query";
import { AppShell } from "../client/src/App";
import {
  buildExcerpt,
  getMetaForPath,
  type MetaDefinition,
} from "../shared/metaContent";
import { storage } from "../server/storage";

// Ensure classic JSX runtimes used by tsx have React in scope.
(globalThis as any).React = React;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function injectMeta(template: string, meta: MetaDefinition): string {
  return template
    .replace(/__META_TITLE__/g, escapeHtml(meta.title))
    .replace(/__META_DESCRIPTION__/g, escapeHtml(meta.description));
}

function routeToFilename(route: string): string {
  if (route === "/") return "index.html";
  return `${route.replace(/^\//, "").replace(/\//g, "_")}.html`;
}

async function main(): Promise<void> {
  const distPublic = path.resolve(process.cwd(), "dist", "public");
  const templatePath = path.join(distPublic, "index.html");
  const prerenderDir = path.join(distPublic, "prerendered");

  if (!fs.existsSync(templatePath)) {
    throw new Error(
      `Missing build template at ${templatePath}. Run vite build first.`,
    );
  }

  fs.mkdirSync(prerenderDir, { recursive: true });

  const template = await fs.promises.readFile(templatePath, "utf-8");

  const [services, testimonials, blogPosts] = await Promise.all([
    storage.getServices(),
    storage.getTestimonials(),
    storage.getBlogPosts(),
  ]);

  const marketingRoutes = [
    "/",
    "/about",
    "/services",
    "/patient-resources",
    "/testimonials",
    "/patient-stories",
    "/contact",
    "/schedule",
    "/blog",
    "/invisalign",
    "/dental-veneers",
    "/dental-implants",
    "/emergency-dental",
    "/zoom-whitening",
    "/teeth-whitening-palo-alto",
    "/dental-cleaning-palo-alto",
    "/cavity-fillings-palo-alto",
    "/crowns-palo-alto",
    "/pediatric-dentist-palo-alto",
    "/dentist-menlo-park",
    "/dentist-stanford",
    "/privacy-policy",
    "/terms",
    "/hipaa",
    "/accessibility",
    "/thank-you",
  ] as const;

  const blogRoutes = blogPosts.map((post) => `/blog/${post.slug}`);
  const routes = Array.from(new Set([...marketingRoutes, ...blogRoutes]));

  for (const route of routes) {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          queryFn: async () => null,
          enabled: false,
          retry: false,
          staleTime: Infinity,
          refetchOnWindowFocus: false,
        },
        mutations: { retry: false },
      },
    });

    queryClient.setQueryData(["/api/services"], services);
    queryClient.setQueryData(["/api/testimonials"], testimonials);
    queryClient.setQueryData(["/api/blog-posts"], blogPosts);

    const helmetContext: any = {};
    const appHtml = renderToString(
      <AppShell
        ssrPath={route}
        queryClientOverride={queryClient}
        helmetContext={helmetContext}
      />,
    );

    let html = template.replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div>`,
    );

    const helmet = helmetContext.helmet;
    if (helmet) {
      const headTags = [
        helmet.title?.toString(),
        helmet.meta?.toString(),
        helmet.link?.toString(),
        helmet.script?.toString(),
        helmet.noscript?.toString(),
        helmet.style?.toString(),
      ]
        .filter(Boolean)
        .join("\n");

      if (headTags) {
        html = html.replace("</head>", `${headTags}\n</head>`);
      }
    }

    let meta: MetaDefinition;
    if (route.startsWith("/blog/") && route !== "/blog") {
      const slug = route.slice("/blog/".length);
      const post = blogPosts.find((candidate) => candidate.slug === slug);
      meta = post
        ? {
            title: `${post.title} | Dr. Christopher Wong DDS`,
            description: buildExcerpt(post.content),
          }
        : getMetaForPath("/blog");
    } else {
      meta = getMetaForPath(route);
    }

    html = injectMeta(html, meta);

    const outPath = path.join(prerenderDir, routeToFilename(route));
    await fs.promises.writeFile(outPath, html, "utf-8");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
