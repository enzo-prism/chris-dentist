import fs from "fs";
import path from "path";
import { injectMeta, type HtmlMeta } from "../server/vite";

const distIndex = path.resolve("dist", "public", "index.html");
const clientIndex = path.resolve("client", "index.html");
const templatePath = fs.existsSync(distIndex) ? distIndex : clientIndex;
const template = fs.readFileSync(templatePath, "utf8");

const meta: HtmlMeta = {
  title: "Invite Only - Whitening Appointment Schedule",
  description: "Test description for OG tags.",
  canonicalPath: "/zoom-whitening/schedule",
  ogImage: "/images/dr_wong_polaroids.png",
  type: "website",
};

const output = injectMeta(template, meta);

const assertHas = (pattern: RegExp, label: string) => {
  if (!pattern.test(output)) {
    throw new Error(`Missing ${label} in injected HTML.`);
  }
};

const assertAbsent = (pattern: RegExp, label: string) => {
  if (pattern.test(output)) {
    throw new Error(`Unexpected ${label} in injected HTML.`);
  }
};

assertHas(/property=["']og:image["']/i, "og:image tag");
assertHas(/property=["']og:title["']/i, "og:title tag");
assertHas(/property=["']og:description["']/i, "og:description tag");
assertHas(/property=["']og:url["']/i, "og:url tag");
assertHas(/rel=["']canonical["']/i, "canonical tag");
assertHas(/name=["']twitter:image["']/i, "twitter:image tag");
assertHas(/<title>Invite Only - Whitening Appointment Schedule<\/title>/i, "title tag");
assertHas(/name=["']description["']/i, "meta description tag");
assertAbsent(/__OG_IMAGE__/i, "og image placeholder");
assertAbsent(/__CANONICAL_URL__/i, "canonical placeholder");

const ogImageMatches = output.match(/property=["']og:image["']/gi) || [];
if (ogImageMatches.length !== 1) {
  throw new Error("Unexpected og:image tag count detected.");
}

const duplicateTemplate = `
<!doctype html>
<html lang="en">
  <head>
    <title>Old Title</title>
    <meta name="description" content="Old description" />
    <link rel="canonical" href="__CANONICAL_URL__" />
    <meta property="og:image" content="__OG_IMAGE__" />
    <meta property="og:image" content="https://example.com/old.png" data-react-helmet="true" />
  </head>
  <body></body>
</html>
`;

const duplicateOutput = injectMeta(duplicateTemplate, meta);

const dupOgImages = duplicateOutput.match(/property=["']og:image["']/gi) || [];
if (dupOgImages.length !== 1) {
  throw new Error("Duplicate og:image tags detected after cleanup.");
}
if (!duplicateOutput.includes("Invite Only - Whitening Appointment Schedule")) {
  throw new Error("Expected title update in duplicate template.");
}
if (duplicateOutput.includes("__OG_IMAGE__") || duplicateOutput.includes("__CANONICAL_URL__")) {
  throw new Error("Placeholders still present after injection.");
}

console.log("OG meta injection check passed.");
