import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const catalogPath = path.join(rootDir, 'scripts', 'build-master-catalog.mjs');
let catalogCode = fs.readFileSync(catalogPath, 'utf8');

const inputsIdx = catalogCode.indexOf('id="cat-inputs"');
const dataIdx = catalogCode.indexOf('id="cat-data"');

console.log(catalogCode.substring(inputsIdx + 1500, dataIdx));
