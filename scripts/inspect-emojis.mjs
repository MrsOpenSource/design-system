import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');

// Find all matches with line numbers and contexts
const lines = html.split('\n');
const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E0}-\u{1F1FF}☰▼▾▶▲▲◄►‹›✓⚠️ℹ💬✨🧠📈📁⚙🏠📊🔍⛶☑]/u;

const occurrences = [];
lines.forEach((l, idx) => {
  if (emojiRegex.test(l)) {
    occurrences.push({ line: idx + 1, text: l.trim() });
  }
});

console.log(`Found ${occurrences.length} lines with non-Lucide symbols.`);
console.log('Sample of lines:');
occurrences.slice(0, 20).forEach(o => console.log(`L${o.line}: ${o.text.substring(0, 100)}`));

