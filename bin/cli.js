#!/usr/bin/env node

/**
 * Enterprise Design System CLI
 * Manage tokens, launch visual studio, scaffold components, and provide
 * autonomous control to AI Coding Agents via the integrated Skill Engine.
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const args = process.argv.slice(2);
const command = args[0] || 'help';

function printBanner() {
  console.log(`
╔══════════════════════════════════════════════════════════════════╗
║                ENTERPRISE DESIGN SYSTEM CLI                      ║
║     Multi-Device Dashboards & Gen AI Application Platform        ║
║     + AI Agent Skill Engine for Antigravity, Cursor & Claude     ║
╚══════════════════════════════════════════════════════════════════╝
`);
}

switch (command) {
  case 'ui':
  case 'start':
  case 'serve':
    startWebUI(args[1] || 3000);
    break;

  case 'init':
    runInit(args[1]);
    break;

  case 'init-library':
    runInitLibrary(args[1], args[2]);
    break;

  case 'add':
    runAdd(args[1], args);
    break;

  case 'catalog':
    runCatalog(args.slice(1));
    break;

  case 'theme':
    runTheme(args.slice(1));
    break;

  case 'compose':
    runCompose(args.slice(1));
    break;

  case 'sync':
    runSync();
    break;

  case 'spec':
  case 'generate-spec':
    runSpec(args[1], args[2], args[3]);
    break;

  case 'tokens':
    runTokens(args.slice(1));
    break;

  case 'audit':
    runAudit(args[1], args);
    break;

  case 'map':
  case 'gap':
    runMap(args[1]);
    break;

  case 'skill':
    runSkill(args.slice(1));
    break;

  case 'build':
    runBuild();
    break;

  case 'export':
    runExport(args);
    break;

  case 'help':
  default:
    printHelp();
    break;
}

function printHelp() {
  printBanner();
  console.log(`Usage:
  npx @hsb_design/design-system <command> [options]
  node bin/cli.js <command> [options]

Core Commands:
  init [targetDir]           Initialize design system, CSS tokens, Tailwind preset, and AI skill engine
  init-library [dir] [brand] Scaffold complete 5-layer enterprise design system library into target directory
  add <component|group>      Scaffold atomic components into your project (atoms, molecules, dashboard, genai, all)
  compose <template>         Assemble production-ready React TSX screen (dashboard, genai, executive-overview)
  catalog [search|list|json] Introspect all 112 components, props, and TSX signatures (for AI & devs)
  theme [preset|set]         Mutate brand theme (auto-calculates 50-950 HSL color ramp & rebuilds tokens)
  audit [dir] [--fix]        Scan codebase for compliance (hardcoded hex, missing tabular-nums) with auto-fix
  sync                       Bake visual canvas customizations from tokens/component-customizations.json to code
  spec [dest] [brand]        Generate a complete, living HTML specification with atomic granularity for any brand
  tokens <get|set|list>      Inspect or mutate design tokens programmatically from terminal or agent
  map [dir]                  Scan codebase, map legacy components to system, and output gap analysis
  skill install [dir]        Install the Agent Skill into .gemini/skills, .cursor/rules, or .antigravity
  ui [port]                  Launch the interactive Drag & Drop Canvas Studio (default port 3000)
  export [options]           Export tokens & layout trees for Figma, Lovable, Antigravity, or CSS
  build                      Compile W3C DTCG source tokens into CSS, Tailwind, and TypeScript

Theme Presets:
  node bin/cli.js theme preset emerald            # Emerald Fintech (#059669, 6px radius)
  node bin/cli.js theme preset genai-neon          # GenAI Neon Violet (#7C3AED, 12px radius)
  node bin/cli.js theme preset enterprise-slate   # Enterprise Slate (#334155, 4px radius)
  node bin/cli.js theme set --primary "#059669" --radius 6px --font "Inter"

Component Composition:
  node bin/cli.js compose dashboard --target ./src/pages/Dashboard.tsx
  node bin/cli.js compose genai --target ./src/pages/AiAssistant.tsx

Catalog Introspection:
  node bin/cli.js catalog search sparkline        # Find KPI card with sparklines & TSX props
  node bin/cli.js catalog json                    # Machine-readable component schema for AI agents

Component Groups:
  node bin/cli.js add layout          # AdaptiveLayout, Sidebar, NavigationRail, BottomNavigation, HamburgerMenu, Tabs
  node bin/cli.js add inputs          # Button, Input, Switch, Chip, Slider, Stepper, SegmentedControl
  node bin/cli.js add data            # KpiCard, DataTable, ChartContainer, ListItem, Badge, Avatar
  node bin/cli.js add feedback        # AdaptiveDialog, Modal, BottomSheet, Snackbar, Tooltip, Alert, CircularProgress
  node bin/cli.js add dashboard       # KpiCard, DataTable, ChartContainer
  node bin/cli.js add genai           # PromptComposer, StreamingMessage, ReasoningAccordion, DiffViewer
  node bin/cli.js add all             # Complete 5-layer component catalog

Individual Components:
  button, input, badge, avatar, switch, alert, tabs, modal, kpi-card, data-table, chart, prompt-composer

Living Specification Generator:
  node bin/cli.js spec ./public/design-system.html "Acme Corp"
`);
}

function runInit(target = '.') {
  printBanner();
  const targetDir = path.resolve(process.cwd(), target);
  console.log(`🚀 Initializing Enterprise Design System in: ${targetDir}\n`);

  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

  // 1. Copy design-system.css into target/styles or target/src
  const stylesDir = fs.existsSync(path.join(targetDir, 'src'))
    ? path.join(targetDir, 'src', 'styles')
    : path.join(targetDir, 'styles');
  fs.mkdirSync(stylesDir, { recursive: true });

  fs.copyFileSync(
    path.join(rootDir, 'dist', 'css', 'design-system.css'),
    path.join(stylesDir, 'design-system.css')
  );
  console.log(`✓ Copied CSS Custom Properties: ${path.join(stylesDir, 'design-system.css')}`);

  // 2. Copy Tailwind preset
  fs.copyFileSync(
    path.join(rootDir, 'dist', 'tailwind', 'tailwind.preset.js'),
    path.join(targetDir, 'design-system.tailwind.js')
  );
  console.log(`✓ Created Tailwind Preset: ${path.join(targetDir, 'design-system.tailwind.js')}`);

  // 3. Install AI Agent Skill Engine in target directory
  runSkill(['install', targetDir]);

  console.log(`\n🎉 Design system initialized! Your AI agent can now use the skill to build components.`);
}

function runInitLibrary(target = './src/design-system', brandName = 'Enterprise') {
  printBanner();
  const targetDir = path.resolve(process.cwd(), target);
  console.log(`🏛️  Scaffolding Complete 5-Layer Design System Library for "${brandName}"`);
  console.log(`📁 Destination: ${targetDir}\n`);

  fs.mkdirSync(targetDir, { recursive: true });

  // 1. Tokens Layer
  const tokensDest = path.join(targetDir, 'tokens');
  fs.mkdirSync(path.join(tokensDest, 'components'), { recursive: true });
  copyFolderSync(path.join(rootDir, 'tokens'), tokensDest);
  console.log(`✓ Layer 1 (Tokens): Scaffolding W3C DTCG tokens (primitives, semantic, responsive, components)`);

  // 2. Styles Layer
  const stylesDest = path.join(targetDir, 'styles');
  fs.mkdirSync(stylesDest, { recursive: true });
  fs.copyFileSync(
    path.join(rootDir, 'dist', 'css', 'design-system.css'),
    path.join(stylesDest, 'design-system.css')
  );
  fs.copyFileSync(
    path.join(rootDir, 'dist', 'tailwind', 'tailwind.preset.js'),
    path.join(stylesDest, 'tailwind.preset.js')
  );
  console.log(`✓ Layer 1 (Styles): Copied design-system.css and tailwind.preset.js`);

  // 3. Types
  const typesSrc = path.join(rootDir, 'src', 'types', 'index.ts');
  const typesDest = path.join(targetDir, 'types.ts');
  fs.copyFileSync(typesSrc, typesDest);
  console.log(`✓ Types: Scaffolding complete TypeScript contracts (${typesDest})`);

  // 4. Five Component Layers
  const layerFolders = {
    'layout': ['organisms/Sidebar.tsx', 'layout/NavigationRail.tsx', 'layout/BottomNavigation.tsx', 'molecules/HamburgerMenu.tsx', 'molecules/Tabs.tsx', 'layout/AdaptiveLayout.tsx'],
    'inputs': ['atoms/Button.tsx', 'atoms/Input.tsx', 'atoms/Switch.tsx', 'inputs/Chip.tsx', 'inputs/Slider.tsx', 'inputs/Stepper.tsx', 'inputs/SegmentedControl.tsx'],
    'data': ['dashboard/KpiCard.tsx', 'dashboard/DataTable.tsx', 'dashboard/ChartContainer.tsx', 'data/ListItem.tsx', 'atoms/Badge.tsx', 'atoms/Avatar.tsx'],
    'feedback': ['molecules/Modal.tsx', 'feedback/BottomSheet.tsx', 'feedback/AdaptiveDialog.tsx', 'feedback/Snackbar.tsx', 'feedback/Tooltip.tsx', 'molecules/Alert.tsx', 'feedback/CircularProgress.tsx'],
    'genai': ['genai/PromptComposer.tsx', 'genai/StreamingMessage.tsx', 'genai/ReasoningAccordion.tsx', 'genai/SuggestionDiffViewer.tsx']
  };

  for (const [layer, files] of Object.entries(layerFolders)) {
    const layerDir = path.join(targetDir, 'components', layer);
    fs.mkdirSync(layerDir, { recursive: true });
    for (const rel of files) {
      const srcFile = path.join(rootDir, 'src', 'components', rel);
      const destFile = path.join(layerDir, path.basename(rel));
      if (fs.existsSync(srcFile)) {
        let code = fs.readFileSync(srcFile, 'utf8');
        // Fix relative imports to types and sister components
        code = code.replace(/\.\.\/\.\.\/types/g, '../../types');
        code = code.replace(/\.\.\/types/g, '../../types');
        code = code.replace(/from '\.\.\/molecules\/Modal'/g, "from '../feedback/Modal'");
        code = code.replace(/from '\.\/BottomSheet'/g, "from '../feedback/BottomSheet'");
        code = code.replace(/from '\.\.\/organisms\/Sidebar'/g, "from '../layout/Sidebar'");
        code = code.replace(/from '\.\/NavigationRail'/g, "from '../layout/NavigationRail'");
        code = code.replace(/from '\.\/BottomNavigation'/g, "from '../layout/BottomNavigation'");
        code = code.replace(/from '\.\.\/molecules\/HamburgerMenu'/g, "from '../layout/HamburgerMenu'");
        fs.writeFileSync(destFile, code, 'utf8');
      }
    }
    console.log(`✓ Component Layer "${layer}": Scaffolded ${files.length} components`);
  }

  // 5. Create master index.ts in targetDir
  const indexContent = `/**
 * ${brandName} Design System Library
 * Complete 5-Layer Cross-Platform Architecture
 */

