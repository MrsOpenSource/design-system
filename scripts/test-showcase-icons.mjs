import fs from 'fs';

const html = fs.readFileSync('showcase/index.html', 'utf8');

const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E0}-\u{1F1FF}☰▼▾▶▲▲◄►‹›✓⚠️ℹ💬✨🧠📈📁⚙🏠📊🔍⛶☑✕✖❌✅👍]/gu;

const matches = [...html.matchAll(emojiRegex)];
console.log('Total non-Lucide emoji/symbol matches in showcase/index.html:', matches.length);

