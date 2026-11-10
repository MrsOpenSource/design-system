---
name: enterprise-design-system
description: "Adaptive enterprise design system & Senior UX Architect engine for @hsb_design/design-system. Automatically senses project frameworks, injects CSS adaptively, enforces full 4-layer dashboard hierarchies with 184px KPI sparklines, applies human-in-the-loop AI patterns, and prevents unstyled style drift across Figma Make, Cursor, and Next.js."
---

# Enterprise Design System & Senior UX Architect Engine

This skill equips AI coding agents (**Antigravity**, **Cursor**, **Claude Code**, **Gemini / Figma Make**, **Copilot**) with the behavioral intelligence of a **Senior Enterprise UX Architect & AI Workspace Specialist**. 

It eliminates amateur "happy-path only" code generation, adaptively configures CSS tokens for any framework (Vite, Next.js, Figma Make), strictly forbids unsolicited or lazy component truncations, and ensures every screen adheres to world-class cognitive hierarchy, Fitts's Law ergonomics, and WCAG 2.2 AAA accessibility standards.

---

## 🚨 1. Golden Invariant: ZERO Unsolicited Component Additions

> [!IMPORTANT]
> **Strict Prohibition**: The AI agent MUST NEVER inject unrequested charts, sparklines, or boilerplate unless the user explicitly requests a dashboard or telemetry screen.
> - If the user asks to migrate buttons, touch **only** buttons.
> - If the user is building a form, do **not** inject KPI cards.
> - When a dashboard or analytics screen IS requested, the agent MUST deliver the **Complete Dashboard Quartet** (see Section 4) and is strictly forbidden from lazily omitting the KPI cards or app shell.

---

## 🌐 2. Environment-Adaptive CSS & Framework Intelligence

Before authoring any component, the AI agent MUST adaptively inspect the project structure to place the global design system tokens stylesheet in the exact framework-compliant entry file:

| Framework Detected | File Inspection | Mandatory CSS Import Location |
| :--- | :--- | :--- |
| **Vite / Figma Make / CRA** | `vite.config.*`, `index.html` | Put at the top of `src/main.tsx` or `src/App.tsx`: <br/>`import '@hsb_design/design-system/dist/css/design-system.css';` |
| **Next.js (App Router)** | `app/layout.tsx` | Put inside `app/layout.tsx` (the ONLY valid SSR location): <br/>`import '@hsb_design/design-system/dist/css/design-system.css';` |
| **Next.js (Pages Router)** | `pages/_app.tsx` | Put inside `pages/_app.tsx`: <br/>`import '@hsb_design/design-system/dist/css/design-system.css';` |
| **Tailwind Projects** | `tailwind.config.*` | Add preset: `presets: [require('@hsb_design/design-system/dist/tailwind/tailwind.preset.js')]` |

> [!CAUTION]
> **Zero-Unstyled Invariant**: Never output a component screen without ensuring `design-system.css` is imported in the active root entry file. Without this import, design tokens, fonts, and responsive media queries will fail.

---

## 🧠 3. Senior UX Architect Heuristics & Cognitive Hierarchy

When designing or assembling any enterprise screen, the agent MUST apply these 6 senior UX principles:

### A. The "Glance-to-Detail" Cognitive Hierarchy (3-Second Rule)
1. **Top 30% of Viewport**: Must answer: *"Is the platform healthy, and does anything need immediate attention?"*
2. **Proactive Anomaly Pinpointing**: If an SLA is breached or latency spikes, elevate an **Anomaly Alert Banner** with an immediate action button (*"Investigate Cluster"*), rather than forcing the user to hunt through hundreds of table rows.
3. **Density Progression**:
   `Hero / Anomaly Alert` $\rightarrow$ `Executive KPIs (Glance)` $\rightarrow$ `Trend Corridors & Sparklines (Scan)` $\rightarrow$ `Granular Data Table (Deep Dive)`.

