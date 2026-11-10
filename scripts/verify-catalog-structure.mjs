import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');

// Find all rows in Section 8
const rows = [...html.matchAll(/<tr class="comp-matrix-row"([^>]*)>([\s\S]*?)<\/tr>/g)];
console.log('Total comp-matrix-row in index.html:', rows.length);

const categories = {};
rows.forEach((r, idx) => {
  const attrs = r[1];
  const inner = r[2];

  const catMatch = attrs.match(/data-cat="([^"]*)"/);
  const nameMatch = attrs.match(/data-name="([^"]*)"/);
  const cat = catMatch ? catMatch[1] : 'Unknown';
  const name = nameMatch ? nameMatch[1] : 'Unnamed';

  categories[cat] = (categories[cat] || 0) + 1;
});

console.log('Category breakdown in catalog:');
console.table(categories);

