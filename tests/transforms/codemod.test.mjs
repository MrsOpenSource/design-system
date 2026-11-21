import test from 'node:test';
import assert from 'node:assert/strict';

// Import codemod transformer under test
import { transformSource } from '../../src/transforms/codemod.ts';

test('AST Transformer — Transforms native <button> to <Button>', () => {
  const source = `
import React from 'react';

export function ActionPanel() {
  return (
    <div>
      <button onClick={() => console.log('clicked')} className="primary-btn">
        Submit Order
      </button>
    </div>
  );
}
`.trim();

  const result = transformSource(source);

  assert.ok(result.code.includes('<Button onClick={() => console.log(\'clicked\')} className="primary-btn">'));
  assert.ok(result.code.includes('</Button>'));
  assert.ok(!result.code.includes('<button'));
  assert.ok(result.code.includes("import { Button } from '@hsb_design/design-system';"));
  assert.equal(result.stats.Button, 1);
});

test('AST Transformer — Transforms <input> variants (checkbox, radio, text)', () => {
  const source = `
export function Form() {
  return (
    <form>
      <input type="checkbox" checked={agree} onChange={onAgree} />
      <input type="radio" name="tier" value="enterprise" />
      <input placeholder="Enter username" value={name} onChange={onChange} />
    </form>
  );
}
`.trim();

  const result = transformSource(source);

  assert.ok(result.code.includes('<Checkbox checked={agree} onChange={onAgree} />'), 'Checkbox should be transformed');
  assert.ok(result.code.includes('<Radio name="tier" value="enterprise" />'), 'Radio should be transformed');
  assert.ok(result.code.includes('<Input placeholder="Enter username" value={name} onChange={onChange} />'), 'Input should be transformed');
  assert.ok(!result.code.includes('type="checkbox"'), 'Redundant type="checkbox" should be removed');
  assert.ok(!result.code.includes('type="radio"'), 'Redundant type="radio" should be removed');
  
  // Imports check
  assert.ok(result.code.includes('Checkbox'));
  assert.ok(result.code.includes('Radio'));
  assert.ok(result.code.includes('Input'));
  assert.equal(result.stats.Checkbox, 1);
  assert.equal(result.stats.Radio, 1);
  assert.equal(result.stats.Input, 1);
});

test('AST Transformer — Transforms <textarea>, <select>, <hr>, and <table>', () => {
  const source = `
export function ComplexView() {
  return (
    <div>
      <textarea rows={4} placeholder="Notes..." />
      <hr className="divider" />
      <select value={selected} onChange={onSelect}>
        <option value="1">Option 1</option>
      </select>
      <table className="user-table">
        <tbody><tr><td>Cell</td></tr></tbody>
      </table>
    </div>
  );
}
`.trim();

  const result = transformSource(source);

  assert.ok(result.code.includes('<Textarea rows={4} placeholder="Notes..." />'));
  assert.ok(result.code.includes('<Divider className="divider" />'));
  assert.ok(result.code.includes('<Select value={selected} onChange={onSelect}>'));
  assert.ok(result.code.includes('</Select>'));
  assert.ok(result.code.includes('<DataTable className="user-table">'));
  assert.ok(result.code.includes('</DataTable>'));
});

test('AST Transformer — Transforms M3 / Legacy component aliases', () => {
  const source = `
import React from 'react';

export function LegacyScreen() {
  return (
    <div>
      <M3Card>
        <M3Badge>Active</M3Badge>
        <M3Button variant="primary">Launch</M3Button>
        <M3Divider />
        <M3Switch checked={enabled} />
        <M3TextField placeholder="Search" />
      </M3Card>
    </div>
  );
}
`.trim();

  const result = transformSource(source);

  assert.ok(result.code.includes('<Card>'));
  assert.ok(result.code.includes('</Card>'));
  assert.ok(result.code.includes('<Badge>Active</Badge>'));
  assert.ok(result.code.includes('<Button variant="primary">Launch</Button>'));
  assert.ok(result.code.includes('<Divider />'));
  assert.ok(result.code.includes('<Switch checked={enabled} />'));
  assert.ok(result.code.includes('<Input placeholder="Search" />'));
  assert.ok(!result.code.includes('M3Card'));
  assert.ok(!result.code.includes('M3Button'));
});

test('AST Transformer — Merges with existing @hsb_design/design-system import', () => {
  const source = `
import React from 'react';
import { Card, Badge } from '@hsb_design/design-system';

export function ExistingImports() {
  return (
    <Card>
      <Badge>Test</Badge>
      <button>Click</button>
    </Card>
  );
}
`.trim();

  const result = transformSource(source);

  assert.ok(result.code.includes('<Button>Click</Button>'));
  // Should have single merged import statement
  const matches = result.code.match(/import\s+\{([^}]+)\}\s+from\s+['"]@hsb_design\/design-system['"]/g);
  assert.equal(matches?.length, 1, 'Should have exactly 1 import declaration for design-system');
  assert.ok(result.code.includes('Card'));
  assert.ok(result.code.includes('Badge'));
  assert.ok(result.code.includes('Button'));
});

test('AST Transformer — Respects custom importSource and preserves "use client"', () => {
  const source = `
'use client';

import React from 'react';

export function ClientPage() {
  return <button>Click</button>;
}
`.trim();

  const result = transformSource(source, { importSource: '@/components/ui' });

  // "use client" remains at the very top
  assert.ok(result.code.startsWith("'use client';"));
  assert.ok(result.code.includes("import { Button } from '@/components/ui';"));
  assert.ok(result.code.includes('<Button>Click</Button>'));
});

test('AST Transformer — Leaves non-JSX text and strings untouched', () => {
  const source = `
const description = "Click the button below to submit the input form in the table";
const buttonName = 'button';
export function Noop() {
  return <div>{description}</div>;
}
`.trim();

  const result = transformSource(source);

  assert.equal(result.stats.totalTransformed, 0);
  assert.ok(result.code.includes('"Click the button below to submit the input form in the table"'));
  assert.ok(result.code.includes("'button'"));
});

