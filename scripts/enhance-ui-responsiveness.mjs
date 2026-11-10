import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const indexPath = path.join(rootDir, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// 1. Inject Responsive Studio Shell CSS into <style> if not present
const responsiveCSS = `
    /* ========================================================================
       RESPONSIVE STUDIO SHELL & DRAWER (Mobile, Tablet, Desktop)
       ======================================================================== */
    .mobile-toggle-btn {
      display: none;
    }

    @media (max-width: 1024px) {
      .studio-header {
        height: auto !important;
        min-height: 56px;
        padding: 8px 14px !important;
        flex-wrap: wrap !important;
        gap: 10px !important;
      }
      .studio-brand {
        flex-shrink: 0;
      }
      .mobile-toggle-btn {
        display: inline-flex !important;
      }
      .studio-controls {
        width: 100%;
        overflow-x: auto;
        padding-bottom: 4px;
        -webkit-overflow-scrolling: touch;
        gap: 8px !important;
        scrollbar-width: thin;
      }
      .studio-controls::-webkit-scrollbar {
        height: 4px;
      }
      .studio-controls::-webkit-scrollbar-thumb {
        background: var(--sys-color-border-subtle);
        border-radius: 4px;
      }
      .studio-workspace {
        position: relative;
        height: calc(100vh - 110px);
      }
      .studio-sidebar {
        position: fixed !important;
        left: -400px;
        top: 0;
        bottom: 0;
        height: 100vh;
        z-index: 2000;
        box-shadow: 6px 0 24px rgba(0,0,0,0.2);
        transition: left 0.28s cubic-bezier(0.4, 0, 0.2, 1);
        max-width: 88vw !important;
        width: 360px !important;
      }
      .studio-sidebar.open {
        left: 0 !important;
      }
      .studio-canvas {
        width: 100% !important;
        padding: 12px !important;
      }
      .device-frame-inner {
        width: 100% !important;
        max-width: 100% !important;
      }
    }

    @media (max-width: 640px) {
      .control-pill {
        font-size: 11px !important;
        padding: 5px 8px !important;
      }
      .studio-brand span:not(.studio-brand-badge) {
        font-size: 13px !important;
      }
    }
  </style>`;

if (!html.includes('RESPONSIVE STUDIO SHELL & DRAWER')) {
  html = html.replace('</style>', responsiveCSS);
  console.log('✓ Injected Responsive Studio CSS');
}

// 2. Add Mobile Toggle Button in studio-brand if not present
const brandTarget = `<div class="studio-brand">`;
const brandReplacement = `<div class="studio-brand">
      <button class="control-pill mobile-toggle-btn" id="mobile-sidebar-toggle" onclick="toggleMobileSidebar()" style="display: none; padding: 6px 10px; margin-right: 6px; font-size: 12px; font-weight: 700;">
        <i data-lucide="sliders" class="lucide-icon" style="width: 14px; height: 14px;"></i> Tokens
      </button>`;

if (!html.includes('id="mobile-sidebar-toggle"')) {
  html = html.replace(brandTarget, brandReplacement);
  console.log('✓ Injected mobile sidebar toggle button into studio-brand');
}

// 3. Add mobile close row inside studio-sidebar if not present
const sidebarTarget = `<aside class="studio-sidebar">`;
const sidebarReplacement = `<aside class="studio-sidebar">
      <div class="mobile-toggle-btn" style="display: none; justify-content: space-between; align-items: center; padding-bottom: 8px; border-bottom: 1px solid var(--sys-color-border-subtle); margin-bottom: 4px;">
        <span style="font-weight: 700; font-size: 13px;">Design Tokens & Inspector</span>
        <button class="control-pill" onclick="toggleMobileSidebar()" style="padding: 4px 8px; font-size: 11px;">✕ Close</button>
      </div>`;

if (!html.includes('Design Tokens & Inspector')) {
  html = html.replace(sidebarTarget, sidebarReplacement);
  console.log('✓ Injected mobile close button into studio-sidebar');
}

// 4. Add backdrop and client-side Matrix functions before </script>
const scriptAddition = `
    // -------------------------------------------------------------
    // Mobile Sidebar Drawer Toggle
    // -------------------------------------------------------------
    function toggleMobileSidebar() {
      const sidebar = document.querySelector('.studio-sidebar');
      const backdrop = document.getElementById('sidebar-backdrop');
      if (!sidebar) return;
      const isOpen = sidebar.classList.toggle('open');
      if (backdrop) backdrop.style.display = isOpen ? 'block' : 'none';
      if (window.lucide) lucide.createIcons();
    }

    // -------------------------------------------------------------
    // Master 112-Component Directory Matrix Filtering & Search
    // -------------------------------------------------------------
    let currentMatrixCategory = 'All';

    function filterMatrixByCategory(cat, btn) {
      currentMatrixCategory = cat;
      if (btn && btn.parentElement) {
        const pills = btn.parentElement.querySelectorAll('.control-pill');
        pills.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
      }
      filterMatrixComponents();
    }

    function filterMatrixComponents() {
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
    }
  </script>`;

if (!html.includes('function filterMatrixComponents()')) {
  html = html.replace('</script>', scriptAddition);
  console.log('✓ Injected matrix filtering and mobile toggle functions into <script>');
}

// 5. Add backdrop before </body>
const backdropTag = `  <!-- Mobile Sidebar Backdrop -->
  <div id="sidebar-backdrop" onclick="toggleMobileSidebar()" style="display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.5); backdrop-filter: blur(2px); z-index: 1999;"></div>
</body>`;

if (!html.includes('id="sidebar-backdrop"')) {
  html = html.replace('</body>', backdropTag);
  console.log('✓ Injected sidebar-backdrop before </body>');
}

fs.writeFileSync(indexPath, html, 'utf8');
console.log('✓ Updated index.html successfully!');

// Sync to showcase/index.html
const showcasePath = path.join(rootDir, 'showcase', 'index.html');
fs.writeFileSync(showcasePath, html, 'utf8');
console.log('✓ Synced to showcase/index.html successfully!');

