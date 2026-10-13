// Checks that component CSS uses only Semantic tokens and Figma text styles.
// Any dimension that isn't a token must be listed in ALLOWED_DIMENSIONS.
import { readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = new URL('..', import.meta.url).pathname;

// Component dimensions that have no token in Figma (heights and the 1px stroke).
const ALLOWED_DIMENSIONS = {
  'Button.css': ['40px', '100%'],
  'Chip.css': ['32px', '1px'],
  'ClassCard.css': ['1px', '100%', '120px'],
  'NavItem.css': ['64px'],
};

const declared = (file) => [...readFileSync(join(root, file), 'utf8').matchAll(/(--[\w-]+)\s*:/g)].map((m) => m[1]);
const tokens = readFileSync(join(root, 'tokens/tokens.css'), 'utf8');
const [primitiveBlock, semanticBlock] = tokens.split('/* Semantic */');
const primitives = new Set([...primitiveBlock.matchAll(/(--[\w-]+)\s*:/g)].map((m) => m[1]));
const allowedVars = new Set([
  ...[...semanticBlock.matchAll(/(--[\w-]+)\s*:/g)].map((m) => m[1]),
  ...declared('tokens/typography.css'),
]);

const cssFiles = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? cssFiles(join(dir, e.name)) : e.name.endsWith('.css') ? [join(dir, e.name)] : [],
  );

const errors = [];
const used = {};
for (const path of cssFiles(join(root, 'src/components'))) {
  const name = path.split('/').pop();
  const css = readFileSync(path, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  const rel = relative(root, path);
  for (const [, v] of css.matchAll(/var\((--[\w-]+)/g)) {
    if (primitives.has(v)) errors.push(`${rel}: uses primitive ${v}`);
    else if (!allowedVars.has(v)) errors.push(`${rel}: unknown variable ${v}`);
  }
  for (const [m] of css.matchAll(/#[0-9a-fA-F]{3,8}\b|\b(?:rgba?|hsla?|oklch|color)\(/g)) errors.push(`${rel}: raw colour ${m}`);
  const dims = [...css.matchAll(/(?<![\w-])\d*\.?\d+(?:px|rem|em|%|vh|vw)(?![\w-])/g)].map((m) => m[0]);
  for (const d of dims) if (!(ALLOWED_DIMENSIONS[name] ?? []).includes(d)) errors.push(`${rel}: raw dimension ${d}`);
  used[rel] = [...new Set(dims)];
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('Component CSS uses only Semantic tokens and typography styles. Plain dimensions:');
for (const [file, dims] of Object.entries(used)) console.log(`  ${file}: ${dims.join(', ') || 'none'}`);
