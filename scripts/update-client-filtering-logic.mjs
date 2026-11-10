import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const indexPath = path.join(rootDir, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// Function definitions for head script
const headScriptOld = `    function filterMatrixByCategory(cat, btn) {
      return window.filterMatrixByCategory(cat, btn);
    }

    function filterMatrixComponents() {
      return window.filterMatrixComponents();
    }`;

const headScriptNew = `    function onMatrixSearchInput() {
      return window.onMatrixSearchInput();
    }

    function filterMatrixByCategory(cat, btn) {
      return window.filterMatrixByCategory(cat, btn);
    }

    function filterMatrixComponents() {
      return window.filterMatrixComponents();
    }`;

if (html.includes(headScriptOld)) {
  html = html.replace(headScriptOld, headScriptNew);
}

// Master filtering logic implementation
const oldFilterImplRegex = /\/\/ =============================================================\s*\/\/ Master 112-Component Directory Matrix Filtering & Search[\s\S]*?badge\.textContent = `\$\{visibleCount\} \/ 112`;\s*\}\s*\};/g;

const newFilterImpl = `// =============================================================
    // Master 112-Component Directory Matrix Filtering & Search
    // =============================================================
    let currentMatrixCategory = 'All';

    window.onMatrixSearchInput = function() {
      const searchInput = document.getElementById('matrix-search-input');
      const query = (searchInput ? searchInput.value : '').trim();

      // Whenever user types into the search box, automatically search globally across ALL 112 components!
      if (query.length > 0 && currentMatrixCategory !== 'All') {
        currentMatrixCategory = 'All';
        const pills = document.querySelectorAll('#matrix-cat-pills-container .control-pill');
        pills.forEach(p => p.classList.toggle('active', p.textContent.startsWith('All')));
      }
      filterMatrixComponents();
    };

    window.filterMatrixByCategory = function(cat, btn) {
      currentMatrixCategory = cat;
      const pills = document.querySelectorAll('#matrix-cat-pills-container .control-pill');
      pills.forEach(p => p.classList.remove('active'));
      if (btn) {
        btn.classList.add('active');
      } else {
        pills.forEach(p => {
          if (cat === 'All' && p.textContent.startsWith('All')) p.classList.add('active');
          else if (p.textContent.includes(cat)) p.classList.add('active');
        });
      }
      filterMatrixComponents();
    };

    window.filterMatrixComponents = function() {
      const searchInput = document.getElementById('matrix-search-input');
      const rawQuery = (searchInput ? searchInput.value : '').toLowerCase().trim();
      const normalizedQuery = rawQuery.replace(/[-\\s_]/g, '');
      const queryTokens = rawQuery.split(/\\s+/).filter(Boolean);

      const rows = document.querySelectorAll('.comp-matrix-row');
      let visibleCount = 0;

      rows.forEach(row => {
        const cat = row.getAttribute('data-cat') || '';
        const name = (row.getAttribute('data-name') || '').toLowerCase();
        const keywords = (row.getAttribute('data-keywords') || '').toLowerCase();
        const text = (row.textContent || '').toLowerCase();
        const combined = \`\${name} \${cat} \${keywords} \${text}\`;
        const combinedNormalized = combined.replace(/[-\\s_]/g, '');

        const matchesCat = (currentMatrixCategory === 'All') || (cat === currentMatrixCategory);

        let matchesQuery = true;
        if (rawQuery.length > 0) {
          const matchesDirect = combined.includes(rawQuery) || combinedNormalized.includes(normalizedQuery);
          const matchesAllTokens = queryTokens.every(tok => combined.includes(tok) || combinedNormalized.includes(tok));
          matchesQuery = matchesDirect || matchesAllTokens;
        }

        if (matchesCat && matchesQuery) {
          row.style.display = '';
          visibleCount++;
        } else {
          row.style.display = 'none';
        }
      });

      const badge = document.getElementById('matrix-count-badge');
      if (badge) {
        badge.textContent = \`\${visibleCount} / 112\`;
      }

      const notice = document.getElementById('matrix-active-filter-notice');
      const noticeText = document.getElementById('matrix-active-filter-text');
      if (notice && noticeText) {
        if (currentMatrixCategory !== 'All') {
          notice.style.display = 'flex';
          noticeText.innerHTML = \`Filtering within category: <strong>\${currentMatrixCategory}</strong> (\${visibleCount} matches).\`;
        } else {
          notice.style.display = 'none';
        }
      }
    };`;

if (oldFilterImplRegex.test(html)) {
  html = html.replace(oldFilterImplRegex, newFilterImpl);
  console.log('✓ Replaced old filtering implementation');
} else {
  console.log('Regex did not match directly, checking alternative replacement');
  const targetStr = `let currentMatrixCategory = 'All';`;
  const endStr = `badge.textContent = \`\${visibleCount} / 112\`;\n      }\n    };`;
  const startIdx = html.indexOf(targetStr);
  const endIdx = html.indexOf(endStr);
  if (startIdx !== -1 && endIdx !== -1) {
    html = html.substring(0, startIdx) + newFilterImpl + html.substring(endIdx + endStr.length);
    console.log('✓ Replaced filtering implementation via index slices');
  }
}

fs.writeFileSync(indexPath, html, 'utf8');
console.log('✓ Updated index.html');

// Sync to showcase/index.html
const showcasePath = path.join(rootDir, 'showcase', 'index.html');
fs.writeFileSync(showcasePath, html, 'utf8');
console.log('✓ Synced to showcase/index.html');

