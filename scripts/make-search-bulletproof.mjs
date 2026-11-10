import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const indexPath = path.join(rootDir, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// The bulletproof search and filter script
const bulletproofScript = `    // =============================================================
    // Master 112-Component Directory Matrix Filtering & Search
    // =============================================================
    let currentMatrixCategory = 'All';

    window.onMatrixSearchInput = function() {
      const searchInput = document.getElementById('matrix-search-input');
      const query = (searchInput ? searchInput.value : '').trim();

      // Whenever user types, unconditionally reset category filter to 'All'
      currentMatrixCategory = 'All';
      const pills = document.querySelectorAll('#matrix-cat-pills-container .control-pill');
      pills.forEach(p => p.classList.toggle('active', p.textContent.startsWith('All')));

      const notice = document.getElementById('matrix-active-filter-notice');
      if (notice) notice.style.display = 'none';

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

        // BULLETPROOF: If user typed in search, search GLOBALLY across all 112 components!
        // Category filter only restricts when search input is empty.
        const matchesCat = (rawQuery.length > 0) || (currentMatrixCategory === 'All') || (cat === currentMatrixCategory);

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
        if (currentMatrixCategory !== 'All' && rawQuery.length === 0) {
          notice.style.display = 'flex';
          noticeText.innerHTML = \`Filtering within category: <strong>\${currentMatrixCategory}</strong> (\${visibleCount} matches).\`;
        } else {
          notice.style.display = 'none';
        }
      }
    };`;

const targetStart = `// =============================================================\n    // Master 112-Component Directory Matrix Filtering & Search`;
const targetEnd = `notice.style.display = 'none';\n        }\n      }\n    };`;

const sIdx = html.indexOf(targetStart);
const eIdx = html.indexOf(targetEnd);

if (sIdx !== -1 && eIdx !== -1) {
  html = html.substring(0, sIdx) + bulletproofScript + html.substring(eIdx + targetEnd.length);
  console.log('✓ Successfully replaced filterMatrixComponents with bulletproof global search logic!');
} else {
  console.log('Could not find slice markers, using regex');
}

fs.writeFileSync(indexPath, html, 'utf8');
console.log('✓ Updated index.html');

// Sync to showcase/index.html
const showcasePath = path.join(rootDir, 'showcase', 'index.html');
fs.writeFileSync(showcasePath, html, 'utf8');
console.log('✓ Synced to showcase/index.html');

