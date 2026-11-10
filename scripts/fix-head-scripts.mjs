import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const indexPath = path.join(rootDir, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// The problematic string
const badTag = `<script src="https://unpkg.com/lucide@latest">`;
const goodTag = `<script src="https://unpkg.com/lucide@latest"></script>\n  <script>`;

if (html.includes(badTag)) {
  html = html.replace(badTag, goodTag);
  console.log('✓ Successfully split Lucide script from inline script!');
} else {
  console.log('Could not find badTag');
}

// Ensure function declarations exist as standard global functions too
const functionDeclarations = `
    // Standard Global Function Declarations
    function filterMatrixByCategory(cat, btn) {
      return window.filterMatrixByCategory(cat, btn);
    }

    function filterMatrixComponents() {
      return window.filterMatrixComponents();
    }

    function dismissAlert(id) {
      return window.dismissAlert(id);
    }

    function resetAlerts() {
      return window.resetAlerts();
    }

    function togglePopoverDemo(e) {
      return window.togglePopoverDemo(e);
    }

    function openConfirmPopupDemo() {
      return window.openConfirmPopupDemo();
    }

    function closeConfirmPopupDemo() {
      return window.closeConfirmPopupDemo();
    }

    function closeConfirmPopupOnBackdrop(e) {
      return window.closeConfirmPopupOnBackdrop(e);
    }

    function confirmDeleteAction() {
      return window.confirmDeleteAction();
    }

    function toggleMobileSidebar() {
      return window.toggleMobileSidebar();
    }
`;

if (!html.includes('function filterMatrixByCategory(cat, btn) {')) {
  html = html.replace('// =============================================================\n    // Interactive Alert Boxes Handlers', functionDeclarations + '\n    // =============================================================\n    // Interactive Alert Boxes Handlers');
  console.log('✓ Injected standard global function declarations!');
}

fs.writeFileSync(indexPath, html, 'utf8');
console.log('✓ Updated index.html successfully!');

// Sync to showcase/index.html
const showcasePath = path.join(rootDir, 'showcase', 'index.html');
fs.writeFileSync(showcasePath, html, 'utf8');
console.log('✓ Synced to showcase/index.html successfully!');

