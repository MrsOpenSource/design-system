import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const specPath = path.join(rootDir, 'scripts', 'generate-spec.mjs');
let content = fs.readFileSync(specPath, 'utf8');

// 1. Ensure import of ALL_112_COMPONENTS
if (!content.includes('import { ALL_112_COMPONENTS } from')) {
  content = content.replace("import path from 'path';", "import path from 'path';\nimport { ALL_112_COMPONENTS } from './build-master-catalog.mjs';");
}

// 2. Add nav item
const oldNav = `<a href="#organisms-ai" class="ds-tab-item">Organisms (Multimodal Gen AI)</a>`;
const newNav = `<a href="#organisms-ai" class="ds-tab-item">Organisms (Multimodal Gen AI)</a>\n        <a href="#component-matrix" class="ds-tab-item" style="font-weight: 700; color: var(--color-brand-primary-600);">7. 112-Component Directory Matrix</a>`;

if (!content.includes('7. 112-Component Directory Matrix') && content.includes(oldNav)) {
  content = content.replace(oldNav, newNav);
}

// 3. Prepare matrix table rows inside generateLivingSpec
const rowsCode = `
  const specTableRows = ALL_112_COMPONENTS.map(c => \`
    <tr class="spec-matrix-row" data-cat="\${c.cat}" data-name="\${c.name.toLowerCase()}">
      <td style="padding: 10px 12px; font-weight: 700; color: var(--color-brand-primary-600); font-family: var(--font-mono);">\${c.num}</td>
      <td style="padding: 10px 12px;">
        <div style="font-weight: 700; font-size: 13px;">\${c.name}</div>
        <div style="font-size: 11px; color: var(--sys-color-text-secondary); margin-top: 2px;">\${c.desc}</div>
      </td>
      <td style="padding: 10px 12px;">
        <span class="ds-badge" style="background: var(--sys-color-surface-sunken); border: 1px solid var(--sys-color-border-subtle); font-size: 10px;">\${c.cat}</span>
      </td>
      <td style="padding: 10px 12px;">
        <code style="font-family: var(--font-mono); font-size: 11px; background: rgba(37,99,235,0.08); color: var(--color-brand-primary-600); padding: 3px 6px; border-radius: 4px; display: inline-block;">\${c.api.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code>
      </td>
      <td style="padding: 10px 12px; font-size: 11px; color: var(--sys-color-text-secondary);">\${c.device}</td>
      <td style="padding: 10px 12px; text-align: right;">
        <span class="ds-badge ds-badge-ai" style="font-size: 10px;">✓ In Package</span>
      </td>
    </tr>
  \`).join('');
`;

// Insert rowsCode before return `<!DOCTYPE html>
if (!content.includes('const specTableRows = ALL_112_COMPONENTS')) {
  content = content.replace('return `<!DOCTYPE html>', rowsCode + '\n  return `<!DOCTYPE html>');
}

