import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const html = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');

// Parse all rows from index.html
const rowRegex = /<tr class="comp-matrix-row"[^>]*data-cat="([^"]+)"[^>]*data-name="([^"]+)"[^>]*data-keywords="([^"]*)"[^>]*>([\s\S]*?)<\/tr>/g;
const rows = [];
let match;
while ((match = rowRegex.exec(html)) !== null) {
  rows.push({
    cat: match[1],
    name: match[2],
    keywords: match[3],
    text: match[4].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').toLowerCase()
  });
}

console.log(`Parsed ${rows.length} rows from index.html`);

function searchSimulator(query, category = 'All') {
  const rawQuery = query.toLowerCase().trim();
  const normalizedQuery = rawQuery.replace(/[-\s_]/g, '');
  const queryTokens = rawQuery.split(/\s+/).filter(Boolean);

  let visibleCount = 0;
  const matches = [];

  rows.forEach(r => {
    const combined = `${r.name} ${r.cat} ${r.keywords} ${r.text}`;
    const combinedNormalized = combined.replace(/[-\s_]/g, '');

    const matchesCat = (category === 'All') || (r.cat === category);

    let matchesQuery = true;
    if (rawQuery.length > 0) {
      const matchesDirect = combined.includes(rawQuery) || combinedNormalized.includes(normalizedQuery);
      const matchesAllTokens = queryTokens.every(tok => combined.includes(tok) || combinedNormalized.includes(tok));
      matchesQuery = matchesDirect || matchesAllTokens;
    }

    if (matchesCat && matchesQuery) {
      visibleCount++;
      matches.push({ name: r.name, cat: r.cat });
    }
  });

  return { count: visibleCount, matches };
}

console.log('\n--- Test 1: Global Search "alert" (category = "All") ---');
const alertAll = searchSimulator('alert', 'All');
console.log(`Total matches: ${alertAll.count}`);
alertAll.matches.forEach(m => console.log(`  - [${m.cat}] ${m.name}`));

console.log('\n--- Test 2: Global Search "pop" (category = "All") ---');
const popAll = searchSimulator('pop', 'All');
console.log(`Total matches: ${popAll.count}`);
popAll.matches.forEach(m => console.log(`  - [${m.cat}] ${m.name}`));

console.log('\n--- Test 3: Restricted Search "alert" (category = "Data Display & Lists") ---');
const alertRestricted = searchSimulator('alert', 'Data Display & Lists');
console.log(`Total matches: ${alertRestricted.count}`);
alertRestricted.matches.forEach(m => console.log(`  - [${m.cat}] ${m.name}`));

