---
name: enterprise-design-system
description: "Adaptive enterprise design system engine for @hsb_design/design-system. Analyzes project needs, enforces zero unsolicited component additions, automates screen composition from 112 components, and provides automated anti-drift auditing and token theming."
---

# Enterprise Design System Skill Engine

This skill equips AI coding agents (**Antigravity**, **Cursor**, **Claude Code**, **Gemini CLI**, **Copilot**) with an autonomous, token-bound workflow for `@hsb_design/design-system`. It eliminates rigid one-size-fits-all migrations, prioritizes user intent, strictly forbids unsolicited component additions, and powers token-locked UI composition.

---

## 🚨 1. Golden Invariant: ZERO Unsolicited Component Additions

> [!IMPORTANT]
> **Strict Prohibition**: The AI agent MUST NEVER add, inject, or scaffold any component, chart, sparkline, KPI card, or boilerplate unless the user specifically and explicitly requests it.
> - If the user asks to migrate buttons, touch **only** buttons.
> - If the user is building a Gen AI interface, do **not** inject telemetry charts, sparklines, or KPI cards.
> - Dashboard invariants (e.g., `184px KPI card height`, `48px sparkline slot`) apply **strictly and exclusively** when the user has explicitly requested to build a KPI card or telemetry dashboard.
> - Never assume every project is a dashboard.

---

## 🧭 2. Core Protocol: Adaptive Intake & Interactive Consultation

Every project has unique constraints, existing UI libraries, and architecture. Never enforce a rigid migration approach. Always follow this 3-step workflow:

### Step 1: Non-Invasive Project Analysis
Inspect the project to understand its current stack:
1. **Framework & Bundler**: Vite, Next.js, Remix, CRA, Webpack.
2. **Styling Engine**: Tailwind CSS, CSS Modules, Styled Components, vanilla CSS.
3. **Existing UI Libraries**: Material 3 (`M3*`), Radix UI / Shadcn, MUI, Ant Design, Chakra UI, or custom components.
4. **Icon System**: Lucide (`lucide-react`), Heroicons, FontAwesome, Radix Icons.

### Step 2: Interactive User Consultation (MANDATORY)
Before modifying any files or running commands, present the findings and **ask the user what they want to achieve**:

> "I analyzed your project and detected:
> - **Stack**: [e.g. Next.js + Tailwind CSS]
> - **Existing UI**: [e.g. Custom Material 3 wrappers in `M3Kit.tsx` + Radix dialogs]
> - **Icons**: [e.g. Lucide icons already in use]
>
> How would you like to use `@hsb_design/design-system` here?
> 1. **Adapter / Bridge Mode (Recommended for existing apps)**: Re-export or wrap existing component wrappers using `@hsb_design/design-system` with zero breaking changes across your screens.
> 2. **Token & Preset Integration**: Adopt W3C DTCG design tokens, CSS variables, and Tailwind theme without modifying existing JSX components.
> 3. **Selective Component Migration**: Migrate only specific components you designate (e.g. only Buttons, only Modals, or only Inputs).
> 4. **Visual Canvas Assembly**: Launch the Drag & Drop Canvas Studio (`npx @hsb_design/design-system ui`) to visually assemble and export components.
> 5. **Full Library Scaffolding**: Scaffold the complete 5-layer atomic library into your project (`npx @hsb_design/design-system init-library`)."

### Step 3: Execute Strictly within User-Approved Scope
Act only on the chosen mode. Never touch files outside the agreed boundary.

---

## ⚡ 3. Autonomous CLI Command Suite

When working in any project, the AI agent can execute these CLI commands directly:

| Command | Purpose | Output / Effect |
| :--- | :--- | :--- |
| `npx @hsb_design/design-system catalog search <query>` | Search all 112 components, props & import syntax | Returns component ID, props & TSX signature |
| `npx @hsb_design/design-system catalog json` | Introspect machine-readable component schema | JSON array of all 112 components for agent context |
| `npx @hsb_design/design-system compose <template> --target <file>` | Assembles production React screen from library | Generates clean TSX (`dashboard`, `genai`, `overview`) |
| `npx @hsb_design/design-system theme preset <preset>` | Instant brand reskin (`emerald`, `genai-neon`, `slate`) | Rebuilds 50-950 HSL ramp + CSS/Tailwind tokens |
| `npx @hsb_design/design-system theme set --primary <hex>` | Custom brand token mutation | Rebuilds color tokens without touching component code |
| `npx @hsb_design/design-system audit [dir] --fix` | Scan & automatically patch style drift | Replaces hardcoded hex codes, adds `tabular-nums` |
| `npx @hsb_design/design-system sync` | Bake visual canvas edits from JSON to code | Synchronizes `tokens/component-customizations.json` to source |
| `npx @hsb_design/design-system map [dir]` | Scan codebase & generate component gap report | Outputs `DESIGN_SYSTEM_GAP_REPORT.md` |
| `npx @hsb_design/design-system add <group|comp>` | Injects specific React components into project | Copies typed TSX components to `./src/components/ui` |

---

## 🎯 4. Designer Workflows & AI Prompts

Designers primarily focus on **visual consistency, theming, component state completeness, and design handoff**.

### Prompt Recipe 1: Screenshot / Wireframe to Component Mapping
> *"Here is a screenshot of our legacy screen. Use the enterprise-design-system skill to decompose this image and map each section exclusively to components in the 112 catalog. Do not generate raw unstyled divs. Output a table showing each section, the matched component ID, and the clean React TSX snippet."*

### Prompt Recipe 2: One-Click Brand Mutation
> *"Use the enterprise-design-system skill to re-theme our library for a dark-mode fintech client: set primary color to emerald `#059669`, secondary to `#0D9488`, base radius to `6px`, and font to 'Inter'. Recompile tokens and ensure all 112 components reflect this brand identity."*

### Prompt Recipe 3: Component State Matrix Generation
> *"I am designing a new billing checkout button. Use the enterprise-design-system skill to verify and output its complete 6-state matrix (Default, Hover, Active/Pressed, Focused, Disabled, Loading with spinner) using design tokens."*

---

## 💻 5. Developer Workflows & AI Prompts

Developers primarily focus on **clean imports, TypeScript contracts, responsive behavior, and automated code compliance**.

### Prompt Recipe 1: Production Screen Composition
> *"Use the enterprise-design-system skill to generate an executive analytics dashboard in `src/pages/Dashboard.tsx`. Include 4 KPI cards (ARR, Active Users, API Calls, Uptime), a date range segmented control, and a responsive data table. Adhere strictly to tabular-nums and 184px KPI card rhythm."*

### Prompt Recipe 2: Automated Anti-Drift Audit & Patch
> *"Run `npx @hsb_design/design-system audit ./src --fix` to sweep through our pages. Replace any hardcoded hex colors with `var(--sys-color-*)` tokens, wrap currency values in `tabular-nums font-mono`, and replace raw emojis with Lucide vector icons."*

### Prompt Recipe 3: Non-Breaking Adapter Migration
> *"Our project has legacy components in `src/components/M3Kit.tsx`. Use Mode A (Bridge Pattern) to re-export them from `@hsb_design/design-system` so that all existing screens continue to function without modifying their imports."*

---

## 🛡️ 6. Architectural Quality Standards

When authoring or updating components under user instruction:
1. **Numeric Metrics**: Always apply `tabular-nums` (or `font-mono`) to numbers, percentages, financial values, and latencies.
2. **Iconography**: Use Lucide icons (`lucide-react` or `<i data-lucide="..."></i>`). Never use raw emojis.
3. **Design Tokens**: Use CSS variables (`var(--sys-color-*)`, `var(--radius-*)`) or Tailwind preset utilities. Never use hardcoded hex colors (`#3B82F6`).
4. **Touch Targets**: Ensure interactive touch targets meet `44x44px` minimum on touch viewports.
5. **Responsive Invariants**:
   - `Desktop (>1024px)`: 12-col grid, persistent 260px sidebar, full data tables.
   - `Tablet (600–1024px)`: 8-col grid, 72px navigation rail.
   - `Mobile (<600px)`: 4-col grid, bottom navigation, card-list degradation.