// 4. Insert Section 7 before <footer
const section7 = `  <!-- ==========================================================================
       SECTION 7: COMPLETE 112-COMPONENT DIRECTORY MATRIX
       ========================================================================== -->
  <section id="component-matrix" style="padding: 48px 0; border-bottom: 1px solid var(--sys-color-border-subtle);">
    <div class="container">
      <div style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
        <div>
          <div style="display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 9999px; background: rgba(37,99,235,0.1); color: var(--color-brand-primary-600); font-size: 11px; font-weight: 700; margin-bottom: 8px;">
            MATERIAL-LEVEL COMPONENT INVENTORY • 112 SPECIFIED COMPONENTS
          </div>
          <h2 style="font-family: var(--font-display); font-size: 24px; font-weight: 800; margin: 0 0 6px 0;">7. Complete 112-Component Directory Matrix & Implementation Registry</h2>
          <p style="color: var(--sys-color-text-secondary); font-size: 14px; margin: 0;">
            Exhaustive 1:1 mapping from Material Design 3 atomic patterns into @hsb_design/design-system polymorphic React components.
          </p>
        </div>
        <span id="spec-matrix-badge" class="ds-badge ds-badge-primary" style="font-family: var(--font-mono); font-size: 13px; font-weight: 700;">112 / 112</span>
      </div>

      <!-- Search & Filters -->
      <div style="background: var(--sys-color-surface-sunken); padding: 16px; border-radius: var(--brand-radius-md); border: 1px solid var(--sys-color-border-subtle); margin-bottom: 20px; display: flex; flex-direction: column; gap: 12px;">
        <input type="text" id="spec-matrix-search" class="ds-input" placeholder="Search 112 components (e.g. elevated button, modal bottom sheet, date picker)..." oninput="filterSpecMatrix()" style="max-width: 480px;">
        
        <div style="display: flex; gap: 6px; flex-wrap: wrap;" id="spec-cat-buttons">
          <button class="ds-btn ds-btn-primary ds-btn-sm spec-pill active" onclick="filterSpecCat('All', this)">All (112)</button>
          <button class="ds-btn ds-btn-secondary ds-btn-sm spec-pill" onclick="filterSpecCat('Actions & Buttons', this)">Actions & Buttons (17)</button>
          <button class="ds-btn ds-btn-secondary ds-btn-sm spec-pill" onclick="filterSpecCat('Communication & Feedback', this)">Feedback (12)</button>
          <button class="ds-btn ds-btn-secondary ds-btn-sm spec-pill" onclick="filterSpecCat('Containment & Surfaces', this)">Surfaces (13)</button>
          <button class="ds-btn ds-btn-secondary ds-btn-sm spec-pill" onclick="filterSpecCat('Navigation Systems', this)">Navigation (17)</button>
          <button class="ds-btn ds-btn-secondary ds-btn-sm spec-pill" onclick="filterSpecCat('Selection & Form Controls', this)">Selection & Forms (22)</button>
          <button class="ds-btn ds-btn-secondary ds-btn-sm spec-pill" onclick="filterSpecCat('Text Inputs & Search', this)">Inputs (8)</button>
          <button class="ds-btn ds-btn-secondary ds-btn-sm spec-pill" onclick="filterSpecCat('Data Display & Lists', this)">Data Display (11)</button>
          <button class="ds-btn ds-btn-secondary ds-btn-sm spec-pill" onclick="filterSpecCat('Dashboard Organisms', this)">Dashboards (7)</button>
          <button class="ds-btn ds-btn-secondary ds-btn-sm spec-pill" onclick="filterSpecCat('Gen AI Interfaces', this)">Gen AI (5)</button>
        </div>
      </div>

      <!-- Matrix Table -->
      <div style="border: 1px solid var(--sys-color-border-subtle); border-radius: var(--brand-radius-md); overflow-x: auto; max-height: 600px; overflow-y: auto;">
        <table style="width: 100%; border-collapse: collapse; font-size: 12px; text-align: left;">
          <thead style="position: sticky; top: 0; background: var(--sys-color-surface-card); z-index: 10; box-shadow: 0 1px 2px rgba(0,0,0,0.06);">
            <tr style="border-bottom: 2px solid var(--sys-color-border-subtle); color: var(--sys-color-text-secondary);">
              <th style="padding: 10px 12px; width: 48px;">#</th>
              <th style="padding: 10px 12px;">Component Name & Anatomy</th>
              <th style="padding: 10px 12px; width: 180px;">Category</th>
              <th style="padding: 10px 12px;">React Implementation in Package</th>
              <th style="padding: 10px 12px; width: 180px;">Responsive Form Factor</th>
              <th style="padding: 10px 12px; text-align: right; width: 100px;">Status</th>
            </tr>
          </thead>
          <tbody id="spec-matrix-tbody">
            \${specTableRows}
          </tbody>
        </table>
      </div>
    </div>
  </section>

`;

const footerTag = `<footer style="padding: 32px 0; border-top: 1px solid var(--sys-color-border-subtle);`;
if (!content.includes('id="component-matrix"') && content.includes(footerTag)) {
  content = content.replace(footerTag, section7 + footerTag);
}

// 5. Insert Spec Matrix Filtering Scripts before </script>
const filterScripts = `
    // -------------------------------------------------------------
    // Spec 112-Component Directory Matrix Filtering
    // -------------------------------------------------------------
    let currentSpecCat = 'All';

    window.filterSpecCat = function(cat, btn) {
      currentSpecCat = cat;
      const pills = document.querySelectorAll('.spec-pill');
      pills.forEach(p => {
        p.classList.remove('ds-btn-primary');
        p.classList.add('ds-btn-secondary');
      });
      if (btn) {
        btn.classList.remove('ds-btn-secondary');
        btn.classList.add('ds-btn-primary');
      }
      filterSpecMatrix();
    };

    window.filterSpecMatrix = function() {
      const searchInput = document.getElementById('spec-matrix-search');
      const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
      const rows = document.querySelectorAll('.spec-matrix-row');
      let count = 0;

      rows.forEach(row => {
        const cat = row.getAttribute('data-cat') || '';
        const name = (row.getAttribute('data-name') || '').toLowerCase();
        const text = (row.textContent || '').toLowerCase();

        const matchesCat = (currentSpecCat === 'All') || (cat === currentSpecCat);
        const matchesQuery = !query || name.includes(query) || text.includes(query);

        if (matchesCat && matchesQuery) {
          row.style.display = '';
          count++;
        } else {
          row.style.display = 'none';
        }
      });

      const badge = document.getElementById('spec-matrix-badge');
      if (badge) {
        badge.textContent = \`\${count} / 112\`;
      }
    };
  </script>`;

if (!content.includes('filterSpecMatrix') && content.includes('</script>')) {
  content = content.replace('</script>', filterScripts);
}

fs.writeFileSync(specPath, content, 'utf8');
console.log('✓ Successfully enhanced scripts/generate-spec.mjs with Complete 112 Directory Matrix!');

