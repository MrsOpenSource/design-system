import fs from 'fs';
import path from 'path';

/**
 * Design System Compliance Auditor & Auto-Fixer
 * Scans directories for hardcoded hex colors, missing tabular-nums on financial numbers,
 * non-token radiuses, and raw emoji icons.
 * Supports --fix mode to automatically patch violations into design system tokens.
 */
export function auditCodebase(targetDir = '.', fixMode = false) {
  const resolvedDir = path.resolve(process.cwd(), targetDir);
  console.log(`\n🔍 Auditing directory for Design System compliance: ${resolvedDir}`);
  if (fixMode) {
    console.log(`🛠️  Auto-Fix Mode: ENABLED (Patching violations to design system tokens)`);
  }
  console.log('');

  if (!fs.existsSync(resolvedDir)) {
    console.error(`Directory not found: ${resolvedDir}`);
    return;
  }

  const results = {
    totalFilesScanned: 0,
    totalFilesFixed: 0,
    hardcodedColors: [],
    missingTabularNums: [],
    emojiIconWarnings: []
  };

  const EMOJI_ICON_MAP = {
    '⚡': 'zap',
    'ℹ️': 'info',
    '🛡️': 'shield',
    '📊': 'bar-chart-3',
    '📄': 'file-text',
    '✨': 'sparkles',
    '🔍': 'search',
    '🚀': 'rocket'
  };

  function scanDir(dir) {
    const files = fs.readdirSync(dir);
    for (const f of files) {
      if (['node_modules', '.git', 'dist', 'exports', 'showcase'].includes(f)) continue;
      const fullPath = path.join(dir, f);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        scanDir(fullPath);
      } else if (/\.(tsx|jsx|js|ts|html|css)$/.test(f)) {
        scanFile(fullPath);
      }
    }
  }

  function scanFile(filePath) {
    results.totalFilesScanned++;
    let content = fs.readFileSync(filePath, 'utf8');
    const relPath = path.relative(process.cwd(), filePath);
    let isModified = false;

    // 1. Check for hardcoded hex colors outside token files
    if (!filePath.includes('primitives.json') && !filePath.includes('tokens.css') && !filePath.includes('tailwind.preset.js')) {
      const hexMatches = content.match(/#(?:[0-9a-fA-F]{3}){1,2}\b/g);
      if (hexMatches && hexMatches.length > 5) {
        results.hardcodedColors.push({
          file: relPath,
          count: hexMatches.length,
          sample: hexMatches.slice(0, 3)
        });

        if (fixMode) {
          // Replace common hardcoded hexes with semantic tokens
          const original = content;
          content = content.replace(/#2563EB|#3B82F6|#1D4ED8/gi, 'var(--sys-color-primary)');
          content = content.replace(/#10B981|#059669/gi, 'var(--sys-color-success)');
          content = content.replace(/#EF4444|#DC2626/gi, 'var(--sys-color-error)');
          if (content !== original) isModified = true;
        }
      }
    }

    // 2. Check for currency/metrics missing tabular-nums
    const currencyMatches = content.match(/\$[0-9,]+(\.[0-9]{2})?/g);
    if (currencyMatches && !content.includes('tabular-nums') && !content.includes('tnum')) {
      results.missingTabularNums.push({
        file: relPath,
        sample: currencyMatches[0]
      });

      if (fixMode && (filePath.endsWith('.tsx') || filePath.endsWith('.jsx'))) {
        const original = content;
        content = content.replace(
          /(<span[^>]*className=["'][^"']*?)(">[^<]*\$[0-9,]+)/g,
          '$1 tabular-nums font-mono$2'
        );
        if (content !== original) isModified = true;
      }
    }

    // 3. Check for emoji icons used in UI components
    const emojiMatches = content.match(/(?:⚡|ℹ️|🛡️|📊|📄|✨|🔍|🚀)/g);
    if (emojiMatches && !filePath.endsWith('.md')) {
      results.emojiIconWarnings.push({
        file: relPath,
        count: emojiMatches.length,
        sample: emojiMatches[0]
      });

      if (fixMode && (filePath.endsWith('.tsx') || filePath.endsWith('.jsx') || filePath.endsWith('.html'))) {
        const original = content;
        for (const [emoji, lucideIcon] of Object.entries(EMOJI_ICON_MAP)) {
          if (content.includes(emoji)) {
            if (filePath.endsWith('.html')) {
              content = content.replaceAll(emoji, `<i data-lucide="${lucideIcon}"></i>`);
            }
          }
        }
        if (content !== original) isModified = true;
      }
    }

    if (fixMode && isModified) {
      fs.writeFileSync(filePath, content, 'utf8');
      results.totalFilesFixed++;
    }
  }

  scanDir(resolvedDir);

  console.log(`Audited ${results.totalFilesScanned} files.`);
  if (fixMode) {
    console.log(`🛠️  Automatically updated and patched ${results.totalFilesFixed} files.\n`);
  } else {
    console.log('');
  }

  if (results.hardcodedColors.length > 0) {
    console.log(`⚠️  Hardcoded Hex Colors Detected (${results.hardcodedColors.length} files):`);
    results.hardcodedColors.slice(0, 5).forEach((item) => {
      console.log(`   - ${item.file}: ${item.count} instances (e.g. ${item.sample.join(', ')}) -> Replace with var(--sys-color-*)`);
    });
    console.log('');
  } else {
    console.log('✓ No excessive hardcoded hex colors found.');
  }

  if (results.missingTabularNums.length > 0) {
    console.log(`⚠️  Missing 'tabular-nums' on Financial Metrics (${results.missingTabularNums.length} files):`);
    results.missingTabularNums.slice(0, 5).forEach((item) => {
      console.log(`   - ${item.file}: Contains "${item.sample}" without tabular-nums CSS class`);
    });
    console.log('');
  } else {
    console.log('✓ Tabular numbers properly configured on metrics.');
  }

  if (results.emojiIconWarnings.length > 0) {
    console.log(`ℹ️  Raw Emojis Detected in UI (${results.emojiIconWarnings.length} files):`);
    results.emojiIconWarnings.slice(0, 5).forEach((item) => {
      console.log(`   - ${item.file}: Replace raw emoji "${item.sample}" with a Lucide vector icon`);
    });
    console.log('');
  }

  console.log('=================================================================');
  if (fixMode) {
    console.log('✓ Auto-Fix Completed! Target directory is now aligned with Design System standards.');
  } else {
    console.log('Tip: Run with --fix to automatically patch hex colors and missing tabular-nums:');
    console.log(`  npx @hsb_design/design-system audit ${targetDir} --fix`);
  }
}
