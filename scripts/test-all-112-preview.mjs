import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

import { ALL_112_COMPONENTS } from './build-master-catalog.mjs';

// Verify all 112 components have descriptions and APIs
console.log('Total components:', ALL_112_COMPONENTS.length);
const sample = ALL_112_COMPONENTS.slice(0, 5);
console.log('Sample:', sample.map(s => ({ num: s.num, name: s.name, api: s.api })));