export * from './types';

// Layer 1 & 3: Action & Input Controls
export * from './components/inputs/Button';
export * from './components/inputs/Input';
export * from './components/inputs/Switch';
export * from './components/inputs/Chip';
export * from './components/inputs/Slider';
export * from './components/inputs/Stepper';
export * from './components/inputs/SegmentedControl';

// Layer 2: Layout & Navigation Components (Desktop, Tablet, Phone)
export * from './components/layout/AdaptiveLayout';
export * from './components/layout/Sidebar';
export * from './components/layout/NavigationRail';
export * from './components/layout/BottomNavigation';
export * from './components/layout/HamburgerMenu';
export * from './components/layout/Tabs';

// Layer 4: Data Display & Content Components
export * from './components/data/KpiCard';
export * from './components/data/DataTable';
export * from './components/data/ChartContainer';
export * from './components/data/ListItem';
export * from './components/data/Badge';
export * from './components/data/Avatar';

// Layer 5: Feedback & Overlay Components
export * from './components/feedback/AdaptiveDialog';
export * from './components/feedback/Modal';
export * from './components/feedback/BottomSheet';
export * from './components/feedback/Snackbar';
export * from './components/feedback/Tooltip';
export * from './components/feedback/Alert';
export * from './components/feedback/CircularProgress';

// Layer 6: Enterprise Domain Organisms (Gen AI & Dashboards)
export * from './components/genai/PromptComposer';
export * from './components/genai/StreamingMessage';
export * from './components/genai/ReasoningAccordion';
export * from './components/genai/SuggestionDiffViewer';
`;
  fs.writeFileSync(path.join(targetDir, 'index.ts'), indexContent, 'utf8');
  console.log(`✓ Master Entry: Created ${path.join(targetDir, 'index.ts')}`);

  // 6. Install AI Agent Skill Engine
  runSkill(['install', targetDir]);

  console.log(`
══════════════════════════════════════════════════════════════════
🎉 5-Layer Enterprise Design System successfully initialized!
══════════════════════════════════════════════════════════════════
Import components anywhere in your application:
  import { AdaptiveLayout, AdaptiveDialog, DataTable, KpiCard, Button } from '${target}';

Responsive Metamorphosis Rules Active:
  • Viewport > 1024px: Persistent Sidebar (260px) + Dense Data Tables + Modals
  • Viewport 600–1024px: Navigation Rail (72px) + Scrollable Tabs
  • Viewport < 600px: Bottom Nav (64px) + Stacked Card Lists + Bottom Sheets
  • Touch Targets: 44x44px minimum for touch pointers
