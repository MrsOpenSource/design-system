import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');

// Regex to find common emoji or symbols
const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E0}-\u{1F1FF}☰▼▾▶▲▲◄►‹›✓⚠️ℹ💬✨🧠📈📁⚙🏠📊🔍⛶☑]/gu;

const matches = [...html.matchAll(emojiRegex)];
console.log('Total non-Lucide emoji/symbol matches in index.html:', matches.length);

const counts = {};
matches.forEach(m => {
  counts[m[0]] = (counts[m[0]] || 0) + 1;
});

console.log('Symbol counts:');
console.table(counts);

