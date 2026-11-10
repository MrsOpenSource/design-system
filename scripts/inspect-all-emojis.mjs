import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');
const lines = html.split('\n');

const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E0}-\u{1F1FF}☰▼▾▶▲▲◄►‹›✓⚠️ℹ💬✨🧠📈📁⚙🏠📊🔍⛶☑✕✖❌✅👍]/u;

lines.forEach((l, idx) => {
  if (emojiRegex.test(l)) {
    console.log(`L${idx+1}:`);
    console.log(l);
  }
});
