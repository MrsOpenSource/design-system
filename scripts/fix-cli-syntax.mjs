import fs from 'fs';

let cli = fs.readFileSync('bin/cli.js', 'utf8');

cli = cli.replace(
  'md += `| `${c.name}` | ${c.count} | `<${c.systemMapping} />` | ${c.variant} | ${c.type} |\\n`;',
  "md += '| `' + c.name + '` | ' + c.count + ' | `<' + c.systemMapping + ' />` | ' + c.variant + ' | ' + c.type + ' |\\n';"
);

cli = cli.replace(
  'md += `| `${g.name}` | ${g.count} | `${g.sampleFiles.join(\', \')}` | Compose using `<Card>`, `<AdaptiveLayout>`, and W3C design tokens |\\n`;',
  "md += '| `' + g.name + '` | ' + g.count + ' | `' + g.sampleFiles.join(', ') + '` | Compose using `<Card>`, `<AdaptiveLayout>`, and W3C design tokens |\\n';"
);

fs.writeFileSync('bin/cli.js', cli, 'utf8');
console.log('✓ Fixed backtick escaping in cli.js');

