---
name: enterprise-design-system
description: "Adaptive enterprise design system & Senior UX Architect engine for @hsb_design/design-system. Supports archetype-aware page design (Forms, Billing, CRUD, Dashboards, Gen AI) without rigid boilerplate, and executes precision 1:1 component transformations using the Plan-Debug-Replan protocol across Vite, Next.js, and Cursor."
---

# Enterprise Design System & Senior UX Architect Engine

This skill equips AI coding agents (**Antigravity**, **Cursor**, **Claude Code**, **Gemini / Figma Make**, **Copilot**) with the behavioral intelligence of a **Senior Enterprise UX Architect & AI Workspace Specialist**. 

It eliminates amateur "happy-path only" code generation, adaptively configures CSS tokens for any framework (Vite, Next.js, Figma Make), strictly forbids unsolicited or lazy component injections, and provides precision workflows for **Designing New Pages** and **1:1 Transforming Existing Pages**.

---

## 🧭 1. Operational Modes & Intent Routing

Before generating or modifying any code, the AI agent MUST categorize the request into one of three distinct operational modes:

```
                            User Request
                                 │
         ┌───────────────────────┼────────────────────────┐
         ▼                       ▼                        ▼
     [MODE 1]                 [MODE 2]                 [MODE 3]
  Design New Screen      Transform Page (1:1)     Dashboard / Telemetry
  (Archetype-Driven)    (Plan-Debug-Replan)      (Full 4-Layer Quartet)
```

---

### 🟢 MODE 1: Designing a New Screen (Archetype & Clarification-First)
*Triggered when the user asks to build, scaffold, or design a new screen from scratch.*

1. **Clarification Protocol**: If the user's prompt is high-level or ambiguous (e.g., *"build me a billing page"*), do NOT guess or inject dummy telemetry. Either:
   - Propose a clean 3-part layout blueprint and ask 2–3 concise clarifying questions.
   - Or assemble the screen strictly using the **Domain Archetype** with zero unrequested charts or KPIs.
2. **Archetype Taxonomy**: Select ONLY the components required for the specific page archetype:

| Page Archetype | Primary Components Used | Strictly FORBIDDEN Injections |
| :--- | :--- | :--- |
| **Billing & Invoices** | `Card`, `Badge`, `Button`, `Input`, `Tabs`, `CircularProgress`, `ListItem` | Unrelated telemetry KPIs (DAU, latency, API invocations), sparklines |
| **Forms & Settings** | `Input`, `Switch`, `Slider`, `SegmentedControl`, `Chip`, `Button`, `Modal` | KPI metric cards, full data tables, sparklines |
| **Record Management (CRUD)** | Header search/filter (`Input`, `Chip`), `DataTable`, `Pagination`, `AdaptiveDialog` | Fake anomaly alert banners, arbitrary metric cards |
| **Gen AI Workspace** | `PromptComposer`, `StreamingMessage`, `ReasoningAccordion`, `SuggestionDiffViewer` | Traditional static data grids, generic dashboard shells |
| **Analytics & Telemetry** | `AdaptiveLayout`, `KpiCard` (184px + sparklines), `ChartContainer`, `DataTable` | Bare unstyled HTML tables (see Mode 3) |

---

### 🟡 MODE 2: Transforming an Existing Page (1:1 Non-Destructive Migration)
*Triggered when migrating, redesigning, or refactoring an existing page, component, or project to `@hsb_design/design-system` (analogous to applying a Material UI or Tailwind theme).*

> [!CAUTION]
> **Zero-Addition Migration Invariant**: During a transformation, the agent MUST NEVER inject new components (no KPI cards, no sparklines, no unsolicited alert banners). The existing information architecture and business logic must remain 1:1.

The agent MUST follow the **Plan-Debug-Replan Protocol**:

#### Step 1: PLAN (Inventory & 1:1 Mapping)
- Scan target file/directory with `npx @hsb_design/design-system map <target>`.
- Build an explicit Component & Token Mapping Table before editing:
  - Original element (`<button>`, `<input>`, `<table>`, Tailwind classes) $\rightarrow$ `@hsb_design/design-system` equivalent.
  - Verify every prop, event handler (`onClick`, `onChange`), and state hook is preserved.

#### Step 2: DEBUG & EXECUTE (Surgical Refactor)
- Ensure entry-point CSS is imported: `import '@hsb_design/design-system/dist/css/design-system.css';`.
- Perform 1:1 replacement using library exports.
- Replace hardcoded hex colors and arbitrary margins with CSS variables (`var(--sys-color-primary)`, etc.).

#### Step 3: REPLAN & AUDIT (Automated & Manual Verification)
- Run `npx @hsb_design/design-system audit [dir] --fix` to catch residual hex codes or missing `tabular-nums`.
- Verify complete coverage:
  - Did any native HTML elements (`<button>`, `<select>`, `<input>`) get left behind?
  - Did any unrequested components creep in? If yes, remove them immediately.
  - Are all types, exports, and event handlers functioning without regression?

---

### 🔵 MODE 3: Analytics & Telemetry Dashboards (The Complete Quartet)
*Triggered ONLY when the user explicitly asks for an "executive dashboard", "telemetry monitor", or "analytics overview".*

