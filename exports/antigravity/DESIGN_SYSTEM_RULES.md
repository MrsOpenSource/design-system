# Antigravity Design System Rules & Senior UX Architect Protocol

Please refer to [`skills/enterprise-design-system/SKILL.md`](../../skills/enterprise-design-system/SKILL.md) for the complete ruleset.

## Key Rules Summary:
1. **Mandatory CSS Import**: Always ensure `import '@hsb_design/design-system/dist/css/design-system.css';` is loaded in the active entry file (Vite `main.tsx` or Next.js `layout.tsx`).
2. **Dashboard Quartet**: When a dashboard is requested, always generate all 4 layers: App Shell (`AdaptiveLayout`) -> Executive Header -> 4 KPI Cards (184px rhythm with sparklines) -> `<DataTable mobileCardTransform={false}>`.
3. **Defensive Mobile De-duplication**: Always set `mobileCardTransform={false}` on desktop data tables.
4. **Data Visualization Hygiene**: Use `tabular-nums font-mono` and directional icons (`▲`/`▼`) for all metrics.
5. **Zero Unsolicited Additions**: Touch only what the user requested.
