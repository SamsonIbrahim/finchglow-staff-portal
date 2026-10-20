import { readFile, readdir } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';

const dist = new URL('../dist/', import.meta.url);
const manifest = JSON.parse(
  await readFile(new URL('.vite/manifest.json', dist), 'utf8'),
);
const sizes = async (files) => {
  let raw = 0,
    gzip = 0;
  for (const file of files) {
    const buffer = await readFile(new URL(file, dist));
    raw += buffer.length;
    gzip += gzipSync(buffer).length;
  }
  return { raw, gzip };
};
const describe = ({ raw, gzip }) =>
  `${(raw / 1024).toFixed(2)} KiB raw / ${(gzip / 1024).toFixed(2)} KiB gzip`;
function dependencies(entry, seen = new Set(), files = new Set()) {
  if (seen.has(entry)) return files;
  seen.add(entry);
  const chunk = manifest[entry];
  if (!chunk) throw new Error(`Missing build entry: ${entry}`);
  files.add(chunk.file);
  for (const css of chunk.css ?? []) files.add(css);
  for (const imported of [
    ...(chunk.imports ?? []),
    ...(chunk.dynamicImports ?? []),
  ]) {
    dependencies(imported, seen, files);
  }
  return files;
}
const workspace = await sizes(dependencies('index.html'));
const guide = await sizes(dependencies('design-system.html'));
const initialBrand = await sizes([
  'brand/finchglow-supplied.png',
  'brand/fcm.svg',
]);
const allBrand = await sizes(
  (await readdir(new URL('brand/', dist))).map((file) => `brand/${file}`),
);
console.log(
  `Workspace JS + CSS (including lazy mock data): ${describe(workspace)}`,
);
console.log(`Design reference JS + CSS: ${describe(guide)}`);
console.log(`Default workspace logo assets: ${describe(initialBrand)}`);
console.log(
  `Workspace code + default logo assets: ${describe({ raw: workspace.raw + initialBrand.raw, gzip: workspace.gzip + initialBrand.gzip })}`,
);
console.log(
  `All available logo assets (others load on switching): ${describe(allBrand)}`,
);
console.log(
  'Compression estimates exclude HTML, favicon and HTTP headers; hosting must enable compression.',
);