### B. The 4 Essential UX States (Beyond the Happy Path)
Never generate only the happy path:
1. **Loading State**: Provide 184px shimmer skeletons matching the exact KPI card geometry (zero Cumulative Layout Shift / CLS).
2. **Zero-Data / Empty State**: When a table or search returns 0 items, render an illustrated, actionable empty card:
   *`"No enterprise accounts found in us-west-2" + [ Clear Filters Button ]`* — never render a broken, empty border.
3. **Partial / Degraded State**: Failed telemetry widgets must provide an inline retry trigger without crashing sibling cards.
4. **Error State**: Explicit error boundary with copyable error trace and support links.

### C. Human-in-the-Loop Gen AI UX Patterns
When integrating AI capabilities, apply enterprise trust guardrails:
1. **Grounding & Provenance**: Every AI-synthesized insight MUST include interactive citation pills (`[1]`, `[2]`) with confidence scores (e.g., *98% confidence from Q3 Telemetry*).
2. **Inspectable Reasoning**: Chain-of-thought traces must be placed in a borderless disclosure (`<ReasoningAccordion>`) so users can audit the AI's logic without visual clutter.
3. **Reversible Actions (Diff Acceptance)**: When AI suggests code, rules, or state updates, NEVER apply them automatically. Always present a `<SuggestionDiffViewer>` with **Accept** and **Reject** buttons.
4. **Token Budget Awareness**: Always show token usage meters inside prompt composers.

### D. Viewport Ergonomics & Fitts's Law (Multi-Device Metamorphosis)
1. **Desktop (>1024px)**: 32px dense table rows, hover tooltips, sticky headers, `⌘K` keyboard accelerator palette.
2. **Tablet (600–1024px)**: Touch-optimized 44px minimum targets. Collapse the 260px persistent sidebar into a **72px vertical Navigation Rail** to preserve horizontal canvas width for metrics.
3. **Mobile (<600px)**: 
   - Centered modals MUST metamorphose into **Bottom Sheets** with touch drag handles.
   - Primary action buttons MUST be anchored in the **bottom thumb reach zone**.
   - Multi-column tables MUST degrade into thumb-friendly stacked card lists.

### E. Data Visualization Hygiene
1. **Non-Color Reliance (WCAG AAA)**: Positive/negative metrics must NEVER rely on color alone. Always pair green/red with directional arrows (`▲ +14.2%` vs `▼ -3.8%`) and screen-reader `aria-label`.
2. **Tabular Numerals**: Apply `tabular-nums font-mono` to all currencies, latencies, and counts so numbers never jitter or jump during live streaming.
3. **Sparkline Context**: Sparklines must always include a baseline footer (e.g. *"Peak: 24,190 DAU"* or *"82.9% of quarterly goal"*).

### F. Workspace & Auto-Layout Fluency (Figma Make, Cursor, v0)
1. Always apply `min-w-0 flex-1` on text containers to allow clean ellipsis truncation.
2. Always apply `shrink-0` on badges, status pills, and avatars to prevent layout crushing.
3. When authoring `<DataTable>` in desktop views, explicitly pass `mobileCardTransform={false}` to prevent duplicate text rendering.

---

## 🏛️ 4. The Complete Dashboard Quartet (Anti-Laziness Invariant)

Whenever a user prompts for an *"executive dashboard"*, *"analytics screen"*, or *"telemetry overview"*, the agent is strictly prohibited from generating a bare table. It MUST assemble all 4 core layers:

