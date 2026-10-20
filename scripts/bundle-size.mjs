import { readdir, readFile } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
const files = await readdir(new URL('../dist/assets/', import.meta.url));
let raw = 0, gzip = 0;
for (const file of files.filter(name => /\.(js|css)$/.test(name))) {
  const buffer = await readFile(new URL(`../dist/assets/${file}`, import.meta.url));
  const compressed = gzipSync(buffer).length;
  raw += buffer.length; gzip += compressed;
  console.log(`${file}: ${(buffer.length / 1024).toFixed(2)} KiB raw / ${(compressed / 1024).toFixed(2)} KiB gzip`);
}
console.log(`TOTAL: ${(raw / 1024).toFixed(2)} KiB raw / ${(gzip / 1024).toFixed(2)} KiB gzip`);
