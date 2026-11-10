import fs from 'fs';
import path from 'path';

const indexPath = 'index.html';
let html = fs.readFileSync(indexPath, 'utf8');

const cleanHeadScript = `  <script>
    // =============================================================
    // Interactive Alert Boxes Handlers
    // =============================================================
    function dismissAlert(id) {
      const el = document.getElementById(id);
      if (el) {
        el.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
        el.style.opacity = '0';
        el.style.transform = 'translateY(-6px)';
        setTimeout(() => { el.style.display = 'none'; }, 200);
      }
    }

    function resetAlerts() {
      const alerts = ['demo-alert-info', 'demo-alert-success', 'demo-alert-warning', 'demo-alert-danger'];
      alerts.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          el.style.display = 'flex';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }
      });
      if (typeof showToast === 'function') showToast('All 4 semantic alert boxes reset');
      if (window.lucide && typeof lucide.createIcons === 'function') lucide.createIcons();
    }

    // =============================================================
    // Interactive Pop-ups & Confirmation Modal Handlers
    // =============================================================
    function togglePopoverDemo(e) {
      if (e) e.stopPropagation();
      const pop = document.getElementById('demo-context-popover');
      if (!pop) return;
      const isVisible = pop.style.display === 'block';
      pop.style.display = isVisible ? 'none' : 'block';
    }

    // Close popover when clicking anywhere else
    document.addEventListener('click', function(e) {
      const pop = document.getElementById('demo-context-popover');
      if (pop && pop.style.display === 'block' && !pop.contains(e.target)) {
        pop.style.display = 'none';
      }
    });

    function openConfirmPopupDemo() {
      const modal = document.getElementById('confirmation-popup-modal');
      if (modal) modal.style.display = 'flex';
    }

    function closeConfirmPopupDemo() {
      const modal = document.getElementById('confirmation-popup-modal');
      if (modal) modal.style.display = 'none';
    }

    function closeConfirmPopupOnBackdrop(e) {
      if (e && e.target && e.target.id === 'confirmation-popup-modal') {
        closeConfirmPopupDemo();
      }
    }

    function confirmDeleteAction() {
      closeConfirmPopupDemo();
      if (typeof showToast === 'function') showToast('⚠️ Cluster deletion submitted to control plane');
    }

    // =============================================================
    // Mobile Sidebar Drawer Toggle
    // =============================================================
    function toggleMobileSidebar() {
      const sidebar = document.querySelector('.studio-sidebar');
      const backdrop = document.getElementById('sidebar-backdrop');
      if (!sidebar) return;
      const isOpen = sidebar.classList.toggle('open');
      if (backdrop) backdrop.style.display = isOpen ? 'block' : 'none';
      if (window.lucide && typeof lucide.createIcons === 'function') lucide.createIcons();
    }

    // =============================================================
    // Master 112-Component Directory Matrix Filtering & Search
    // =============================================================
    var currentMatrixCategory = 'All';

    function onMatrixSearchInput() {
      const searchInput = document.getElementById('matrix-search-input');
      const query = (searchInput ? searchInput.value : '').trim();

      // Whenever user types, unconditionally reset category filter to 'All'
      currentMatrixCategory = 'All';
      const pills = document.querySelectorAll('#matrix-cat-pills-container .control-pill');
      pills.forEach(p => p.classList.toggle('active', p.textContent.startsWith('All')));

      const notice = document.getElementById('matrix-active-filter-notice');
      if (notice) notice.style.display = 'none';

      filterMatrixComponents();
    }

    function filterMatrixByCategory(cat, btn) {
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
    }

    function filterMatrixComponents() {
      const searchInput = document.getElementById('matrix-search-input');
      const rawQuery = (searchInput ? searchInput.value : '').toLowerCase().trim();
      const normalizedQuery = rawQuery.replace(/[-\s_]/g, '');
      const queryTokens = rawQuery.split(/\\s+/).filter(Boolean);

      const rows = document.querySelectorAll('.comp-matrix-row');
      let visibleCount = 0;

      rows.forEach(row => {
        const cat = row.getAttribute('data-cat') || '';
        const name = (row.getAttribute('data-name') || '').toLowerCase();
        const keywords = (row.getAttribute('data-keywords') || '').toLowerCase();
        const text = (row.textContent || '').toLowerCase();
        const combined = name + ' ' + cat + ' ' + keywords + ' ' + text;
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
        badge.textContent = visibleCount + ' / 112';
      }

      const notice = document.getElementById('matrix-active-filter-notice');
      const noticeText = document.getElementById('matrix-active-filter-text');
      if (notice && noticeText) {
        if (currentMatrixCategory !== 'All' && rawQuery.length === 0) {
          notice.style.display = 'flex';
          noticeText.innerHTML = 'Filtering within category: <strong>' + currentMatrixCategory + '</strong> (' + visibleCount + ' matches).';
        } else {
          notice.style.display = 'none';
        }
      }
    }

    // Attach to window explicitly as well for cross-compatibility
    window.dismissAlert = dismissAlert;
    window.resetAlerts = resetAlerts;
    window.togglePopoverDemo = togglePopoverDemo;
    window.openConfirmPopupDemo = openConfirmPopupDemo;
    window.closeConfirmPopupDemo = closeConfirmPopupDemo;
    window.closeConfirmPopupOnBackdrop = closeConfirmPopupOnBackdrop;
    window.confirmDeleteAction = confirmDeleteAction;
    window.toggleMobileSidebar = toggleMobileSidebar;
    window.onMatrixSearchInput = onMatrixSearchInput;
    window.filterMatrixByCategory = filterMatrixByCategory;
    window.filterMatrixComponents = filterMatrixComponents;
  </script>`;

// Replace head script
const headScriptRegex = /<!-- Lucide Icons Script -->\s*<script src="https:\/\/unpkg\.com\/lucide@latest"><\/script>\s*<script>[\s\S]*?<\/script>/i;

if (headScriptRegex.test(html)) {
  html = html.replace(headScriptRegex, '<!-- Lucide Icons Script -->\n  <script src="https://unpkg.com/lucide@latest"></script>\n' + cleanHeadScript);
  fs.writeFileSync('index.html', html, 'utf8');
  fs.writeFileSync('showcase/index.html', html, 'utf8');
  console.log('✓ Successfully cleaned head script in index.html and showcase/index.html');
} else {
  console.error('Head script regex did not match!');
  process.exit(1);
}

