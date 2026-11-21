# Antigravity Design System Rules & Senior UX Architect Protocol

Please refer to [`skills/enterprise-design-system/SKILL.md`](../../skills/enterprise-design-system/SKILL.md) for the complete ruleset.

## Key Rules Summary:
1. **Operational Modes**:
   - **Mode 1 (New Page)**: Archetype & Clarification-First. Do NOT inject unrequested KPI sparklines or tables onto Billing, Forms, or Settings pages.
   - **Mode 2 (Transforming Existing Page)**: Strict 1:1 non-destructive migration using the Plan-Debug-Replan protocol (`npx @hsb_design/design-system map` -> surgical replace -> `npx @hsb_design/design-system audit --fix`). Zero unsolicited component additions.
   - **Mode 3 (Dashboard / Telemetry)**: Deliver the 4-layer Quartet (`AdaptiveLayout` -> Executive Header -> 4 KPI Cards -> `<DataTable mobileCardTransform={false}>`) ONLY when an analytics dashboard is explicitly requested.
2. **Mandatory CSS Import**: Always ensure `import '@hsb_design/design-system/dist/css/design-system.css';` is loaded in the active entry file (Vite `main.tsx` or Next.js `layout.tsx`).
3. **Defensive Mobile De-duplication**: Always set `mobileCardTransform={false}` on desktop data tables.
4. **Data Visualization Hygiene**: Use `tabular-nums font-mono` and directional icons (`▲`/`▼`) for all metrics and currencies.
5. **Zero Unsolicited Additions**: Touch only what the user requested.
