import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');

const regexReplacements = [
  // ❌ Proportional (Jitters)
  [/<div[^>]*>❌ Proportional \(Jitters\)<\/div>/g,
   '<div style="font-size: 10px; font-weight: 700; color: #EF4444; margin-bottom: 4px; display:inline-flex; align-items:center; gap:4px;"><i data-lucide="x-circle" class="lucide-icon" style="width:12px;height:12px;"></i> Proportional (Jitters)</div>'],

  // ✅ Tabular Enforced
  [/<div[^>]*>✅ Tabular Enforced<\/div>/g,
   '<div style="font-size: 10px; font-weight: 700; color: #059669; margin-bottom: 4px; display:inline-flex; align-items:center; gap:4px;"><i data-lucide="check-circle" class="lucide-icon" style="width:12px;height:12px;"></i> Tabular Enforced</div>'],

  // ✕ Invalid IPv4
  [/<span[^>]*>✕ Invalid IPv4 address format<\/span>/g,
   '<span style="font-size: 11px; color: #EF4444; margin-top: 4px; display: inline-flex; align-items: center; gap: 4px;"><i data-lucide="alert-circle" class="lucide-icon" style="width:12px;height:12px;"></i> Invalid IPv4 address format</span>'],

  // Stepper ✓
  [/<div style="[^"]*background: #059669;[^"]*">✓<\/div>/g,
   '<div style="width: 22px; height: 22px; border-radius: 50%; background: #059669; color: white; display: flex; align-items: center; justify-content: center;"><i data-lucide="check" class="lucide-icon" style="width:12px;height:12px;color:white;"></i></div>'],

  // ▲ +14.2%
  [/<span class="badge badge-success"[^>]*>▲ \+14\.2%<\/span>/g,
   '<span class="badge badge-success" style="font-size: 11px; display:inline-flex; align-items:center; gap:3px;"><i data-lucide="trending-up" class="lucide-icon" style="width:11px;height:11px;"></i> +14.2%</span>'],

  // ▲ +0.6%
  [/<span class="badge badge-success"[^>]*>▲ \+0\.6%<\/span>/g,
   '<span class="badge badge-success" style="font-size: 11px; display:inline-flex; align-items:center; gap:3px;"><i data-lucide="trending-up" class="lucide-icon" style="width:11px;height:11px;"></i> +0.6%</span>'],

  // ▲ +28.4%
  [/<span[^>]*>▲ \+28\.4%<\/span>/g,
   '<span style="font-size: 11px; color: #059669; font-weight: 700; display:inline-flex; align-items:center; gap:3px;"><i data-lucide="trending-up" class="lucide-icon" style="width:11px;height:11px;"></i> +28.4%</span>'],

  // 💬 Open Context Pop-up
  [/<i data-lucide="message-square" class="lucide-icon"><\/i>\s*💬\s*Open Context Pop-up/g,
   '<i data-lucide="message-square" class="lucide-icon"></i> Open Context Pop-up'],

  // ⚠️ Delete Confirmation Pop-up
  [/<i data-lucide="trash-2" class="lucide-icon"><\/i>\s*⚠️\s*Delete Confirmation Pop-up/g,
   '<i data-lucide="trash-2" class="lucide-icon"></i> Delete Confirmation Pop-up'],

  // 📱 Adaptive Modal Pop-up
  [/<i data-lucide="maximize-2" class="lucide-icon"><\/i>\s*📱\s*Adaptive Modal Pop-up/g,
   '<i data-lucide="maximize-2" class="lucide-icon"></i> Adaptive Modal Pop-up'],

  // ✓ Success Toast
  [/<i data-lucide="check" class="lucide-icon"><\/i>\s*✓\s*Success Toast/g,
   '<i data-lucide="check-circle" class="lucide-icon"></i> Success Toast'],

  // ✕ Error Toast
  [/<i data-lucide="x" class="lucide-icon"><\/i>\s*✕\s*Error Toast/g,
   '<i data-lucide="x-circle" class="lucide-icon"></i> Error Toast'],

  // ✓ CloudWatch Telemetry
  [/✓\s*CloudWatch Telemetry API queried/g,
   '<i data-lucide="check" class="lucide-icon" style="width:12px;height:12px;color:#059669;display:inline-block;vertical-align:middle;margin-right:2px;"></i> CloudWatch Telemetry API queried'],

  // ✕ Reject with Feedback
  [/✕\s*Reject with Feedback/g,
   '<i data-lucide="x" class="lucide-icon" style="width:12px;height:12px;display:inline-block;vertical-align:middle;margin-right:2px;"></i> Reject with Feedback'],

  // ✓ Accept Changes
  [/✓\s*Accept Changes/g,
   '<i data-lucide="check" class="lucide-icon" style="width:12px;height:12px;display:inline-block;vertical-align:middle;margin-right:2px;"></i> Accept Changes'],

  // 💻 Desktop (>1024px)
  [/💻\s*Desktop \(>1024px\)/g,
   '<i data-lucide="monitor" class="lucide-icon" style="width:12px;height:12px;display:inline-block;vertical-align:middle;margin-right:2px;"></i> Desktop (>1024px)'],

  // 📱 Tablet (768px)
  [/📱\s*Tablet \(768px\)/g,
   '<i data-lucide="tablet" class="lucide-icon" style="width:12px;height:12px;display:inline-block;vertical-align:middle;margin-right:2px;"></i> Tablet (768px)'],

  // 📲 Phone (390px)
  [/📲\s*Phone \(390px\)/g,
   '<i data-lucide="smartphone" class="lucide-icon" style="width:12px;height:12px;display:inline-block;vertical-align:middle;margin-right:2px;"></i> Phone (390px)'],

  // ⚠️ in modal
  [/<div style="font-size:\s*40px;\s*margin-bottom:\s*12px;">\s*⚠️\s*<\/div>/g,
   '<div style="margin-bottom: 12px; display:flex; justify-content:center;"><i data-lucide="alert-triangle" class="lucide-icon" style="width:40px;height:40px;color:#F59E0B;"></i></div>']
];

regexReplacements.forEach(([regex, repl]) => {
  html = html.replace(regex, repl);
});

fs.writeFileSync('index.html', html, 'utf8');
fs.writeFileSync('showcase/index.html', html, 'utf8');
console.log('✓ Applied all regex replacements to index.html and showcase/index.html!');

