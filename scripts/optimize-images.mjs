import sharp from 'sharp';
import { readdir, stat, mkdir } from 'fs/promises';
import { join, parse } from 'path';

const INPUT_DIR = 'public/img';
const SIZES = [640, 1280];
const QUALITY = 80;

// Skip tiny images like favicons
const MIN_SIZE_BYTES = 10_000;

async function optimizeImages() {
  const files = await readdir(INPUT_DIR);
  let totalOriginal = 0;
  let totalOptimized = 0;

  for (const file of files) {
    const filePath = join(INPUT_DIR, file);
    const fileStat = await stat(filePath);

    if (!fileStat.isFile() || fileStat.size < MIN_SIZE_BYTES) continue;

    const { name, ext } = parse(file);
    const isImage = ['.jpg', '.jpeg', '.png'].includes(ext.toLowerCase());
    if (!isImage) continue;

    totalOriginal += fileStat.size;

    // Generate WebP at original size
    const webpPath = join(INPUT_DIR, `${name}.webp`);
    const webpInfo = await sharp(filePath)
      .webp({ quality: QUALITY })
      .toFile(webpPath);
    totalOptimized += webpInfo.size;
    console.log(`  ${file} -> ${name}.webp (${formatSize(fileStat.size)} -> ${formatSize(webpInfo.size)})`);

    // Generate resized variants for srcset
    for (const width of SIZES) {
      const metadata = await sharp(filePath).metadata();
      if (metadata.width && metadata.width > width) {
        const resizedPath = join(INPUT_DIR, `${name}-${width}w.webp`);
        const resizedInfo = await sharp(filePath)
          .resize(width)
          .webp({ quality: QUALITY })
          .toFile(resizedPath);
        console.log(`  -> ${name}-${width}w.webp (${formatSize(resizedInfo.size)})`);
      }
    }
  }

  console.log(`\nTotal original: ${formatSize(totalOriginal)}`);
  console.log(`Total WebP (full size): ${formatSize(totalOptimized)}`);
  console.log(`Savings: ${((1 - totalOptimized / totalOriginal) * 100).toFixed(1)}%`);
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)}MB`;
}

optimizeImages().catch(console.error);
