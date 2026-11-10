import fs from 'fs';

let cli = fs.readFileSync('bin/cli.js', 'utf8');

// Add case 'map' and case 'gap'
if (!cli.includes("case 'map':")) {
  cli = cli.replace(
    "  case 'audit':\n    runAudit(args[1]);\n    break;",
    `  case 'audit':
    runAudit(args[1]);
    break;

  case 'map':
  case 'gap':
    runMap(args[1]);
    break;`
  );
}

// Add runMap function
if (!cli.includes('function runMap(')) {
  const runMapCode = `
function runMap(target = './src') {
  printBanner();
  import('../scripts/component-gap-scanner.mjs').then(({ scanAndMapComponents }) => {
    const res = scanAndMapComponents(target);
    if (!res) return;

    console.log(\`📊 Component Mapping & Gap Analysis Summary:\`);
    console.log(\`- Total Unique Components Identified: \${res.totalScanned}\`);
    console.log(\`- Matched to @hsb_design/design-system: \${res.covered.length}\`);
    console.log(\`- Custom / Domain Gaps: \${res.gaps.length}\\n\`);

    if (res.covered.length > 0) {
      console.log(\`✅ MATCHED COMPONENTS (Directly Replaceable):\`);
      console.table(res.covered.map(c => ({
        'Legacy Component': c.name,
        'Occurrences': c.count,
        'Design System Replacement': \`<\${c.systemMapping} />\`,
        'Variant': c.variant,
        'Layer': c.type
      })));
    }

    if (res.gaps.length > 0) {
      console.log(\`\\n⚠️  DOMAIN GAPS (Compose using Design Tokens & Primitives):\`);
      console.table(res.gaps.map(g => ({
        'Component': g.name,
        'Occurrences': g.count,
        'Files': g.sampleFiles.join(', '),
        'Recommended Strategy': 'Compose with <Card> + Tokens'
      })));
    }

    // Write a markdown gap analysis report
    const reportPath = path.resolve(process.cwd(), 'DESIGN_SYSTEM_GAP_REPORT.md');
    let md = '# 📋 Design System Component Gap & Mapping Report\\n\\n';
    md += \`Generated on \${new Date().toISOString()} for target directory: \` + target + '\\n\\n';
    md += \`Total unique components found: **\${res.totalScanned}** | Matched: **\${res.covered.length}** | Gaps: **\${res.gaps.length}**\\n\\n\`;
    
    md += '## ✅ 1. Directly Covered & Replaceable Components\\n\\n';
    md += '| Legacy Component | Count | System Replacement | Recommended Props / Variant | Layer |\\n';
    md += '| :--- | :--- | :--- | :--- | :--- |\\n';
    res.covered.forEach(c => {
      md += \`| \`\${c.name}\` | \${c.count} | \`<\${c.systemMapping} />\` | \${c.variant} | \${c.type} |\\n\`;
    });

    md += '\\n## ⚠️ 2. Domain Gaps & Custom Components\\n\\n';
    md += '| Custom Component | Count | Sample Locations | Migration Recommendation |\\n';
    md += '| :--- | :--- | :--- | :--- |\\n';
    res.gaps.forEach(g => {
      md += \`| \`\${g.name}\` | \${g.count} | \`\${g.sampleFiles.join(', ')}\` | Compose using \`<Card>\`, \`<AdaptiveLayout>\`, and W3C design tokens |\\n\`;
    });

    fs.writeFileSync(reportPath, md, 'utf8');
    console.log(\`\\n📝 Detailed report written to: \${reportPath}\\n\`);
  });
}
`;

  cli = cli.replace(
    'function runAudit(target = \'.\') {',
    runMapCode + '\nfunction runAudit(target = \'.\') {'
  );
}

// Update printHelp with map command
if (!cli.includes('map [dir]')) {
  cli = cli.replace(
    '  audit [dir]                Scan codebase for design system compliance',
    `  map [dir]                  Scan codebase, map legacy components to system, and output gap analysis
  audit [dir]                Scan codebase for design system compliance`
  );
}

fs.writeFileSync('bin/cli.js', cli, 'utf8');
console.log('✓ Updated bin/cli.js with map/gap command and markdown report generator!');