When explicitly building an analytics dashboard, the agent is strictly prohibited from generating a bare table. It MUST assemble all 4 core layers:
1. **Layer 1: App Shell** (`AdaptiveLayout` with responsive navigation).
2. **Layer 2: Executive Header** (Timeframe selectors, scope pills, primary actions).
3. **Layer 3: 4-Column Metric Rhythm** (`KpiCard` with 184px fixed height + sparkline).
4. **Layer 4: High-Density Data Table** (`DataTable` with `mobileCardTransform={false}`).

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

When designing screens, the agent MUST apply these 6 senior UX principles tailored to the active archetype:

### A. Context-Appropriate Cognitive Hierarchy
- **For Dashboards**: `Anomaly Alert` $\rightarrow$ `Executive KPIs (Glance)` $\rightarrow$ `Trend Corridors (Scan)` $\rightarrow$ `Data Table (Deep Dive)`.
- **For Billing / Subscriptions**: `Current Plan Status & Next Bill (Glance)` $\rightarrow$ `Payment Methods & Billing Details (Manage)` $\rightarrow$ `Invoice History (Audit)`.
- **For Settings / Forms**: `Category Tabs (Orient)` $\rightarrow$ `Logical Field Sets with Help Text (Input)` $\rightarrow$ `Sticky Action Bar (Commit)`.
- **For CRUD Lists**: `Filter & Search Toolbar (Scope)` $\rightarrow$ `Dense Data Display (Review)` $\rightarrow$ `Item Drawer / Quick Actions (Operate)`.

### B. The 4 Essential UX States (Beyond the Happy Path)
Never generate only the happy path:
1. **Loading State**: Provide shimmer skeletons matching the target component geometry (zero Cumulative Layout Shift / CLS).
2. **Zero-Data / Empty State**: Render an illustrated, actionable empty card with clear action (e.g., *"No invoices found for 2026 [ Generate New Invoice ]"*). Never render a blank void or broken border.
3. **Partial / Degraded State**: Failed telemetry widgets or API integrations must provide an inline retry trigger without crashing sibling components.
4. **Error State**: Explicit error boundary with copyable trace and recovery action.

### C. Human-in-the-Loop Gen AI UX Patterns
When integrating AI capabilities, apply enterprise trust guardrails:
1. **Grounding & Provenance**: Every AI-synthesized insight MUST include citation pills (`[1]`, `[2]`) with confidence scores.
2. **Inspectable Reasoning**: Place chain-of-thought traces in `<ReasoningAccordion>` so users can audit logic without visual clutter.
3. **Reversible Actions (Diff Acceptance)**: Present code, rules, or state proposals in `<SuggestionDiffViewer>` with **Accept** and **Reject** buttons.
4. **Token Budget Awareness**: Always show token usage meters inside prompt composers.

### D. Viewport Ergonomics & Fitts's Law (Multi-Device Metamorphosis)
1. **Desktop (>1024px)**: 32px dense table rows, hover tooltips, sticky headers, `⌘K` keyboard accelerator palette.
2. **Tablet (600–1024px)**: Touch-optimized 44px minimum targets. Collapse 260px sidebar into a **72px Navigation Rail**.
3. **Mobile (<600px)**: 
   - Centered modals MUST metamorphose into **Bottom Sheets** with touch drag handles.
   - Primary action buttons MUST be anchored in the **bottom thumb reach zone**.
   - Multi-column tables MUST degrade into thumb-friendly stacked card lists (`ListItem`).

### E. Data Visualization Hygiene
1. **Non-Color Reliance (WCAG AAA)**: Positive/negative metrics must NEVER rely on color alone. Pair green/red with directional arrows (`▲ +14.2%` vs `▼ -3.8%`) and screen-reader `aria-label`.
2. **Tabular Numerals**: Apply `tabular-nums font-mono` to all currencies, dates, latencies, and counts so numbers never jitter during updates.
3. **Sparkline Context**: Sparklines must always include a baseline footer (e.g. *"Peak: 24,190 DAU"* or *"82.9% of quarterly goal"*).

### F. Workspace & Auto-Layout Fluency (Figma Make, Cursor, v0)
1. Always apply `min-w-0 flex-1` on text containers to allow clean ellipsis truncation.
2. Always apply `shrink-0` on badges, status pills, and avatars to prevent layout crushing.
3. When authoring `<DataTable>` in desktop views, explicitly pass `mobileCardTransform={false}` to prevent duplicate text rendering.

---

## 🏛️ 4. Canonical Archetype Implementations

### Archetype A: Billing & Subscription Management (Mode 1)
*Notice: Zero unrequested KPI sparklines or fake telemetry charts.*

