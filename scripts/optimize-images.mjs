// One-off asset prep: converts the source photos in .tmp-assets/ into
// responsive AVIF + WebP variants under public/images/. Static export has
// no Image Optimization server, so these variants are pre-generated once
// here rather than produced on demand. Re-run manually if the source crops
// or width list ever change.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const SOURCE_DIR = path.join(process.cwd(), ".tmp-assets");
const OUT_DIR = path.join(process.cwd(), "public", "images");

const IMAGES = [
  { src: "Vs-Dance-28.01.2024-139.jpg", out: "hero", widths: [640, 960, 1280, 1920] },
  { src: "VS-Dance-15.01.2024-12.jpg", out: "card-kids", widths: [400, 600, 800] },
  { src: "Vs-Dance-28.01.2024-129.jpg", out: "card-youth", widths: [400, 600, 800] },
  { src: "VS-Dance-15.01.2024-60.jpg", out: "card-adults", widths: [400, 600, 800] },
];

await mkdir(OUT_DIR, { recursive: true });

for (const { src, out, widths } of IMAGES) {
  const input = path.join(SOURCE_DIR, src);
  for (const width of widths) {
    const resized = sharp(input).resize({ width });
    await resized.clone().avif({ quality: 55 }).toFile(path.join(OUT_DIR, `${out}-${width}.avif`));
    await resized.clone().webp({ quality: 78 }).toFile(path.join(OUT_DIR, `${out}-${width}.webp`));
    console.log(`${out}-${width}: avif + webp`);
  }
}
