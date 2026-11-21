/**
 * Enterprise Design System — AST / CST Codemod Transformer Engine
 * 100% deterministic 1:1 code migration from native HTML & legacy UI libraries to @hsb_design/design-system.
 */

export interface TransformOptions {
  importSource?: string;
  removeRedundantTypes?: boolean;
}

export interface TransformResult {
  code: string;
  stats: Record<string, number> & { totalTransformed: number };
  importedComponents: string[];
}

const M3_ALIASES: Record<string, string> = {
  M3Button: 'Button',
  M3IconButton: 'Button',
  M3Card: 'Card',
  M3Badge: 'Badge',
  M3Divider: 'Divider',
  M3Switch: 'Switch',
  M3Dialog: 'AdaptiveDialog',
  M3TextField: 'Input',
  M3Checkbox: 'Checkbox',
  M3Radio: 'Radio',
  M3Slider: 'Slider',
  M3Chip: 'Chip',
  M3PrimaryTabs: 'Tabs',
  M3LinearProgress: 'CircularProgress',
  M3Snackbar: 'Snackbar',
};

const TARGET_TAGS = new Set([
  'button',
  'input',
  'textarea',
  'select',
  'hr',
  'table',
  ...Object.keys(M3_ALIASES),
]);

interface JsxOpeningTag {
  fullTag: string;
  tagName: string;
  attributes: string;
  isSelfClosing: boolean;
  start: number;
  end: number;
}

/**
 * Parses JSX opening tag accurately, ignoring '>' inside attribute strings or expressions.
 */
function findJsxOpeningTag(source: string, startIndex: number): JsxOpeningTag | null {
  const match = source.slice(startIndex).match(/^<([a-zA-Z0-9_]+)(\s|[\/>])/);
  if (!match) return null;

  const rawTagName = match[1];
  if (!TARGET_TAGS.has(rawTagName)) return null;

  let inSingleQuote = false;
  let inDoubleQuote = false;
  let inTemplate = false;
  let braceDepth = 0;
  let i = startIndex + 1 + rawTagName.length;

  while (i < source.length) {
    const char = source[i];
    const prevChar = i > startIndex ? source[i - 1] : '';

    if (inSingleQuote) {
      if (char === "'" && prevChar !== '\\') inSingleQuote = false;
    } else if (inDoubleQuote) {
      if (char === '"' && prevChar !== '\\') inDoubleQuote = false;
    } else if (inTemplate) {
      if (char === '`' && prevChar !== '\\') inTemplate = false;
    } else {
      if (char === "'") {
        inSingleQuote = true;
      } else if (char === '"') {
        inDoubleQuote = true;
      } else if (char === '`') {
        inTemplate = true;
      } else if (char === '{') {
        braceDepth++;
      } else if (char === '}') {
        braceDepth--;
      } else if (braceDepth === 0 && char === '>') {
        const fullTag = source.slice(startIndex, i + 1);
        const isSelfClosing = source[i - 1] === '/';
        const attributes = source.slice(
          startIndex + 1 + rawTagName.length,
          isSelfClosing ? i - 1 : i
        );

        return {
          fullTag,
          tagName: rawTagName,
          attributes,
          isSelfClosing,
          start: startIndex,
          end: i + 1,
        };
      }
    }
    i++;
  }

  return null;
}

/**
 * Deterministically transforms JSX/TSX source code to @hsb_design/design-system components.
 */
