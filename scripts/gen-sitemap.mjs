// Generates public/robots.txt and public/sitemap.xml for production.
// Run with:  node scripts/gen-sitemap.mjs
// (areas list is read from the live data file so the sitemap stays in sync
// with the homepage location links.)
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const clientDir = join(__dirname, "..");
const SITE_URL = "https://trumanproperties.co.ke";

// Load the AREA_GROUPS export without relying on package "type".
const areasSrc = readFileSync(join(clientDir, "src/data/areas.js"), "utf8");
const tmpPath = join(__dirname, "_areas_tmp.mjs");
writeFileSync(tmpPath, areasSrc);
const { AREA_GROUPS } = await import("./_areas_tmp.mjs");
try {
  const { unlinkSync } = await import("node:fs");
  unlinkSync(tmpPath);
} catch {}

const staticRoutes = [
  "/",
  "/listings",
  "/developments",
  "/about",
  "/contact",
  "/blogs",
  "/sell",
  "/buy",
];

const urls = new Set(staticRoutes);

// City + neighbourhood landing pages (these are the SEO location links)
for (const g of AREA_GROUPS) {
  urls.add(`/listings?city=${encodeURIComponent(g.value)}`);
  for (const a of g.areas) {
    urls.add(`/listings?neighborhood=${encodeURIComponent(a)}`);
  }
}

const today = new Date().toISOString().split("T")[0];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...urls]
  .map(
    (u) =>
      `  <url><loc>${SITE_URL}${u}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>${
        u === "/" ? "1.0" : u.startsWith("/listings") ? "0.8" : "0.6"
      }</priority></url>`
  )
  .join("\n")}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

writeFileSync(join(clientDir, "public", "sitemap.xml"), sitemap);
writeFileSync(join(clientDir, "public", "robots.txt"), robots);

console.log(`Generated sitemap.xml with ${urls.size} URLs and robots.txt`);