```tsx
import React from 'react';
// 1. Mandatory CSS tokens
import '@hsb_design/design-system/dist/css/design-system.css';
import {
  AdaptiveLayout,
  KpiCard,
  DataTable,
  Button,
  Badge,
  Alert
} from '@hsb_design/design-system';

export function ExecutiveDashboard() {
  return (
    // Layer 1: App Shell with Persistent Sidebar
    <AdaptiveLayout activeNav="overview">
      <div className="p-6 max-w-7xl mx-auto space-y-6 font-sans">
        
        {/* Layer 2: Executive Header with Timeframe Pills */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex justify-between items-center flex-wrap gap-4">
          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              ENTERPRISE ANALYTICS // MULTI-REGION TELEMETRY
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
              Global Operational Intelligence & Performance Pulse
            </h1>
            <p className="text-sm text-slate-500">
              Real-time multi-tenant telemetry tracking across 14 edge availability zones.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-slate-100 p-1 rounded-lg text-xs font-semibold">
              <span className="bg-white px-3 py-1 rounded shadow-sm text-slate-900">30D</span>
              <span className="px-3 py-1 text-slate-500">Q4</span>
            </div>
            <Button variant="outline">Export CSV</Button>
          </div>
        </div>

        {/* Proactive Anomaly Banner */}
        <Alert variant="info" title="AI Grounded Synthesis">
          Net gross margin accelerated by +14.2% over the trailing period. Zero P99 SLA breaches recorded.
        </Alert>

        {/* Layer 3: 4-Column Metric Rhythm (184px Height + Sparklines) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            title="TOTAL NET REVENUE"
            value="$4,892,150.00"
            delta="▲ +14.2% vs last quarter"
            sparklineData={[40, 48, 55, 62, 70, 78, 85]}
          />
          <KpiCard
            title="ACTIVE USERS (DAU)"
            value="182,400"
            delta="▲ +6.8% 30-day velocity"
            sparklineData={[120, 135, 142, 158, 168, 182]}
          />
          <KpiCard
            title="API INVOCATIONS (24H)"
            value="94.8M req"
            delta="▼ -1.2% P99: 18ms latency"
            sparklineData={[65, 72, 80, 88, 92, 94]}
          />
          <KpiCard
            title="SYSTEM SLA (UPTIME)"
            value="99.98%"
            delta="■ 0 Breaches 30 consecutive days"
            sparklineData={[99.9, 99.92, 99.95, 99.98]}
          />
        </div>

        {/* Layer 4: High-Density Data Table */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <DataTable
            columns={tableColumns}
            data={tableRows}
            mobileCardTransform={false} // Prevents desktop duplication
          />
        </div>

      </div>
    </AdaptiveLayout>
  );
}
```

---

## ⚡ 5. Autonomous CLI Command Suite

The agent can call these CLI tools autonomously:

| Command | Purpose |
| :--- | :--- |
| `npx @hsb_design/design-system catalog search <query>` | Search all 112 components, props & import syntax |
| `npx @hsb_design/design-system compose <template> --target <file>` | Assembles production React screen from library |
| `npx @hsb_design/design-system theme preset <preset>` | Instant brand reskin (`emerald`, `genai-neon`, `slate`) |
| `npx @hsb_design/design-system theme set --primary <hex>` | Custom brand token mutation (rebuilds 50-950 ramp) |
| `npx @hsb_design/design-system audit [dir] --fix` | Scan & automatically patch hardcoded hex & tabular-nums |
| `npx @hsb_design/design-system sync` | Bake visual canvas edits from JSON to source code |

---

## 🔍 6. Mandatory Post-Generation Self-Audit Checklist

Before finishing any response or concluding a task, the AI agent MUST internally verify this 5-point checklist:
- [ ] **CSS Verified**: Is `import '@hsb_design/design-system/dist/css/design-system.css';` present in the active root entry file?
- [ ] **Quartet Complete**: If a dashboard was requested, are all 4 layers present (Shell + Header + 4 KPI Cards + Table)?
- [ ] **Table Defensive**: Is `mobileCardTransform={false}` set on desktop data tables to prevent duplicate card rendering?
- [ ] **Tabular Numerals**: Do all financial, percentage, and latency spans have `tabular-nums font-mono` and directional icons (`▲`/`▼`)?
- [ ] **Surface & Token Purity**: Are card backgrounds crisp white (`#FFFFFF`) with subtle border tokens (`#E2E8F0`) and zero arbitrary unapproved Tailwind radiuses?

If any check fails, the agent MUST self-correct the code **before** presenting the final solution to the user.
