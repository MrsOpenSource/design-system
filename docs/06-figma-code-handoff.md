# Enterprise Design System Framework
## Volume 6: Figma-to-Code Handoff & Variable Architecture

---

### 1. Figma Variables Collection Architecture

To maintain 1:1 synchronization between Figma design files and production code, Figma Variables are organized into 4 distinct collections with multi-dimensional modes:

```
┌────────────────────────────────────────────────────────────────────────┐
│  COLLECTION 1: Primitives (No Modes)                                   │
│  - Palette Hexes (brand-500, neutral-100, ai-purple)                   │
│  - Raw Spacing (4px, 8px, 12px, 16px, 24px, 32px)                      │
│  - Radii (sm, md, lg, xl, full)                                        │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Bound to
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│  COLLECTION 2: Semantic (Modes: [Light Mode] | [Dark Mode])            │
│  - sys.color.surface.canvas, card, sunken                              │
│  - sys.color.text.primary, secondary, ai-accent                        │
│  - sys.color.border.subtle, default, focus, ai                         │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
           ┌────────────────────────┴────────────────────────┐
           ▼                                                 ▼
┌──────────────────────────────────────┐  ┌──────────────────────────────┐
│ COLLECTION 3: Viewport Modes         │  │ COLLECTION 4: Density Modes  │
│ [Laptop (1440)]|[Tablet]|[Mobile]    │  │ [Compact]|[Comfort]|[Spacious│
│ - gutter, margin, maxContainerWidth  │  │ - tableRowHeight, cellPadY   │
│ - kpiMetricSize, sparklineHeight     │  │ - buttonHeight, inputHeight  │
└──────────────────────────────────────┘  └──────────────────────────────┘
```

---

### 2. Automated Token Translation Pipeline

Tokens are maintained in the repository under `/tokens` in **W3C DTCG JSON format**. The automated build pipeline transforms these JSON files into all production target formats:

```
[ tokens/*.json ]
       │
       ▼  (Style Dictionary 4.0 Engine)
 ┌─────┴────────────────────────┬────────────────────────┐
 │                              │                        │
 ▼                              ▼                        ▼
[ tokens.css ]           [ tailwind.config.js ]    [ tokens.ts ]
CSS Custom Properties    Tailwind Theme Config     TypeScript Types
(:root, .dark, etc.)     (colors, spacing, etc.)   (Autocompletion & Docs)
```

#### 2.1 CSS Custom Properties Output Example (`tokens.css`)
```css
:root {
  /* Surface */
  --sys-color-surface-canvas: #F8FAFC;
  --sys-color-surface-card: #FFFFFF;
  --sys-color-surface-elevated: #FFFFFF;
  --sys-color-surface-sunken: #F1F5F9;
  
  /* AI Specialty */
  --sys-color-ai-accent: #7C3AED;
  --sys-color-ai-glow-subtle: 0 0 15px 2px rgba(124, 58, 237, 0.18);
  
  /* Density Defaults (Comfortable) */
  --table-row-height: 44px;
  --table-cell-padding-y: 10px;
  --table-cell-padding-x: 16px;
}

[data-theme="dark"] {
  --sys-color-surface-canvas: #0F172A;
  --sys-color-surface-card: #1E293B;
  --sys-color-surface-elevated: #1E293B;
  --sys-color-surface-sunken: #020617;
  --sys-color-text-primary: #F8FAFC;
  --sys-color-text-secondary: #94A3B8;
  --sys-color-border-subtle: #334155;
}

[data-density="compact"] {
  --table-row-height: 32px;
  --table-cell-padding-y: 4px;
  --table-cell-padding-x: 8px;
}
```

---

### 3. Front-End Component Library Architecture

For enterprise web applications (React / Next.js / TypeScript), the component library is structured as follows:

```
src/components/
├── primitives/                 # Atomic UI building blocks
│   ├── Button/
│   ├── Badge/
│   ├── Checkbox/
│   ├── Tooltip/
│   └── Input/
├── dashboard/                  # Analytic & Dashboard compounds
│   ├── KpiCard/
│   │   ├── KpiCard.tsx
│   │   ├── KpiSparkline.tsx
│   │   └── KpiDelta.tsx
│   ├── Chart/
│   │   ├── ChartContainer.tsx
│   │   ├── ChartTooltip.tsx
│   │   ├── AnomalyPinpoint.tsx
│   │   └── ForecastCorridor.tsx
│   └── DataTable/
│       ├── DataTable.tsx
│       ├── TableHeader.tsx
│       ├── TableRow.tsx
│       ├── TableCell.tsx
│       └── TablePagination.tsx
└── genai/                      # Generative AI compounds
    ├── PromptComposer/
    │   ├── PromptComposer.tsx
    │   ├── ContextChipShelf.tsx
    │   ├── SlashCommandMenu.tsx
    │   └── TokenBudgetMeter.tsx
    ├── StreamingMessage/
    │   ├── StreamingMessage.tsx
    │   ├── StreamingCursor.tsx
    │   └── MarkdownRenderer.tsx
    ├── ReasoningTrace/
    │   └── ReasoningAccordion.tsx
    ├── Grounding/
    │   ├── CitationPill.tsx
    │   └── SourceCardPopover.tsx
    └── Diff/
        └── SuggestionDiffViewer.tsx
```