`);
}

function copyFolderSync(from, to) {
  if (!fs.existsSync(from)) return;
  fs.mkdirSync(to, { recursive: true });
  fs.readdirSync(from).forEach(element => {
    const stat = fs.lstatSync(path.join(from, element));
    if (stat.isFile()) {
      fs.copyFileSync(path.join(from, element), path.join(to, element));
    } else if (stat.isDirectory()) {
      copyFolderSync(path.join(from, element), path.join(to, element));
    }
  });
}

function runAdd(componentName, cmdArgs) {
  printBanner();
  if (!componentName) {
    console.error('Error: Please specify a component or group (atoms, molecules, dashboard, genai, all, button, input, badge, modal...)');
    return;
  }

  let targetDir = path.join(process.cwd(), 'src', 'components', 'ui');
  for (let i = 2; i < cmdArgs.length; i++) {
    if (cmdArgs[i] === '--target' && cmdArgs[i + 1]) {
      targetDir = path.resolve(process.cwd(), cmdArgs[i + 1]);
      i++;
    }
  }

  fs.mkdirSync(targetDir, { recursive: true });

  const compMap = {
    // Layer 1 & 3: Atoms & Action/Input Controls
    'button': ['atoms/Button.tsx'],
    'input': ['atoms/Input.tsx'],
    'badge': ['atoms/Badge.tsx'],
    'avatar': ['atoms/Avatar.tsx'],
    'switch': ['atoms/Switch.tsx'],
    'chip': ['inputs/Chip.tsx'],
    'slider': ['inputs/Slider.tsx'],
    'stepper': ['inputs/Stepper.tsx'],
    'segmented-control': ['inputs/SegmentedControl.tsx'],
    // Layer 2: Layout & Navigation Components
    'adaptive-layout': ['layout/AdaptiveLayout.tsx', 'organisms/Sidebar.tsx', 'layout/NavigationRail.tsx', 'layout/BottomNavigation.tsx', 'molecules/HamburgerMenu.tsx'],
    'sidebar': ['organisms/Sidebar.tsx'],
    'nav-rail': ['layout/NavigationRail.tsx'],
    'bottom-nav': ['layout/BottomNavigation.tsx'],
    'hamburger-menu': ['molecules/HamburgerMenu.tsx'],
    'tabs': ['molecules/Tabs.tsx'],
    // Layer 4: Data Display & Content Components
    'kpi-card': ['dashboard/KpiCard.tsx'],
    'data-table': ['dashboard/DataTable.tsx'],
    'chart': ['dashboard/ChartContainer.tsx'],
    'list-item': ['data/ListItem.tsx'],
    // Layer 5: Feedback & Overlay Components
    'adaptive-dialog': ['feedback/AdaptiveDialog.tsx', 'molecules/Modal.tsx', 'feedback/BottomSheet.tsx'],
    'modal': ['molecules/Modal.tsx'],
    'bottom-sheet': ['feedback/BottomSheet.tsx'],
    'snackbar': ['feedback/Snackbar.tsx'],
    'tooltip': ['feedback/Tooltip.tsx'],
    'alert': ['molecules/Alert.tsx'],
    'circular-progress': ['feedback/CircularProgress.tsx'],
    // Layer 6: Enterprise Domain Organisms (Gen AI & Analytics)
    'prompt-composer': ['genai/PromptComposer.tsx'],
    'streaming-message': ['genai/StreamingMessage.tsx'],
    'reasoning-accordion': ['genai/ReasoningAccordion.tsx'],
    'diff-viewer': ['genai/SuggestionDiffViewer.tsx'],
    'types': ['types/index.ts']
  };

  const groupMap = {
    'layout': ['adaptive-layout', 'sidebar', 'nav-rail', 'bottom-nav', 'hamburger-menu', 'tabs'],
    'inputs': ['button', 'input', 'switch', 'chip', 'slider', 'stepper', 'segmented-control'],
    'data': ['kpi-card', 'data-table', 'chart', 'list-item', 'badge', 'avatar'],
    'feedback': ['adaptive-dialog', 'modal', 'bottom-sheet', 'snackbar', 'tooltip', 'alert', 'circular-progress'],
    'dashboard': ['kpi-card', 'data-table', 'chart'],
    'genai': ['prompt-composer', 'streaming-message', 'reasoning-accordion', 'diff-viewer'],
    'atoms': ['button', 'input', 'badge', 'avatar', 'switch', 'chip'],
    'molecules': ['alert', 'tabs', 'modal', 'bottom-sheet', 'snackbar', 'tooltip', 'circular-progress', 'hamburger-menu'],
    'all': Object.keys(compMap)
  };

  const targetKey = componentName.toLowerCase();
  let keysToCopy = [];
  if (groupMap[targetKey]) {
    keysToCopy = groupMap[targetKey];
  } else if (compMap[targetKey]) {
    keysToCopy = [targetKey];
  }

  const toCopy = keysToCopy.map(k => compMap[k]).flat();

  if (toCopy.length === 0) {
    console.error(`Unknown component: ${componentName}.\nAvailable individual: ${Object.keys(compMap).join(', ')}\nAvailable groups: ${Object.keys(groupMap).join(', ')}`);
    return;
  }

  // Always copy types
  const typesSrc = path.join(rootDir, 'src', 'types', 'index.ts');
  const typesDest = path.join(targetDir, 'types.ts');
  if (fs.existsSync(typesSrc) && !fs.existsSync(typesDest)) {
    fs.copyFileSync(typesSrc, typesDest);
    console.log(`✓ Created Types: ${typesDest}`);
  }

  for (const relPath of toCopy) {
    const srcFile = path.join(rootDir, 'src', 'components', relPath);
    const destFile = path.join(targetDir, path.basename(relPath));
    if (fs.existsSync(srcFile)) {
      let code = fs.readFileSync(srcFile, 'utf8');
      // Normalize relative types import
      code = code.replace(/\.\.\/\.\.\/types/g, './types');
      fs.writeFileSync(destFile, code, 'utf8');
      console.log(`✓ Scaffolded component: ${destFile}`);
    }
  }

  console.log(`\n🎉 Component scaffold complete! You can import and use them immediately.`);
}

function runSpec(destPath = './design-system-spec.html', brandName = 'Enterprise', brandPrimary = '#0ea5e9') {
  printBanner();
  import('../scripts/generate-spec.mjs').then(({ generateLivingSpec }) => {
    const html = generateLivingSpec(brandName, brandPrimary);
    const outPath = path.resolve(process.cwd(), destPath);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, html, 'utf8');
    console.log(`✓ Generated Living Specification with complete Atomic Granularity:`);
    console.log(`  File: ${outPath}`);
    console.log(`  Brand: ${brandName} (${brandPrimary})`);
    console.log(`\nOpen ${destPath} in any browser or deploy to showcase the complete design library!`);
  });
}

function runTokens(subArgs) {
  const action = subArgs[0] || 'list';
  const primitivesPath = path.join(rootDir, 'tokens', 'primitives.json');
  const prim = JSON.parse(fs.readFileSync(primitivesPath, 'utf8'));

  if (action === 'get') {
    const key = subArgs[1];
    if (!key) {
      console.log('Usage: tokens get <path.to.token>');
      return;
    }
    const parts = key.split('.');
    let curr = prim;
    for (const p of parts) {
      curr = curr?.[p];
    }
    console.log(`Token [${key}]:`, JSON.stringify(curr?.$value || curr, null, 2));
  } else if (action === 'set') {
    const key = subArgs[1];
    const val = subArgs[2];
    if (!key || !val) {
      console.log('Usage: tokens set <path.to.token> <value>');
      return;
    }
    const parts = key.split('.');
    let curr = prim;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!curr[parts[i]]) curr[parts[i]] = {};
      curr = curr[parts[i]];
    }
    curr[parts[parts.length - 1]] = { $value: val, $type: 'color' };
    fs.writeFileSync(primitivesPath, JSON.stringify(prim, null, 2), 'utf8');
    console.log(`✓ Updated token: ${key} = ${val}`);
    console.log('Recompiling token distribution...');
    import('../scripts/build-tokens.mjs');
  } else {
    console.log('Available token categories:', Object.keys(prim).join(', '));
  }
}


function runMap(target = './src') {
  printBanner();
  import('../scripts/component-gap-scanner.mjs').then(({ scanAndMapComponents }) => {
    const res = scanAndMapComponents(target);
    if (!res) return;

    const iconCount = (res.icons || []).length;
    const primitiveCount = (res.primitives || []).length;
    const organismCount = (res.organisms || []).length;
    const coveredCount = (res.covered || []).length;
    const gapCount = (res.gaps || []).length;

    console.log(`📊 Component Mapping & Gap Analysis Summary:`);
    console.log(`- Total Unique Components Identified: ${res.totalScanned}`);
    console.log(`- Directly Replaceable (Master Catalog & M3 Aliases): ${coveredCount}`);
    console.log(`- Standard Lucide Icons (100% Compliant): ${iconCount}`);
    console.log(`- Headless / Radix Subcomponents (Collapse into Primitives): ${primitiveCount}`);
    console.log(`- App Shell & Domain Organisms (Compose with System Layouts): ${organismCount}`);
    console.log(`- True Custom Domain Gaps: ${gapCount}\n`);

    if (coveredCount > 0) {
      console.log(`✅ MATCHED COMPONENTS (Directly Replaceable):`);
      console.table(res.covered.map(c => ({
        'Component': c.name,
        'Occurrences': c.count,
        'System Replacement': `<${c.systemMapping} />`,
        'Variant': c.variant,
        'Layer': c.type
      })));
    }

    if (gapCount > 0) {
      console.log(`\n⚠️  TRUE DOMAIN GAPS (Bespoke Tokens & Primitives):`);
      console.table(res.gaps.map(g => ({
        'Component': g.name,
        'Occurrences': g.count,
        'Files': g.sampleFiles.join(', '),
        'Recommended Strategy': 'Compose with <Card> + Tokens'
      })));
    }

    // Write a markdown gap analysis report
    const reportPath = path.resolve(process.cwd(), 'DESIGN_SYSTEM_GAP_REPORT.md');
    let md = '# 📋 Design System Component Gap & Mapping Report\n\n';
    md += `Generated on ${new Date().toISOString()} for target directory: ` + target + '\n\n';
    md += `Total unique components found: **${res.totalScanned}** | Directly Matched: **${coveredCount}** | Icons: **${iconCount}** | Headless Primitives: **${primitiveCount}** | Organisms/Pages: **${organismCount}** | True Gaps: **${gapCount}**\n\n`;
    
    md += '## ✅ 1. Directly Covered & Replaceable Components\n\n';
    md += '| Legacy Component | Count | System Replacement | Recommended Props / Variant | Layer |\n';
    md += '| :--- | :--- | :--- | :--- | :--- |\n';
    res.covered.forEach(c => {
      md += '| `' + c.name + '` | ' + c.count + ' | `<' + c.systemMapping + ' />` | ' + c.variant + ' | ' + c.type + ' |\n';
    });

    if (iconCount > 0) {
      md += '\n## 🎨 2. Standardized Iconography (100% Compliant)\n\n';
      md += '| Icon Component | Count | System Status | Standard |\n';
      md += '| :--- | :--- | :--- | :--- |\n';
      res.icons.forEach(i => {
        md += '| `' + i.name + '` | ' + i.count + ' | ✅ Native Peer Dependency | ' + i.standard + ' |\n';
      });
    }

    if (primitiveCount > 0) {
      md += '\n## 🧱 3. Headless Subcomponents & Primitives (Collapse to Metamorphic)\n\n';
      md += '| Subcomponent / Primitive | Count | Sample Locations | Migration Resolution |\n';
      md += '| :--- | :--- | :--- | :--- |\n';
      res.primitives.forEach(p => {
        md += '| `' + p.name + '` | ' + p.count + ' | `' + p.sampleFiles.join(', ') + '` | ' + p.resolution + ' |\n';
      });
    }

    if (organismCount > 0) {
      md += '\n## 🏗️ 4. Application Shell & Domain Organisms (Composition Layer)\n\n';
      md += '| Organism / Screen | Count | Sample Locations | Composition Blueprint |\n';
      md += '| :--- | :--- | :--- | :--- |\n';
      res.organisms.forEach(o => {
        md += '| `' + o.name + '` | ' + o.count + ' | `' + o.sampleFiles.join(', ') + '` | ' + o.strategy + ' |\n';
      });
    }

    if (gapCount > 0) {
      md += '\n## ⚠️ 5. True Domain Gaps & Bespoke Micro-Widgets\n\n';
      md += '| Custom Component | Count | Sample Locations | Migration Recommendation |\n';
      md += '| :--- | :--- | :--- | :--- |\n';
      res.gaps.forEach(g => {
        md += '| `' + g.name + '` | ' + g.count + ' | `' + g.sampleFiles.join(', ') + '` | Compose using `<Card>`, `<AdaptiveLayout>`, and W3C design tokens |\n';
      });
    }

    fs.writeFileSync(reportPath, md, 'utf8');
    console.log(`\n📝 Detailed report written to: ${reportPath}\n`);
  });
}

function runAudit(target = '.', cmdArgs = []) {
  const fixMode = (cmdArgs || []).includes('--fix') || process.argv.includes('--fix');
  import('../skills/enterprise-design-system/scripts/audit.mjs').then(({ auditCodebase }) => {
    auditCodebase(target, fixMode);
  });
}

function runSkill(subArgs) {
  const action = subArgs[0] || 'install';
  const targetDir = subArgs[1] ? path.resolve(process.cwd(), subArgs[1]) : process.cwd();

  if (action === 'install') {
    // Install into .gemini/skills, .antigravity/skills, and .cursor/rules
    const skillSrc = path.join(rootDir, 'skills', 'enterprise-design-system', 'SKILL.md');
    if (!fs.existsSync(skillSrc)) {
      console.error('Skill source not found:', skillSrc);
      return;
    }

    const locations = [
      path.join(targetDir, '.gemini', 'skills', 'enterprise-design-system'),
      path.join(targetDir, '.antigravity', 'skills', 'enterprise-design-system'),
      path.join(targetDir, '.cursor', 'rules')
    ];

    for (const loc of locations) {
      fs.mkdirSync(loc, { recursive: true });
      if (loc.includes('.cursor')) {
        fs.copyFileSync(skillSrc, path.join(loc, 'enterprise-design-system.mdc'));
      } else {
        fs.copyFileSync(skillSrc, path.join(loc, 'SKILL.md'));
      }
      console.log(`✓ Installed AI Agent Skill: ${loc}`);
    }
    console.log('\n✨ AI Agent Skill installed! Your agent now has automated design system rules.');
  }
}

function startWebUI(port) {
  printBanner();
  const PORT = parseInt(port, 10) || 3000;
  
  const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.mjs': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml'
  };

  const server = http.createServer((req, res) => {
    // CORS headers for local development
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    let reqUrl = req.url.split('?')[0];

    // API: GET /api/customizations
    if (req.method === 'GET' && reqUrl === '/api/customizations') {
      const custFile = path.join(rootDir, 'tokens', 'component-customizations.json');
      let data = {};
      if (fs.existsSync(custFile)) {
        try {
          data = JSON.parse(fs.readFileSync(custFile, 'utf8'));
        } catch (e) {
          console.error('Error reading customizations:', e);
        }
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, customizations: data }));
      return;
    }

    // API: POST /api/save-component (also support /api/sync-component)
    if (req.method === 'POST' && (reqUrl === '/api/save-component' || reqUrl === '/api/sync-component')) {
      let body = '';
      req.on('data', chunk => { body += chunk.toString(); });
      req.on('end', () => {
        try {
          const payload = JSON.parse(body || '{}');
          const compId = payload.componentId || payload.id;
          if (!compId) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'Missing componentId in payload' }));
            return;
          }

          console.log(`\n⚡ [Sync API] Received update request for component: "${payload.name || compId}" (ID: ${compId})`);

          // 1. Save to tokens/component-customizations.json
          const custFile = path.join(rootDir, 'tokens', 'component-customizations.json');
          let currentCust = {};
          if (fs.existsSync(custFile)) {
            try { currentCust = JSON.parse(fs.readFileSync(custFile, 'utf8')); } catch (e) {}
          }
          currentCust[compId] = {
            componentId: compId,
            num: payload.num,
            name: payload.name,
            category: payload.category,
            atoms: payload.atoms || {},
            variant: payload.variant,
            props: payload.props || {},
            updatedAt: new Date().toISOString()
          };
          fs.writeFileSync(custFile, JSON.stringify(currentCust, null, 2), 'utf8');
          console.log(`  ✓ Updated persistent store: tokens/component-customizations.json`);

          // 2. Export / update TypeScript companion file: src/components/customizations.ts
          const tsCustomizationsPath = path.join(rootDir, 'src', 'components', 'customizations.ts');
          const tsContent = `/**
 * Auto-generated by Figma Canvas Component Studio
 * Last synchronized: ${new Date().toISOString()}
 */

