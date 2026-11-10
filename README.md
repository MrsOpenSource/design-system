# Enterprise Design System Framework & Autonomous AI Engine
### Multi-Device Design Library for Enterprise Dashboards & Gen AI Applications

[![GitHub Repository](https://img.shields.io/badge/GitHub-MrsOpenSource%2Fdesign--system-181717?style=flat&logo=github)](https://github.com/MrsOpenSource/design-system)
[![npm version](https://img.shields.io/npm/v/@hsb_design/design-system.svg)](https://www.npmjs.com/package/@hsb_design/design-system)
[![Token Standard](https://img.shields.io/badge/Tokens-W3C%20DTCG-38BDF8)](https://design-tokens.github.io/community-group/format/)
[![AI Skill Engine](https://img.shields.io/badge/AI%20Agents-Antigravity%20%7C%20Cursor%20%7C%20Claude-8B5CF6)](skills/enterprise-design-system/SKILL.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> **Repository**: [https://github.com/MrsOpenSource/design-system](https://github.com/MrsOpenSource/design-system)  
> **Target Devices**: Laptop & Desktop (>1024px), Tablet (600px – 1024px), Mobile (<600px)  
> **Key Domains**: Analytical Dashboards (KPIs, Area/Bar Sparklines, High-Density Data Tables) & Generative AI Applications (Prompt Composers, Streaming Canvases, Reasoning Accordions, Suggestion Diff Viewers)  
> **Token Specification**: W3C Design Tokens Community Group (DTCG)  
> **Export Targets**: Figma (Tokens Studio & Variables), Lovable (Tailwind & CSS), Antigravity, Next.js / React / TypeScript

---

## 🧭 Choose Your Context

This design system is uniquely engineered with separate, dedicated workflows for **Designers**, **Developers**, and **AI Coding Agents**:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       ENTERPRISE DESIGN SYSTEM PLATFORM                     │
├───────────────────────────────┬─────────────────────────────────────────────┤
│ 🎨 FOR DESIGNERS              │ 💻 FOR DEVELOPERS                           │
│ • Visual Drag & Drop Studio   │ • 20+ Production React / TSX Components     │
│ • Visual Atom Editor          │ • Automated CLI (compose, theme, audit)     │
│ • 6-State Interactive Matrix  │ • W3C DTCG Token Pipeline (CSS / Tailwind)  │
│ • Figma Tokens Studio Export  │ • Polymorphic Responsive Metamorphosis      │
│ • Designer-specific AI Prompts│ • Developer-specific AI Prompts             │
├───────────────────────────────┴─────────────────────────────────────────────┤
│ 🤖 FOR AI CODING AGENTS (Antigravity, Cursor, Claude Code)                   │
│ • Built-in Skill Engine: `skills/enterprise-design-system/SKILL.md`         │
│ • Golden Invariant: ZERO Unsolicited Additions & Zero Hallucinated Styles   │
│ • Autonomous CLI tool execution: `catalog`, `compose`, `theme`, `audit`     │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🎨 For Designers: Visual Studio & Figma Workflow

### 1. The Interactive Visual Canvas (`index.html`)
The repo includes a dual-studio visual canvas for interactive inspection, atom tuning, and prototyping:
- **Run Locally**:
  ```bash
  npx @hsb_design/design-system ui
  # or double-click index.html in any browser
  ```
- **Page Studio**: Freeform X/Y placement, auto-flow layout, Figma-style rulers and guides, 8px grid snapping, 8-handle directional resizing, and responsive frames (**Desktop 1440/1120**, **Tablet 768**, **Mobile 375**).
- **Component Studio**: Dedicated canvas for all **112 components**. Visually adjust atomic sub-layers (padding, corner radius, borders, shadows, icons, typography) and preview the **6-state interactive matrix** (*Default, Hover, Active/Pressed, Focus, Disabled, Loading*).
- **1-Click Codebase Sync**: Click **Save as Base Component** to persist visual atom edits into `tokens/component-customizations.json` and bake them directly into the source code.

### 2. Multi-Platform Design Handoff
Export token distributions and layout structures for your design tools:
```bash
# Export all targets (Figma Tokens Studio, Lovable, CSS)
node bin/cli.js export

# Export specifically for Figma Tokens Studio:
node bin/cli.js export --target ./figma-export --format figma
```
Outputs:
- `exports/figma/tokens-studio.json`: Import into the Figma Tokens Studio plugin.
- `exports/figma/components-layout.json`: Standardized component frames and responsive geometry.

### 3. Designer AI Prompts (Copy & Paste to AI)

#### Prompt: Screenshot / Wireframe to Exact Component Mapping
> *"I have attached a screenshot of our legacy screen. Use the `enterprise-design-system` skill to decompose this image and map each visual element strictly to components from the 112-component catalog. Do not write arbitrary unstyled HTML. Output a mapping table showing each section, the matched component name, and the React import snippet."*

#### Prompt: Natural Language Brand Re-skin
> *"Use the `enterprise-design-system` skill to rebrand our library for a dark-mode fintech client: set primary color to emerald `#059669`, secondary to `#0D9488`, base radius to `6px`, and font to 'Inter'. Recompile the tokens and verify that all 112 components reflect the new brand tokens."*

#### Prompt: Component State Matrix Completeness Check
> *"Use the `enterprise-design-system` skill to generate the complete 6-state matrix for an Outlined Action Button: Default, Hover (elevation shadow), Pressed (scale -3%), Focused (dual ring outline), Disabled (opacity 40%), and Loading (inline spinner)."*

---

## 💻 For Developers: React, CLI & CI/CD Workflow

### 1. Installation & Scaffolding

#### Install from npm:
```bash
npm install @hsb_design/design-system
```

#### Scaffold the complete 5-layer library into any project:
```bash
npx @hsb_design/design-system init-library ./src/design-system "AcmeCorp"
```
Scaffolds:
- `tokens/`: W3C DTCG JSON tokens (primitives, semantic, responsive, components).
- `styles/`: `design-system.css` custom properties & `design-system.tailwind.js`.
- `components/`: Typed React components (Atoms, Molecules, Layout, Feedback, Data, Gen AI).
- Installs the AI Agent Skill Engine in `.antigravity/`, `.cursor/`, and `.gemini/`.

### 2. Core React Components ([`src/components/`](src/components))

```tsx
import React from 'react';
import {
  AdaptiveLayout,
  KpiCard,
  DataTable,
  Button,
  PromptComposer,
  ReasoningAccordion
} from '@hsb_design/design-system';

export function AnalyticsPage() {
  return (
    <AdaptiveLayout activeNav="analytics">
      {/* 184px Standardized Metric Rhythm */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KpiCard
          title="Total ARR"
          value="$4,892,150"
          delta="+14.2%"
          sparklineData={[40, 52, 68, 72, 85]}
        />
      </div>

      {/* Auto-degrades to thumb-friendly card list on mobile */}
      <DataTable columns={cols} data={rows} />

      {/* Gen AI Conversational Suite */}
      <PromptComposer placeholder="Ask AI to synthesize insights..." />
    </AdaptiveLayout>
  );
}
```

### 3. CLI Command Suite Reference ([`bin/cli.js`](bin/cli.js))

| Command | Usage | Description |
| :--- | :--- | :--- |
| **`compose`** | `npx @hsb_design/design-system compose dashboard --target ./src/pages/Dashboard.tsx` | Assembles a production React screen assembled 100% from design system components. |
| **`catalog`** | `npx @hsb_design/design-system catalog search sparkline` | Searches all 112 components, props, and TSX signatures. Use `catalog json` for LLM context. |
| **`theme`** | `npx @hsb_design/design-system theme preset emerald` | Applies a brand theme preset or sets custom `--primary #hex` with auto 50–950 HSL color ramp. |
| **`audit`** | `npx @hsb_design/design-system audit ./src --fix` | Scans codebase for design drift (hardcoded hex, missing `tabular-nums`) and automatically patches them. |
| **`sync`** | `npx @hsb_design/design-system sync` | Bakes visual atom edits from `tokens/component-customizations.json` into source code and tokens. |
| **`add`** | `npx @hsb_design/design-system add kpi-card --target ./src/components/ui` | Scaffolds individual components or categories (`layout`, `inputs`, `data`, `feedback`, `genai`, `all`). |
| **`map`** | `npx @hsb_design/design-system map ./src` | Scans legacy codebase and generates `DESIGN_SYSTEM_GAP_REPORT.md`. |
| **`spec`** | `npx @hsb_design/design-system spec ./public/spec.html "Acme"` | Generates living atomic HTML specification. |

### 4. Developer AI Prompts (Copy & Paste to Coding Agents)

#### Prompt: Autonomous Screen Composition
> *"Use the `enterprise-design-system` skill to create an executive analytics dashboard in `src/pages/Dashboard.tsx`. Assemble it strictly using `<AdaptiveLayout>`, `<KpiCard>`, and `<DataTable>` from `@hsb_design/design-system`. Ensure all metrics use `tabular-nums font-mono` and KPI cards use standardized 184px heights."*

#### Prompt: Automated Anti-Drift Audit & Patch
> *"Run `npx @hsb_design/design-system audit ./src --fix`. Sweep through all pages and replace any hardcoded hex colors with semantic tokens (`var(--sys-color-*)`), ensure numeric table cells have `tabular-nums`, and replace raw emojis with Lucide icons."*

#### Prompt: Non-Breaking Bridge Migration
> *"Our project has legacy component wrappers in `src/components/M3Kit.tsx`. Use Mode A (Bridge Pattern) from the `enterprise-design-system` skill to re-export them from `@hsb_design/design-system` so that existing screens work with zero breaking changes."*

---

## 🏛️ 5-Layer Polymorphic Metamorphosis

Instead of maintaining separate `/mobile` and `/desktop` codebases, components automatically adapt their geometry, touch targets, and ergonomics:

1. **Layer 1: Foundations & Tokens**: Fluid 4/8/12 column grids, 44px minimum touch targets on mobile, strict `tabular-nums` for data precision.
2. **Layer 2: Layout & Navigation (`AdaptiveLayout`)**:
   - *Desktop (>1024px)*: 260px Persistent `Sidebar`.
   - *Tablet (600–1024px)*: 72px Vertical `NavigationRail`.
   - *Mobile (<600px)*: 56px Top Header + `HamburgerMenu` + 64px `BottomNavigation` in the thumb reach zone.
3. **Layer 3: Action & Input Controls**:
   - Stacked full-width buttons on mobile $\rightarrow$ inline auto-width on desktop.
   - 44px touch targets on selection controls (`Switch`, `SegmentedControl`, `Chip`).
4. **Layer 4: Data Display & Content**:
   - `KpiCard`: Uniform 184px rhythm with 48px Bézier area and bar sparklines.
   - `DataTable`: Multi-column sorting table on desktop $\rightarrow$ auto-transforms into thumb-friendly stacked **Card Lists** on phone (<600px).
5. **Layer 5: Feedback & Overlays**:
   - `AdaptiveDialog`: Centered modal pop-up on desktop $\rightarrow$ auto-transforms into slide-up **Bottom Sheet** with drag handle on phone (<600px).
6. **Layer 6: Gen AI Application Suite**:
   - `PromptComposer`: Token meter, context attachment chips, auto-growing textarea.
   - `StreamingMessage`: Animated blinking cursor, token-by-token streaming.
   - `ReasoningAccordion`: Collapsible chain-of-thought borderless disclosure.
   - `SuggestionDiffViewer`: Inline diff comparison with 1-click Accept / Reject controls.

---

## 📚 Living Documentation Index

Detailed architectural volumes are located in [`docs/`](docs/):

1. [**Volume 1: Foundations & Token Architecture**](docs/01-foundations-tokens.md) — DTCG 3-tier hierarchy, spatial rhythm, surface tokens.
2. [**Volume 2: Responsive Architecture & Multi-Device Grids**](docs/02-responsive-grid-system.md) — 12-col, 8-col, 4-col grids, density scaling.
3. [**Volume 3: Dashboard Component Specifications**](docs/03-dashboard-components.md) — KPI cards, sparklines, Cartesian charts with anomaly corridors, virtualized tables.
4. [**Volume 4: Gen AI & AI-Integrated Components**](docs/04-genai-components.md) — Prompt composers, reasoning accordions, streaming tokens, diff viewers.
5. [**Volume 5: Accessibility Guidelines (WCAG 2.2 AAA)**](docs/05-accessibility-guidelines.md) — Contrast ratios, screen-reader live region buffering (`aria-live="polite"`).
6. [**Volume 6: Figma-to-Code Handoff**](docs/06-figma-code-handoff.md) — Variables collections, token sync pipelines.
7. [**Volume 7: Cross-Platform Metamorphosis**](docs/07-cross-platform-metamorphosis.md) — Morphing component behavior across viewports.

---

## 🚀 Git Setup & Contribution

This repository is maintained at:
**[https://github.com/MrsOpenSource/design-system](https://github.com/MrsOpenSource/design-system)**

```bash
# Clone the repository
git clone https://github.com/MrsOpenSource/design-system.git
cd design-system

# Install dependencies
npm install

# Launch the visual canvas studio
npm run ui

# Build token distributions
npm run build
```

---

## 📄 License
MIT © Enterprise Design System Team
