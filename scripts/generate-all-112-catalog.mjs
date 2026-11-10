import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ALL_112_COMPONENTS } from './build-master-catalog.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const customizationsPath = path.join(rootDir, 'tokens', 'component-customizations.json');

export function getSavedCustomizations() {
  if (fs.existsSync(customizationsPath)) {
    try {
      return JSON.parse(fs.readFileSync(customizationsPath, 'utf8') || '{}');
    } catch (e) {}
  }
  return {};
}

export function getComponentDetails(c) {
  const num = parseInt(c.num, 10);
  let id = c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  let aliases = [];
  let icon = 'box';
  let defaultProps = { label: c.name };
  let renderBody = '';
  let toJsxBody = '';

  // Aliases for templates
  if (num === 2) { aliases.push('button'); id = 'button'; }
  if (num === 28) { aliases.push('alert'); id = 'alert'; }
  if (num === 30) { aliases.push('card'); id = 'card'; }
  if (num === 54) { aliases.push('tabs'); id = 'tabs'; }
  if (num === 65) { aliases.push('switch'); id = 'switch'; }
  if (num === 83) { aliases.push('input'); id = 'input'; }
  if (num === 94) { aliases.push('data-table'); id = 'data-table'; }
  if (num === 101) { aliases.push('kpi-card'); id = 'kpi-card'; }
  if (num === 108) { aliases.push('prompt-composer'); id = 'prompt-composer'; }
  if (num === 109) { aliases.push('reasoning-accordion'); id = 'reasoning-accordion'; }

  // Load custom saved atoms if configured
  const savedCustomizations = getSavedCustomizations();
  const custom = savedCustomizations[id] || savedCustomizations[c.num] || savedCustomizations[num.toString()];
  let defaultAtoms = {};
  if (custom && custom.atoms) {
    defaultAtoms = { ...custom.atoms };
    if (custom.atoms.icon) {
      icon = custom.atoms.icon;
    }
  }

  // 1. Actions & Buttons (01-17)
  if (num >= 1 && num <= 17) {
    if (num <= 7) icon = 'play';
    else if (num <= 11) icon = 'plus-circle';
    else if (num === 12) icon = 'settings';
    else if (num === 13) icon = 'send';
    else if (num === 14) icon = 'bookmark';
    else if (num === 15) icon = 'download';
    else if (num === 16) icon = 'star';
    else if (num === 17) icon = 'columns';

    if (num === 1) { // Elevated
      defaultProps = { label: 'Elevated Action' };
      renderBody = `return \`<button style="background:white; color:var(--figma-text-main); border:1px solid var(--figma-border); box-shadow:0 4px 6px -1px rgba(0,0,0,0.1); padding:8px 16px; border-radius:var(--brand-radius-base); font-size:13px; font-weight:600; cursor:pointer;">\${props.label}</button>\`;`;
      toJsxBody = `return \`<Button variant="elevated">\${props.label}</Button>\`;`;
    } else if (num === 2) { // Filled Primary
      defaultProps = { variant: 'filled', label: 'Save Configuration', size: 'md' };
      renderBody = `
        let style = 'padding: 8px 16px; font-size: 13px; font-weight: 600; border-radius: var(--brand-radius-base); cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 6px; border: 1px solid transparent; transition: all 0.15s;';
        if (props.variant === 'filled') {
          style += 'background: var(--brand-primary); color: white; border-color: var(--brand-primary);';
        } else if (props.variant === 'outline') {
          style += 'background: transparent; color: var(--brand-primary); border-color: var(--brand-primary);';
        } else if (props.variant === 'ghost') {
          style += 'background: transparent; color: var(--brand-primary); border-color: transparent;';
        } else if (props.variant === 'ai') {
          style += 'background: linear-gradient(135deg, var(--brand-secondary), var(--brand-primary)); color: white; border: none; box-shadow: 0 2px 8px rgba(124,58,237,0.25);';
        } else if (props.variant === 'danger') {
          style += 'background: #EF4444; color: white; border-color: #EF4444;';
        }
        return \`<button style="\${style}">\${props.variant === 'ai' ? '<i data-lucide="sparkles" style="width:14px;height:14px;"></i> ' : ''}\${props.label}</button>\`;
      `;
      toJsxBody = `return \`<Button variant="\${props.variant}">\${props.label}</Button>\`;`;
    } else if (num === 3) { // Tonal
      defaultProps = { label: 'Continue Process' };
      renderBody = `return \`<button style="background:#EFF6FF; color:var(--brand-primary); border:none; padding:8px 16px; border-radius:var(--brand-radius-base); font-size:13px; font-weight:600; cursor:pointer;">\${props.label}</button>\`;`;
      toJsxBody = `return \`<Button variant="secondary">\${props.label}</Button>\`;`;
    } else if (num === 4) { // Outlined
      defaultProps = { label: 'Cancel Changes' };
      renderBody = `return \`<button style="background:transparent; color:var(--brand-primary); border:1px solid var(--brand-primary); padding:8px 16px; border-radius:var(--brand-radius-base); font-size:13px; font-weight:600; cursor:pointer;">\${props.label}</button>\`;`;
      toJsxBody = `return \`<Button variant="outline">\${props.label}</Button>\`;`;
    } else if (num === 5) { // Ghost
      defaultProps = { label: 'View All Details' };
      renderBody = `return \`<button style="background:transparent; color:var(--brand-primary); border:none; padding:8px 14px; font-size:13px; font-weight:600; cursor:pointer;">\${props.label}</button>\`;`;
      toJsxBody = `return \`<Button variant="ghost">\${props.label}</Button>\`;`;
    } else if (num === 6) { // Danger
      defaultProps = { label: 'Revoke Key' };
      renderBody = `return \`<button style="background:#EF4444; color:white; border:none; padding:8px 16px; border-radius:var(--brand-radius-base); font-size:13px; font-weight:600; cursor:pointer;">\${props.label}</button>\`;`;
      toJsxBody = `return \`<Button variant="danger">\${props.label}</Button>\`;`;
    } else if (num === 7) { // AI
      defaultProps = { label: 'Synthesize Targeting Rules' };
      renderBody = `return \`<button style="background:linear-gradient(135deg, var(--brand-secondary), #EC4899); color:white; border:none; padding:8px 18px; border-radius:var(--brand-radius-base); font-size:13px; font-weight:600; cursor:pointer; display:inline-flex; align-items:center; gap:6px; box-shadow:0 2px 8px rgba(124,58,237,0.25);"><i data-lucide="sparkles" style="width:14px;height:14px;"></i> \${props.label}</button>\`;`;
      toJsxBody = `return \`<Button variant="ai">\${props.label}</Button>\`;`;
    } else if (num >= 8 && num <= 10) { // FABs
      const sizePx = num === 8 ? 40 : num === 9 ? 56 : 72;
      const iconPx = num === 8 ? 16 : num === 9 ? 22 : 28;
      defaultProps = { icon: 'plus' };
      renderBody = `return \`<button style="width:${sizePx}px; height:${sizePx}px; border-radius:${num === 8 ? '50%' : '16px'}; background:var(--brand-primary); color:white; border:none; display:inline-flex; align-items:center; justify-content:center; box-shadow:0 6px 14px rgba(37,99,235,0.3); cursor:pointer;"><i data-lucide="\${props.icon || 'plus'}" style="width:${iconPx}px;height:${iconPx}px;"></i></button>\`;`;
      toJsxBody = `return \`<Button variant="fab" size="${num === 8 ? 'sm' : num === 9 ? 'md' : 'lg'}" icon={<Plus />} />\`;`;
    } else if (num === 11) { // Extended FAB
      defaultProps = { label: 'Create Record' };
      renderBody = `return \`<button style="padding:10px 20px; border-radius:9999px; background:var(--brand-primary); color:white; border:none; display:inline-flex; align-items:center; gap:8px; font-size:13px; font-weight:600; box-shadow:0 6px 14px rgba(37,99,235,0.3); cursor:pointer;"><i data-lucide="plus" style="width:16px;height:16px;"></i> \${props.label}</button>\`;`;
      toJsxBody = `return \`<Button variant="fab" extended icon={<Plus />} label="\${props.label}" />\`;`;
    } else if (num >= 12 && num <= 16) { // Icon Buttons
      const iName = num === 12 ? 'settings' : num === 13 ? 'send' : num === 14 ? 'bookmark' : num === 15 ? 'download' : 'star';
      const bg = num === 12 ? 'transparent' : num === 13 ? 'var(--brand-primary)' : num === 14 ? '#EFF6FF' : num === 15 ? 'white' : 'rgba(37,99,235,0.1)';
      const color = num === 12 ? 'var(--figma-text-muted)' : num === 13 ? 'white' : num === 14 ? 'var(--brand-primary)' : num === 15 ? 'var(--figma-text-main)' : 'var(--brand-primary)';
      const border = num === 15 ? '1px solid var(--figma-border)' : num === 16 ? '1px solid rgba(37,99,235,0.2)' : 'none';
      defaultProps = { icon: iName };
      renderBody = `return \`<button style="width:36px; height:36px; border-radius:var(--brand-radius-base); background:${bg}; color:${color}; border:${border}; display:inline-flex; align-items:center; justify-content:center; cursor:pointer;"><i data-lucide="\${props.icon || '${iName}'}" style="width:16px;height:16px; ${num === 16 ? 'fill:currentColor;' : ''}"></i></button>\`;`;
      toJsxBody = `return \`<Button variant="icon" icon={<${iName.charAt(0).toUpperCase() + iName.slice(1)} />} />\`;`;
    } else if (num === 17) { // Segmented Button
      defaultProps = { opt1: '1D', opt2: '1W', opt3: '1M', opt4: 'YTD' };
      renderBody = `return \`<div style="display:inline-flex; background:#F1F5F9; padding:3px; border-radius:8px; border:1px solid #E2E8F0;"><button style="background:white; border:none; padding:6px 14px; border-radius:6px; font-size:12px; font-weight:600; color:var(--figma-text-main); box-shadow:0 1px 2px rgba(0,0,0,0.06);">\${props.opt1}</button><button style="background:transparent; border:none; padding:6px 14px; font-size:12px; font-weight:500; color:var(--figma-text-muted);">\${props.opt2}</button><button style="background:transparent; border:none; padding:6px 14px; font-size:12px; font-weight:500; color:var(--figma-text-muted);">\${props.opt3}</button><button style="background:transparent; border:none; padding:6px 14px; font-size:12px; font-weight:500; color:var(--figma-text-muted);">\${props.opt4}</button></div>\`;`;
      toJsxBody = `return \`<SegmentedControl options={["\${props.opt1}", "\${props.opt2}", "\${props.opt3}", "\${props.opt4}"]} defaultValue="\${props.opt1}" />\`;`;
    }
  }

  // 2. Communication & Feedback (18-29)
  else if (num >= 18 && num <= 29) {
    if (num === 18) icon = 'circle-dot';
    else if (num <= 20) icon = 'bell';
    else if (num <= 23) icon = 'loader';
    else if (num <= 25) icon = 'refresh-cw';
    else if (num <= 27) icon = 'message-square';
    else if (num === 28) icon = 'alert-triangle';
    else icon = 'help-circle';

    if (num === 18) { // Dot Badge
      defaultProps = { label: 'System Online' };
      renderBody = `return \`<div style="display:inline-flex; align-items:center; gap:8px;"><span style="width:10px; height:10px; background:#10B981; border-radius:50%; box-shadow:0 0 0 3px rgba(16,185,129,0.2); display:inline-block;"></span><span style="font-size:12px; font-weight:600;">\${props.label}</span></div>\`;`;
      toJsxBody = `return \`<Badge variant="dot" status="online">\${props.label}</Badge>\`;`;
    } else if (num === 19) { // Single digit
      defaultProps = { count: '3' };
      renderBody = `return \`<div style="position:relative; display:inline-block;"><button style="width:36px; height:36px; border-radius:8px; background:#F1F5F9; border:1px solid #E2E8F0; display:inline-flex; align-items:center; justify-content:center;"><i data-lucide="bell" style="width:16px;height:16px;"></i></button><span style="position:absolute; top:-4px; right:-4px; background:#EF4444; color:white; font-size:10px; font-weight:700; width:18px; height:18px; border-radius:9999px; display:inline-flex; align-items:center; justify-content:center; border:2px solid white;">\${props.count}</span></div>\`;`;
      toJsxBody = `return \`<Badge count={\${props.count}}><Button variant="icon" icon={<Bell />} /></Badge>\`;`;
    } else if (num === 20) { // Multi digit
      defaultProps = { count: '99+' };
      renderBody = `return \`<div style="position:relative; display:inline-block;"><button style="width:36px; height:36px; border-radius:8px; background:#F1F5F9; border:1px solid #E2E8F0; display:inline-flex; align-items:center; justify-content:center;"><i data-lucide="inbox" style="width:16px;height:16px;"></i></button><span style="position:absolute; top:-6px; right:-10px; background:#EF4444; color:white; font-size:10px; font-weight:700; padding:1px 6px; border-radius:9999px; border:2px solid white;">\${props.count}</span></div>\`;`;
      toJsxBody = `return \`<Badge count="\${props.count}"><Button variant="icon" icon={<Inbox />} /></Badge>\`;`;
    } else if (num === 21) { // Determinate progress
      defaultProps = { label: 'Syncing Telemetry', value: '68%' };
      renderBody = `return \`<div style="width:100%; max-width:320px;"><div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:4px;"><span style="color:var(--figma-text-muted);">\${props.label}</span><span style="font-weight:600; font-family:monospace;">\${props.value}</span></div><div style="width:100%; height:8px; background:#E2E8F0; border-radius:9999px; overflow:hidden;"><div style="width:\${props.value}; height:100%; background:var(--brand-primary); border-radius:9999px;"></div></div></div>\`;`;
      toJsxBody = `return \`<Progress label="\${props.label}" value={parseInt("\${props.value}")} />\`;`;
    } else if (num === 22) { // Indeterminate progress
      defaultProps = { label: 'Processing cluster telemetry...' };
      renderBody = `return \`<div style="width:100%; max-width:320px;"><div style="font-size:11px; color:var(--figma-text-muted); margin-bottom:4px;">\${props.label}</div><div style="width:100%; height:6px; background:#EFF6FF; border-radius:9999px; overflow:hidden; position:relative;"><div style="width:45%; height:100%; background:var(--brand-primary); border-radius:9999px;"></div></div></div>\`;`;
      toJsxBody = `return \`<Progress indeterminate label="\${props.label}" />\`;`;
    } else if (num === 23) { // Buffer progress
      defaultProps = { label: 'LLM Token Stream' };
      renderBody = `return \`<div style="width:100%; max-width:320px;"><div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:4px;"><span style="color:var(--figma-text-muted);">\${props.label}</span><span style="font-weight:600; font-family:monospace;">45% / 80% buf</span></div><div style="width:100%; height:8px; background:#E2E8F0; border-radius:9999px; position:relative; overflow:hidden;"><div style="width:80%; height:100%; background:#BFDBFE; position:absolute;"></div><div style="width:45%; height:100%; background:var(--brand-primary); position:absolute;"></div></div></div>\`;`;
      toJsxBody = `return \`<Progress buffer={80} value={45} label="\${props.label}" />\`;`;
    } else if (num === 24) { // Circular determinate
      defaultProps = { label: 'Storage Used', value: '75%' };
      renderBody = `return \`<div style="display:inline-flex; align-items:center; gap:12px;"><svg width="44" height="44" viewBox="0 0 44 44"><circle cx="22" cy="22" r="18" fill="none" stroke="#E2E8F0" stroke-width="4"/><circle cx="22" cy="22" r="18" fill="none" stroke="var(--brand-primary)" stroke-width="4" stroke-dasharray="113" stroke-dashoffset="28" stroke-linecap="round"/></svg><div><div style="font-size:13px; font-weight:700;">\${props.value}</div><div style="font-size:10px; color:var(--figma-text-muted);">\${props.label}</div></div></div>\`;`;
      toJsxBody = `return \`<CircularProgress value={75} label="\${props.label}" />\`;`;
    } else if (num === 25) { // Spinner
      defaultProps = { label: 'Loading workspace data...' };
      renderBody = `return \`<div style="display:inline-flex; align-items:center; gap:8px;"><i data-lucide="loader-2" style="width:18px;height:18px;color:var(--brand-primary);"></i><span style="font-size:12px; color:var(--figma-text-muted);">\${props.label}</span></div>\`;`;
      toJsxBody = `return \`<CircularProgress indeterminate label="\${props.label}" />\`;`;
    } else if (num === 26) { // Toast single
      defaultProps = { message: 'Changes saved to production.' };
      renderBody = `return \`<div style="background:#0F172A; color:white; padding:10px 16px; border-radius:8px; display:inline-flex; align-items:center; gap:10px; box-shadow:0 4px 12px rgba(0,0,0,0.15); font-size:12px;"><i data-lucide="check-circle" style="width:15px;height:15px;color:#10B981;"></i><span>\${props.message}</span></div>\`;`;
      toJsxBody = `return \`<Snackbar message="\${props.message}" variant="info" />\`;`;
    } else if (num === 27) { // Toast multi
      defaultProps = { message: 'Doctor segment filter deleted.', action: 'UNDO' };
      renderBody = `return \`<div style="background:#0F172A; color:white; padding:12px 16px; border-radius:8px; display:inline-flex; align-items:center; justify-content:space-between; gap:16px; box-shadow:0 6px 16px rgba(0,0,0,0.2); font-size:12px; min-width:320px;"><span>\${props.message}</span><button style="background:transparent; border:none; color:#60A5FA; font-weight:700; cursor:pointer; font-size:12px;">\${props.action}</button></div>\`;`;
      toJsxBody = `return \`<Snackbar message="\${props.message}" actionText="\${props.action}" onAction={() => {}} />\`;`;
    } else if (num === 28) { // Alert Box
      defaultProps = { variant: 'info', title: 'Active Policy', message: 'Targeting rules compiled with 100% compliance adherence.' };
      renderBody = `
        let bg = '#EFF6FF', border = '#BFDBFE', color = '#1E40AF', icon = 'info';
        if (props.variant === 'success') { bg = '#ECFDF5'; border = '#A7F3D0'; color = '#065F46'; icon = 'check-circle'; }
        if (props.variant === 'warning') { bg = '#FFFBEB'; border = '#FDE68A'; color = '#92400E'; icon = 'alert-triangle'; }
        if (props.variant === 'danger') { bg = '#FEF2F2'; border = '#FECACA'; color = '#991B1B'; icon = 'alert-circle'; }
        return \`
          <div style="background:\${bg}; border:1px solid \${border}; border-radius:var(--brand-radius-base); padding:12px 16px; display:flex; align-items:center; gap:10px;">
            <i data-lucide="\${icon}" style="width:16px;height:16px;color:\${color};flex-shrink:0;"></i>
            <div>
              <div style="font-size:12px; font-weight:600; color:\${color};">\${props.title}</div>
              <div style="font-size:11px; color:\${color}; opacity:0.9;">\${props.message}</div>
            </div>
          </div>
        \`;
      `;
      toJsxBody = `return \`<Alert variant="\${props.variant}" title="\${props.title}">\${props.message}</Alert>\`;`;
    } else if (num === 29) { // Tooltip
      defaultProps = { title: 'Data Lineage', content: 'Compiled from 14 hospital telemetry nodes across US-East.' };
      renderBody = `return \`<div style="background:white; border:1px solid var(--figma-border); border-radius:8px; padding:12px; box-shadow:0 4px 14px rgba(0,0,0,0.1); max-width:280px; font-size:11px;"><div style="font-weight:700; margin-bottom:4px; display:flex; align-items:center; gap:5px;"><i data-lucide="info" style="width:13px;height:13px;color:var(--brand-primary);"></i> \${props.title}</div><p style="color:var(--figma-text-muted);">\${props.content}</p></div>\`;`;
      toJsxBody = `return \`<Tooltip content={<LineageCard title="\${props.title}" />}><span>Hover Target</span></Tooltip>\`;`;
    }
  }

  // 3. Containment & Surfaces (30-42)
  else if (num >= 30 && num <= 42) {
    if (num <= 33) icon = 'square';
    else if (num <= 36) icon = 'maximize-2';
    else if (num <= 38) icon = 'panel-right';
    else if (num <= 40) icon = 'panel-bottom';
    else icon = 'minus';

    if (num === 30) { // Elevated Card
      defaultProps = { variant: 'elevated', title: 'Section Container', subtitle: 'Surface container styled with W3C tokens.' };
      renderBody = `return \`<div style="background:white; border:1px solid var(--figma-border); border-radius:var(--brand-radius-base); padding:20px; box-shadow:0 4px 12px rgba(0,0,0,0.06);"><h3 style="font-size:14px; font-weight:600; color:var(--figma-text-main); margin-bottom:4px;">\${props.title}</h3><p style="font-size:12px; color:var(--figma-text-muted);">\${props.subtitle}</p></div>\`;`;
      toJsxBody = `return \`<Card variant="elevated" className="p-5">\\n  <h3 className="text-sm font-semibold mb-1">\${props.title}</h3>\\n  <p className="text-xs text-slate-500">\${props.subtitle}</p>\\n</Card>\`;`;
    } else if (num === 31) { // Filled Card
      defaultProps = { title: 'Sunken Section', subtitle: 'Border-free container for nested groupings.' };
      renderBody = `return \`<div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:var(--brand-radius-base); padding:20px;"><h3 style="font-size:14px; font-weight:600; color:var(--figma-text-main); margin-bottom:4px;">\${props.title}</h3><p style="font-size:12px; color:var(--figma-text-muted);">\${props.subtitle}</p></div>\`;`;
      toJsxBody = `return \`<Card variant="filled" className="p-5">\\n  <h3 className="text-sm font-semibold mb-1">\${props.title}</h3>\\n  <p className="text-xs text-slate-500">\${props.subtitle}</p>\\n</Card>\`;`;
    } else if (num === 32) { // Outlined Card
      defaultProps = { title: 'Outlined Analytics Card', subtitle: 'Clean 1px stroke border analytics surface.' };
      renderBody = `return \`<div style="background:white; border:1px solid var(--figma-border); border-radius:var(--brand-radius-base); padding:20px;"><h3 style="font-size:14px; font-weight:600; color:var(--figma-text-main); margin-bottom:4px;">\${props.title}</h3><p style="font-size:12px; color:var(--figma-text-muted);">\${props.subtitle}</p></div>\`;`;
      toJsxBody = `return \`<Card variant="outline" className="p-5">\\n  <h3 className="text-sm font-semibold mb-1">\${props.title}</h3>\\n  <p className="text-xs text-slate-500">\${props.subtitle}</p>\\n</Card>\`;`;
    } else if (num === 33) { // Selectable Card
      defaultProps = { title: 'Dedicated Cluster Plan', price: '$240/mo' };
      renderBody = `return \`<div style="background:white; border:2px solid var(--brand-primary); border-radius:var(--brand-radius-base); padding:16px; box-shadow:0 2px 8px rgba(37,99,235,0.12); display:flex; justify-content:space-between; align-items:center;"><div><h4 style="font-size:13px; font-weight:600;">\${props.title}</h4><p style="font-size:11px; color:var(--brand-primary); font-weight:600;">\${props.price}</p></div><i data-lucide="check-circle-2" style="width:18px;height:18px;color:var(--brand-primary);"></i></div>\`;`;
      toJsxBody = `return \`<Card selectable selected title="\${props.title}" />\`;`;
    } else if (num === 34) { // Basic Confirmation Dialog
      defaultProps = { title: 'Confirm Deployment', message: 'Are you sure you want to deploy targeting rules to 2,410 HCP nodes?' };
      renderBody = `return \`<div style="background:white; border:1px solid var(--figma-border); border-radius:12px; padding:20px; max-width:380px; box-shadow:0 8px 24px rgba(0,0,0,0.12);"><h4 style="font-size:14px; font-weight:700; margin-bottom:6px;">\${props.title}</h4><p style="font-size:12px; color:var(--figma-text-muted); margin-bottom:16px;">\${props.message}</p><div style="display:flex; justify-content:flex-end; gap:8px;"><button style="padding:6px 12px; font-size:12px; border:1px solid var(--figma-border); border-radius:6px; background:white;">Cancel</button><button style="padding:6px 14px; font-size:12px; border:none; border-radius:6px; background:var(--brand-primary); color:white; font-weight:600;">Confirm</button></div></div>\`;`;
      toJsxBody = `return \`<Modal title="\${props.title}" footer={<ModalFooter onConfirm={() => {}} />}>\${props.message}</Modal>\`;`;
    } else if (num === 35) { // Alert Dialog
      defaultProps = { title: 'Revoke Production Secret', message: 'This operation will immediately terminate all active API tokens.' };
      renderBody = `return \`<div style="background:white; border:1px solid var(--figma-border); border-radius:12px; padding:20px; max-width:380px; box-shadow:0 8px 24px rgba(0,0,0,0.12);"><div style="display:flex; gap:12px;"><div style="width:36px; height:36px; border-radius:50%; background:#FEF2F2; color:#EF4444; display:flex; align-items:center; justify-content:center; flex-shrink:0;"><i data-lucide="alert-triangle" style="width:18px;height:18px;"></i></div><div><h4 style="font-size:14px; font-weight:700; margin-bottom:4px;">\${props.title}</h4><p style="font-size:12px; color:var(--figma-text-muted); margin-bottom:14px;">\${props.message}</p><div style="display:flex; gap:8px;"><button style="padding:6px 12px; font-size:12px; border:none; border-radius:6px; background:#EF4444; color:white; font-weight:600;">Revoke</button><button style="padding:6px 12px; font-size:12px; border:1px solid var(--figma-border); border-radius:6px; background:white;">Cancel</button></div></div></div></div>\`;`;
      toJsxBody = `return \`<Modal icon={<AlertTriangle />} title="\${props.title}">\${props.message}</Modal>\`;`;
    } else if (num === 36) { // Fullscreen Dialog
      defaultProps = { title: 'Cluster Configuration Wizard' };
      renderBody = `return \`<div style="background:white; border:1px solid var(--figma-border); border-radius:8px; overflow:hidden; box-shadow:0 8px 24px rgba(0,0,0,0.1);"><div style="background:#F8FAFC; border-bottom:1px solid #E2E8F0; padding:10px 16px; display:flex; justify-content:space-between; align-items:center;"><span style="font-size:12px; font-weight:700;">\${props.title}</span><i data-lucide="x" style="width:14px;height:14px;cursor:pointer;"></i></div><div style="padding:16px; font-size:12px; color:var(--figma-text-muted);">100vw × 100vh modal container for enterprise workflows.</div></div>\`;`;
      toJsxBody = `return \`<Modal fullScreen title="\${props.title}">Wizard Body</Modal>\`;`;
    } else if (num === 37) { // Side Sheet Standard
      defaultProps = { title: 'Inspector Sheet' };
      renderBody = `return \`<div style="border-left:3px solid var(--brand-primary); background:white; border:1px solid var(--figma-border); border-radius:8px; padding:14px; max-width:320px;"><div style="display:flex; justify-content:space-between; font-weight:700; font-size:12px; margin-bottom:8px;"><span>\${props.title}</span><i data-lucide="panel-right-close" style="width:14px;height:14px;color:var(--brand-primary);"></i></div><div style="font-size:11px; color:var(--figma-text-muted);">Non-modal persistent side inspector.</div></div>\`;`;
      toJsxBody = `return \`<SideSheet variant="persistent" title="\${props.title}">Inspector Details</SideSheet>\`;`;
    } else if (num === 38) { // Side Sheet Modal
      defaultProps = { title: 'Drawer Details' };
      renderBody = `return \`<div style="border-left:3px solid var(--brand-secondary); background:white; border:1px solid var(--figma-border); border-radius:8px; padding:14px; max-width:320px; box-shadow:0 8px 24px rgba(0,0,0,0.15);"><div style="display:flex; justify-content:space-between; font-weight:700; font-size:12px; margin-bottom:8px;"><span>\${props.title}</span><i data-lucide="x" style="width:14px;height:14px;"></i></div><div style="font-size:11px; color:var(--figma-text-muted);">Right drawer with backdrop dimming.</div></div>\`;`;
      toJsxBody = `return \`<SideSheet variant="modal" title="\${props.title}">Drawer Content</SideSheet>\`;`;
    } else if (num === 39) { // Bottom sheet standard
      defaultProps = { title: 'Actions & Filters' };
      renderBody = `return \`<div style="border-top:3px solid var(--brand-primary); background:white; border:1px solid var(--figma-border); border-radius:12px 12px 0 0; padding:14px 18px; max-width:360px; box-shadow:0 -4px 16px rgba(0,0,0,0.1);"><div style="width:36px; height:4px; background:#CBD5E1; border-radius:9999px; margin:0 auto 10px;"></div><div style="font-size:13px; font-weight:700; margin-bottom:4px;">\${props.title}</div><div style="font-size:11px; color:var(--figma-text-muted);">Thumb-friendly mobile bottom sheet.</div></div>\`;`;
      toJsxBody = `return \`<BottomSheet title="\${props.title}">Content</BottomSheet>\`;`;
    } else if (num === 40) { // Bottom sheet modal / adaptive
      defaultProps = { title: 'Responsive Adaptive Dialog' };
      renderBody = `return \`<div style="border-top:3px solid #7C3AED; background:white; border:1px solid var(--figma-border); border-radius:12px 12px 0 0; padding:14px 18px; max-width:360px; box-shadow:0 -4px 16px rgba(0,0,0,0.1);"><div style="width:36px; height:4px; background:#CBD5E1; border-radius:9999px; margin:0 auto 10px;"></div><div style="font-size:13px; font-weight:700; margin-bottom:4px; color:#7C3AED;">\${props.title}</div><div style="font-size:11px; color:var(--figma-text-muted);">Modal on Desktop, Bottom Sheet on Phone.</div></div>\`;`;
      toJsxBody = `return \`<AdaptiveDialog title="\${props.title}">Content</AdaptiveDialog>\`;`;
    } else if (num === 41) { // Full divider
      defaultProps = {};
      renderBody = `return \`<div style="width:100%; height:1px; background:var(--figma-border); margin:10px 0;"></div>\`;`;
      toJsxBody = `return \`<Divider fullBleed />\`;`;
    } else if (num === 42) { // Inset divider
      defaultProps = {};
      renderBody = `return \`<div style="width:calc(100% - 32px); margin-left:32px; height:1px; background:var(--figma-border); margin-top:10px; margin-bottom:10px;"></div>\`;`;
      toJsxBody = `return \`<Divider inset />\`;`;
    }
  }

  // 4. Navigation Systems (43-59)
  else if (num >= 43 && num <= 59) {
    if (num <= 46) icon = 'layout';
    else if (num === 47) icon = 'panel-bottom';
    else if (num <= 49) icon = 'panel-left';
    else if (num === 50) icon = 'menu';
    else if (num <= 52) icon = 'align-justify';
    else if (num === 53) icon = 'navigation';
    else if (num <= 56) icon = 'folder';
    else if (num === 57) icon = 'chevron-right';
    else icon = 'search';

    if (num >= 43 && num <= 46) { // App Bars
      defaultProps = { title: c.name.replace('Top App Bar - ', '') + ' Header' };
      renderBody = `return \`<div style="width:100%; height:52px; background:white; border-bottom:1px solid var(--figma-border); display:flex; align-items:center; justify-content:space-between; padding:0 16px;"><div style="display:flex; align-items:center; gap:10px;"><i data-lucide="menu" style="width:16px;height:16px;"></i><span style="font-size:13px; font-weight:700;">\${props.title}</span></div><div style="display:flex; gap:8px;"><i data-lucide="bell" style="width:16px;height:16px;"></i><i data-lucide="user" style="width:16px;height:16px;"></i></div></div>\`;`;
      toJsxBody = `return \`<AppBar title="\${props.title}" />\`;`;
    } else if (num === 47) { // Bottom App Bar
      defaultProps = {};
      renderBody = `return \`<div style="width:100%; height:52px; background:white; border-top:1px solid var(--figma-border); display:flex; align-items:center; justify-content:space-between; padding:0 20px;"><div style="display:flex; gap:16px;"><i data-lucide="menu" style="width:18px;height:18px;"></i><i data-lucide="search" style="width:18px;height:18px;"></i></div><button style="width:36px; height:36px; border-radius:50%; background:var(--brand-primary); color:white; border:none; display:flex; align-items:center; justify-content:center;"><i data-lucide="plus" style="width:18px;height:18px;"></i></button></div>\`;`;
      toJsxBody = `return \`<BottomAppBar actions={actions} fab={<FAB />} />\`;`;
    } else if (num === 48 || num === 49) { // Sidebars
      const w = num === 48 ? 200 : 56;
      defaultProps = { title: num === 48 ? 'Navigation' : '' };
      renderBody = `return \`<div style="width:${w}px; background:white; border:1px solid var(--figma-border); border-radius:8px; padding:12px; display:flex; flex-direction:column; gap:8px;"><div style="display:flex; align-items:center; gap:8px; font-size:12px; font-weight:600; color:var(--brand-primary);"><i data-lucide="home" style="width:15px;height:15px;"></i>${num === 48 ? '<span>Dashboard</span>' : ''}</div><div style="display:flex; align-items:center; gap:8px; font-size:12px; color:var(--figma-text-muted);"><i data-lucide="bar-chart-2" style="width:15px;height:15px;"></i>${num === 48 ? '<span>Analytics</span>' : ''}</div></div>\`;`;
      toJsxBody = `return \`<Sidebar collapsed={${num === 49}} />\`;`;
    } else if (num === 50) { // Nav Drawer
      defaultProps = { title: 'Menu Options' };
      renderBody = `return \`<div style="background:white; border:1px solid var(--figma-border); border-radius:8px; padding:14px; max-width:240px; box-shadow:0 8px 20px rgba(0,0,0,0.1);"><div style="font-weight:700; font-size:12px; margin-bottom:8px; display:flex; align-items:center; gap:6px;"><i data-lucide="menu" style="width:14px;height:14px;"></i> \${props.title}</div><div style="font-size:11px; color:var(--figma-text-muted); display:flex; flex-direction:column; gap:6px;"><div>Overview</div><div>HCP Target Directory</div><div>Settings</div></div></div>\`;`;
      toJsxBody = `return \`<HamburgerMenu isOpen={true} />\`;`;
    } else if (num === 51 || num === 52) { // Nav Rail
      defaultProps = {};
      renderBody = `return \`<div style="width:54px; background:white; border:1px solid var(--figma-border); border-radius:8px; padding:12px 0; display:flex; flex-direction:column; align-items:center; gap:14px;">${num === 52 ? '<button style="width:32px; height:32px; border-radius:8px; background:var(--brand-primary); color:white; border:none; display:flex; align-items:center; justify-content:center;"><i data-lucide="plus" style="width:16px;height:16px;"></i></button>' : ''}<i data-lucide="home" style="width:16px;height:16px;color:var(--brand-primary);"></i><i data-lucide="compass" style="width:16px;height:16px;color:var(--figma-text-muted);"></i><i data-lucide="layers" style="width:16px;height:16px;color:var(--figma-text-muted);"></i></div>\`;`;
      toJsxBody = `return \`<NavigationRail ${num === 52 ? 'fab={<FAB />} ' : ''}items={items} />\`;`;
    } else if (num === 53) { // Bottom Nav
      defaultProps = {};
      renderBody = `return \`<div style="width:100%; max-width:360px; height:50px; background:white; border:1px solid var(--figma-border); border-radius:8px; display:flex; align-items:center; justify-content:space-around;"><div style="display:flex; flex-direction:column; align-items:center; font-size:9px; color:var(--brand-primary);"><i data-lucide="home" style="width:15px;height:15px;"></i>Home</div><div style="display:flex; flex-direction:column; align-items:center; font-size:9px; color:var(--figma-text-muted);"><i data-lucide="activity" style="width:15px;height:15px;"></i>Feed</div><div style="display:flex; flex-direction:column; align-items:center; font-size:9px; color:var(--figma-text-muted);"><i data-lucide="user" style="width:15px;height:15px;"></i>Profile</div></div>\`;`;
      toJsxBody = `return \`<BottomNavigation items={items} />\`;`;
    } else if (num >= 54 && num <= 56) { // Tabs
      defaultProps = { tab1: 'Overview', tab2: 'Targeting Rules', tab3: 'Settings' };
      renderBody = `return \`<div style="display:flex; gap:20px; border-bottom:1px solid var(--figma-border); padding-bottom:6px;"><span style="font-size:13px; font-weight:600; color:var(--brand-primary); border-bottom:2px solid var(--brand-primary); padding-bottom:6px; cursor:pointer;">\${props.tab1}</span><span style="font-size:13px; color:var(--figma-text-muted); cursor:pointer;">\${props.tab2}</span><span style="font-size:13px; color:var(--figma-text-muted); cursor:pointer;">\${props.tab3}</span></div>\`;`;
      toJsxBody = `return \`<Tabs variant="${num === 54 ? 'underline' : num === 55 ? 'segmented' : 'scrollable'}" items={["\${props.tab1}", "\${props.tab2}", "\${props.tab3}"]} activeIndex={0} />\`;`;
    } else if (num === 57) { // Breadcrumbs
      defaultProps = { crumb1: 'Telemetry', crumb2: 'Nodes', crumb3: 'Cluster East' };
      renderBody = `return \`<div style="display:flex; align-items:center; gap:6px; font-size:12px; color:var(--figma-text-muted);"><span style="color:var(--brand-primary); cursor:pointer;">\${props.crumb1}</span><i data-lucide="chevron-right" style="width:12px;height:12px;"></i><span style="color:var(--brand-primary); cursor:pointer;">\${props.crumb2}</span><i data-lucide="chevron-right" style="width:12px;height:12px;"></i><span style="font-weight:600; color:var(--figma-text-main);">\${props.crumb3}</span></div>\`;`;
      toJsxBody = `return \`<Breadcrumbs items={["\${props.crumb1}", "\${props.crumb2}", "\${props.crumb3}"]} />\`;`;
    } else if (num === 58) { // Search Bar
      defaultProps = { placeholder: 'Search HCP directory...' };
      renderBody = `return \`<div style="display:flex; align-items:center; gap:8px; background:white; border:1px solid var(--figma-border); border-radius:var(--brand-radius-base); padding:6px 12px; width:100%; max-width:360px;"><i data-lucide="search" style="width:14px;height:14px;color:var(--figma-text-muted);"></i><input type="text" placeholder="\${props.placeholder}" style="border:none; outline:none; font-size:12px; width:100%;"><span style="font-size:10px; font-family:monospace; background:#F1F5F9; padding:2px 6px; border-radius:4px; color:var(--figma-text-muted);">⌘K</span></div>\`;`;
      toJsxBody = `return \`<SearchInput docked shortcut="⌘K" placeholder="\${props.placeholder}" />\`;`;
    } else if (num === 59) { // Command Palette
      defaultProps = { title: 'Command Palette' };
      renderBody = `return \`<div style="background:white; border:1px solid var(--figma-border); border-radius:10px; padding:12px; max-width:380px; box-shadow:0 8px 24px rgba(0,0,0,0.12);"><div style="display:flex; align-items:center; gap:8px; border-bottom:1px solid var(--figma-border); padding-bottom:8px; margin-bottom:8px;"><i data-lucide="search" style="width:15px;height:15px;color:var(--brand-primary);"></i><span style="font-size:13px; font-weight:600;">\${props.title}</span></div><div style="font-size:11px; color:var(--figma-text-muted); display:flex; flex-direction:column; gap:4px;"><div>→ Jump to Oncology Decile</div><div>→ Generate Audience Diff</div></div></div>\`;`;
      toJsxBody = `return \`<CommandPalette isOpen />\`;`;
    }
  }

  // 5. Selection & Form Controls (60-81)
  else if (num >= 60 && num <= 81) {
    if (num <= 62) icon = 'check-square';
    else if (num <= 64) icon = 'check-circle-2';
    else if (num <= 66) icon = 'toggle-left';
    else if (num <= 69) icon = 'sliders';
    else if (num <= 73) icon = 'tag';
    else if (num <= 76) icon = 'calendar';
    else if (num <= 78) icon = 'clock';
    else if (num <= 80) icon = 'more-horizontal';
    else icon = 'chevron-down';

    if (num >= 60 && num <= 62) { // Checkbox
      defaultProps = { label: 'Telemetry Ingestion Stream' };
      renderBody = `return \`<div style="display:flex; align-items:center; gap:8px;"><input type="checkbox" checked style="width:16px; height:16px; accent-color:var(--brand-primary); cursor:pointer;"><span style="font-size:12px; font-weight:500;">\${props.label}</span></div>\`;`;
      toJsxBody = `return \`<Checkbox checked label="\${props.label}" />\`;`;
    } else if (num >= 63 && num <= 64) { // Radio
      defaultProps = { label: 'Primary Brand Cluster' };
      renderBody = `return \`<div style="display:flex; align-items:center; gap:8px;"><input type="radio" checked style="width:16px; height:16px; accent-color:var(--brand-primary); cursor:pointer;"><span style="font-size:12px; font-weight:500;">\${props.label}</span></div>\`;`;
      toJsxBody = `return \`<RadioButton checked label="\${props.label}" />\`;`;
    } else if (num === 65 || num === 66) { // Switch
      defaultProps = { label: 'Realtime Telemetry Sync' };
      renderBody = `return \`<div style="display:flex; align-items:center; justify-content:space-between; max-width:320px;"><span style="font-size:12px; font-weight:500; color:var(--figma-text-main);">\${props.label}</span><div style="width:36px; height:20px; background:var(--brand-primary); border-radius:9999px; position:relative; cursor:pointer;"><div style="width:16px; height:16px; background:white; border-radius:50%; position:absolute; right:2px; top:2px; box-shadow:0 1px 3px rgba(0,0,0,0.2);"></div></div></div>\`;`;
      toJsxBody = `return \`<Switch label="\${props.label}" defaultChecked />\`;`;
    } else if (num >= 67 && num <= 69) { // Sliders
      defaultProps = { label: 'Confidence Threshold', value: '75%' };
      renderBody = `return \`<div style="width:100%; max-width:320px;"><div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:6px;"><span style="font-weight:500;">\${props.label}</span><span style="font-family:monospace; font-weight:600; color:var(--brand-primary);">\${props.value}</span></div><div style="height:6px; background:#E2E8F0; border-radius:9999px; position:relative;"><div style="width:75%; height:100%; background:var(--brand-primary); border-radius:9999px;"></div><div style="width:16px; height:16px; background:white; border:2px solid var(--brand-primary); border-radius:50%; position:absolute; top:-5px; left:72%; cursor:pointer;"></div></div></div>\`;`;
      toJsxBody = `return \`<Slider label="\${props.label}" defaultValue={75} />\`;`;
    } else if (num >= 70 && num <= 73) { // Chips
      defaultProps = { label: c.name.replace(' Chip', '') };
      renderBody = `return \`<div style="display:inline-flex; align-items:center; gap:5px; background:#EFF6FF; border:1px solid #BFDBFE; color:var(--brand-primary); border-radius:9999px; padding:4px 12px; font-size:11px; font-weight:600;"><i data-lucide="tag" style="width:11px;height:11px;"></i> \${props.label}</div>\`;`;
      toJsxBody = `return \`<Chip label="\${props.label}" />\`;`;
    } else if (num >= 74 && num <= 76) { // Date Pickers
      defaultProps = { label: 'Date Selection' };
      renderBody = `return \`<div style="display:inline-flex; align-items:center; gap:8px; background:white; border:1px solid var(--figma-border); border-radius:var(--brand-radius-base); padding:8px 12px; font-size:12px;"><i data-lucide="calendar" style="width:14px;height:14px;color:var(--brand-primary);"></i><span>2026-11-10</span></div>\`;`;
      toJsxBody = `return \`<DatePicker />\`;`;
    } else if (num >= 77 && num <= 78) { // Time Pickers
      defaultProps = { label: 'Execution Time' };
      renderBody = `return \`<div style="display:inline-flex; align-items:center; gap:8px; background:white; border:1px solid var(--figma-border); border-radius:var(--brand-radius-base); padding:8px 12px; font-size:12px;"><i data-lucide="clock" style="width:14px;height:14px;color:var(--brand-primary);"></i><span>10:30 AM EST</span></div>\`;`;
      toJsxBody = `return \`<TimePicker />\`;`;
    } else if (num >= 79 && num <= 81) { // Dropdown & Select
      defaultProps = { label: 'Select Decile Filter' };
      renderBody = `return \`<div style="display:flex; align-items:center; justify-content:space-between; background:white; border:1px solid var(--figma-border); border-radius:var(--brand-radius-base); padding:8px 12px; width:100%; max-width:280px; font-size:12px;"><span style="font-weight:500;">\${props.label}</span><i data-lucide="chevron-down" style="width:14px;height:14px;color:var(--figma-text-muted);"></i></div>\`;`;
      toJsxBody = `return \`<Select placeholder="\${props.label}" />\`;`;
    }
  }

  // 6. Text Inputs & Search (82-89)
  else if (num >= 82 && num <= 89) {
    icon = num === 89 ? 'file-text' : 'type';
    if (num === 89) { // Textarea
      defaultProps = { label: 'Multi-line Notes', placeholder: 'Enter physician notes or clinical narrative...' };
      renderBody = `return \`<div style="width:100%; max-width:380px;"><label style="display:block; font-size:12px; font-weight:600; margin-bottom:4px;">\${props.label}</label><textarea placeholder="\${props.placeholder}" style="width:100%; height:64px; border:1px solid var(--figma-border); border-radius:var(--brand-radius-base); font-size:12px; padding:8px 10px; outline:none; resize:none; font-family:inherit;"></textarea></div>\`;`;
      toJsxBody = `return \`<Textarea label="\${props.label}" placeholder="\${props.placeholder}" rows={4} />\`;`;
    } else { // Standard Inputs
      defaultProps = { label: c.name.replace(' Field', ''), placeholder: 'e.g. oncology-east', helperText: 'Unique internal identifier' };
      renderBody = `return \`<div style="width:100%; max-width:380px;"><label style="display:block; font-size:12px; font-weight:600; margin-bottom:4px;">\${props.label}</label><input type="text" placeholder="\${props.placeholder}" style="width:100%; background:white; border:1px solid var(--figma-border); border-radius:var(--brand-radius-base); font-size:12px; padding:8px 12px; outline:none;"><span style="font-size:10px; color:var(--figma-text-muted); display:block; margin-top:3px;">\${props.helperText}</span></div>\`;`;
      toJsxBody = `return \`<Input label="\${props.label}" placeholder="\${props.placeholder}" helperText="\${props.helperText}" />\`;`;
    }
  }

  // 7. Data Display & Lists (90-100)
  else if (num >= 90 && num <= 100) {
    if (num <= 92) icon = 'list';
    else if (num === 93) icon = 'chevrons-up-down';
    else if (num <= 96) icon = 'table';
    else if (num === 97) icon = 'skip-forward';
    else icon = 'user';

    if (num >= 90 && num <= 93) { // List items & accordion
      defaultProps = { title: c.name, subtitle: 'Associated metadata entry' };
      renderBody = `return \`<div style="display:flex; justify-content:space-between; align-items:center; background:white; border:1px solid var(--figma-border); border-radius:var(--brand-radius-base); padding:10px 14px; width:100%; max-width:380px;"><div><div style="font-size:12px; font-weight:600;">\${props.title}</div><div style="font-size:10px; color:var(--figma-text-muted);">\${props.subtitle}</div></div><i data-lucide="chevron-right" style="width:14px;height:14px;color:var(--figma-text-muted);"></i></div>\`;`;
      toJsxBody = `return \`<ListItem title="\${props.title}" subtitle="\${props.subtitle}" />\`;`;
    } else if (num >= 94 && num <= 96) { // Data Tables
      defaultProps = { title: 'Doctor Directory' };
      renderBody = `return \`
        <div style="width:100%; border:1px solid var(--figma-border); border-radius:var(--brand-radius-base); overflow:hidden; background:white;">
          <table style="width:100%; border-collapse:collapse; font-size:12px; text-align:left;">
            <thead style="background:var(--figma-bg-subtle); color:var(--figma-text-muted); border-bottom:1px solid var(--figma-border);">
              <tr>
                <th style="padding:10px 14px; font-weight:600;">HCP Name</th>
                <th style="padding:10px 14px; font-weight:600;">Specialty</th>
                <th style="padding:10px 14px; font-weight:600; text-align:right;">Decile</th>
              </tr>
            </thead>
            <tbody style="font-variant-numeric: tabular-nums;">
              <tr style="border-bottom:1px solid var(--figma-border);">
                <td style="padding:10px 14px; font-weight:500;">Dr. Sarah Jenkins</td>
                <td style="padding:10px 14px; color:var(--figma-text-muted);">Oncology</td>
                <td style="padding:10px 14px; text-align:right; font-family:'JetBrains Mono',monospace; color:#059669; font-weight:600;">9.4</td>
              </tr>
              <tr>
                <td style="padding:10px 14px; font-weight:500;">Dr. Marcus Rivera</td>
                <td style="padding:10px 14px; color:var(--figma-text-muted);">Cardiology</td>
                <td style="padding:10px 14px; text-align:right; font-family:'JetBrains Mono',monospace; color:var(--brand-primary); font-weight:600;">8.8</td>
              </tr>
            </tbody>
          </table>
        </div>
      \`;`;
      toJsxBody = `return \`<DataTable columns={columns} data={data} className="tabular-nums" />\`;`;
    } else if (num === 97) { // Pagination
      defaultProps = { total: '148' };
      renderBody = `return \`<div style="display:flex; justify-content:space-between; align-items:center; width:100%; max-width:380px; font-size:11px; color:var(--figma-text-muted);"><span>Showing 1-10 of \${props.total}</span><div style="display:flex; gap:4px;"><button style="padding:4px 8px; border:1px solid var(--figma-border); border-radius:4px; background:white;">‹ Prev</button><button style="padding:4px 8px; border:1px solid var(--brand-primary); border-radius:4px; background:var(--brand-primary); color:white;">1</button><button style="padding:4px 8px; border:1px solid var(--figma-border); border-radius:4px; background:white;">2</button><button style="padding:4px 8px; border:1px solid var(--figma-border); border-radius:4px; background:white;">Next ›</button></div></div>\`;`;
      toJsxBody = `return \`<Pagination total={\${props.total}} pageSize={10} />\`;`;
    } else if (num >= 98 && num <= 100) { // Avatars
      defaultProps = { name: 'Sarah Jenkins' };
      renderBody = `return \`<div style="display:inline-flex; align-items:center; gap:8px;"><div style="width:34px; height:34px; border-radius:50%; background:linear-gradient(135deg, var(--brand-primary), var(--brand-secondary)); color:white; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:12px;">SJ</div><span style="font-size:12px; font-weight:600;">\${props.name}</span></div>\`;`;
      toJsxBody = `return \`<Avatar name="\${props.name}" size="md" />\`;`;
    }
  }

  // 8. Dashboard Organisms (101-107)
  else if (num >= 101 && num <= 107) {
    if (num <= 104) icon = 'bar-chart-2';
    else if (num === 105) icon = 'trending-up';
    else if (num === 106) icon = 'activity';
    else icon = 'grid';

    if (num === 101) { // Standard KPI Card
      defaultProps = { title: 'Active Targets', value: '2,410', delta: '+12.4%' };
      renderBody = `return \`
        <div style="background:white; border:1px solid var(--figma-border); border-radius:var(--brand-radius-base); padding:16px; height:140px; display:flex; flex-direction:column; justify-content:space-between; box-shadow:0 1px 3px rgba(0,0,0,0.05); max-width:280px;">
          <div>
            <div style="font-size:11px; font-weight:600; color:var(--figma-text-muted); text-transform:uppercase; letter-spacing:0.5px;">\${props.title}</div>
            <div style="font-size:26px; font-weight:700; color:var(--figma-text-main); font-variant-numeric:tabular-nums; margin-top:4px;">\${props.value}</div>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; font-size:11px;">
            <span style="color:#059669; font-weight:600;">▲ \${props.delta} vs cycle</span>
            <span style="font-size:10px; color:var(--figma-text-subtle);">Strict 184px spec</span>
          </div>
        </div>
      \`;`;
      toJsxBody = `return \`<KpiCard title="\${props.title}" value="\${props.value}" delta="\${props.delta}" trend="up" />\`;`;
    } else if (num === 102) { // Sparkline area
      defaultProps = { title: 'Revenue Trajectory', value: '$4.8M' };
      renderBody = `return \`<div style="background:white; border:1px solid var(--figma-border); border-radius:var(--brand-radius-base); padding:16px; max-width:280px;"><div style="font-size:11px; color:var(--figma-text-muted); text-transform:uppercase;">\${props.title}</div><div style="font-size:22px; font-weight:700; font-family:monospace; margin:4px 0 8px;">\${props.value}</div><svg viewBox="0 0 100 24" style="width:100%; height:28px;"><path d="M0 20 Q 25 5, 50 14 T 100 4 L 100 24 L 0 24 Z" fill="rgba(37,99,235,0.1)"/><path d="M0 20 Q 25 5, 50 14 T 100 4" fill="none" stroke="var(--brand-primary)" stroke-width="2"/></svg></div>\`;`;
      toJsxBody = `return \`<KpiCard title="\${props.title}" value="\${props.value}" sparkline={{ type: 'area' }} />\`;`;
    } else if (num === 103) { // Target Progress
      defaultProps = { title: 'Annual SLA Goal', value: '84%' };
      renderBody = `return \`<div style="background:white; border:1px solid var(--figma-border); border-radius:var(--brand-radius-base); padding:16px; max-width:280px;"><div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:6px;"><span style="font-weight:600;">\${props.title}</span><span style="font-weight:700; color:#059669;">\${props.value}</span></div><div style="width:100%; height:8px; background:#E2E8F0; border-radius:9999px; overflow:hidden;"><div style="width:84%; height:100%; background:#10B981;"></div></div></div>\`;`;
      toJsxBody = `return \`<KpiCard title="\${props.title}" targetProgress={{ current: 84, target: 100 }} />\`;`;
    } else if (num === 104) { // Bar Sparkline
      defaultProps = { title: 'Daily Traffic Volatility' };
      renderBody = `return \`<div style="background:white; border:1px solid var(--figma-border); border-radius:var(--brand-radius-base); padding:16px; max-width:280px;"><div style="font-size:11px; color:var(--figma-text-muted); margin-bottom:8px;">\${props.title}</div><div style="display:flex; align-items:flex-end; gap:4px; height:24px;"><span style="width:8px; height:8px; background:#BFDBFE; border-radius:2px;"></span><span style="width:8px; height:16px; background:#BFDBFE; border-radius:2px;"></span><span style="width:8px; height:12px; background:#BFDBFE; border-radius:2px;"></span><span style="width:8px; height:24px; background:var(--brand-primary); border-radius:2px;"></span><span style="width:8px; height:18px; background:#BFDBFE; border-radius:2px;"></span></div></div>\`;`;
      toJsxBody = `return \`<KpiCard title="\${props.title}" sparkline={{ type: 'bar' }} />\`;`;
    } else if (num === 105) { // Anomaly Chart
      defaultProps = { title: 'Anomaly Spike Detected' };
      renderBody = `return \`<div style="border:1px solid #F59E0B; background:#FFFBEB; border-radius:var(--brand-radius-base); padding:12px 16px; display:inline-flex; align-items:center; gap:8px; color:#B45309; font-size:12px; font-weight:600;"><i data-lucide="trending-up" style="width:16px;height:16px;"></i><span>\${props.title} (+38% vs baseline)</span></div>\`;`;
      toJsxBody = `return \`<ChartContainer anomalyBadge={<Badge status="warning" />} />\`;`;
    } else if (num === 106) { // Diagnostic Modal
      defaultProps = { title: 'Root-Cause Diagnostic' };
      renderBody = `return \`<div style="background:white; border:1px solid var(--figma-border); border-radius:8px; padding:14px; max-width:320px; box-shadow:0 6px 16px rgba(0,0,0,0.08);"><div style="font-weight:700; font-size:12px; margin-bottom:6px; display:flex; align-items:center; gap:6px;"><i data-lucide="activity" style="width:14px;height:14px;color:var(--brand-primary);"></i> \${props.title}</div><div style="font-size:11px; color:var(--figma-text-muted);">Root cause isolated: Latency spike in US-East DB pool.</div></div>\`;`;
      toJsxBody = `return \`<AdaptiveDialog title="\${props.title}" />\`;`;
    } else if (num === 107) { // Mobile card list
      defaultProps = { title: 'Responsive Table Fallback' };
      renderBody = `return \`<div style="border:1px dashed var(--brand-primary); border-radius:8px; padding:12px; max-width:320px; font-size:11px; color:var(--brand-primary); background:#EFF6FF;"><i data-lucide="grid" style="width:14px;height:14px;"></i> \${props.title}: Automatically switches table to mobile card deck on viewports < 600px.</div>\`;`;
      toJsxBody = `return \`<DataTable mobileCardTransform />\`;`;
    }
  }

  // 9. Gen AI Interfaces (108-112)
  else if (num >= 108 && num <= 112) {
    if (num === 108) icon = 'sparkles';
    else if (num === 109) icon = 'brain-circuit';
    else if (num === 110) icon = 'cpu';
    else if (num === 111) icon = 'git-pull-request';
    else icon = 'thumbs-down';

    if (num === 108) { // Prompt Composer
      defaultProps = { placeholder: 'Ask Aurelia to synthesize targeting rules...', tokenCost: '$0.04', buttonLabel: 'Send' };
      renderBody = `return \`
        <div style="background: white; border: 1px solid var(--figma-border); border-radius: var(--brand-radius-base); padding: 14px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); width:100%; max-width:440px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <span style="font-size:11px; font-weight:700; color:var(--brand-secondary); display:inline-flex; align-items:center; gap:5px;">
              <i data-lucide="sparkles" style="width:13px;height:13px;"></i> Gen AI Multimodal Input
            </span>
            <span style="font-size:10px; font-family:'JetBrains Mono',monospace; background:rgba(124,58,237,0.1); color:var(--brand-secondary); padding:2px 8px; border-radius:9999px; font-weight:600;">
              \${props.tokenCost} est.
            </span>
          </div>
          <textarea placeholder="\${props.placeholder}" style="width:100%; border:1px solid var(--figma-border); border-radius:6px; font-size:12px; padding:8px 10px; outline:none; resize:none; height:54px; font-family:inherit; color:var(--figma-text-main);"></textarea>
          <div style="display:flex; justify-content:flex-end; gap:8px; margin-top:8px;">
            <button style="background:linear-gradient(135deg, var(--brand-secondary), var(--brand-primary)); color:white; border:none; padding:6px 14px; border-radius:6px; font-size:11px; font-weight:600; cursor:pointer; display:inline-flex; align-items:center; gap:5px;">
              <i data-lucide="send" style="width:12px;height:12px;"></i> \${props.buttonLabel}
            </button>
          </div>
        </div>
      \`;`;
      toJsxBody = `return \`<PromptComposer placeholder="\${props.placeholder}" tokenCostEstimate="\${props.tokenCost}" onSend={(p) => console.log(p)} />\`;`;
    } else if (num === 109) { // Reasoning Trace
      defaultProps = { title: 'Reasoning Process (3.2s)', step1: '1. Parsed doctor segment criteria', step2: '2. Queried 2,410 HCPs from Knowledge Graph' };
      renderBody = `return \`
        <div style="background: #F8FAFC; border: 1px solid rgba(124,58,237,0.25); border-radius: var(--brand-radius-base); padding: 12px 16px; width:100%; max-width:440px;">
          <div style="display:flex; justify-content:space-between; align-items:center; font-size:12px; font-weight:600; color:var(--brand-secondary);">
            <span style="display:inline-flex; align-items:center; gap:6px;">
              <i data-lucide="brain-circuit" style="width:14px;height:14px;"></i> \${props.title}
            </span>
            <i data-lucide="chevron-down" style="width:14px;height:14px;"></i>
          </div>
          <div style="margin-top:8px; font-size:11px; color:var(--figma-text-muted); font-family:'JetBrains Mono',monospace; display:flex; flex-direction:column; gap:4px;">
            <div>\${props.step1}</div>
            <div>\${props.step2}</div>
          </div>
        </div>
      \`;`;
      toJsxBody = `return \`<ReasoningAccordion title="\${props.title}" steps={["\${props.step1}", "\${props.step2}"]} defaultExpanded />\`;`;
    } else if (num === 110) { // Compound AI Card
      defaultProps = { title: 'Synthesized Audience Report' };
      renderBody = `return \`<div style="background:linear-gradient(135deg,rgba(124,58,237,0.06),rgba(236,72,153,0.06)); border:1px solid #C084FC; border-radius:var(--brand-radius-base); padding:16px; width:100%; max-width:440px;"><div style="font-size:12px; font-weight:700; color:#7C3AED; margin-bottom:6px; display:flex; align-items:center; gap:6px;"><i data-lucide="sparkles" style="width:14px;height:14px;"></i> \${props.title}</div><p style="font-size:11px; color:var(--figma-text-muted); line-height:1.4;">Compound multimodal payload: Synthesized summary text, decile chart, and HCP export table.</p></div>\`;`;
      toJsxBody = `return \`<CompoundGenAiResponse title="\${props.title}" />\`;`;
    } else if (num === 111) { // Diff Viewer
      defaultProps = { before: 'WHERE specialty = "Cardiology"', after: 'WHERE specialty IN ("Cardiology", "Oncology")' };
      renderBody = `return \`<div style="background:white; border:1px solid var(--figma-border); border-radius:var(--brand-radius-base); padding:12px; font-family:monospace; font-size:11px; width:100%; max-width:440px;"><div style="color:#EF4444; background:#FEF2F2; padding:3px 6px; border-radius:4px; margin-bottom:4px;">- \${props.before}</div><div style="color:#059669; background:#ECFDF5; padding:3px 6px; border-radius:4px;">+ \${props.after}</div></div>\`;`;
      toJsxBody = `return \`<SuggestionDiffViewer before="\${props.before}" after="\${props.after}" onAccept={() => {}} />\`;`;
    } else if (num === 112) { // Reject Feedback Modal
      defaultProps = { title: 'Provide Copilot Feedback' };
      renderBody = `return \`<div style="background:white; border:1px solid var(--figma-border); border-radius:10px; padding:14px; width:100%; max-width:320px; box-shadow:0 6px 18px rgba(0,0,0,0.08);"><div style="font-weight:700; font-size:12px; margin-bottom:8px; display:flex; align-items:center; gap:6px; color:#92400E;"><i data-lucide="message-square" style="width:14px;height:14px;"></i> \${props.title}</div><div style="font-size:11px; color:var(--figma-text-muted);">Select reason for rejecting suggestion (Hallucination, Policy Breach, Inaccurate Decile).</div></div>\`;`;
      toJsxBody = `return \`<AdaptiveDialog title="\${props.title}" />\`;`;
    }
  }

  return {
    id,
    num: c.num,
    name: c.name,
    category: c.cat,
    icon,
    aliases,
    importName: c.name.replace(/[^a-zA-Z0-9]/g, ''),
    desc: c.desc,
    device: c.device,
    api: c.api,
    defaultProps,
    defaultAtoms,
    renderBody,
    toJsxBody
  };
}

export function generateCatalogCode() {
  const items = ALL_112_COMPONENTS.map(c => {
    const d = getComponentDetails(c);
    return `      {
        id: ${JSON.stringify(d.id)},
        num: ${JSON.stringify(d.num)},
        name: ${JSON.stringify(d.name)},
        category: ${JSON.stringify(d.category)},
        icon: ${JSON.stringify(d.icon)},
        aliases: ${JSON.stringify(d.aliases)},
        importName: ${JSON.stringify(d.importName)},
        desc: ${JSON.stringify(d.desc)},
        device: ${JSON.stringify(d.device)},
        api: ${JSON.stringify(d.api)},
        defaultProps: ${JSON.stringify(d.defaultProps, null, 10).trim()},
        defaultAtoms: ${JSON.stringify(d.defaultAtoms || {})},
        render: (props) => {
          ${d.renderBody.trim()}
        },
        toJsx: (props) => {
          ${d.toJsxBody.trim()}
        }
      }`;
  });

  return `const CATALOG = [\n${items.join(',\n')}\n    ];`;
}