export interface ComponentAtomCustomization {
  componentId: string;
  num?: string;
  name?: string;
  category?: string;
  atoms: Record<string, string>;
  variant?: string;
  props?: Record<string, any>;
  updatedAt: string;
}

export const COMPONENT_ATOMIC_DEFAULTS: Record<string, ComponentAtomCustomization> = ${JSON.stringify(currentCust, null, 2)};
`;
          fs.writeFileSync(tsCustomizationsPath, tsContent, 'utf8');
          console.log(`  ✓ Updated TypeScript definitions: src/components/customizations.ts`);

          // 3. Rebuild design tokens and regenerate canvas studio
          exec('node scripts/generate-figma-canvas-studio.mjs', { cwd: rootDir }, (err1, stdout1, stderr1) => {
            if (err1) {
              console.error('  ⚠️ Canvas studio regeneration error:', err1, stderr1);
            } else {
              console.log('  ✓ Regenerated index.html and showcase/index.html with updated base components.');
            }

            exec('node scripts/build-tokens.mjs', { cwd: rootDir }, (err2, stdout2, stderr2) => {
              if (err2) {
                console.error('  ⚠️ Token build error:', err2, stderr2);
              } else {
                console.log('  ✓ Token compilation finished successfully.');
              }

              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({
                success: true,
                message: `Component "${payload.name || compId}" updated on disk and catalog rebuilt!`,
                componentId: compId,
                atoms: payload.atoms,
                timestamp: new Date().toISOString()
              }));
            });
          });
        } catch (err) {
          console.error('Sync API Error:', err);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: err.message }));
        }
      });
      return;
    }

    let filePath = path.join(rootDir, reqUrl === '/' ? 'index.html' : reqUrl);

    fs.readFile(filePath, (err, data) => {
      if (err) {
        fs.readFile(path.join(rootDir, 'index.html'), (err2, fallbackData) => {
          if (err2) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('File not found');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(fallbackData);
          }
        });
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = mimeTypes[ext] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    });
  });

  server.listen(PORT, () => {
    const url = `http://localhost:${PORT}`;
    console.log(`✨ Drag & Drop Canvas Studio running at: ${url}`);
    console.log(`Press Ctrl+C to stop the server.\n`);

    const startCmd = process.platform === 'win32' ? 'start' : process.platform === 'darwin' ? 'open' : 'xdg-open';
    exec(`${startCmd} ${url}`, (err) => {
      if (err) {
        console.log(`Please open ${url} in your browser.`);
      }
    });
  });
}