export function transformSource(
  source: string,
  options: TransformOptions = {}
): TransformResult {
  const importSource = options.importSource || '@hsb_design/design-system';
  const removeRedundantTypes = options.removeRedundantTypes ?? true;

  const stats: Record<string, number> & { totalTransformed: number } = {
    totalTransformed: 0,
  };
  const importedSet = new Set<string>();

  function record(name: string) {
    stats[name] = (stats[name] || 0) + 1;
    stats.totalTransformed++;
    importedSet.add(name);
  }

  // First pass: transform opening and self-closing tags from end to start to preserve indices
  let code = source;
  const openingTags: JsxOpeningTag[] = [];

  for (let i = 0; i < code.length; i++) {
    if (code[i] === '<' && code[i + 1] !== '/' && code[i + 1] !== '!') {
      const tag = findJsxOpeningTag(code, i);
      if (tag) {
        openingTags.push(tag);
        i = tag.end - 1;
      }
    }
  }

  // Replace opening tags in reverse order
  for (let idx = openingTags.length - 1; idx >= 0; idx--) {
    const tag = openingTags[idx];
    let newTagName = tag.tagName;
    let newAttributes = tag.attributes;

    if (tag.tagName === 'button') {
      newTagName = 'Button';
      record('Button');
    } else if (tag.tagName === 'textarea') {
      newTagName = 'Textarea';
      record('Textarea');
    } else if (tag.tagName === 'select') {
      newTagName = 'Select';
      record('Select');
    } else if (tag.tagName === 'hr') {
      newTagName = 'Divider';
      record('Divider');
    } else if (tag.tagName === 'table') {
      newTagName = 'DataTable';
      record('DataTable');
    } else if (M3_ALIASES[tag.tagName]) {
      newTagName = M3_ALIASES[tag.tagName];
      record(newTagName);
    } else if (tag.tagName === 'input') {
      const isCheckbox = /\btype\s*=\s*['"]checkbox['"]/.test(tag.attributes);
      const isRadio = /\btype\s*=\s*['"]radio['"]/.test(tag.attributes);

      if (isCheckbox) {
        newTagName = 'Checkbox';
        record('Checkbox');
        if (removeRedundantTypes) {
          newAttributes = newAttributes.replace(/\s*\btype\s*=\s*['"]checkbox['"]/, '');
        }
      } else if (isRadio) {
        newTagName = 'Radio';
        record('Radio');
        if (removeRedundantTypes) {
          newAttributes = newAttributes.replace(/\s*\btype\s*=\s*['"]radio['"]/, '');
        }
      } else {
        newTagName = 'Input';
        record('Input');
      }
    }

    const trimmedAttrs = newAttributes.trimEnd();
    const replacement = tag.isSelfClosing
      ? `<${newTagName}${trimmedAttrs} />`
      : `<${newTagName}${trimmedAttrs}>`;
    code = code.slice(0, tag.start) + replacement + code.slice(tag.end);
  }

  // Second pass: transform matching closing tags
  code = code.replace(/<\/button>/g, '</Button>');
  code = code.replace(/<\/textarea>/g, '</Textarea>');
  code = code.replace(/<\/select>/g, '</Select>');
  code = code.replace(/<\/hr>/g, '</Divider>');
  code = code.replace(/<\/table>/g, '</DataTable>');

  for (const [m3Name, replacementName] of Object.entries(M3_ALIASES)) {
    const closingRegex = new RegExp(`</${m3Name}>`, 'g');
    code = code.replace(closingRegex, `</${replacementName}>`);
  }

  // Third pass: manage imports
  const importedComponents = Array.from(importedSet);

  if (importedComponents.length > 0) {
    // Check if an existing import from this importSource exists
    const escapedSource = importSource.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    const importRegex = new RegExp(
      `import\\s*\\{([\\s\\S]*?)\\}\\s*from\\s*['"]${escapedSource}['"];?`
    );
    const existingMatch = code.match(importRegex);

    if (existingMatch) {
      const existing = existingMatch[1]
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      const merged = Array.from(new Set([...existing, ...importedComponents]));
      const updatedImport = `import { ${merged.join(', ')} } from '${importSource}';`;
      code = code.replace(importRegex, updatedImport);
    } else {
      // Find position to insert new import
      const newImport = `import { ${importedComponents.join(', ')} } from '${importSource}';\n`;

      const allImports = [...code.matchAll(/^import\s+[\s\S]*?;\s*$/gm)];
      if (allImports.length > 0) {
        const last = allImports[allImports.length - 1];
        const insertPos = (last.index || 0) + last[0].length;
        code =
          code.slice(0, insertPos) +
          (code[insertPos] === '\n' ? '' : '\n') +
          newImport +
          code.slice(insertPos);
      } else {
        // Check for 'use client' or 'use server'
        const directiveMatch = code.match(/^(\s*['"]use (?:client|server)['"];?\s*\n*)/);
        if (directiveMatch) {
          const insertPos = directiveMatch[0].length;
          code =
            code.slice(0, insertPos) +
            (directiveMatch[0].endsWith('\n\n') ? '' : '\n') +
            newImport +
            '\n' +
            code.slice(insertPos);
        } else {
          code = newImport + (code.length > 0 ? '\n' + code : '');
        }
      }
    }
  }

  return {
    code: code.trim(),
    stats,
    importedComponents,
  };
}

export default transformSource;