```tsx
import React, { useState } from 'react';
import '@hsb_design/design-system/dist/css/design-system.css';
import {
  Card,
  Button,
  Badge,
  Input,
  Tabs,
  ListItem
} from '@hsb_design/design-system';

export function BillingPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Billing & Subscription</h1>
          <p className="text-sm text-slate-500">Manage plan limits, payment methods, and invoice receipts.</p>
        </div>
        <Button variant="outline">Download Tax Summary</Button>
      </div>

      {/* Plan Summary Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-slate-900">Enterprise Growth Tier</h2>
            <Badge variant="success">Active</Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">Renews automatically on Dec 1, 2026 via MasterCard ending in 4242.</p>
          <p className="text-2xl font-extrabold text-slate-900 mt-3 tabular-nums font-mono">$1,250.00 <span className="text-xs font-normal text-slate-500">/ month</span></p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">Change Plan</Button>
          <Button variant="filled">Add Seats</Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        tabs={[
          { id: 'overview', label: 'Payment Details' },
          { id: 'invoices', label: 'Invoices & Receipts' }
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {/* Tab Content */}
      {activeTab === 'overview' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-sm">
            <h3 className="text-base font-bold text-slate-900">Payment Method</h3>
            <div className="border border-slate-200 rounded-lg p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm text-slate-900">MasterCard •••• 4242</p>
                <p className="text-xs text-slate-500">Expires 08/28 • Default payment method</p>
              </div>
              <Badge variant="neutral">Default</Badge>
            </div>
            <Button variant="outline" size="sm">Update Payment Method</Button>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-sm">
            <h3 className="text-base font-bold text-slate-900">Billing Information</h3>
            <Input label="Company Name" defaultValue="Acme Global Corporation" />
            <Input label="Billing Email" defaultValue="accounting@acmeglobal.com" />
            <Button variant="filled" size="sm">Save Billing Info</Button>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm divide-y divide-slate-100">
          <ListItem
            title="Invoice #INV-2026-11"
            subtitle="Nov 1, 2026 • Enterprise Tier"
            trailing={<span className="tabular-nums font-mono font-bold">$1,250.00</span>}
          />
          <ListItem
            title="Invoice #INV-2026-10"
            subtitle="Oct 1, 2026 • Enterprise Tier"
            trailing={<span className="tabular-nums font-mono font-bold">$1,250.00</span>}
          />
        </div>
      )}
    </div>
  );
}
```

---

### Archetype B: Analytics & Telemetry Quartet (Mode 3)
*Triggered ONLY when explicitly asked for an executive dashboard or telemetry screen.*

```tsx
import React from 'react';
import '@hsb_design/design-system/dist/css/design-system.css';
import {
  AdaptiveLayout,
  KpiCard,
  DataTable,
  Button,
  Alert
} from '@hsb_design/design-system';

export function ExecutiveDashboard() {
  return (
    <AdaptiveLayout activeNav="overview">
      <div className="p-6 max-w-7xl mx-auto space-y-6 font-sans">
        
        {/* Layer 2: Header */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex justify-between items-center flex-wrap gap-4">
          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              ENTERPRISE ANALYTICS // MULTI-REGION TELEMETRY
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
              Global Operational Intelligence & Performance Pulse
            </h1>
          </div>
          <Button variant="outline">Export CSV</Button>
        </div>

        {/* Proactive Anomaly Banner */}
        <Alert variant="info" title="AI Grounded Synthesis">
          Net gross margin accelerated by +14.2% over trailing period. Zero P99 SLA breaches.
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
            mobileCardTransform={false}
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
| `npx @hsb_design/design-system map [dir]` | Scan & map existing components to design system registry (Mode 2) |
| `npx @hsb_design/design-system catalog search <query>` | Search all 112 components, props & import syntax |
| `npx @hsb_design/design-system compose <template> --target <file>` | Assembles production React screen from library |
| `npx @hsb_design/design-system theme preset <preset>` | Instant brand reskin (`emerald`, `genai-neon`, `slate`) |
| `npx @hsb_design/design-system audit [dir] --fix` | Scan & automatically patch hardcoded hex & tabular-nums |
| `npx @hsb_design/design-system sync` | Bake visual canvas edits from JSON to source code |

---

## 🔍 6. Mandatory Post-Generation Self-Audit Checklist

Before finishing any response or concluding a task, the AI agent MUST internally verify this checklist:

- [ ] **CSS Verified**: Is `import '@hsb_design/design-system/dist/css/design-system.css';` present in the active root entry file?
- [ ] **Mode Compliance**:
  - **If Mode 1 (New Page)**: Did I strictly adhere to the user's specific page archetype and avoid injecting unsolicited telemetry/KPIs?
  - **If Mode 2 (Transformation)**: Is the transformation strictly 1:1 with ZERO injected boilerplate, preserved handlers, and complete component mapping?
  - **If Mode 3 (Dashboard)**: If and only if a dashboard was explicitly requested, are all 4 layers present?
- [ ] **Table Defensive**: Is `mobileCardTransform={false}` set on desktop data tables to prevent duplicate card rendering?
- [ ] **Tabular Numerals**: Do all financial, percentage, and latency spans have `tabular-nums font-mono` and directional icons (`▲`/`▼`)?
- [ ] **Surface & Token Purity**: Are card backgrounds crisp white (`#FFFFFF`) with subtle border tokens (`#E2E8F0`) and zero arbitrary unapproved Tailwind radiuses?

If any check fails, the agent MUST self-correct the code **before** presenting the final solution to the user.