function runBuild() {
  printBanner();
  console.log('Building design tokens...');
  import('../scripts/build-tokens.mjs').then(() => {
    console.log('✓ Token compilation finished successfully.');
  }).catch((err) => {
    console.error('Build error:', err);
    process.exit(1);
  });
}

function runExport(cmdArgs) {
  printBanner();
  let targetDir = path.join(rootDir, 'exports');
  let format = 'all';

  for (let i = 1; i < cmdArgs.length; i++) {
    if (cmdArgs[i] === '--target' && cmdArgs[i + 1]) {
      targetDir = path.resolve(process.cwd(), cmdArgs[i + 1]);
      i++;
    } else if (cmdArgs[i] === '--format' && cmdArgs[i + 1]) {
      format = cmdArgs[i + 1].toLowerCase();
      i++;
    }
  }

  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

  console.log(`Exporting format: [${format}] to directory: ${targetDir}\n`);

  if (format === 'all' || format === 'figma') {
    const figmaDir = path.join(targetDir, 'figma');
    if (!fs.existsSync(figmaDir)) fs.mkdirSync(figmaDir, { recursive: true });

    const prim = JSON.parse(fs.readFileSync(path.join(rootDir, 'tokens', 'primitives.json'), 'utf8'));
    const sem = JSON.parse(fs.readFileSync(path.join(rootDir, 'tokens', 'semantic.json'), 'utf8'));

    fs.writeFileSync(
      path.join(figmaDir, 'tokens-studio.json'),
      JSON.stringify({ global: prim, semantic: sem }, null, 2),
      'utf8'
    );
    console.log(`✓ Exported Figma Tokens Studio JSON: ${path.join(figmaDir, 'tokens-studio.json')}`);

    const figmaComponentsLayout = {
      "$schema": "https://figma.com/schemas/component-tree.json",
      "name": "Enterprise Dashboard & Gen AI Component Library",
      "frames": [
        {
          "type": "FRAME",
          "name": "KpiGrid (4 Columns)",
          "layoutMode": "HORIZONTAL",
          "itemSpacing": 16,
          "components": [
            { "name": "KpiCard_Revenue", "elements": ["Header", "Metric: $4,892,150", "Delta: +14.2%", "Progress: 82%"] },
            { "name": "KpiCard_ActiveUsers_Sparkline", "elements": ["Header", "Metric: 182,400", "Sparkline: Area Bézier"] },
            { "name": "KpiCard_API_Invocations", "elements": ["Header", "Metric: 94.8M", "Sparkline: Micro Bar Series"] },
            { "name": "KpiCard_SLA_Uptime", "elements": ["Header", "Metric: 99.98%", "Sparkline: SLA Binary Ticks"] }
          ]
        },
        {
          "type": "FRAME",
          "name": "ChartSection_Revenue_Forecast",
          "layoutMode": "VERTICAL",
          "features": ["Cartesian 1px dashed grid", "Header Anomaly Spike Button", "Confidence Corridor P90"]
        },
        {
          "type": "FRAME",
          "name": "DataTable_EnterpriseAccounts",
          "layoutMode": "VERTICAL",
          "features": ["Sticky headers", "Sortable chevrons", "Mobile card-list transformation"]
        },
        {
          "type": "FRAME",
          "name": "GenAI_Conversational_Studio",
          "layoutMode": "VERTICAL",
          "components": [
            { "name": "UserMessageRow", "avatar": "UserAvatar", "bubble": "SoftSunkenBubble" },
            { "name": "AssistantResponseCard", "avatar": "BotAvatar", "features": ["Borderless Reasoning Accordion", "Citations [1], [2]", "Formula Diff Viewer"] },
            { "name": "PromptComposer", "features": ["Context Chips", "Auto-growing Textarea", "Icon-Only Send Button"] }
          ]
        }
      ]
    };

    fs.writeFileSync(
      path.join(figmaDir, 'components-layout.json'),
      JSON.stringify(figmaComponentsLayout, null, 2),
      'utf8'
    );
    console.log(`✓ Exported Figma Components & Layout JSON: ${path.join(figmaDir, 'components-layout.json')}`);
  }

  if (format === 'all' || format === 'lovable') {
    const lovableDir = path.join(targetDir, 'lovable');
    if (!fs.existsSync(lovableDir)) fs.mkdirSync(lovableDir, { recursive: true });

    const twConfig = fs.readFileSync(path.join(rootDir, 'dist', 'tailwind', 'tailwind.preset.js'), 'utf8');
    const cssVars = fs.readFileSync(path.join(rootDir, 'dist', 'css', 'design-system.css'), 'utf8');

    fs.writeFileSync(path.join(lovableDir, 'tailwind.config.js'), twConfig, 'utf8');
    fs.writeFileSync(path.join(lovableDir, 'globals.css'), cssVars, 'utf8');
    console.log(`✓ Exported Lovable Tailwind & CSS: ${lovableDir}`);
  }

  if (format === 'all' || format === 'antigravity') {
    const agyDir = path.join(targetDir, 'antigravity');
    if (!fs.existsSync(agyDir)) fs.mkdirSync(agyDir, { recursive: true });

    const agyRule = fs.readFileSync(path.join(rootDir, 'skills', 'enterprise-design-system', 'SKILL.md'), 'utf8');
    fs.writeFileSync(path.join(agyDir, 'DESIGN_SYSTEM_RULES.md'), agyRule, 'utf8');
    console.log(`✓ Exported Antigravity Rules: ${path.join(agyDir, 'DESIGN_SYSTEM_RULES.md')}`);
  }

  if (format === 'all' || format === 'css' || format === 'tailwind') {
    const codeDir = path.join(targetDir, 'code');
    if (!fs.existsSync(codeDir)) fs.mkdirSync(codeDir, { recursive: true });

    fs.copyFileSync(
      path.join(rootDir, 'dist', 'css', 'design-system.css'),
      path.join(codeDir, 'design-system.css')
    );
    fs.copyFileSync(
      path.join(rootDir, 'dist', 'tailwind', 'tailwind.preset.js'),
      path.join(codeDir, 'tailwind.preset.js')
    );
    console.log(`✓ Exported Code Assets: ${codeDir}`);
  }

  console.log(`\n🎉 All requested exports completed successfully!`);
}

