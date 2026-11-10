import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const indexPath = path.join(rootDir, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// 1. Clean the lucide script tag in <head>
const badLucideRegex = /<!-- Lucide Icons Script -->\s*<script src="https:\/\/unpkg\.com\/lucide@latest">[\s\S]*?<\/script>/;
const cleanLucide = `<!-- Lucide Icons Script -->\n  <script src="https://unpkg.com/lucide@latest"></script>`;

if (badLucideRegex.test(html)) {
  html = html.replace(badLucideRegex, cleanLucide);
  console.log('✓ Cleaned Lucide script tag in <head>');
}

// 2. Add Confirmation Pop-up modal HTML before </body> if not present
const confirmModalHtml = `
  <!-- ========================================================================
       INTERACTIVE CONFIRMATION POP-UP MODAL (Confirmation Dialog Specimen)
       ======================================================================== -->
  <div id="confirmation-popup-modal" style="display: none; position: fixed; inset: 0; background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(4px); z-index: 2500; align-items: center; justify-content: center; padding: 20px;" onclick="closeConfirmPopupOnBackdrop(event)">
    <div style="background: var(--sys-color-surface-card); border-radius: var(--radius-card, 16px); max-width: 440px; width: 100%; padding: 24px; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.2); border: 1px solid var(--sys-color-border-subtle); animation: fadeIn 0.2s ease;">
      <div style="display: flex; gap: 14px; margin-bottom: 16px;">
        <div style="width: 44px; height: 44px; border-radius: 12px; background: #FEF2F2; color: #EF4444; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 20px; font-weight: 800;">
          ⚠️
        </div>
        <div>
          <h4 style="font-size: 16px; font-weight: 800; margin-bottom: 4px; color: var(--sys-color-text-primary);">Delete Production Cluster?</h4>
          <p style="font-size: 13px; color: var(--sys-color-text-secondary); line-height: 1.5; margin: 0;">
            This action cannot be undone. All telemetry nodes and partitions associated with <strong>cluster-us-east-4</strong> will be permanently purged.
          </p>
        </div>
      </div>
      <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px;">
        <button class="btn btn-outline" style="font-size: 13px; padding: 8px 16px;" onclick="closeConfirmPopupDemo()">Cancel</button>
        <button class="btn btn-danger" style="font-size: 13px; padding: 8px 16px;" onclick="confirmDeleteAction()">Delete Cluster</button>
      </div>
    </div>
  </div>
`;

if (!html.includes('id="confirmation-popup-modal"')) {
  html = html.replace('</body>', confirmModalHtml + '\n</body>');
  console.log('✓ Injected confirmation-popup-modal HTML');
}

// 3. Ensure all interactive functions are placed inside main <script> tag at bottom and attached to window
const allInteractiveScripts = `
    // =============================================================
    // Interactive Alert Boxes Handlers
    // =============================================================
    window.dismissAlert = function(id) {
      const el = document.getElementById(id);
      if (el) {
        el.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
        el.style.opacity = '0';
        el.style.transform = 'translateY(-6px)';
        setTimeout(() => { el.style.display = 'none'; }, 200);
      }
    };

    window.resetAlerts = function() {
      const alerts = ['demo-alert-info', 'demo-alert-success', 'demo-alert-warning', 'demo-alert-danger'];
      alerts.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          el.style.display = 'flex';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }
      });
      showToast('All 4 semantic alert boxes reset');
      if (window.lucide) lucide.createIcons();
    };

    // =============================================================
    // Interactive Pop-ups & Confirmation Modal Handlers
    // =============================================================
    window.togglePopoverDemo = function(e) {
      if (e) e.stopPropagation();
      const pop = document.getElementById('demo-context-popover');
      if (!pop) return;
      const isVisible = pop.style.display === 'block';
      pop.style.display = isVisible ? 'none' : 'block';
    };

    // Close popover when clicking anywhere else
    document.addEventListener('click', function(e) {
      const pop = document.getElementById('demo-context-popover');
      if (pop && pop.style.display === 'block' && !pop.contains(e.target)) {
        pop.style.display = 'none';
      }
    });

    window.openConfirmPopupDemo = function() {
      const modal = document.getElementById('confirmation-popup-modal');
      if (modal) modal.style.display = 'flex';
    };

    window.closeConfirmPopupDemo = function() {
      const modal = document.getElementById('confirmation-popup-modal');
      if (modal) modal.style.display = 'none';
    };

    window.closeConfirmPopupOnBackdrop = function(e) {
      if (e && e.target && e.target.id === 'confirmation-popup-modal') {
        closeConfirmPopupDemo();
      }
    };

    window.confirmDeleteAction = function() {
      closeConfirmPopupDemo();
      showToast('⚠️ Cluster deletion submitted to control plane');
    };

    // =============================================================
    // Mobile Sidebar Drawer Toggle
    // =============================================================
    window.toggleMobileSidebar = function() {
      const sidebar = document.querySelector('.studio-sidebar');
      const backdrop = document.getElementById('sidebar-backdrop');
      if (!sidebar) return;
      const isOpen = sidebar.classList.toggle('open');
      if (backdrop) backdrop.style.display = isOpen ? 'block' : 'none';
      if (window.lucide) lucide.createIcons();
    };

    // =============================================================
    // Master 112-Component Directory Matrix Filtering & Search
    // =============================================================
    let currentMatrixCategory = 'All';

    window.filterMatrixByCategory = function(cat, btn) {
      currentMatrixCategory = cat;
      if (btn && btn.parentElement) {
        const pills = btn.parentElement.querySelectorAll('.control-pill');
        pills.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
      }
      filterMatrixComponents();
    };

    window.filterMatrixComponents = function() {
      const searchInput = document.getElementById('matrix-search-input');
      const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
      const rows = document.querySelectorAll('.comp-matrix-row');
      let visibleCount = 0;

      rows.forEach(row => {
        const cat = row.getAttribute('data-cat') || '';
        const name = (row.getAttribute('data-name') || '').toLowerCase();
        const text = (row.textContent || '').toLowerCase();

        const matchesCat = (currentMatrixCategory === 'All') || (cat === currentMatrixCategory);
        const matchesQuery = !query || name.includes(query) || text.includes(query);

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
    };
`;

// Remove any duplicate filterMatrixComponents in the script block
html = html.replace(/\/\/ 112-Component Directory Real-time Matrix Filters[\s\S]*?function filterMatrixComponents\(\) \{[\s\S]*?\n    \}/g, '');
html = html.replace(/\/\/ Master 112-Component Directory Matrix Filtering & Search[\s\S]*?function filterMatrixComponents\(\) \{[\s\S]*?\n    \}/g, '');

// Append clean interactive scripts right before </script>
html = html.replace('</script>', allInteractiveScripts + '\n  </script>');

fs.writeFileSync(indexPath, html, 'utf8');
console.log('✓ Successfully updated index.html with all Pop-up, Alert box, and Matrix filtering functions!');

// Sync to showcase/index.html
const showcasePath = path.join(rootDir, 'showcase', 'index.html');
fs.writeFileSync(showcasePath, html, 'utf8');
console.log('✓ Synced to showcase/index.html');

