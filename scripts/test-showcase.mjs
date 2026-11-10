import fs from 'fs';

const html = fs.readFileSync('showcase/index.html', 'utf8');
const scripts = [...html.matchAll(/<script(?![^>]*src)[^>]*>([\s\S]*?)<\/script>/gi)];
console.log(`showcase/index.html size: ${html.length}, scripts: ${scripts.length}`);

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
if (allValid) console.log('✓ showcase/index.html 100% valid!');