---

### 4. Figma Make ("Make Designs") & Figma AI Integration

Figma's generative AI feature—**"Make Designs" (Figma Make)**—can generate complete screens directly from text prompts. By default, Figma Make outputs generic, untokenized vector rectangles. However, by connecting your published library and tokens from `@hsb_design/design-system`, you can force Figma Make to **exclusively use your 112 components and Figma Variables**.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       FIGMA MAKE ("MAKE DESIGNS") WORKFLOW                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. EXPORT TOKENS FROM CLI                                                  │
│     `npx @hsb_design/design-system export --format figma`                   │
│     └── Generates: exports/figma/tokens-studio.json                         │
│                                                                             │
│  2. IMPORT TO FIGMA VARIABLES                                               │
│     Open Figma -> Plugins -> "Tokens Studio for Figma" -> Load JSON         │
│     Click "Export to Figma Variables" -> Generates Color/Radius/Spacing     │
│                                                                             │
│  3. PUBLISH AS FIGMA TEAM LIBRARY                                           │
│     Publish file to Team Assets -> Components & Variables now available    │
│                                                                             │
│  4. PROMPT FIGMA MAKE ("MAKE DESIGNS")                                      │
│     In Figma AI modal: Select "Use assets from: [Your Team Library]"       │
│     Prompt: "Create an executive churn dashboard with 4 KPI cards & table"  │
│     └── Figma Make snaps your exact 184px KPI cards, tables & buttons!      │
│                                                                             │
│  5. FIGMA DEV MODE & CODE CONNECT                                           │
│     Developers click any component in Dev Mode ->                           │
│     Shows: `import { KpiCard } from '@hsb_design/design-system'`            │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### 4.1 Figma Make Prompt Recipes

When prompting Figma Make with your library enabled, use these high-precision recipes:

* **Executive Dashboard Prompt**:
  > *"Make an enterprise executive dashboard using our team library. Include 4 KPI metric cards across the top (ARR, Users, SLA, Invocations), a date range segmented control, and a responsive data table. Bind colors to our semantic brand variables and maintain 184px KPI height rhythm."*

* **Gen AI Copilot Workspace Prompt**:
  > *"Make an AI assistant workspace layout using our team library. Include an AdaptiveLayout app shell, a persistent sidebar, a central conversational stream with a ReasoningAccordion disclosure, an inline diff viewer, and a bottom docked PromptComposer with context chips."*

* **Multi-Device Responsive Breakpoint Frames**:
  > *"Make the mobile viewport adaptation (<600px) of our analytics screen using our team library components: collapse the persistent sidebar into a BottomNavigation bar, and transform the multi-column data table into stacked card list items."*

---

### 5. Figma Code Connect Integration

Figma Code Connect connects your Figma canvas directly to production React code in Dev Mode. 

A pre-configured Code Connect mapping file is provided at [`exports/figma/code-connect.figma.tsx`](file:///c:/Users/user/Desktop/Influencer/Design%20System/exports/figma/code-connect.figma.tsx):

```bash
# 1. Install Figma Code Connect CLI
npm install -g @figma/code-connect

# 2. Publish code connection to your Figma library file
npx figma connect publish exports/figma/code-connect.figma.tsx
```

Once published, clicking any component in Figma Dev Mode displays:
- The exact TypeScript import from `@hsb_design/design-system`.
- Live editable prop values synchronized with Figma component properties (e.g. `variant="primary"`, `dense={true}`).
- Direct links back to the component source on GitHub.

---

### 6. Code & Figma Review Checklist

Before releasing any new component or view into production:
1. **Token Compliance**: No hardcoded hex values, pixel values, or font names.
2. **Device Responsiveness**: Verified on 1440px (Laptop), 834px (Tablet), and 390px (Mobile).
3. **Density Tolerance**: Tested with `data-density="compact"` and `data-density="comfortable"` without content clipping or misaligned numbers.
4. **WCAG Contrast**: Verified contrast ratios (4.5:1 text, 3:1 graphic) using automated linters (`axe-core`).
5. **AI Guardrails**: AI-generated content has explicit provenance indicators, citation anchors, and a human-in-the-loop action bar.