async function runCatalog(subArgs) {
  const mode = subArgs[0] || 'list';
  const { ALL_112_COMPONENTS } = await import('../scripts/build-master-catalog.mjs');

  if (mode === 'json') {
    console.log(JSON.stringify(ALL_112_COMPONENTS, null, 2));
    return;
  }

  printBanner();
  if (mode === 'search') {
    const q = (subArgs[1] || '').toLowerCase();
    if (!q) {
      console.log('Usage: npx @hsb_design/design-system catalog search <query>');
      return;
    }
    const matches = ALL_112_COMPONENTS.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.cat.toLowerCase().includes(q) ||
      (c.desc && c.desc.toLowerCase().includes(q)) ||
      (c.api && c.api.toLowerCase().includes(q))
    );
    console.log(`🔎 Found ${matches.length} components matching "${q}":\n`);
    for (const m of matches) {
      console.log(`[${m.num}] ${m.name} (${m.cat})`);
      console.log(`    API:    ${m.api}`);
      console.log(`    Desc:   ${m.desc}`);
      console.log(`    Device: ${m.device}\n`);
    }
    return;
  }

  // default: list
  console.log(`📚 Enterprise Design System — All 112 Atomic Components\n`);
  const cats = {};
  for (const c of ALL_112_COMPONENTS) {
    cats[c.cat] = cats[c.cat] || [];
    cats[c.cat].push(c);
  }
  for (const [catName, items] of Object.entries(cats)) {
    console.log(`📁 ${catName} (${items.length} components)`);
    for (const item of items) {
      console.log(`   [${item.num}] ${item.name.padEnd(36)} ${item.api}`);
    }
    console.log('');
  }
  console.log(`Tip: Use 'catalog search <term>' to inspect props or 'catalog json' for AI context.`);
}

