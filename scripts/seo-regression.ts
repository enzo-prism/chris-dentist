import fs from "fs";
import path from "path";
import { getIndexablePaths, getSitemapEntries, seoByPath } from "../shared/seo";

function routeToPrerenderedFilename(route: string): string {
  if (route === "/") return "index.html";
  return `${route.replace(/^\//, "").replace(/\//g, "_")}.html`;
}

function countMatches(content: string, pattern: RegExp): number {
  const matches = content.match(pattern);
  return matches ? matches.length : 0;
}

function parseSitemapPaths(sitemapXml: string): Set<string> {
  const locPattern = /<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g;
  const paths = new Set<string>();
  let match: RegExpExecArray | null;
  while ((match = locPattern.exec(sitemapXml)) !== null) {
    const found = match[1] || "/";
    paths.add(found);
  }
  return paths;
}

function reportAndExit(errors: string[], warnings: string[]): never {
  warnings.forEach((warning) => console.warn(`WARN: ${warning}`));
  errors.forEach((error) => console.error(`ERROR: ${error}`));
  process.exit(errors.length ? 1 : 0);
}

async function main(): Promise<void> {
  const errors: string[] = [];
  const warnings: string[] = [];

  const indexablePaths = new Set(getIndexablePaths());
  const sitemapEntries = getSitemapEntries();
  const sitemapPaths = new Set(sitemapEntries.map((entry) => entry.canonicalPath));

  indexablePaths.forEach((urlPath) => {
    if (!sitemapPaths.has(urlPath)) {
      errors.push(`Indexable path missing from getSitemapEntries(): ${urlPath}`);
    }
  });

  sitemapPaths.forEach((urlPath) => {
    if (!indexablePaths.has(urlPath)) {
      errors.push(`Non-indexable path present in getSitemapEntries(): ${urlPath}`);
    }
  });

  Object.values(seoByPath)
    .filter((entry) => !entry.indexable)
    .forEach((entry) => {
      if (sitemapPaths.has(entry.canonicalPath)) {
        errors.push(`Noindex path appears in sitemap entries: ${entry.canonicalPath}`);
      }
    });

  const prerenderDir = path.resolve(process.cwd(), "dist", "public", "prerendered");
  if (!fs.existsSync(prerenderDir)) {
    warnings.push(
      `Missing prerender output at ${prerenderDir}; run 'pnpm run build' for HTML-level checks.`,
    );
    reportAndExit(errors, warnings);
  }

  for (const urlPath of indexablePaths) {
    const filename = routeToPrerenderedFilename(urlPath);
    const filePath = path.join(prerenderDir, filename);

    if (!fs.existsSync(filePath)) {
      errors.push(`Missing prerendered HTML for ${urlPath} (${filename}).`);
      continue;
    }

    const html = fs.readFileSync(filePath, "utf-8");

    const titleCount = countMatches(html, /<title\b/gi);
    const descCount = countMatches(
      html,
      /<meta\b[^>]*name=["']description["'][^>]*>/gi,
    );
    const canonicalCount = countMatches(
      html,
      /<link\b[^>]*rel=["']canonical["'][^>]*>/gi,
    );
    const h1Count = countMatches(html, /<h1\b/gi);

    if (titleCount !== 1) {
      errors.push(`${urlPath}: expected exactly 1 <title>, found ${titleCount}.`);
    }
    if (descCount !== 1) {
      errors.push(`${urlPath}: expected exactly 1 meta description, found ${descCount}.`);
    }
    if (canonicalCount !== 1) {
      errors.push(`${urlPath}: expected exactly 1 canonical link, found ${canonicalCount}.`);
    }
    if (h1Count !== 1) {
      errors.push(`${urlPath}: expected exactly 1 <h1>, found ${h1Count}.`);
    }
  }

  const sitemapPath = path.resolve(process.cwd(), "dist", "public", "sitemap.xml");
  if (fs.existsSync(sitemapPath)) {
    const sitemapXml = fs.readFileSync(sitemapPath, "utf-8");
    const generatedPaths = parseSitemapPaths(sitemapXml);

    sitemapPaths.forEach((urlPath) => {
      if (!generatedPaths.has(urlPath)) {
        errors.push(`dist/public/sitemap.xml missing expected path: ${urlPath}`);
      }
    });

    generatedPaths.forEach((urlPath) => {
      if (!sitemapPaths.has(urlPath) && !urlPath.startsWith("/blog/")) {
        errors.push(`dist/public/sitemap.xml has unexpected static path: ${urlPath}`);
      }
    });
  } else {
    warnings.push(
      "dist/public/sitemap.xml not found; skipping generated sitemap parity check.",
    );
  }

  if (!errors.length) {
    console.log("SEO regression checks passed.");
  }

  reportAndExit(errors, warnings);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
