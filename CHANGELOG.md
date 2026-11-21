# Changelog

All notable changes to the Enterprise Design System (`@hsb_design/design-system`) are documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.5.0] - 2026-11-21

### 🚀 Highlights
A major milestone completing all 9 planned architectural phases of the Enterprise Design System with **177 automated tests passing 100% green** and zero runtime bloat. This release introduces dual ESM/CJS distribution, full TypeScript declarations, 8 foundational primitives, an Ant Design-inspired Form validation engine, enhanced high-density DataTable domain schemas, an accessible Command Palette organism, zero-runtime CVA variant engine, AST codemod migration tooling, and framework-agnostic semantic CSS tokens.

---

### ✨ Added

#### 1. Foundational Primitives (Phase 1)
- **`Card`**: Surface container supporting compound slots (`Card.Header`, `Card.Body`, `Card.Footer`), variants (`elevated`, `outlined`, `filled`), accessibility roles (`region`, `button`, `checkbox`), and token styling.
- **`Checkbox` & `RadioGroup`**: Accessible native wrappers with design token focus rings, compound slot support (`RadioGroup.Item`), and label/helperText error binding.
- **`Textarea`**: Auto-expanding multiline input (`autoExpand`, `minRows`, `maxRows`), tabular-nums character counter (`maxLength`, `showCount`), and danger validation states.
- **`Select` & `DropdownMenu`**: WAI-ARIA combobox/listbox and contextual dropdown menu with keyboard navigation (Arrow keys, Esc, Enter) and compound slots (`Select.Option`, `DropdownMenu.Trigger`, `DropdownMenu.Content`, `DropdownMenu.Item`, `DropdownMenu.Divider`).
- **`Pagination`**: Standalone enterprise pagination with sibling range truncation, ellipses (`...`), total count summary (`showTotal`), page size dropdown selector, and tabular-nums styling.
- **`Divider`**: Full-bleed and inset containment separators with customizable indentation (`insetSize`), vertical orientation (`alignSelf: 'stretch'`), embedded chips slot (`eds-divider--with-children`), and decorative WAI-ARIA accessibility.
- **`Skeleton`**: Loading placeholder with pulse, wave, and shimmer animations, shapes (`text`, `circular`, `rectangular`, `rounded`), and multi-line paragraph grouping with tapered end line.
- **`Accordion`**: Single and multi-item disclosure panels with `outlined`, `filled`, and `borderless` variants, action/subtitle slots, and compound anatomy (`Accordion.Item`, `Accordion.Trigger`, `Accordion.Content`).

#### 2. CVA Variant Standardization & CLI Distribution (Phase 2)
- Zero-runtime `cva` and `cx` engine in `src/core/cva.ts` with TypeScript variant inference (`VariantProps`), compound variants, boolean mapping, and class aliases.
- Pre-configured CVA variants: `buttonVariants`, `badgeVariants`, `inputVariants`, `cardVariants`, `textareaVariants`.
- CLI `npx @hsb_design/design-system add <component>` with automatic resolution of `cva.ts` and `types.ts` dependencies and deep import path rewriting.

#### 3. Automated AST Codemod Migration Engine (Phase 3)
- Deterministic zero-dependency AST transformer in `src/transforms/codemod.ts`: converts native `<button>`, `<input>`, `<textarea>`, `<select>`, `<hr>`, `<table>`, and legacy M3 aliases into `@hsb_design/design-system` primitives.
- Automated import deduplication and merge, preserving `'use client'` pragmas and code comments.
- CLI command `npx @hsb_design/design-system map <file|dir> --migrate` with `--dry-run` and `--import-source` flags.

#### 4. Interaction State Machines & Compound Slot Anatomy (Phase 4)
- Slot-based compound APIs for `AdaptiveDialog`, `Modal`, and `BottomSheet` (`.Root`, `.Trigger`, `.Backdrop`, `.Content`, `.Header`, `.Title`, `.Description`, `.Close`, `.Body`, `.Footer`, `.Handle`).
- Viewport metamorphosis state machine in `src/core/dialogStateMachine.ts`: manages responsive transitions between desktop Modal and mobile Bottom Sheet, swipe/pull-down drag gestures with upward resistance clamping, backdrop click, and Escape dismissals.

#### 5. Zero-JS Semantic CSS Token Bridge (Phase 5)
- Framework-agnostic CSS utility classes (`.ds-btn`, `.ds-card`, `.ds-input`, `.ds-badge`) compiled into `dist/css/design-system.css`.
- Pure CSS theme selectors: `[data-theme="emerald"]`, `[data-theme="slate"]`, `[data-theme="genai-neon"]` in `dist/css/tokens.css`.

#### 6. Enterprise Domain Models (Phase 6)
- **`<Form>` Container & `useForm`**: Ant Design–style form store with rule-based validation (`required`, `min`, `max`, `pattern`, custom async `validator`), automatic two-way binding to design system controls, `aria-invalid` propagation, error feedback rendering, and lifecycle handlers (`onFinish`, `onFinishFailed`, `resetFields`).
- **Enhanced `DataTable`**: Column pinning (`fixed: 'left' | 'right'`), custom sorter comparator function (`sorter`), multi-column filter predicates (`onFilter`), CSV & JSON data export utilities (`exportTableToCsv`, `exportTableToJson`), and standalone `<Pagination />` container integration.

#### 7. Command Palette Organism (Phase 7)
- **`<CommandPalette>`**: Accessible global keyboard-driven search palette with compound slots (`.Root`, `.Input`, `.List`, `.Group`, `.Item`, `.Shortcut`, `.Empty`), fuzzy search filtering, active selection index, custom `kbd` shortcut token styling, and WAI-ARIA dialog/listbox accessibility.

#### 8. Production Distribution & Packaging (Phase 8)
- Zero-bloat build packaging script in `scripts/build-package.mjs`.
- Generated dual ESM (`dist/esm/index.js`), CJS (`dist/cjs/index.cjs`), and DTS declarations (`dist/types/index.d.ts`).
- Granular export map in `package.json` covering `.`, `./css`, `./tokens`, `./cva`, and `./transforms`.

#### 9. Interactive Showcase UI Gallery (Phase 9)
- Interactive visual test harness in `index.html` and `showcase/index.html`.
- Live component playgrounds for primitives, Form validation playground (`#demo-form`), CommandPalette interactive runner (`#demo-command-palette`), and Zero-JS theme switcher with live CSS variable inspector.

---

### 🔧 Build & Quality Assurance
- 177 / 177 automated tests passing green across 24 test suites (`npm test`).
- Zero external runtime npm dependencies.
- W3C DTCG Token compliant.
