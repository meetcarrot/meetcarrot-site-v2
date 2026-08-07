#!/usr/bin/env node
/**
 * Downloads every image, font, and SEO asset used by splitpay.com into public/.
 * Run: node scripts/download-assets.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const ORIGIN = 'https://splitpay.com';
const ROOT = path.resolve(import.meta.dirname, '..');

/** @type {Array<{ url: string, out: string }>} */
const ASSETS = [
  // Hero + section imagery
  ['/_next/static/media/homepage.0pyk2m_4ivgaf.png', 'images/homepage.png'],
  ['/_next/static/media/homepage_phone.3bkouht188cxk.png', 'images/homepage-phone.png'],
  ['/_next/static/media/deco-left.3hstk0f4ilt5k.png', 'images/deco-left.png'],
  ['/_next/static/media/deco-right.0_8oh3xyfmlwi.png', 'images/deco-right.png'],
  // "Split your largest bills" slides (mobile + desktop variants)
  ['/_next/static/media/slide-1.30d86sfxbjdei.png', 'images/slide-1.png'],
  ['/_next/static/media/slide-2.25fo6xzad8kwc.png', 'images/slide-2.png'],
  ['/_next/static/media/slide-3.05--j2xor2hk1.png', 'images/slide-3.png'],
  ['/_next/static/media/slide-1-lg.2t2ejkqketbn1.png', 'images/slide-1-lg.png'],
  ['/_next/static/media/slide-2-lg.01bwg8cjgitrk.png', 'images/slide-2-lg.png'],
  ['/_next/static/media/slide-3-lg.05--j2xor2hk1.png', 'images/slide-3-lg.png'],
  // Footer photo collage
  ...Array.from({ length: 9 }, (_, i) => i + 1).map((n) => [
    {
      1: '/_next/static/media/img_1.43g8wzqu71g4i.png',
      2: '/_next/static/media/img_2.35-1i84472x0q.png',
      3: '/_next/static/media/img_3.2mbh6dc-gp20v.png',
      4: '/_next/static/media/img_4.39p3v534b2yma.png',
      5: '/_next/static/media/img_5.0i_vae40zyq4a.png',
      6: '/_next/static/media/img_6.2v1wccewfo3mj.png',
      7: '/_next/static/media/img_7.19fsv-m1wh_be.png',
      8: '/_next/static/media/img_8.05_y6es70kkbv.png',
      9: '/_next/static/media/img_9.31ggr82x9pb2j.png',
    }[n],
    `images/img-${n}.png`,
  ]),
  // Fonts
  ['/_next/static/media/GT_America_Standard_Regular-s.p.1871f4onx_aoo.woff2', 'fonts/GT_America_Standard_Regular.woff2'],
  ['/_next/static/media/GT_America_Standard_Medium-s.p.0z8bwzfdtjg3a.woff2', 'fonts/GT_America_Standard_Medium.woff2'],
  ['/_next/static/media/GT_America_Mono_Medium-s.p.07dsy_ih1qg2w.woff2', 'fonts/GT_America_Mono_Medium.woff2'],
  ['/_next/static/media/PolySans_MedianWide-s.p.38rpxzzhvkjfj.otf', 'fonts/PolySans_MedianWide.otf'],
  // SEO
  ['/_next/static/media/apple-touch-icon.2yahmvckdm2h_.png', 'seo/apple-touch-icon.png'],
  ['/_next/static/media/favicon-96x96.38jsk8fk34h1a.png', 'seo/favicon-96x96.png'],
  ['/_next/static/media/favicon.42k-3qv08a_c_.svg', 'seo/favicon.svg'],
  ['/_next/static/media/favicon.2papao_nb6frx.ico', 'seo/favicon.ico'],
  ['/static/og-image.png', 'seo/og-image.png'],
].map((entry) => ({ url: ORIGIN + entry[0], out: entry[1] }));

async function download({ url, out }) {
  const dest = path.join(ROOT, 'public', out);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const res = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0' } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} — ${url}`);
  fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
  return `${out} (${(fs.statSync(dest).size / 1024).toFixed(1)} KB)`;
}

const BATCH = 4;
let failures = 0;
for (let i = 0; i < ASSETS.length; i += BATCH) {
  const results = await Promise.allSettled(ASSETS.slice(i, i + BATCH).map(download));
  for (const r of results) {
    if (r.status === 'fulfilled') console.log('  ok  ' + r.value);
    else {
      failures++;
      console.error('  FAIL ' + r.reason.message);
    }
  }
}
console.log(`\n${ASSETS.length - failures}/${ASSETS.length} assets downloaded.`);
process.exit(failures ? 1 : 0);
