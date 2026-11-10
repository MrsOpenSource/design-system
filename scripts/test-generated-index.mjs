import fs from 'fs';
import path from 'path';

const html = fs.readFileSync('index.html', 'utf8');

// 1. Check CATALOG in HTML
const catStart = html.indexOf('const CATALOG = [');
const catEnd = html.indexOf('// =========================================================================\n    // STATE ENGINE', catStart);

if (catStart === -1 || catEnd === -1) {
  console.error('Failed to locate CATALOG block in index.html');
  process.exit(1);
}

const catalogCode = html.slice(catStart, catEnd);
const fn = new Function(catalogCode + '; return CATALOG;');
const CATALOG = fn();

console.log('Total components in index.html CATALOG:', CATALOG.length);

// 2. Check categories
const categories = {};
CATALOG.forEach(c => {
  categories[c.category] = (categories[c.category] || 0) + 1;
});

console.log('\nCategories breakdown in left sidebar:');
Object.entries(categories).forEach(([cat, count]) => {
  console.log(` - ${cat}: ${count} components`);
});

// 3. Verify IDs and uniqueness
const ids = new Set();
const duplicates = [];
CATALOG.forEach(c => {
  if (ids.has(c.id)) duplicates.push(c.id);
  ids.add(c.id);
});

if (duplicates.length > 0) {
  console.error('Duplicate IDs found:', duplicates);
} else {
  console.log('\n✓ All 112 component IDs are unique!');
}

// 4. Test render() and toJsx() for all 112 items
let renderErrors = 0;
let toJsxErrors = 0;

CATALOG.forEach(c => {
  try {
    const rendered = c.render(c.defaultProps);
    if (!rendered || typeof rendered !== 'string' || rendered.trim() === '') {
      console.error(`Invalid render output for #${c.num} (${c.name})`);
      renderErrors++;
    }
  } catch (err) {
    console.error(`Error executing render() for #${c.num} (${c.name}):`, err.message);
    renderErrors++;
  }

  try {
    const jsx = c.toJsx(c.defaultProps);
    if (!jsx || typeof jsx !== 'string' || jsx.trim() === '') {
      console.error(`Invalid toJsx output for #${c.num} (${c.name})`);
      toJsxErrors++;
    }
  } catch (err) {
    console.error(`Error executing toJsx() for #${c.num} (${c.name}):`, err.message);
    toJsxErrors++;
  }
});

console.log(`\nRender test: ${CATALOG.length - renderErrors}/${CATALOG.length} passed.`);
console.log(`ToJsx test: ${CATALOG.length - toJsxErrors}/${CATALOG.length} passed.`);

// 5. Check alias support for template components
const templateIds = ['button', 'alert', 'card', 'tabs', 'switch', 'input', 'data-table', 'kpi-card', 'prompt-composer', 'reasoning-accordion'];
const missingTemplates = templateIds.filter(tid => !CATALOG.some(c => c.id === tid || (c.aliases && c.aliases.includes(tid))));

if (missingTemplates.length > 0) {
  console.error('Missing template component aliases:', missingTemplates);
} else {
  console.log('✓ All 10 template IDs successfully resolved through aliases/IDs!');
}

// 6. Verify showcase/index.html is identical
const showcaseHtml = fs.readFileSync('showcase/index.html', 'utf8');
if (showcaseHtml === html) {
  console.log('✓ showcase/index.html is 100% identical and in sync!');
} else {
  console.warn('showcase/index.html is not identical to index.html');
}

