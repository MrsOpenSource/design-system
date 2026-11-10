import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');

// Count how many comp-matrix-row exist
const rows = [...html.matchAll(/<tr class="comp-matrix-row"([^>]*)>([\s\S]*?)<\/tr>/g)];
console.log('Total comp-matrix-row found:', rows.length);

['alert', 'pop', 'pop-up', 'popup', 'modal', 'card'].forEach(query => {
  const rawQuery = query.toLowerCase().trim();
  const normalizedQuery = rawQuery.replace(/[-\s_]/g, '');
  const queryTokens = rawQuery.split(/\s+/).filter(Boolean);

  let matchCount = 0;
  const matchedNames = [];

  rows.forEach(m => {
    const attrs = m[1];
    const inner = m[2];

    const catMatch = attrs.match(/data-cat="([^"]*)"/);
    const nameMatch = attrs.match(/data-name="([^"]*)"/);
    const keywordsMatch = attrs.match(/data-keywords="([^"]*)"/);

    const cat = catMatch ? catMatch[1] : '';
    const name = nameMatch ? nameMatch[1].toLowerCase() : '';
    const keywords = keywordsMatch ? keywordsMatch[1].toLowerCase() : '';
    const text = inner.replace(/<[^>]+>/g, ' ').toLowerCase();

    const combined = `${name} ${cat} ${keywords} ${text}`;
    const combinedNormalized = combined.replace(/[-\s_]/g, '');

    const matchesDirect = combined.includes(rawQuery) || combinedNormalized.includes(normalizedQuery);
    const matchesAllTokens = queryTokens.every(tok => combined.includes(tok) || combinedNormalized.includes(tok));

    if (matchesDirect || matchesAllTokens) {
      matchCount++;
      matchedNames.push(nameMatch ? nameMatch[1] : 'unnamed');
    }
  });

  console.log(`Query: "${query}" -> ${matchCount} matches:`, matchedNames.slice(0, 5).join(', '));
});
