# Design System Governance & TDD Memory Protocol

## 🎯 Core Directive
This repository is an enterprise design system governed by a **strict phased roadmap** and **Test-Driven Development (TDD)** contract.
All AI agents working in this workspace MUST adhere to these invariants without deviation.

---

### Invariant 1: Roadmap Memory First (Zero Digression)
1. **Startup Check**: Before writing or planning any code, the agent MUST read [`ARCHITECTURE_ROADMAP.md`](../../ARCHITECTURE_ROADMAP.md) to inspect the **Active Task Pointer**.
2. **Strict Scope Guard**: The agent MUST ONLY work on the currently active task in the current phase.
   - Do NOT jump ahead to future phases.
   - Do NOT invent unapproved components or features.
   - Do NOT install redundant npm packages (adhere to the Anti-Bloat Manifesto).

---

### Invariant 2: Test-Driven Development (TDD) Contract
No production code may be authored without a preceding test.

1. **Step 1 (Red)**: Write a test in `tests/components/<Component>.test.mjs` using Node's native test runner (`node:test` + `node:assert`).
   - Assert component rendering, variants, accessibility attributes (`role`, `aria-*`), and event handlers.
2. **Step 2 (Verify Red)**: Run `node --test tests/components/<Component>.test.mjs` and verify it fails.
3. **Step 3 (Green)**: Author the minimal component implementation in `src/components/...` to make the test pass.
4. **Step 4 (Refactor)**:
   - Export component from `src/index.ts`.
   - Update catalog and mapping tools (`scripts/component-gap-scanner.mjs`).
   - Run `node bin/cli.js audit [file] --fix` to verify token compliance.
5. **Step 5 (Update Memory)**: Update [`ARCHITECTURE_ROADMAP.md`](../../ARCHITECTURE_ROADMAP.md), mark the task `[x]`, and advance the **Active Task Pointer**.

---

### Invariant 3: Operational Modes (Page Authoring & Migration)
Refer to [`skills/enterprise-design-system/SKILL.md`](../skills/enterprise-design-system/SKILL.md):
- **Mode 1 (New Screen)**: Categorize archetype (Billing, Settings, CRUD, Gen AI, Dashboard). Never inject unsolicited telemetry/KPI cards into non-analytics screens.
- **Mode 2 (Page Transformation)**: Strict 1:1 non-destructive migration using the **Plan-Debug-Replan Protocol** (`map` -> refactor -> `audit --fix`). Zero additions, preserved handlers.
- **Mode 3 (Dashboard Quartet)**: The 4-layer Quartet is executed ONLY when an analytics dashboard is explicitly requested.