async function runTheme(subArgs) {
  printBanner();
  const action = subArgs[0] || 'help';

  const PRESETS = {
    'emerald': { primary: '#059669', secondary: '#0D9488', radius: '6px', font: 'Inter', name: 'Emerald Fintech' },
    'genai-neon': { primary: '#7C3AED', secondary: '#06B6D4', radius: '12px', font: 'Plus Jakarta Sans', name: 'GenAI Neon' },
    'enterprise-slate': { primary: '#334155', secondary: '#475569', radius: '4px', font: 'Inter', name: 'Enterprise Slate' },
    'figma-default': { primary: '#2563EB', secondary: '#8B5CF6', radius: '8px', font: 'Inter', name: 'Figma Default Blue' }
  };

  if (action === 'preset') {
    const presetKey = (subArgs[1] || '').toLowerCase();
    const config = PRESETS[presetKey];
    if (!config) {
      console.log(`Available presets: ${Object.keys(PRESETS).join(', ')}`);
      return;
    }
    console.log(`🎨 Applying Theme Preset: "${config.name}" (Primary: ${config.primary}, Radius: ${config.radius})`);
    applyThemeTokens(config.primary, config.secondary, config.radius, config.font);
    return;
  }

  if (action === 'set') {
    let primary = '#059669';
    let secondary = '#0D9488';
    let radius = '8px';
    let font = 'Inter';

    for (let i = 1; i < subArgs.length; i++) {
      if (subArgs[i] === '--primary' && subArgs[i + 1]) primary = subArgs[++i];
      else if (subArgs[i] === '--secondary' && subArgs[i + 1]) secondary = subArgs[++i];
      else if (subArgs[i] === '--radius' && subArgs[i + 1]) radius = subArgs[++i];
      else if (subArgs[i] === '--font' && subArgs[i + 1]) font = subArgs[++i];
    }

    console.log(`🎨 Applying Custom Theme Tokens: Primary ${primary}, Radius ${radius}, Font ${font}`);
    applyThemeTokens(primary, secondary, radius, font);
    return;
  }

  console.log(`Usage:
  npx @hsb_design/design-system theme preset <emerald|genai-neon|enterprise-slate|figma-default>
  npx @hsb_design/design-system theme set --primary "#059669" --radius 6px --font "Inter"
`);
}

function applyThemeTokens(primaryHex, secondaryHex, radius, font) {
  const primitivesPath = path.join(rootDir, 'tokens', 'primitives.json');
  const prim = JSON.parse(fs.readFileSync(primitivesPath, 'utf8'));

  // Calculate 50-950 ramp
  const ramp = generateHexRamp(primaryHex);
  if (!prim.color) prim.color = {};
  if (!prim.color.brand) prim.color.brand = {};
  prim.color.brand['placeholder-primary'] = {};
  for (const [step, hexVal] of Object.entries(ramp)) {
    prim.color.brand['placeholder-primary'][step] = { $value: hexVal, $type: 'color' };
  }

  if (secondaryHex) {
    const secRamp = generateHexRamp(secondaryHex);
    prim.color.brand['placeholder-secondary'] = {};
    for (const [step, hexVal] of Object.entries(secRamp)) {
      prim.color.brand['placeholder-secondary'][step] = { $value: hexVal, $type: 'color' };
    }
  }

  if (radius) {
    const radNum = parseInt(radius, 10) || 8;
    prim.geometry = prim.geometry || {};
    prim.geometry['base-radius'] = { $value: `${radNum}px`, $type: 'dimension' };
  }

  if (font) {
    if (prim.typography && prim.typography['font-family']) {
      prim.typography['font-family'].sans = { $value: font, $type: 'fontFamily' };
    }
  }

  fs.writeFileSync(primitivesPath, JSON.stringify(prim, null, 2), 'utf8');
  console.log(`✓ Updated tokens/primitives.json with new brand tokens & 50-950 color ramp.`);
  console.log(`Rebuilding distribution files (CSS variables, Tailwind preset, TypeScript)...`);
  exec('node scripts/build-tokens.mjs', { cwd: rootDir }, (err) => {
    if (err) console.error('Build error:', err);
    else console.log(`✓ Successfully regenerated dist/css, dist/tailwind, and dist/ts!`);
  });
}

