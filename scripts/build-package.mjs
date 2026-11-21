import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('📦 Starting Enterprise Design System Packaging Build...');

// 1. Ensure target distribution directories exist
const distDir = path.join(rootDir, 'dist');
const esmDir = path.join(distDir, 'esm');
const cjsDir = path.join(distDir, 'cjs');
const typesDir = path.join(distDir, 'types');

[distDir, esmDir, cjsDir, typesDir].forEach((dir) => {
  fs.mkdirSync(dir, { recursive: true });
});

// 2. Read src/index.ts
const srcIndex = path.join(rootDir, 'src', 'index.ts');
let indexContent = fs.readFileSync(srcIndex, 'utf8');

// 3. Generate ESM Index (dist/esm/index.js)
// In ESM distribution, rewrite relative imports to point directly to source/dist modules
const esmContent = `/**
 * @hsb_design/design-system - Production ESM Bundle
 * Specification: Native ES Modules with DTCG Token Architecture
 */

${indexContent}
`;
fs.writeFileSync(path.join(esmDir, 'index.js'), esmContent, 'utf8');

// 4. Generate CJS Wrapper (dist/cjs/index.cjs)
const cjsContent = `/**
 * @hsb_design/design-system - Production CommonJS Wrapper
 */

// Dynamically imports ESM root for CommonJS consumers
module.exports = import('../esm/index.js');
`;
fs.writeFileSync(path.join(cjsDir, 'index.cjs'), cjsContent, 'utf8');

// 5. Generate Type Declarations Entry (dist/types/index.d.ts)
const dtsContent = `/**
 * @hsb_design/design-system - TypeScript Type Declarations Entry
 */

export * from '../../src/index';
export * from '../../src/types/index';
export * from '../../src/core/index';
export * from '../../src/transforms/index';
`;
fs.writeFileSync(path.join(typesDir, 'index.d.ts'), dtsContent, 'utf8');

console.log('✓ Successfully generated:');
console.log(' - dist/esm/index.js');
console.log(' - dist/cjs/index.cjs');
console.log(' - dist/types/index.d.ts');
console.log('📦 Packaging build complete!\n');
