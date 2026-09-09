#!/usr/bin/env node
/**
 * Renders public/seo/og-image.jpg — the share-card image iMessage / Slack /
 * Twitter fetch from `og:image`. JPEG, no alpha (iMessage drops transparent
 * PNGs). Pair 5's left hero is the homepage default; crawlers cache one URL,
 * so this stays a single stable frame.
 *
 * Run: node scripts/generate-og-image.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const ROOT = path.resolve(import.meta.dirname, "..");
const HERO = path.join(ROOT, "public/images/hero/left-5.jpg");
const OUT = path.join(ROOT, "public/seo/og-image.jpg");
const LEGACY = [
  path.join(ROOT, "public/seo/og-image.png"),
  path.join(ROOT, "src/app/opengraph-image.png"),
  path.join(ROOT, "src/app/opengraph-image.jpg"),
  path.join(ROOT, "src/app/twitter-image.png"),
  path.join(ROOT, "src/app/twitter-image.jpg"),
];

const WIDTH = 1200;
const HEIGHT = 630;

await sharp(HERO)
  .rotate()
  .resize(WIDTH, HEIGHT, { fit: "cover", position: "attention" })
  .jpeg({ quality: 92, chromaSubsampling: "4:4:4" })
  .toFile(OUT);

for (const file of LEGACY) {
  if (fs.existsSync(file)) fs.unlinkSync(file);
}
console.log(`wrote ${path.relative(ROOT, OUT)} (${(fs.statSync(OUT).size / 1024).toFixed(1)} KB)`);