function generateHexRamp(hex) {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const r = parseInt(c.substr(0, 2), 16) / 255;
  const g = parseInt(c.substr(2, 2), 16) / 255;
  const b = parseInt(c.substr(4, 2), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  const hslToHex = (h, s, l) => {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    let r, g, b;
    if (s === 0) { r = g = b = l; } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    const toHex = x => Math.round(x * 255).toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };
  return {
    '50': hslToHex(h, Math.min(1, s * 0.8), 0.96),
    '100': hslToHex(h, Math.min(1, s * 0.85), 0.91),
    '200': hslToHex(h, Math.min(1, s * 0.9), 0.82),
    '300': hslToHex(h, s, 0.71),
    '400': hslToHex(h, s, 0.58),
    '500': hex.startsWith('#') ? hex : `#${hex}`,
    '600': hslToHex(h, s, 0.44),
    '700': hslToHex(h, Math.min(1, s * 1.05), 0.35),
    '800': hslToHex(h, Math.min(1, s * 1.1), 0.26),
    '900': hslToHex(h, Math.min(1, s * 1.15), 0.18),
    '950': hslToHex(h, Math.min(1, s * 1.2), 0.11)
  };
}

function runCompose(subArgs) {
  printBanner();
  const template = subArgs[0] || 'dashboard';
  let targetFile = '';
  for (let i = 1; i < subArgs.length; i++) {
    if (subArgs[i] === '--target' && subArgs[i + 1]) {
      targetFile = path.resolve(process.cwd(), subArgs[i + 1]);
      i++;
    }
  }

  let code = '';
  if (template === 'genai' || template === 'genai-studio') {
    code = `import React, { useState } from 'react';
import {
  AdaptiveLayout,
  PromptComposer,
  StreamingMessage,
  ReasoningAccordion,
  SuggestionDiffViewer,
  Button,
  Badge
} from '@hsb_design/design-system';

export function GenAiWorkspace() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'I analyzed your enterprise churn model. Here is the suggested targeting rule rewrite:',
      reasoning: 'Evaluated historical retention curves across 14,200 high-LTV cohorts.',
      diff: {
        original: 'WHERE cohort_risk > 0.85 AND contract_end < 30',
        suggested: 'WHERE cohort_risk >= 0.70 AND (contract_end < 60 OR net_expansion_rate < 0.95)'
      }
    }
  ]);

  return (
    <AdaptiveLayout activeNav="ai">
      <div className="max-w-4xl mx-auto py-8 px-4 space-y-6">
        <div className="flex items-center justify-between border-b pb-4 border-slate-200">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Gen AI Copilot Workspace</h1>
            <p className="text-sm text-slate-500">Autonomous reasoning and policy synthesis engine</p>
          </div>
          <Badge variant="pill" status="online">Model: Gemini 2.0 Pro</Badge>
        </div>

        <div className="space-y-4 min-h-[400px]">
          {messages.map((m, idx) => (
            <div key={idx} className="space-y-3">
              <StreamingMessage content={m.content} isStreaming={false} />
              {m.reasoning && (
                <ReasoningAccordion title="Chain of Thought Execution Trace">
                  {m.reasoning}
                </ReasoningAccordion>
              )}
              {m.diff && (
                <SuggestionDiffViewer
                  title="Policy Filter Diff"
                  original={m.diff.original}
                  suggested={m.diff.suggested}
                  onAccept={() => console.log('Accepted')}
                  onReject={() => console.log('Rejected')}
                />
              )}
            </div>
          ))}
        </div>

        <div className="sticky bottom-4">
          <PromptComposer
            placeholder="Ask AI to synthesize rules or analyze metrics..."
            onSubmit={(val) => console.log('Submitted:', val)}
          />
        </div>
      </div>
    </AdaptiveLayout>
  );
}

export default GenAiWorkspace;
`;
  } else {
    // Default: 'dashboard' or 'executive-overview'
    code = `import React from 'react';
import {
  AdaptiveLayout,
  KpiCard,
  DataTable,
  Button,
  Badge,
  Alert
} from '@hsb_design/design-system';

export function ExecutiveDashboard() {
  const kpiData = [
    { title: 'Total ARR', value: '$4,892,150', delta: '+14.2%', sparkline: [40, 48, 52, 60, 68, 72, 85] },
    { title: 'Active Accounts', value: '182,400', delta: '+8.1%', sparkline: [120, 132, 140, 158, 170, 182] },
    { title: 'API Invocations', value: '94.8M', delta: '+32.4%', sparkline: [50, 62, 70, 81, 89, 94] },
    { title: 'Platform SLA', value: '99.98%', delta: '+0.02%', sparkline: [99.9, 99.92, 99.95, 99.98] }
  ];

  const tableColumns = [
    { key: 'account', label: 'Enterprise Account' },
    { key: 'tier', label: 'Tier' },
    { key: 'mrr', label: 'Monthly Run Rate', className: 'tabular-nums font-mono text-right' },
    { key: 'status', label: 'Health Status' }
  ];

  const tableRows = [
    { id: '1', account: 'Acme Global Corp', tier: 'Enterprise Plus', mrr: '$42,500', status: 'Healthy' },
    { id: '2', account: 'Starlight Biotech', tier: 'Scale Tier', mrr: '$18,200', status: 'Attention Needed' },
    { id: '3', account: 'Fintech Velocity Ltd', tier: 'Enterprise Plus', mrr: '$64,000', status: 'Healthy' }
  ];

  return (
    <AdaptiveLayout activeNav="dashboard">
      <div className="space-y-6 p-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Executive Performance Dashboard</h1>
            <p className="text-sm text-slate-500">Live multi-device telemetric performance matrix</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">Export CSV</Button>
            <Button variant="primary">Generate AI Summary</Button>
          </div>
        </div>

        <Alert variant="info" title="System Maintenance Window">
          Quarterly database re-indexing scheduled for Saturday at 02:00 UTC. Zero downtime expected.
        </Alert>

        {/* 4-Column Responsive KPI Grid (184px Standardized Rhythm) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiData.map((kpi, idx) => (
            <KpiCard
              key={idx}
              title={kpi.title}
              value={kpi.value}
              delta={kpi.delta}
              sparklineData={kpi.sparkline}
            />
          ))}
        </div>

        {/* High-Density Data Table (Degrades to thumb-friendly cards on mobile) */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-800">Top Strategic Accounts</h2>
            <Badge variant="pill">Live 30s Sync</Badge>
          </div>
          <DataTable columns={tableColumns} data={tableRows} />
        </div>
      </div>
    </AdaptiveLayout>
  );
}

export default ExecutiveDashboard;
`;
  }

  if (targetFile) {
    fs.mkdirSync(path.dirname(targetFile), { recursive: true });
    fs.writeFileSync(targetFile, code, 'utf8');
    console.log(`✓ Composed [${template}] screen assembled with 100% design system components:`);
    console.log(`  File: ${targetFile}\n`);
  } else {
    console.log(`// --- Composed Component: [${template}] ---`);
    console.log(code);
    console.log(`\nTo write directly to a file, use:`);
    console.log(`  npx @hsb_design/design-system compose ${template} --target ./src/pages/Dashboard.tsx`);
  }
}

function runSync() {
  printBanner();
  console.log('⚡ Synchronizing visual customizations from Canvas Studio to codebase...');

  const custFile = path.join(rootDir, 'tokens', 'component-customizations.json');
  let currentCust = {};
  if (fs.existsSync(custFile)) {
    try { currentCust = JSON.parse(fs.readFileSync(custFile, 'utf8')); } catch (e) {}
  }

  const compCount = Object.keys(currentCust).length;
  console.log(`✓ Read ${compCount} customized component definitions from tokens/component-customizations.json`);

  const tsCustomizationsPath = path.join(rootDir, 'src', 'components', 'customizations.ts');
  const tsContent = `/**
 * Auto-generated by Figma Canvas Component Studio
 * Last synchronized: ${new Date().toISOString()}
 */

export interface ComponentAtomCustomization {
  componentId: string;
  num?: string;
  name?: string;
  category?: string;
  atoms: Record<string, string>;
  variant?: string;
  props?: Record<string, any>;
  updatedAt: string;
}

export const COMPONENT_ATOMIC_DEFAULTS: Record<string, ComponentAtomCustomization> = ${JSON.stringify(currentCust, null, 2)};
`;
  fs.writeFileSync(tsCustomizationsPath, tsContent, 'utf8');
  console.log(`✓ Updated TypeScript source definitions: src/components/customizations.ts`);

  console.log(`Rebuilding token distributions and canvas studios...`);
  exec('node scripts/build-tokens.mjs', { cwd: rootDir }, (err1) => {
    if (err1) console.error('Token build error:', err1);
    else console.log(`✓ Compiled CSS variables, Tailwind preset, and TypeScript tokens.`);

    exec('node scripts/generate-figma-canvas-studio.mjs', { cwd: rootDir }, (err2) => {
      if (err2) console.error('Canvas regeneration error:', err2);
      else console.log(`✓ Synchronized index.html and showcase/index.html.`);
      console.log(`\n🎉 Sync complete! All visual canvas edits are now baked into the package.`);
    });
  });
}
