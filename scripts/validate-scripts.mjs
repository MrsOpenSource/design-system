import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');
console.log('HTML file size:', html.length);

const scripts = [...html.matchAll(/<script(?![^>]*src)[^>]*>([\s\S]*?)<\/script>/gi)];
console.log(`Found ${scripts.length} inline scripts.`);

let allValid = true;
scripts.forEach((s, idx) => {
  try {
    new Function(s[1]);
    console.log(`Script ${idx + 1}: Valid syntax (${s[1].length} chars)`);
  } catch (err) {
    console.error(`Script ${idx + 1}: SYNTAX ERROR!`, err.message);
    allValid = false;
  }
});

if (allValid) {
  console.log('✓ ALL inline scripts passed JS syntax validation!');
} else {
  console.error('✗ Some scripts have syntax errors!');
  process.exit(1);
}

