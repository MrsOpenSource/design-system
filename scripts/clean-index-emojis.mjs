import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');

// Replace remaining emojis and unicode symbols with clean Lucide icons or clean text
const replacements = [
  // Mobile sidebar close button
  { from: '<button class="control-pill" onclick="toggleMobileSidebar()" style="padding: 4px 8px; font-size: 11px;">✕ Close</button>',
    to: '<button class="control-pill" onclick="toggleMobileSidebar()" style="padding: 4px 8px; font-size: 11px; display:inline-flex; align-items:center; gap:4px;"><i data-lucide="x" class="lucide-icon" style="width:12px;height:12px;"></i> Close</button>' },

  // Date picker dropdown
  { from: '<i data-lucide="calendar" class="lucide-icon"></i> Last 30 Days ▾',
    to: '<i data-lucide="calendar" class="lucide-icon"></i> Last 30 Days <i data-lucide="chevron-down" class="lucide-icon" style="width:12px;height:12px;"></i>' },

  // KPI deltas
  { from: '<span class="kpi-delta delta-positive">▲ +14.2%</span>',
    to: '<span class="kpi-delta delta-positive" style="display:inline-flex;align-items:center;gap:3px;"><i data-lucide="trending-up" class="lucide-icon" style="width:12px;height:12px;"></i> +14.2%</span>' },
  { from: '<span class="kpi-delta delta-positive">▲ +6.8%</span>',
    to: '<span class="kpi-delta delta-positive" style="display:inline-flex;align-items:center;gap:3px;"><i data-lucide="trending-up" class="lucide-icon" style="width:12px;height:12px;"></i> +6.8%</span>' },
  { from: '<span class="kpi-delta delta-negative">▼ -1.2%</span>',
    to: '<span class="kpi-delta delta-negative" style="display:inline-flex;align-items:center;gap:3px;"><i data-lucide="trending-down" class="lucide-icon" style="width:12px;height:12px;"></i> -1.2%</span>' },
  { from: '<span class="badge badge-success" style="font-size: 11px;">▲ +14.2%</span>',
    to: '<span class="badge badge-success" style="font-size: 11px; display:inline-flex;align-items:center;gap:3px;"><i data-lucide="trending-up" class="lucide-icon" style="width:11px;height:11px;"></i> +14.2%</span>' },
  { from: '<span class="badge badge-success" style="font-size: 11px;">▲ +0.6%</span>',
    to: '<span class="badge badge-success" style="font-size: 11px; display:inline-flex;align-items:center;gap:3px;"><i data-lucide="trending-up" class="lucide-icon" style="width:11px;height:11px;"></i> +0.6%</span>' },
  { from: '<span style="font-size: 11px; color: #059669; font-weight: 700;">▲ +28.4%</span>',
    to: '<span style="font-size: 11px; color: #059669; font-weight: 700; display:inline-flex;align-items:center;gap:3px;"><i data-lucide="trending-up" class="lucide-icon" style="width:11px;height:11px;"></i> +28.4%</span>' },
  { from: '+28.5% ▲',
    to: '+28.5% <i data-lucide="trending-up" class="lucide-icon" style="width:11px;height:11px;display:inline-block;vertical-align:middle;"></i>' },
  { from: '+43.8% ▲',
    to: '+43.8% <i data-lucide="trending-up" class="lucide-icon" style="width:11px;height:11px;display:inline-block;vertical-align:middle;"></i>' },

  // Status pills
  { from: '⚠ Degraded',
    to: '<i data-lucide="alert-triangle" class="lucide-icon" style="width:11px;height:11px;display:inline-block;vertical-align:middle;margin-right:3px;"></i>Degraded' },
  { from: '✖ Suspended',
    to: '<i data-lucide="x-circle" class="lucide-icon" style="width:11px;height:11px;display:inline-block;vertical-align:middle;margin-right:3px;"></i>Suspended' },

  // Citation file icons
  { from: '<strong>📄 Supply_Chain_Report_Oct.pdf (p.14)</strong>',
    to: '<strong><i data-lucide="file-text" class="lucide-icon" style="width:12px;height:12px;display:inline-block;vertical-align:middle;margin-right:3px;"></i>Supply_Chain_Report_Oct.pdf (p.14)</strong>' },
  { from: '<strong>📄 Accounting_Standards_v4.xlsx</strong>',
    to: '<strong><i data-lucide="file-spreadsheet" class="lucide-icon" style="width:12px;height:12px;display:inline-block;vertical-align:middle;margin-right:3px;"></i>Accounting_Standards_v4.xlsx</strong>' },

  // Chips remove
  { from: '<span class="context-chip-remove" onclick="this.parentElement.remove()">✕</span>',
    to: '<span class="context-chip-remove" onclick="this.parentElement.remove()" style="display:inline-flex;align-items:center;"><i data-lucide="x" class="lucide-icon" style="width:11px;height:11px;"></i></span>' },

  // Tabular vs proportional comparison
  { from: '<div style="font-size: 10px; font-weight: 700; color: #EF4444; margin-bottom: 4px;">❌ Proportional (Jitters)</div>',
    to: '<div style="font-size: 10px; font-weight: 700; color: #EF4444; margin-bottom: 4px; display:inline-flex; align-items:center; gap:4px;"><i data-lucide="x-circle" class="lucide-icon" style="width:12px;height:12px;"></i> Proportional (Jitters)</div>' },
  { from: '<div style="font-size: 10px; font-weight: 700; color: #059669; margin-bottom: 4px;">✅ Tabular Enforced</div>',
    to: '<div style="font-size: 10px; font-weight: 700; color: #059669; margin-bottom: 4px; display:inline-flex; align-items:center; gap:4px;"><i data-lucide="check-circle" class="lucide-icon" style="width:12px;height:12px;"></i> Tabular Enforced</div>' },

  // Form error text
  { from: '<span style="font-size: 11px; color: #EF4444; margin-top: 4px; display: block;">✕ Invalid IPv4 address format</span>',
    to: '<span style="font-size: 11px; color: #EF4444; margin-top: 4px; display: inline-flex; align-items: center; gap: 4px;"><i data-lucide="alert-circle" class="lucide-icon" style="width:12px;height:12px;"></i> Invalid IPv4 address format</span>' },

  // Pop-up & Toast demo buttons
  { from: '<i data-lucide="message-square" class="lucide-icon"></i> 💬 Open Context Pop-up',
    to: '<i data-lucide="message-square" class="lucide-icon"></i> Open Context Pop-up' },
  { from: '<i data-lucide="trash-2" class="lucide-icon"></i> ⚠️ Delete Confirmation Pop-up',
    to: '<i data-lucide="trash-2" class="lucide-icon"></i> Delete Confirmation Pop-up' },
  { from: '<i data-lucide="maximize-2" class="lucide-icon"></i> 📱 Adaptive Modal Pop-up',
    to: '<i data-lucide="maximize-2" class="lucide-icon"></i> Adaptive Modal Pop-up' },
  { from: '<i data-lucide="check" class="lucide-icon"></i> ✓ Success Toast',
    to: '<i data-lucide="check-circle" class="lucide-icon"></i> Success Toast' },
  { from: '<i data-lucide="x" class="lucide-icon"></i> ✕ Error Toast',
    to: '<i data-lucide="x-circle" class="lucide-icon"></i> Error Toast' },

  // Viewport mode switch buttons
  { from: '💻 Desktop (>1024px)',
    to: '<i data-lucide="monitor" class="lucide-icon" style="width:13px;height:13px;display:inline-block;vertical-align:middle;margin-right:3px;"></i>Desktop (>1024px)' },
  { from: '📱 Tablet (768px)',
    to: '<i data-lucide="tablet" class="lucide-icon" style="width:13px;height:13px;display:inline-block;vertical-align:middle;margin-right:3px;"></i>Tablet (768px)' },
  { from: '📲 Phone (390px)',
    to: '<i data-lucide="smartphone" class="lucide-icon" style="width:13px;height:13px;display:inline-block;vertical-align:middle;margin-right:3px;"></i>Phone (390px)' },

  // Anomaly recommendation
  { from: '<strong>✨ Recommended Executive Action:</strong>',
    to: '<strong><i data-lucide="sparkles" class="lucide-icon" style="width:13px;height:13px;color:#F59E0B;display:inline-block;vertical-align:middle;margin-right:3px;"></i>Recommended Executive Action:</strong>' },

  // Export modal tabs
  { from: '🎨 Figma Components & Layouts',
    to: '<i data-lucide="figma" class="lucide-icon" style="width:13px;height:13px;display:inline-block;vertical-align:middle;margin-right:3px;"></i>Figma Components' },
  { from: '📦 Figma Tokens Studio',
    to: '<i data-lucide="box" class="lucide-icon" style="width:13px;height:13px;display:inline-block;vertical-align:middle;margin-right:3px;"></i>Figma Tokens Studio' },
  { from: '❤️ Lovable (Tailwind)',
    to: '<i data-lucide="heart" class="lucide-icon" style="width:13px;height:13px;display:inline-block;vertical-align:middle;margin-right:3px;"></i>Lovable (Tailwind)' },
  { from: '🚀 Antigravity (Agent Rules)',
    to: '<i data-lucide="rocket" class="lucide-icon" style="width:13px;height:13px;display:inline-block;vertical-align:middle;margin-right:3px;"></i>Antigravity (Agent Rules)' },
  { from: '💻 CSS Variables',
    to: '<i data-lucide="code" class="lucide-icon" style="width:13px;height:13px;display:inline-block;vertical-align:middle;margin-right:3px;"></i>CSS Variables' },

  // Modal close buttons (✕)
  { from: '<button class="btn btn-outline" style="padding: 4px 10px;" onclick="closeExportModal()">✕</button>',
    to: '<button class="btn btn-outline" style="padding: 4px 10px; display:inline-flex; align-items:center;" onclick="closeExportModal()"><i data-lucide="x" class="lucide-icon" style="width:14px;height:14px;"></i></button>' },
  { from: '<button class="btn btn-outline" style="padding: 2px 8px;" onclick="closeFeedbackModal()">✕</button>',
    to: '<button class="btn btn-outline" style="padding: 2px 8px; display:inline-flex; align-items:center;" onclick="closeFeedbackModal()"><i data-lucide="x" class="lucide-icon" style="width:14px;height:14px;"></i></button>' },
  { from: '<button class="btn btn-outline" style="padding: 2px 8px;" onclick="closeAnomalyModal()">✕</button>',
    to: '<button class="btn btn-outline" style="padding: 2px 8px; display:inline-flex; align-items:center;" onclick="closeAnomalyModal()"><i data-lucide="x" class="lucide-icon" style="width:14px;height:14px;"></i></button>' },
  { from: '<button class="btn btn-outline" style="padding: 4px 10px;" onclick="closeAdaptiveDialogDemo()">✕</button>',
    to: '<button class="btn btn-outline" style="padding: 4px 10px; display:inline-flex; align-items:center;" onclick="closeAdaptiveDialogDemo()"><i data-lucide="x" class="lucide-icon" style="width:14px;height:14px;"></i></button>' },

  // Toast HTML element
  { from: '<div class="toast" id="toast-notify">✓ Notification message</div>',
    to: '<div class="toast" id="toast-notify" style="display:none; align-items:center; gap:8px;"><i data-lucide="check-circle" class="lucide-icon" style="width:16px;height:16px;color:#10B981;"></i><span id="toast-msg">Notification message</span></div>' },

  // Strip leading check / alert emojis in showToast calls
  { from: "showToast('✓ ", to: "showToast('" },
  { from: "showToast('⚠️ ", to: "showToast('" },
  { from: "showToast('👍 ", to: "showToast('" },
  { from: "showToast(`✓ ", to: "showToast(`" }
];

let replacedCount = 0;
replacements.forEach(r => {
  if (html.includes(r.from)) {
    html = html.replaceAll(r.from, r.to);
    replacedCount++;
  }
});

console.log(`Successfully applied ${replacedCount} Lucide replacements in index.html!`);

// Update showToast implementation to use #toast-msg and auto-call lucide.createIcons
html = html.replace(
  `    function showToast(msg) {
      const toast = document.getElementById('toast-notify');
      toast.textContent = msg;
      toast.style.display = 'block';
      setTimeout(() => { toast.style.display = 'none'; }, 3000);
    }`,
  `    function showToast(msg) {
      const toast = document.getElementById('toast-notify');
      const msgEl = document.getElementById('toast-msg');
      if (msgEl) {
        msgEl.textContent = msg;
      } else if (toast) {
        toast.textContent = msg;
      }
      if (toast) {
        toast.style.display = 'flex';
        if (window.lucide && typeof lucide.createIcons === 'function') lucide.createIcons();
        setTimeout(() => { toast.style.display = 'none'; }, 3000);
      }
    }`
);

fs.writeFileSync('index.html', html, 'utf8');

