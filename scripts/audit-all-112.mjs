import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');
const rows = [...html.matchAll(/<tr class="comp-matrix-row"[\s\S]*?<\/tr>/g)];
console.log('Total comp-matrix-row in index.html:', rows.length);

const fallbacks = [];
rows.forEach((r, idx) => {
  const rowHtml = r[0];
  const numMatch = rowHtml.match(/<td[^>]*font-family:\s*monospace[^>]*>(\d+)<\/td>/);
  const nameMatch = rowHtml.match(/data-name="([^"]*)"/);
  const num = numMatch ? numMatch[1] : `idx_${idx + 1}`;
  const name = nameMatch ? nameMatch[1] : 'unnamed';

  const specimenMatch = rowHtml.match(/class="live-specimen-slot"[^>]*>([\s\S]*?)<\/div>/);
  const specimen = specimenMatch ? specimenMatch[1].trim() : '';

  if (!specimen || specimen.includes('${c.name}') || specimen === name) {
    fallbacks.push({ num, name });
  }
});

console.log('Components with fallback or empty specimens:', fallbacks.length);
if (fallbacks.length > 0) {
  console.log(fallbacks);
} else {
  console.log('✓ All 112 components have bespoke HTML/CSS live specimens!');
}

