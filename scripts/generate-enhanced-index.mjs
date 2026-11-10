import fs from 'fs';
import path from 'path';

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Enterprise Design System Studio - Multi-Device Dashboards & Gen AI</title>
  <link rel="stylesheet" href="dist/css/design-system.css">
  <link id="dynamic-font-link" rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap">
  <!-- Lucide Icons Script -->
  <script src="https://unpkg.com/lucide@latest"></script>
  <style>
    /* ==========================================================================
       Enterprise Design System Studio Styles
       ========================================================================== */
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: var(--typography-font-family-sans, 'Inter', -apple-system, sans-serif);
      background-color: var(--sys-color-surface-canvas, #F8FAFC);
      background-image: var(--canvas-bg-gradient, none);
      color: var(--sys-color-text-primary, #0F172A);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      overflow-x: hidden;
      transition: background-color 0.2s ease, color 0.2s ease;
    }

    .lucide-icon {
      width: 16px;
      height: 16px;
      stroke-width: 2;
      vertical-align: middle;
      display: inline-block;
    }

    /* Top Studio Header */
    .studio-header {
      height: 64px;
      background: var(--sys-color-surface-card, #FFFFFF);
      border-bottom: 1px solid var(--sys-color-border-subtle, #E2E8F0);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }

    .studio-brand {
      display: flex;
      align-items: center;
      gap: 12px;
      font-weight: 700;
      font-size: 16px;
      color: var(--sys-color-text-primary);
    }

    .studio-brand-badge {
      background: linear-gradient(135deg, var(--color-brand-placeholder-primary-600, #2563EB), var(--color-ai-special-accent-primary, #7C3AED));
      color: white;
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    .studio-controls {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .control-pill-group {
      display: flex;
      background: var(--sys-color-surface-sunken, #F1F5F9);
      padding: 3px;
      border-radius: 8px;
      border: 1px solid var(--sys-color-border-subtle, #E2E8F0);
    }

    .control-pill {
      background: transparent;
      border: none;
      padding: 6px 12px;
      font-size: 12px;
      font-weight: 500;
      color: var(--sys-color-text-secondary, #64748B);
      border-radius: 6px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s ease;
    }

    .control-pill.active {
      background: var(--sys-color-surface-card, #FFFFFF);
      color: var(--sys-color-text-primary, #0F172A);
      box-shadow: 0 1px 2px rgba(0,0,0,0.06);
      font-weight: 600;
    }

    .btn {
      padding: 8px 16px;
      border-radius: var(--custom-btn-radius, 8px);
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      border: 1px solid transparent;
      transition: all 0.15s ease;
      font-family: inherit;
    }

    .btn-primary {
      background: var(--sys-color-interactive-primary-default, #2563EB);
      color: white;
    }
    .btn-primary:hover {
      background: var(--sys-color-interactive-primary-hover, #1D4ED8);
    }

    .btn-ai {
      background: linear-gradient(135deg, var(--color-ai-special-accent-primary, #7C3AED), #EC4899);
      color: white;
      box-shadow: 0 2px 8px rgba(124, 58, 237, 0.25);
    }
    .btn-ai:hover {
      opacity: 0.95;
      box-shadow: 0 4px 12px rgba(124, 58, 237, 0.35);
    }

    .btn-outline {
      background: var(--sys-color-surface-card);
      border-color: var(--sys-color-border-default, #CBD5E1);
      color: var(--sys-color-text-primary);
    }
    .btn-outline:hover {
      background: var(--sys-color-surface-sunken);
    }

    /* Workspace */
    .studio-workspace {
      display: flex;
      flex: 1;
      height: calc(100vh - 64px);
      overflow: hidden;
    }

    /* Sidebar */
    .studio-sidebar {
      width: 380px;
      background: var(--sys-color-surface-card, #FFFFFF);
      border-right: 1px solid var(--sys-color-border-subtle, #E2E8F0);
      overflow-y: auto;
      padding: 18px;
      display: flex;
      flex-direction: column;
      gap: 18px;
      flex-shrink: 0;
    }

    .sidebar-tabs {
      display: flex;
      background: var(--sys-color-surface-sunken);
      padding: 3px;
      border-radius: 8px;
      border: 1px solid var(--sys-color-border-subtle);
      margin-bottom: 4px;
    }
    .sidebar-tab-btn {
      flex: 1;
      border: none;
      background: transparent;
      padding: 7px 10px;
      font-size: 12px;
      font-weight: 600;
      color: var(--sys-color-text-secondary);
      border-radius: 6px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: all 0.15s ease;
    }
    .sidebar-tab-btn.active {
      background: var(--sys-color-surface-card);
      color: var(--sys-color-text-primary);
      box-shadow: 0 1px 3px rgba(0,0,0,0.06);
    }

    .customizer-section-title {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--sys-color-text-tertiary, #94A3B8);
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .field-group {
      display: flex;
      flex-direction: column;
      gap: 5px;
      margin-bottom: 12px;
    }

    .field-label {
      font-size: 12px;
      font-weight: 600;
      color: var(--sys-color-text-primary);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .field-label span.desc {
      font-weight: 400;
      font-size: 11px;
      color: var(--sys-color-text-secondary);
    }

    .color-picker-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .color-input-bubble {
      width: 34px;
      height: 34px;
      border-radius: 8px;
      border: 1px solid var(--sys-color-border-default);
      cursor: pointer;
      padding: 0;
      overflow: hidden;
      flex-shrink: 0;
    }
    .color-input-bubble::-webkit-color-swatch-wrapper { padding: 0; }
    .color-input-bubble::-webkit-color-swatch { border: none; }

    .text-input, .select-input {
      width: 100%;
      height: 34px;
      border-radius: 6px;
      border: 1px solid var(--sys-color-border-default, #CBD5E1);
      background: var(--sys-color-surface-card);
      color: var(--sys-color-text-primary);
      padding: 0 10px;
      font-size: 12px;
      font-family: inherit;
    }
    .text-input:focus, .select-input:focus {
      outline: 2px solid var(--sys-color-border-focus, #3B82F6);
      border-color: transparent;
    }

    .slider-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .slider-input {
      flex: 1;
      cursor: pointer;
    }
    .slider-val-badge {
      font-size: 11px;
      font-family: var(--typography-font-family-mono, monospace);
      background: var(--sys-color-surface-sunken);
      padding: 2px 6px;
      border-radius: 4px;
      min-width: 44px;
      text-align: center;
    }

    /* 4-Corner Independent Radius Grid */
    .four-corner-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 6px;
      margin-top: 6px;
    }
    .corner-input-col {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
    }
    .corner-label {
      font-size: 10px;
      font-weight: 600;
      color: var(--sys-color-text-secondary);
      text-transform: uppercase;
    }
    .corner-number-input {
      width: 100%;
      height: 28px;
      text-align: center;
      font-size: 11px;
      font-family: var(--typography-font-family-mono, monospace);
      border: 1px solid var(--sys-color-border-default);
      border-radius: 4px;
      background: var(--sys-color-surface-card);
      color: var(--sys-color-text-primary);
    }

    /* State Switcher Buttons */
    .state-switcher-group {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 4px;
      background: var(--sys-color-surface-sunken);
      padding: 3px;
      border-radius: 6px;
      border: 1px solid var(--sys-color-border-subtle);
    }
    .state-btn {
      border: none;
      background: transparent;
      font-size: 11px;
      font-weight: 500;
      color: var(--sys-color-text-secondary);
      padding: 5px 0;
      border-radius: 4px;
      cursor: pointer;
      text-align: center;
      transition: all 0.15s ease;
    }
    .state-btn.active {
      background: var(--sys-color-surface-card);
      color: var(--sys-color-text-primary);
      font-weight: 700;
      box-shadow: 0 1px 2px rgba(0,0,0,0.06);
    }

    /* Stage */
    .studio-stage {
      flex: 1;
      background: var(--sys-color-surface-canvas, #F8FAFC);
      background-image: var(--canvas-bg-gradient, none);
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 24px;
      transition: all 0.3s cubic-bezier(0.2, 0, 0, 1);
    }

    .viewport-frame {
      width: 100%;
      max-width: 1440px;
      transition: max-width 0.35s cubic-bezier(0.2, 0, 0, 1);
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .viewport-frame.mode-tablet {
      max-width: 834px;
      box-shadow: 0 10px 30px -5px rgba(0,0,0,0.1);
      border: 8px solid #334155;
      border-radius: 24px;
      padding: 16px;
    }

    .viewport-frame.mode-mobile {
      max-width: 390px;
      box-shadow: 0 15px 35px -5px rgba(0,0,0,0.15);
      border: 10px solid #1E293B;
      border-radius: 36px;
      padding: 14px 10px;
    }

    /* Figma Selection Outline */
    .canvas-selectable {
      cursor: pointer;
      position: relative;
      transition: outline 0.15s ease, transform 0.1s ease;
    }
    .canvas-selectable:hover {
      outline: 1.5px dashed var(--sys-color-interactive-primary-default, #2563EB);
      outline-offset: 2px;
    }
    .canvas-selectable.selected {
      outline: 2px solid var(--sys-color-interactive-primary-default, #2563EB) !important;
      outline-offset: 3px;
    }
    .selection-tag {
      position: absolute;
      top: -20px;
      left: 0;
      background: var(--sys-color-interactive-primary-default, #2563EB);
      color: white;
      font-size: 10px;
      font-weight: 700;
      padding: 1px 6px;
      border-radius: 3px;
      display: none;
      z-index: 50;
      white-space: nowrap;
    }
    .canvas-selectable.selected .selection-tag {
      display: block;
    }

    /* Skeleton Loading State Shimmer */
    @keyframes skeleton-shimmer {
      0% { opacity: 0.5; background-position: -200% 0; }
      50% { opacity: 1; }
      100% { opacity: 0.5; background-position: 200% 0; }
    }
    .is-skeleton {
      background: linear-gradient(90deg, var(--sys-color-surface-sunken) 25%, #E2E8F0 50%, var(--sys-color-surface-sunken) 75%) !important;
      background-size: 200% 100% !important;
      animation: skeleton-shimmer 1.5s infinite !important;
      color: transparent !important;
      border-color: transparent !important;
      pointer-events: none;
    }
    .is-skeleton * {
      visibility: hidden;
    }

    /* Cards */
    .card {
      background: var(--card-custom-bg, var(--sys-color-surface-card, #FFFFFF));
      background-image: var(--card-bg-gradient, none);
      border: var(--custom-card-border-width, 1px) solid var(--custom-card-border-color, var(--sys-color-border-subtle, #E2E8F0));
      border-radius: var(--custom-card-radius, var(--radius-xl, 12px));
      border-top-left-radius: var(--card-tl-radius, var(--custom-card-radius, 12px));
      border-top-right-radius: var(--card-tr-radius, var(--custom-card-radius, 12px));
      border-bottom-right-radius: var(--card-br-radius, var(--custom-card-radius, 12px));
      border-bottom-left-radius: var(--card-bl-radius, var(--custom-card-radius, 12px));
      padding: var(--card-custom-pad-y, var(--kpi-padding, 20px)) var(--card-custom-pad-x, var(--kpi-padding, 20px));
      box-shadow: var(--card-custom-shadow, var(--shadow-sm));
      transition: all 0.2s ease;
    }
    .card:hover {
      box-shadow: var(--shadow-md);
    }

    /* KPI Grid */
    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--kpi-grid-gap, 16px);
    }
    .mode-tablet .kpi-grid { grid-template-columns: repeat(2, 1fr); }
    .mode-mobile .kpi-grid { grid-template-columns: 1fr; }

    .kpi-card-uniform {
      min-height: 184px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .kpi-header-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
    }

    .kpi-eyebrow {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--sys-color-text-secondary, #64748B);
    }

    .kpi-body-row {
      margin-bottom: 10px;
    }

    .kpi-metric {
      font-size: 28px;
      font-weight: 700;
      color: var(--sys-color-text-primary);
      font-family: var(--typography-font-family-display, inherit);
      line-height: 1.1;
      margin-bottom: 6px;
    }

    .kpi-delta-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .kpi-delta {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 11px;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: 9999px;
    }

    .delta-positive {
      background: var(--sys-color-status-success-surface, #ECFDF5);
      color: var(--sys-color-status-success-text, #065F46);
      border: 1px solid var(--sys-color-status-success-border, #A7F3D0);
    }
    .delta-negative {
      background: var(--sys-color-status-danger-surface, #FEF2F2);
      color: var(--sys-color-status-danger-text, #991B1B);
      border: 1px solid var(--sys-color-status-danger-border, #FECACA);
    }

    .kpi-viz-slot {
      height: 48px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      position: relative;
    }

    /* Sparklines */
    .sparkline-wrapper {
      position: relative;
      height: 48px;
      cursor: crosshair;
    }
    .sparkline-svg {
      width: 100%;
      height: 100%;
      overflow: visible;
    }
    .sparkline-tooltip {
      position: absolute;
      top: -28px;
      background: var(--sys-color-surface-inverse, #0F172A);
      color: var(--sys-color-text-inverse, #FFFFFF);
      padding: 3px 8px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 600;
      pointer-events: none;
      white-space: nowrap;
      display: none;
      transform: translateX(-50%);
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      z-index: 10;
    }

    /* Analytics Grid */
    .analytics-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 20px;
    }
    .mode-tablet .analytics-grid, .mode-mobile .analytics-grid { grid-template-columns: 1fr; }

    .chart-container {
      height: 280px;
      position: relative;
      margin-top: 14px;
    }

    .chart-ai-anomaly-trigger {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(124, 58, 237, 0.08);
      border: 1px solid var(--color-ai-special-accent-primary, #7C3AED);
      color: var(--color-ai-special-accent-primary, #7C3AED);
      font-size: 11px;
      font-weight: 600;
      padding: 4px 10px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .chart-ai-anomaly-trigger:hover {
      background: var(--color-ai-special-accent-primary, #7C3AED);
      color: white;
      box-shadow: 0 2px 8px rgba(124, 58, 237, 0.25);
    }

    /* Data Table */
    .table-responsive-wrapper {
      width: 100%;
      overflow-x: auto;
      border: 1px solid var(--sys-color-border-subtle);
      border-radius: 8px;
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 13px;
    }
    .data-table th {
      background: var(--sys-color-surface-sunken, #F8FAFC);
      color: var(--sys-color-text-secondary);
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: var(--table-cell-padding-y, 10px) var(--table-cell-padding-x, 16px);
      border-bottom: 1px solid var(--sys-color-border-subtle);
      white-space: nowrap;
    }
    .data-table td {
      padding: var(--table-cell-padding-y, 10px) var(--table-cell-padding-x, 16px);
      border-bottom: 1px solid var(--sys-color-border-subtle);
      color: var(--sys-color-text-primary);
      white-space: nowrap;
    }
    .data-table tr:hover td {
      background: var(--sys-color-surface-sunken);
    }

    .status-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      font-weight: 600;
      padding: 3px 8px;
      border-radius: 9999px;
    }

    .mobile-card-list {
      display: none;
      flex-direction: column;
      gap: 12px;
    }
    .mode-mobile .table-responsive-wrapper { display: none; }
    .mode-mobile .mobile-card-list { display: flex; }

    .mobile-row-card {
      background: var(--sys-color-surface-card);
      border: 1px solid var(--sys-color-border-subtle);
      border-radius: 10px;
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    /* ========================================================================
       GEN AI APPLICATION SUITE & MULTIMODAL RESPONSE STYLES
       ======================================================================== */
    .genai-suite-card {
      background: var(--card-custom-bg, var(--sys-color-surface-card, #FFFFFF));
      background-image: var(--card-bg-gradient, none);
      border: var(--custom-card-border-width, 1px) solid var(--custom-card-border-color, var(--sys-color-border-subtle, #E2E8F0));
      border-radius: var(--custom-card-radius, var(--radius-xl, 12px));
      padding: 24px;
      box-shadow: var(--shadow-sm);
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .genai-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--sys-color-border-subtle);
      padding-bottom: 14px;
    }

    .genai-title {
      font-size: 16px;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--sys-color-text-primary);
    }

    .chat-thread {
      display: flex;
      flex-direction: column;
      gap: 18px;
    }

    .chat-message-row {
      display: flex;
      gap: 12px;
      align-items: flex-start;
      width: 100%;
    }
    .chat-message-row.user-row { flex-direction: row-reverse; }

    .chat-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .chat-avatar.user-avatar {
      background: var(--color-brand-placeholder-primary-600, #2563EB);
      color: white;
    }
    .chat-avatar.ai-avatar {
      background: linear-gradient(135deg, var(--color-ai-special-accent-primary, #7C3AED), #EC4899);
      color: white;
      box-shadow: 0 2px 8px rgba(124, 58, 237, 0.3);
    }

    .message-bubble {
      padding: 18px;
      border-radius: var(--custom-bubble-radius, 14px);
      font-size: 14px;
      line-height: 1.6;
    }
    .message-bubble.message-user {
      background: var(--sys-color-surface-sunken, #F1F5F9);
      border: 1px solid var(--sys-color-border-subtle);
      color: var(--sys-color-text-primary);
      border-top-right-radius: 4px;
      max-width: 80%;
    }
    .message-bubble.message-assistant {
      background: var(--ai-response-bg, var(--sys-color-surface-card, #FFFFFF));
      border: 1px solid var(--sys-color-border-subtle);
      box-shadow: 0 4px 16px -2px rgba(0,0,0,0.06);
      color: var(--sys-color-text-primary);
      border-top-left-radius: 4px;
      width: 100%;
      max-width: 92%;
    }

    .reasoning-box-borderless {
      background: var(--sys-color-surface-sunken, #F8FAFC);
      border: none;
      border-radius: var(--custom-reasoning-radius, 8px);
      padding: 10px 14px;
      margin-bottom: 14px;
      font-family: var(--typography-font-family-mono, monospace);
      font-size: 12px;
    }
    .reasoning-header {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: var(--sys-color-text-secondary);
      font-weight: 600;
    }
    .reasoning-body {
      margin-top: 10px;
      padding-top: 10px;
      border-top: 1px solid rgba(0,0,0,0.06);
      color: var(--sys-color-text-code, #334155);
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .citation-pill {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      border-radius: 9999px;
      background: var(--sys-color-surface-sunken);
      color: var(--color-ai-special-accent-primary, #7C3AED);
      font-size: 10px;
      font-weight: 700;
      cursor: pointer;
      vertical-align: super;
      margin: 0 2px;
      border: 1px solid var(--sys-color-border-subtle);
      transition: all 0.15s ease;
      position: relative;
    }
    .citation-pill:hover {
      background: var(--color-ai-special-accent-primary);
      color: white;
    }

    .citation-popover {
      position: absolute;
      bottom: 28px;
      left: 0;
      width: 280px;
      background: var(--sys-color-surface-card);
      border: 1px solid var(--sys-color-border-default);
      box-shadow: var(--shadow-lg);
      border-radius: 8px;
      padding: 12px;
      font-size: 12px;
      color: var(--sys-color-text-primary);
      z-index: 50;
      display: none;
      line-height: 1.4;
    }

    /* ========================================================================
       NEW: AI INLINE EMBEDDED CHART & TABLE WIDGETS INSIDE RESPONSE
       ======================================================================== */
    .ai-inline-widget-container {
      margin: 16px 0;
      border: 1px solid var(--sys-color-border-subtle);
      border-radius: 10px;
      background: var(--sys-color-surface-card);
      overflow: hidden;
    }

    .ai-inline-widget-header {
      background: var(--sys-color-surface-sunken);
      padding: 8px 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--sys-color-border-subtle);
      font-size: 12px;
      font-weight: 600;
    }

    .ai-inline-chart-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      padding: 16px;
    }
    @media (max-width: 600px) {
      .ai-inline-chart-grid { grid-template-columns: repeat(2, 1fr); }
    }

    .ai-chart-bar-col {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
    }
    .ai-chart-bar-track {
      width: 100%;
      height: 70px;
      display: flex;
      align-items: flex-end;
      background: var(--sys-color-surface-sunken);
      border-radius: 4px;
      padding: 2px;
    }
    .ai-chart-bar-fill {
      width: 100%;
      border-radius: 2px;
      transition: height 0.5s ease;
    }
    .ai-chart-bar-label {
      font-size: 11px;
      font-weight: 600;
      color: var(--sys-color-text-secondary);
    }
    .ai-chart-bar-val {
      font-size: 11px;
      font-weight: 700;
      font-family: var(--typography-font-family-mono, monospace);
    }

    /* Embedded AI Structured Table */
    .ai-inline-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 12px;
    }
    .ai-inline-table th {
      background: var(--sys-color-surface-sunken);
      padding: 8px 12px;
      font-size: 11px;
      font-weight: 600;
      color: var(--sys-color-text-secondary);
      border-bottom: 1px solid var(--sys-color-border-subtle);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .ai-inline-table td {
      padding: 8px 12px;
      border-bottom: 1px solid var(--sys-color-border-subtle);
      color: var(--sys-color-text-primary);
    }
    .ai-inline-table tr:last-child td { border-bottom: none; }

    /* Diff Viewer */
    .diff-container {
      background: var(--sys-color-surface-card);
      border: 1px solid var(--sys-color-border-subtle);
      border-radius: 8px;
      overflow: hidden;
      margin-top: 16px;
      font-family: var(--typography-font-family-mono, monospace);
      font-size: 12px;
    }
    .diff-line-del {
      background: rgba(239, 68, 68, 0.1);
      color: #991B1B;
      padding: 4px 12px;
      text-decoration: line-through;
    }
    .diff-line-add {
      background: rgba(16, 185, 129, 0.12);
      color: #065F46;
      padding: 4px 12px;
      font-weight: 600;
    }
    .diff-actions {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      background: var(--sys-color-surface-sunken);
      border-top: 1px solid var(--sys-color-border-subtle);
    }

    /* Prompt Composer */
    .prompt-composer {
      border: 1px solid var(--sys-color-border-default);
      border-radius: var(--custom-composer-radius, 14px);
      padding: 12px 16px;
      background: var(--sys-color-surface-card);
      box-shadow: 0 2px 6px rgba(0,0,0,0.03);
      display: flex;
      flex-direction: column;
      gap: 10px;
      transition: all 0.2s ease;
    }
    .prompt-composer:focus-within {
      border-color: var(--color-ai-special-accent-primary, #7C3AED);
      box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.15);
    }

    .context-chips-row {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .context-chip {
      background: var(--sys-color-surface-sunken);
      border: 1px solid var(--sys-color-border-subtle);
      border-radius: 6px;
      padding: 3px 8px;
      font-size: 11px;
      font-weight: 500;
      color: var(--sys-color-text-secondary);
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .context-chip-remove { cursor: pointer; opacity: 0.6; }
    .context-chip-remove:hover { opacity: 1; }

    .composer-textarea {
      width: 100%;
      border: none;
      background: transparent;
      resize: none;
      font-family: inherit;
      font-size: 14px;
      color: var(--sys-color-text-primary);
      min-height: 52px;
      outline: none;
      line-height: 1.5;
    }

    .composer-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid var(--sys-color-border-subtle);
      padding-top: 10px;
    }

    .slash-pill {
      background: var(--sys-color-surface-sunken);
      border: 1px solid var(--sys-color-border-subtle);
      border-radius: 6px;
      padding: 4px 8px;
      font-size: 12px;
      color: var(--sys-color-text-secondary);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .btn-send-icon {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--sys-color-interactive-primary-default, #2563EB);
      color: white;
      border: none;
      cursor: pointer;
      transition: all 0.15s ease;
      flex-shrink: 0;
    }
    .btn-send-icon:hover {
      background: var(--sys-color-interactive-primary-hover, #1D4ED8);
      transform: scale(1.04);
    }

    /* Modals */
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(15, 23, 42, 0.6);
      backdrop-filter: blur(4px);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 2000;
    }
    .modal-dialog {
      background: var(--sys-color-surface-card);
      width: 90%;
      max-width: 820px;
      max-height: 85vh;
      border-radius: 16px;
      border: 1px solid var(--sys-color-border-subtle);
      box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .modal-header {
      padding: 16px 24px;
      border-bottom: 1px solid var(--sys-color-border-subtle);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .modal-tabs {
      display: flex;
      gap: 8px;
      padding: 0 24px;
      border-bottom: 1px solid var(--sys-color-border-subtle);
      background: var(--sys-color-surface-sunken);
      overflow-x: auto;
    }
    .modal-tab-btn {
      padding: 12px 16px;
      border: none;
      background: transparent;
      font-size: 13px;
      font-weight: 600;
      color: var(--sys-color-text-secondary);
      cursor: pointer;
      border-bottom: 2px solid transparent;
      white-space: nowrap;
    }
    .modal-tab-btn.active {
      color: var(--sys-color-interactive-primary-default);
      border-bottom-color: var(--sys-color-interactive-primary-default);
    }
    .modal-body {
      padding: 20px 24px;
      overflow-y: auto;
      flex: 1;
    }
    .code-export-preview {
      background: #0F172A;
      color: #E2E8F0;
      padding: 16px;
      border-radius: 8px;
      font-family: var(--typography-font-family-mono, monospace);
      font-size: 12px;
      white-space: pre-wrap;
      max-height: 380px;
      overflow-y: auto;
    }
    .modal-footer {
      padding: 14px 24px;
      border-top: 1px solid var(--sys-color-border-subtle);
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      background: var(--sys-color-surface-card);
    }

    .feedback-option-chip {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 14px;
      border: 1px solid var(--sys-color-border-subtle);
      border-radius: 8px;
      margin-bottom: 8px;
      cursor: pointer;
      font-size: 13px;
      transition: background 0.15s ease;
    }
    .feedback-option-chip:hover { background: var(--sys-color-surface-sunken); }

    .toast {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: var(--sys-color-surface-inverse, #0F172A);
      color: var(--sys-color-text-inverse, #FFFFFF);
      padding: 10px 18px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
      z-index: 3000;
      display: none;
      animation: fadeIn 0.2s ease;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  </style>
</head>
<body data-density="comfortable">

  <!-- ========================================================================
       STUDIO TOP HEADER
       ======================================================================== -->
  <header class="studio-header">
    <div class="studio-brand">
      <i data-lucide="layers" class="lucide-icon" style="color: var(--color-brand-placeholder-primary-600);"></i>
      <span>Enterprise Design System</span>
      <span class="studio-brand-badge">Studio</span>
    </div>

    <div class="studio-controls">
      <!-- Device Viewport Switcher -->
      <div class="control-pill-group">
        <button class="control-pill active" onclick="setDeviceMode('laptop')">
          <i data-lucide="laptop" class="lucide-icon"></i> Laptop (1440px)
        </button>
        <button class="control-pill" onclick="setDeviceMode('tablet')">
          <i data-lucide="tablet" class="lucide-icon"></i> Tablet (834px)
        </button>
        <button class="control-pill" onclick="setDeviceMode('mobile')">
          <i data-lucide="smartphone" class="lucide-icon"></i> Mobile (390px)
        </button>
      </div>

      <!-- Density Switcher -->
      <div class="control-pill-group">
        <button class="control-pill" onclick="setDensity('compact')">Compact</button>
        <button class="control-pill active" onclick="setDensity('comfortable')">Comfortable</button>
        <button class="control-pill" onclick="setDensity('spacious')">Spacious</button>
      </div>

      <!-- Theme Switcher -->
      <button class="btn btn-outline" id="theme-toggle-btn" onclick="toggleTheme()" title="Toggle Light/Dark Theme">
        <i data-lucide="sun" class="lucide-icon"></i> Light
      </button>

      <!-- Export Library Button -->
      <button class="btn btn-ai" onclick="openExportModal()">
        <i data-lucide="sparkles" class="lucide-icon"></i> Export Library (Figma / Lovable / Code)
      </button>
    </div>
  </header>

  <!-- ========================================================================
       MAIN WORKSPACE: SIDEBAR CUSTOMIZER + CENTER VIEWPORT CANVAS
       ======================================================================== -->
  <div class="studio-workspace">

    <!-- LEFT SIDEBAR: Brand & Full Figma-Like Inspector Controls -->
    <aside class="studio-sidebar">
      
      <!-- Tab Switcher: [Brand Tokens] vs [Figma Inspector] -->
      <div class="sidebar-tabs">
        <button class="sidebar-tab-btn active" id="tab-btn-brand" onclick="switchSidebarTab('brand')">
          <i data-lucide="palette" class="lucide-icon"></i> Brand & Themes
        </button>
        <button class="sidebar-tab-btn" id="tab-btn-inspector" onclick="switchSidebarTab('inspector')">
          <i data-lucide="sliders" class="lucide-icon"></i> Figma Inspector
        </button>
      </div>

      <!-- ====================================================================
           TAB 1: BRAND TOKENS & CANVAS PALETTE
           ==================================================================== -->
      <div id="sidebar-tab-brand-content">
        
        <div style="margin-bottom: 16px;">
          <div class="customizer-section-title">
            <span>Brand Preset Theme</span>
          </div>
          <select class="select-input" id="preset-selector" onchange="applyPresetTheme(this.value)">
            <option value="corporate-blue">Tech Corporate (Cobalt Blue)</option>
            <option value="ai-violet" selected>NextGen Gen AI (Electric Violet)</option>
            <option value="fintech-emerald">Fintech Wealth (Emerald Green)</option>
            <option value="cyber-amber">Operations Core (Cyber Amber)</option>
            <option value="slate-minimal">Minimal Clean (Slate Monochrome)</option>
          </select>
        </div>

        <div style="margin-bottom: 16px;">
          <div class="customizer-section-title">
            <span>Brand Colors</span>
            <span style="font-size: 10px; cursor: pointer; color: var(--color-brand-placeholder-primary-600);" onclick="resetPalette()">Reset</span>
          </div>

          <div class="field-group">
            <label class="field-label">
              Primary Brand
              <span class="desc" id="primary-hex-label">#7C3AED</span>
            </label>
            <div class="color-picker-row">
              <input type="color" class="color-input-bubble" id="primary-color-picker" value="#7C3AED" oninput="updatePrimaryColor(this.value)">
              <input type="text" class="text-input" id="primary-hex-input" value="#7C3AED" oninput="updatePrimaryColor(this.value)">
            </div>
            <div class="palette-ramp-preview" id="primary-ramp-preview"></div>
          </div>

          <div class="field-group">
            <label class="field-label">
              Secondary Accent
              <span class="desc" id="secondary-hex-label">#06B6D4</span>
            </label>
            <div class="color-picker-row">
              <input type="color" class="color-input-bubble" id="secondary-color-picker" value="#06B6D4" oninput="updateSecondaryColor(this.value)">
              <input type="text" class="text-input" id="secondary-hex-input" value="#06B6D4" oninput="updateSecondaryColor(this.value)">
            </div>
          </div>

          <div class="field-group">
            <label class="field-label">
              AI Specialty Accent
              <span class="desc">Aura & Shimmer</span>
            </label>
            <div class="color-picker-row">
              <input type="color" class="color-input-bubble" id="ai-color-picker" value="#EC4899" oninput="updateAiColor(this.value)">
              <input type="text" class="text-input" id="ai-hex-input" value="#EC4899" oninput="updateAiColor(this.value)">
            </div>
          </div>
        </div>

        <div style="margin-bottom: 16px;">
          <div class="customizer-section-title">
            <span>Canvas & Card Surfaces</span>
          </div>

          <div class="field-group">
            <label class="field-label">Neutral Family Tone</label>
            <select class="select-input" id="neutral-family-select" onchange="updateNeutralFamily(this.value)">
              <option value="slate" selected>Slate (Cool Tech)</option>
              <option value="zinc">Zinc (Modern High-Contrast)</option>
              <option value="neutral">Neutral (Pure Gray)</option>
              <option value="stone">Stone (Warm Cream)</option>
            </select>
          </div>

          <div class="field-group">
            <label class="field-label">Screen Canvas Background</label>
            <div class="color-picker-row">
              <input type="color" class="color-input-bubble" id="canvas-bg-picker" value="#F8FAFC" oninput="updateCanvasBg(this.value)">
              <input type="text" class="text-input" id="canvas-bg-input" value="#F8FAFC" oninput="updateCanvasBg(this.value)">
            </div>
          </div>

          <div class="field-group">
            <label class="field-label">
              Canvas Gradient Overlay
              <input type="checkbox" id="canvas-grad-toggle" onchange="toggleCanvasGradient(this.checked)">
            </label>
            <select class="select-input" id="canvas-grad-select" onchange="updateCanvasGradientPreset(this.value)" disabled>
              <option value="subtle-radial">Subtle Radial Glow</option>
              <option value="linear-brand-tint">Linear Brand Tint (Top-to-Bottom)</option>
              <option value="mesh-ai">Soft AI Ambient Mesh</option>
            </select>
          </div>

          <div class="field-group">
            <label class="field-label">Card Surface Background</label>
            <div class="color-picker-row">
              <input type="color" class="color-input-bubble" id="card-bg-picker" value="#FFFFFF" oninput="updateCardBg(this.value)">
              <input type="text" class="text-input" id="card-bg-input" value="#FFFFFF" oninput="updateCardBg(this.value)">
            </div>
          </div>
        </div>

        <div>
          <div class="customizer-section-title">
            <span>Typography Stacks</span>
          </div>

          <div class="field-group">
            <label class="field-label">Primary UI Font (Sans)</label>
            <select class="select-input" id="sans-font-select" onchange="updateSansFont(this.value)">
              <option value="Inter" selected>Inter (Standard Enterprise)</option>
              <option value="Plus Jakarta Sans">Plus Jakarta Sans (Modern Clean)</option>
              <option value="Roboto">Roboto (Google Material)</option>
              <option value="Outfit">Outfit (Geometric & Friendly)</option>
              <option value="system-ui">System UI (Native OS Stack)</option>
            </select>
          </div>

          <div class="field-group">
            <label class="field-label">Display & Metric Font</label>
            <select class="select-input" id="display-font-select" onchange="updateDisplayFont(this.value)">
              <option value="Inter" selected>Inter (Consistent Numbers)</option>
              <option value="Outfit">Outfit (Bold Display)</option>
              <option value="Plus Jakarta Sans">Plus Jakarta Sans</option>
              <option value="Space Grotesk">Space Grotesk (Tech / Fintech)</option>
            </select>
          </div>

          <div class="field-group">
            <label class="field-label">Code & Reasoning Font</label>
            <select class="select-input" id="mono-font-select" onchange="updateMonoFont(this.value)">
              <option value="JetBrains Mono" selected>JetBrains Mono (Developer)</option>
              <option value="Fira Code">Fira Code</option>
              <option value="Roboto Mono">Roboto Mono</option>
              <option value="monospace">System Monospace</option>
            </select>
          </div>
        </div>

      </div>

      <!-- ====================================================================
           TAB 2: COMPREHENSIVE FIGMA INSPECTOR & INDIVIDUAL COMPONENT CONTROLS
           ==================================================================== -->
      <div id="sidebar-tab-inspector-content" style="display: none;">
        
        <!-- Component Target Selector -->
        <div class="field-group" style="margin-bottom: 14px;">
          <label class="field-label">
            <span>Component Target</span>
            <span class="desc">Select or click canvas</span>
          </label>
          <select class="select-input" id="inspector-target-select" onchange="handleTargetSelectionChange(this.value)">
            <option value="global">All Global Cards</option>
            <option value="kpi-1">KPI 1: Net Revenue Card</option>
            <option value="kpi-2">KPI 2: Active Users Sparkline</option>
            <option value="kpi-3">KPI 3: API Invocations Card</option>
            <option value="kpi-4">KPI 4: SLA Uptime Card</option>
            <option value="chart-card">Gross Revenue Forecast Chart</option>
            <option value="table-card">Enterprise Accounts Table</option>
            <option value="ai-assistant-card">AI Assistant Response Card</option>
            <option value="composer-card">Prompt Composer Box</option>
          </select>
        </div>

        <!-- Component State Previewer -->
        <div class="field-group">
          <label class="field-label">Component State</label>
          <div class="state-switcher-group">
            <button class="state-btn active" onclick="setComponentState('default')">Default</button>
            <button class="state-btn" onclick="setComponentState('hover')">Hover</button>
            <button class="state-btn" onclick="setComponentState('skeleton')">Skeleton</button>
            <button class="state-btn" onclick="setComponentState('error')">Error</button>
          </div>
        </div>

        <!-- Auto-Layout & Spacing Controls (Padding X, Padding Y, Item Gap) -->
        <div class="customizer-section-title" style="margin-top: 14px;">
          <span>Auto-Layout & Spacing</span>
        </div>

        <div class="field-group">
          <label class="field-label">
            <span>Padding (X / Horizontal)</span>
            <span class="slider-val-badge" id="pad-x-badge">20px</span>
          </label>
          <div class="slider-row">
            <input type="range" min="8" max="40" value="20" class="slider-input" id="pad-x-slider" oninput="updateAutoLayoutPaddingX(this.value)">
          </div>
        </div>

        <div class="field-group">
          <label class="field-label">
            <span>Padding (Y / Vertical)</span>
            <span class="slider-val-badge" id="pad-y-badge">20px</span>
          </label>
          <div class="slider-row">
            <input type="range" min="8" max="40" value="20" class="slider-input" id="pad-y-slider" oninput="updateAutoLayoutPaddingY(this.value)">
          </div>
        </div>

        <div class="field-group">
          <label class="field-label">
            <span>Item Gap / Spacing</span>
            <span class="slider-val-badge" id="gap-badge">16px</span>
          </label>
          <div class="slider-row">
            <input type="range" min="4" max="32" value="16" class="slider-input" id="gap-slider" oninput="updateAutoLayoutGap(this.value)">
          </div>
        </div>

        <!-- Corner Radius Controls (Uniform + Independent 4-Corners) -->
        <div class="customizer-section-title" style="margin-top: 14px;">
          <span>Corner Radii</span>
        </div>

        <div class="field-group">
          <label class="field-label">
            <span>Uniform Radius</span>
            <span class="slider-val-badge" id="radius-val-badge">12px</span>
          </label>
          <div class="slider-row">
            <input type="range" min="0" max="36" value="12" class="slider-input" id="radius-slider" oninput="updateUniformRadius(this.value)">
          </div>
        </div>

        <div class="field-group">
          <label class="field-label">
            <span>Independent Corners</span>
            <span class="desc">TL / TR / BR / BL</span>
          </label>
          <div class="four-corner-grid">
            <div class="corner-input-col">
              <span class="corner-label">TL</span>
              <input type="number" id="corner-tl" value="12" min="0" max="48" class="corner-number-input" oninput="updateIndependentCorners()">
            </div>
            <div class="corner-input-col">
              <span class="corner-label">TR</span>
              <input type="number" id="corner-tr" value="12" min="0" max="48" class="corner-number-input" oninput="updateIndependentCorners()">
            </div>
            <div class="corner-input-col">
              <span class="corner-label">BR</span>
              <input type="number" id="corner-br" value="12" min="0" max="48" class="corner-number-input" oninput="updateIndependentCorners()">
            </div>
            <div class="corner-input-col">
              <span class="corner-label">BL</span>
              <input type="number" id="corner-bl" value="12" min="0" max="48" class="corner-number-input" oninput="updateIndependentCorners()">
            </div>
          </div>
        </div>

        <!-- Stroke / Border Controls -->
        <div class="customizer-section-title" style="margin-top: 14px;">
          <span>Stroke & Border</span>
        </div>

        <div class="field-group">
          <label class="field-label">
            <span>Border Width</span>
            <span class="slider-val-badge" id="border-width-badge">1px</span>
          </label>
          <div class="slider-row">
            <input type="range" min="0" max="5" value="1" class="slider-input" id="border-width-slider" oninput="updateBorderWidth(this.value)">
          </div>
        </div>

        <div class="field-group">
          <label class="field-label">Border Color</label>
          <div class="color-picker-row">
            <input type="color" class="color-input-bubble" id="border-color-picker" value="#E2E8F0" oninput="updateBorderColor(this.value)">
            <input type="text" class="text-input" id="border-color-input" value="#E2E8F0" oninput="updateBorderColor(this.value)">
          </div>
        </div>

        <!-- Effects & Drop Shadow Presets -->
        <div class="customizer-section-title" style="margin-top: 14px;">
          <span>Effects & Elevation</span>
        </div>

        <div class="field-group">
          <label class="field-label">Elevation / Shadow Preset</label>
          <select class="select-input" id="shadow-preset-select" onchange="updateShadowPreset(this.value)">
            <option value="none">None (0px flat)</option>
            <option value="sm" selected>Subtle (sm: 0 1px 2px)</option>
            <option value="md">Elevated (md: 0 4px 6px)</option>
            <option value="lg">Floating (lg: 0 10px 15px)</option>
            <option value="ai-glow">AI Glow (Ambient Aura)</option>
          </select>
        </div>

        <!-- Content Props & Slot Visibility -->
        <div class="customizer-section-title" style="margin-top: 14px;">
          <span>Content Props & Slots</span>
        </div>

        <div class="field-group">
          <label class="field-label">Component Title Text</label>
          <input type="text" class="text-input" id="edit-title-input" value="Total Net Revenue" oninput="updateSelectedContentText('title', this.value)">
        </div>

        <div class="field-group">
          <label class="field-label">Primary Metric Value</label>
          <input type="text" class="text-input" id="edit-metric-input" value="$4,892,150" oninput="updateSelectedContentText('metric', this.value)">
        </div>

        <div style="display: flex; flex-direction: column; gap: 6px; margin-top: 6px;">
          <label style="font-size: 12px; display: flex; align-items: center; gap: 8px; cursor: pointer;">
            <input type="checkbox" id="slot-toggle-delta" checked onchange="toggleSlotVisibility('delta', this.checked)">
            <span>Show Delta Badge</span>
          </label>
          <label style="font-size: 12px; display: flex; align-items: center; gap: 8px; cursor: pointer;">
            <input type="checkbox" id="slot-toggle-viz" checked onchange="toggleSlotVisibility('viz', this.checked)">
            <span>Show Bottom Sparkline / Progress</span>
          </label>
        </div>

        <!-- Save to Library & Saved Components List -->
        <div style="margin-top: 18px; display: flex; flex-direction: column; gap: 8px;">
          <button class="btn btn-primary" style="width: 100%; justify-content: center;" onclick="saveComponentVariant()">
            <i data-lucide="bookmark-plus" class="lucide-icon"></i> Save Component to Library
          </button>
        </div>

        <!-- Saved Components Library Drawer -->
        <div style="margin-top: 16px;">
          <div class="customizer-section-title">
            <span>Saved Components Registry (<span id="saved-count">1</span>)</span>
          </div>
          <div id="saved-components-list" style="display: flex; flex-direction: column; gap: 8px;">
            <div style="background: var(--sys-color-surface-sunken); padding: 8px 10px; border-radius: 6px; border: 1px solid var(--sys-color-border-subtle); display: flex; justify-content: space-between; align-items: center;">
              <div>
                <strong style="font-size: 12px;">KpiCard.Revenue.VariantA</strong>
                <div style="font-size: 10px; color: var(--sys-color-text-secondary);">Radius: 12px • Border: 1px</div>
              </div>
              <button class="btn btn-outline" style="padding: 2px 6px; font-size: 10px;" onclick="showToast('Applied saved variant')">Apply</button>
            </div>
          </div>
        </div>

      </div>

      <!-- Quick Export Buttons at bottom of sidebar -->
      <div style="margin-top: auto; display: flex; flex-direction: column; gap: 8px; padding-top: 16px; border-top: 1px solid var(--sys-color-border-subtle);">
        <button class="btn btn-outline" style="width: 100%; justify-content: center;" onclick="copyCssVariables()">
          <i data-lucide="copy" class="lucide-icon"></i> Copy CSS Variables
        </button>
        <button class="btn btn-outline" style="width: 100%; justify-content: center;" onclick="openExportModal()">
          <i data-lucide="download" class="lucide-icon"></i> Export Figma Components
        </button>
      </div>

    </aside>

    <!-- CENTER STAGE: Responsive Multi-Device Canvas -->
    <main class="studio-stage" id="studio-stage">
      
      <div class="viewport-frame" id="viewport-frame">

        <!-- ====================================================================
             1. DASHBOARD COMPONENT SUITE
             ==================================================================== -->
        
        <!-- Dashboard Topbar Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
          <div>
            <h1 style="font-size: 22px; font-weight: 700;">Executive Analytics Overview</h1>
            <p style="font-size: 13px; color: var(--sys-color-text-secondary);">Real-time multi-channel enterprise telemetry with AI grounding</p>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <button class="btn btn-outline" style="font-size: 12px; padding: 6px 12px;">
              <i data-lucide="calendar" class="lucide-icon"></i> Last 30 Days ▾
            </button>
            <button class="btn btn-ai" style="font-size: 12px; padding: 6px 12px;" onclick="simulateAiChartInsight()">
              <i data-lucide="sparkles" class="lucide-icon"></i> Ask AI to Summarize
            </button>
          </div>
        </div>

        <!-- Row 1: KPI Cards Grid with Standardized Height & Spacing -->
        <div class="kpi-grid" id="main-kpi-grid">
          
          <!-- KPI 1: Standard Metric with Target Progress Bar -->
          <div class="card kpi-card-uniform canvas-selectable" id="comp-kpi-1" onclick="selectComponent(this, 'kpi-1', 'KPI 1: Net Revenue Card')">
            <span class="selection-tag">KpiCard: Revenue</span>
            <div class="kpi-header-row">
              <span class="kpi-eyebrow" id="kpi-1-eyebrow">Total Net Revenue</span>
              <i data-lucide="info" class="lucide-icon kpi-slot-info" style="color: var(--sys-color-text-tertiary); cursor: help;" title="Gross revenue minus returns"></i>
            </div>
            <div class="kpi-body-row">
              <div class="kpi-metric tabular-nums" id="kpi-1-metric">$4,892,150</div>
              <div class="kpi-delta-row kpi-slot-delta">
                <span class="kpi-delta delta-positive">▲ +14.2%</span>
                <span style="font-size: 11px; color: var(--sys-color-text-secondary);">vs last quarter</span>
              </div>
            </div>
            <div class="kpi-viz-slot kpi-slot-viz">
              <div style="height: 6px; background: var(--sys-color-surface-sunken); border-radius: 4px; overflow: hidden; margin-bottom: 6px;">
                <div style="width: 82%; height: 100%; background: var(--color-brand-placeholder-primary-600); border-radius: 4px;"></div>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 11px; color: var(--sys-color-text-tertiary);">
                <span>Target: $5.9M</span>
                <span style="font-weight: 600; color: var(--sys-color-text-secondary);">82% Achieved</span>
              </div>
            </div>
          </div>

          <!-- KPI 2: KPI with SVG Area Sparkline & Hover Tooltip -->
          <div class="card kpi-card-uniform canvas-selectable" id="comp-kpi-2" onclick="selectComponent(this, 'kpi-2', 'KPI 2: Active Users Sparkline')">
            <span class="selection-tag">KpiCard: Users</span>
            <div class="kpi-header-row">
              <span class="kpi-eyebrow" id="kpi-2-eyebrow">Active Users (DAU)</span>
              <span class="kpi-slot-info" style="color: var(--color-brand-placeholder-primary-600); cursor: pointer; font-size: 11px; font-weight: 600; display: flex; align-items: center; gap: 2px;">
                Details <i data-lucide="arrow-up-right" class="lucide-icon" style="width: 12px; height: 12px;"></i>
              </span>
            </div>
            <div class="kpi-body-row">
              <div class="kpi-metric tabular-nums" id="kpi-2-metric">182,400</div>
              <div class="kpi-delta-row kpi-slot-delta">
                <span class="kpi-delta delta-positive">▲ +6.8%</span>
                <span style="font-size: 11px; color: var(--sys-color-text-secondary);">30D Velocity</span>
              </div>
            </div>
            <div class="kpi-viz-slot kpi-slot-viz">
              <div class="sparkline-wrapper" onmousemove="handleSparklineHover(event)" onmouseleave="hideSparklineTooltip()">
                <div class="sparkline-tooltip" id="sparkline-tip">Nov 14: 182.4k</div>
                <svg class="sparkline-svg" viewBox="0 0 160 48" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="area-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="var(--color-brand-placeholder-primary-600)" stop-opacity="0.25"/>
                      <stop offset="100%" stop-color="var(--color-brand-placeholder-primary-600)" stop-opacity="0.0"/>
                    </linearGradient>
                  </defs>
                  <path d="M 0 40 Q 30 15, 60 28 T 120 18 T 160 8 L 160 48 L 0 48 Z" fill="url(#area-grad)"/>
                  <path d="M 0 40 Q 30 15, 60 28 T 120 18 T 160 8" fill="none" stroke="var(--color-brand-placeholder-primary-600)" stroke-width="2"/>
                  <circle cx="160" cy="8" r="3.5" fill="var(--color-brand-placeholder-primary-600)" stroke="#FFFFFF" stroke-width="1.5"/>
                </svg>
              </div>
            </div>
          </div>

          <!-- KPI 3: KPI with Bar Sparkline -->
          <div class="card kpi-card-uniform canvas-selectable" id="comp-kpi-3" onclick="selectComponent(this, 'kpi-3', 'KPI 3: API Invocations Card')">
            <span class="selection-tag">KpiCard: API</span>
            <div class="kpi-header-row">
              <span class="kpi-eyebrow" id="kpi-3-eyebrow">API Invocations</span>
              <span class="kpi-slot-info" style="font-size: 11px; color: var(--color-brand-placeholder-primary-600); display: flex; align-items: center; gap: 3px;">
                <i data-lucide="zap" class="lucide-icon" style="width: 12px; height: 12px;"></i> Live
              </span>
            </div>
            <div class="kpi-body-row">
              <div class="kpi-metric tabular-nums" id="kpi-3-metric">94.8M</div>
              <div class="kpi-delta-row kpi-slot-delta">
                <span class="kpi-delta delta-negative">▼ -1.2%</span>
                <span style="font-size: 11px; color: var(--sys-color-text-secondary);">24h Volatility</span>
              </div>
            </div>
            <div class="kpi-viz-slot kpi-slot-viz">
              <div style="display: flex; align-items: flex-end; gap: 3px; height: 42px;">
                <div style="flex:1; height:40%; background:var(--sys-color-border-subtle); border-radius:1px;"></div>
                <div style="flex:1; height:60%; background:var(--sys-color-border-subtle); border-radius:1px;"></div>
                <div style="flex:1; height:35%; background:var(--sys-color-border-subtle); border-radius:1px;"></div>
                <div style="flex:1; height:75%; background:var(--sys-color-border-subtle); border-radius:1px;"></div>
                <div style="flex:1; height:90%; background:var(--color-brand-placeholder-primary-600); border-radius:1px;"></div>
                <div style="flex:1; height:65%; background:var(--color-brand-placeholder-primary-600); border-radius:1px;"></div>
                <div style="flex:1; height:80%; background:var(--color-brand-placeholder-primary-600); border-radius:1px;"></div>
                <div style="flex:1; height:100%; background:var(--color-ai-special-accent-primary); border-radius:1px;"></div>
              </div>
            </div>
          </div>

          <!-- KPI 4: KPI with SLA Ticks (Aligned Spacing) -->
          <div class="card kpi-card-uniform canvas-selectable" id="comp-kpi-4" onclick="selectComponent(this, 'kpi-4', 'KPI 4: SLA Uptime Card')">
            <span class="selection-tag">KpiCard: SLA</span>
            <div class="kpi-header-row">
              <span class="kpi-eyebrow" id="kpi-4-eyebrow">System SLA (Uptime)</span>
              <span class="kpi-slot-info" style="font-size: 11px; color: var(--sys-color-text-secondary); display: flex; align-items: center; gap: 3px;">
                <i data-lucide="shield-check" class="lucide-icon" style="width: 12px; height: 12px; color: var(--sys-color-status-success-base);"></i> 99.98%
              </span>
            </div>
            <div class="kpi-body-row">
              <div class="kpi-metric tabular-nums" id="kpi-4-metric">99.98%</div>
              <div class="kpi-delta-row kpi-slot-delta">
                <span class="kpi-delta delta-positive">● Operational</span>
                <span style="font-size: 11px; color: var(--sys-color-text-secondary);">0 Breaches</span>
              </div>
            </div>
            <div class="kpi-viz-slot kpi-slot-viz">
              <div style="display: flex; gap: 3px; height: 28px; align-items: center;">
                <div style="flex:1; height:20px; background:var(--sys-color-status-success-base); border-radius:2px;" title="Day 1: 100%"></div>
                <div style="flex:1; height:20px; background:var(--sys-color-status-success-base); border-radius:2px;" title="Day 2: 100%"></div>
                <div style="flex:1; height:20px; background:var(--sys-color-status-success-base); border-radius:2px;" title="Day 3: 100%"></div>
                <div style="flex:1; height:20px; background:var(--sys-color-status-success-base); border-radius:2px;" title="Day 4: 100%"></div>
                <div style="flex:1; height:20px; background:var(--sys-color-status-success-base); border-radius:2px;" title="Day 5: 100%"></div>
                <div style="flex:1; height:14px; background:var(--sys-color-status-warning-base); border-radius:2px;" title="Day 6: Minor latency (99.8%)"></div>
                <div style="flex:1; height:20px; background:var(--sys-color-status-success-base); border-radius:2px;" title="Day 7: 100%"></div>
                <div style="flex:1; height:20px; background:var(--sys-color-status-success-base); border-radius:2px;" title="Day 8: 100%"></div>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 10px; color: var(--sys-color-text-tertiary); margin-top: 4px;">
                <span>Last 30 Days</span>
                <span style="color: var(--sys-color-status-success-text); font-weight: 600;">100% Uptime Trend</span>
              </div>
            </div>
          </div>

        </div>

        <!-- Row 2: Complex Chart & Enterprise Data Table -->
        <div class="analytics-grid">
          
          <!-- Chart Component with AI Anomaly Button in Header (Clean Canvas) -->
          <div class="card canvas-selectable" id="comp-chart-card" style="position: relative;" onclick="selectComponent(this, 'chart-card', 'Gross Revenue Forecast Chart')">
            <span class="selection-tag">Chart: Forecast</span>
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
              <div>
                <h3 style="font-size: 15px; font-weight: 700;">Gross Revenue & Operational Forecast</h3>
                <p style="font-size: 12px; color: var(--sys-color-text-secondary);">Actual historical trend vs AI projected confidence corridor (P90)</p>
              </div>
              
              <div style="display: flex; align-items: center; gap: 8px;">
                <button class="chart-ai-anomaly-trigger" onclick="event.stopPropagation(); openAnomalyModal()">
                  <i data-lucide="alert-circle" class="lucide-icon"></i>
                  <span>Anomaly Spike (+$42k)</span>
                </button>

                <div class="control-pill-group" style="font-size: 11px;">
                  <button class="control-pill active">1M</button>
                  <button class="control-pill">3M</button>
                  <button class="control-pill">YTD</button>
                </div>
              </div>
            </div>

            <div class="chart-container">
              <svg viewBox="0 0 600 240" style="width: 100%; height: 100%;" preserveAspectRatio="none">
                <line x1="0" y1="40" x2="600" y2="40" stroke="var(--sys-color-border-subtle)" stroke-dasharray="4 4" stroke-width="1"/>
                <line x1="0" y1="90" x2="600" y2="90" stroke="var(--sys-color-border-subtle)" stroke-dasharray="4 4" stroke-width="1"/>
                <line x1="0" y1="140" x2="600" y2="140" stroke="var(--sys-color-border-subtle)" stroke-dasharray="4 4" stroke-width="1"/>
                <line x1="0" y1="190" x2="600" y2="190" stroke="var(--sys-color-border-subtle)" stroke-dasharray="4 4" stroke-width="1"/>
                <line x1="0" y1="230" x2="600" y2="230" stroke="var(--sys-color-border-default)" stroke-width="1"/>

                <polygon points="340,110 420,80 500,60 590,40 590,140 500,160 420,180 340,150" fill="var(--color-ai-special-accent-primary)" opacity="0.08"/>
                <line x1="340" y1="110" x2="590" y2="40" stroke="var(--color-ai-special-accent-primary)" stroke-dasharray="3 3" stroke-width="1.5" opacity="0.4"/>
                <line x1="340" y1="150" x2="590" y2="140" stroke="var(--color-ai-special-accent-primary)" stroke-dasharray="3 3" stroke-width="1.5" opacity="0.4"/>

                <path d="M 10 200 Q 80 180, 150 160 T 260 120 T 340 70" fill="none" stroke="var(--color-brand-placeholder-primary-600)" stroke-width="3"/>
                <circle cx="340" cy="70" r="5" fill="var(--color-ai-special-accent-primary)" stroke="#FFFFFF" stroke-width="2" style="cursor: pointer;" onclick="openAnomalyModal()"/>

                <path d="M 340 70 Q 420 90, 500 70 T 590 50" fill="none" stroke="var(--color-brand-placeholder-primary-600)" stroke-width="2" stroke-dasharray="5 5"/>
                <path d="M 10 180 Q 80 170, 160 160 T 320 145 T 590 135" fill="none" stroke="var(--color-neutral-400)" stroke-width="2"/>
              </svg>
            </div>

            <div style="display: flex; gap: 16px; font-size: 12px; margin-top: 10px; color: var(--sys-color-text-secondary); justify-content: center;">
              <span style="display: flex; align-items: center; gap: 6px;"><span style="width: 10px; height: 10px; background: var(--color-brand-placeholder-primary-600); border-radius: 2px;"></span> Actual Revenue</span>
              <span style="display: flex; align-items: center; gap: 6px;"><span style="width: 10px; height: 10px; border: 1.5px dashed var(--color-brand-placeholder-primary-600); border-radius: 2px;"></span> AI Forecast Projection</span>
              <span style="display: flex; align-items: center; gap: 6px;"><span style="width: 10px; height: 10px; background: var(--color-ai-special-accent-primary); opacity: 0.3; border-radius: 2px;"></span> 90% Confidence Corridor</span>
            </div>
          </div>

          <!-- Enterprise High-Density Table -->
          <div class="card canvas-selectable" id="comp-table-card" style="display: flex; flex-direction: column;" onclick="selectComponent(this, 'table-card', 'Enterprise Accounts Table')">
            <span class="selection-tag">DataTable: Accounts</span>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <div>
                <h3 style="font-size: 15px; font-weight: 700;">Enterprise Accounts</h3>
                <p style="font-size: 12px; color: var(--sys-color-text-secondary);">Multi-attribute accounts grid</p>
              </div>
              <div style="position: relative;">
                <input type="text" class="text-input" placeholder="Filter accounts..." style="width: 150px; height: 30px; font-size: 12px; padding-left: 24px;" oninput="filterTable(this.value)">
                <i data-lucide="search" class="lucide-icon" style="position: absolute; left: 6px; top: 7px; width: 14px; height: 14px; color: var(--sys-color-text-tertiary);"></i>
              </div>
            </div>

            <div class="table-responsive-wrapper">
              <table class="data-table" id="accounts-table">
                <thead>
                  <tr>
                    <th>Account Name</th>
                    <th>Status</th>
                    <th style="text-align: right;">MRR</th>
                    <th>Health</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="font-weight: 600;">Acme Global</td>
                    <td><span class="status-pill delta-positive">● Active</span></td>
                    <td style="text-align: right;" class="tabular-nums font-mono">$42,500</td>
                    <td><span style="color: var(--sys-color-status-success-base); font-weight: 600;">92%</span></td>
                    <td><button class="btn btn-outline" style="padding: 2px 8px; font-size: 11px;">View</button></td>
                  </tr>
                  <tr>
                    <td style="font-weight: 600;">Globex Logistics</td>
                    <td><span class="status-pill" style="background: var(--sys-color-status-warning-surface); color: var(--sys-color-status-warning-text);">▲ Review</span></td>
                    <td style="text-align: right;" class="tabular-nums font-mono">$18,200</td>
                    <td><span style="color: var(--sys-color-status-warning-base); font-weight: 600;">64%</span></td>
                    <td><button class="btn btn-outline" style="padding: 2px 8px; font-size: 11px;">View</button></td>
                  </tr>
                  <tr>
                    <td style="font-weight: 600;">Initech Systems</td>
                    <td><span class="status-pill delta-negative">✖ Suspended</span></td>
                    <td style="text-align: right;" class="tabular-nums font-mono">$6,140</td>
                    <td><span style="color: var(--sys-color-status-danger-base); font-weight: 600;">28%</span></td>
                    <td><button class="btn btn-outline" style="padding: 2px 8px; font-size: 11px;">View</button></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="mobile-card-list">
              <div class="mobile-row-card">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-weight: 700; font-size: 14px;">Acme Global</span>
                  <span class="status-pill delta-positive">Active</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 12px;">
                  <span style="color: var(--sys-color-text-secondary);">MRR: <strong style="color: var(--sys-color-text-primary);">$42,500</strong></span>
                  <span style="color: var(--sys-color-text-secondary);">Health: <strong style="color: var(--sys-color-status-success-base);">92%</strong></span>
                </div>
              </div>
              <div class="mobile-row-card">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-weight: 700; font-size: 14px;">Globex Logistics</span>
                  <span class="status-pill" style="background: var(--sys-color-status-warning-surface); color: var(--sys-color-status-warning-text);">Review</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 12px;">
                  <span style="color: var(--sys-color-text-secondary);">MRR: <strong style="color: var(--sys-color-text-primary);">$18,200</strong></span>
                  <span style="color: var(--sys-color-text-secondary);">Health: <strong style="color: var(--sys-color-status-warning-base);">64%</strong></span>
                </div>
              </div>
            </div>

          </div>

        </div>

        <!-- ====================================================================
             2. GENERATIVE AI APPLICATION SUITE & MULTIMODAL RESPONSE
                (NARRATIVE TEXT + INLINE CHART + STRUCTURED TABLE IN ONE RESPONSE)
             ==================================================================== -->
        <div class="genai-suite-card canvas-selectable" id="comp-ai-assistant-card" onclick="selectComponent(this, 'ai-assistant-card', 'AI Assistant Response Card')">
          <span class="selection-tag">GenAI: Multimodal Studio</span>
          <div class="genai-header">
            <div class="genai-title">
              <i data-lucide="sparkles" class="lucide-icon" style="color: var(--color-ai-special-accent-primary);"></i>
              <span>Generative AI Multimodal Copilot</span>
              <span class="studio-brand-badge" style="background: var(--color-ai-special-accent-primary);">Text + Charts + Tables</span>
            </div>
            <button class="btn btn-outline" style="font-size: 12px;" onclick="event.stopPropagation(); simulateStreamingResponse()">
              <i data-lucide="play" class="lucide-icon"></i> Simulate Streaming Generation
            </button>
          </div>

          <!-- Conversational Canvas -->
          <div class="chat-thread">
            
            <!-- User Prompt Message Row (With User Avatar) -->
            <div class="chat-message-row user-row">
              <div class="chat-avatar user-avatar" title="You (Lead Analyst)">
                <i data-lucide="user" class="lucide-icon" style="width: 16px; height: 16px;"></i>
              </div>
              <div class="message-bubble message-user">
                Can you explain why our gross margin in EMEA contracted by 3.2% in October, compare it with other regions with a chart, provide a breakdown table of cost centers, and propose the corrected formula?
              </div>
            </div>

            <!-- Assistant Response Message Row: MULTIMODAL (TEXT + INLINE CHART + INLINE TABLE + DIFF) -->
            <div class="chat-message-row">
              <div class="chat-avatar ai-avatar" title="Enterprise Copilot">
                <i data-lucide="bot" class="lucide-icon" style="width: 18px; height: 18px;"></i>
              </div>
              <div class="message-bubble message-assistant">
                
                <!-- Borderless Reasoning / Chain of Thought Accordion -->
                <div class="reasoning-box-borderless">
                  <div class="reasoning-header" onclick="toggleReasoning()">
                    <span id="reasoning-title-text" style="display: flex; align-items: center; gap: 6px;">
                      <i data-lucide="chevron-down" id="reasoning-chevron" class="lucide-icon" style="width: 14px; height: 14px;"></i>
                      <span>Thought for 3.4 seconds (4 analytical steps completed)</span>
                    </span>
                    <span style="font-size: 10px; color: var(--color-ai-special-accent-primary); letter-spacing: 0.05em; font-weight: 700;">AUDITED & GROUNDED</span>
                  </div>
                  <div class="reasoning-body" id="reasoning-body">
                    <div><i data-lucide="check" class="lucide-icon" style="width: 12px; height: 12px; color: var(--sys-color-status-success-base);"></i> Queried PostgreSQL: <code>SELECT opex, cogs, gross_revenue FROM regional_ledger WHERE month='2026-10'</code></div>
                    <div><i data-lucide="check" class="lucide-icon" style="width: 12px; height: 12px; color: var(--sys-color-status-success-base);"></i> Executed Cross-Regional Variance Analysis (EMEA vs APAC vs NA vs LATAM)</div>
                    <div><i data-lucide="check" class="lucide-icon" style="width: 12px; height: 12px; color: var(--sys-color-status-success-base);"></i> Synthesized Grounding Citations against Supplier_Contract_2026.pdf & Accounting_Standards_v4.xlsx</div>
                  </div>
                </div>

                <!-- 1. Narrative Text Synthesis Section -->
                <div id="streaming-text-canvas" style="line-height: 1.6; margin-bottom: 14px;">
                  The <strong>3.2% gross margin contraction in EMEA</strong> during October was primarily caused by two interacting factors: unexpected transatlantic shipping tariffs indexed to emergency bunker fuel surcharges
                  <span class="citation-pill" onmouseenter="showCitation(1)" onmouseleave="hideCitation(1)">1
                    <div class="citation-popover" id="popover-1">
                      <strong>📄 Supply_Chain_Report_Oct.pdf (p.14)</strong>
                      <div style="font-size: 11px; color: var(--color-brand-placeholder-primary-600); margin: 2px 0;">96% Grounding Confidence</div>
                      <div style="font-size: 11px; color: var(--sys-color-text-secondary);">"...transatlantic shipping surcharges rose by 28.4% starting Oct 1st due to fuel tariff index..."</div>
                    </div>
                  </span>
                  combined with an unallocated returns reserve adjustment
                  <span class="citation-pill" onmouseenter="showCitation(2)" onmouseleave="hideCitation(2)">2
                    <div class="citation-popover" id="popover-2">
                      <strong>📄 Accounting_Standards_v4.xlsx</strong>
                      <div style="font-size: 11px; color: var(--color-brand-placeholder-primary-600); margin: 2px 0;">94% Grounding Confidence</div>
                      <div style="font-size: 11px; color: var(--sys-color-text-secondary);">"...reclassifies unallocated return reserves directly to COGS for Q4 adjustments..."</div>
                    </div>
                  </span>.
                </div>

                <!-- 2. INLINE EMBEDDED CHART WIDGET INSIDE AI RESPONSE -->
                <div class="ai-inline-widget-container">
                  <div class="ai-inline-widget-header">
                    <span style="display: flex; align-items: center; gap: 6px;">
                      <i data-lucide="bar-chart-2" class="lucide-icon" style="color: var(--color-ai-special-accent-primary);"></i>
                      <span>Regional Gross Margin Delta vs Q2 Baseline (October 2026)</span>
                    </span>
                    <span style="font-size: 11px; color: var(--sys-color-text-secondary);">Generated by AI</span>
                  </div>
                  <div class="ai-inline-chart-grid">
                    <div class="ai-chart-bar-col">
                      <div class="ai-chart-bar-track">
                        <div class="ai-chart-bar-fill" style="height: 75%; background: var(--sys-color-status-danger-base);"></div>
                      </div>
                      <span class="ai-chart-bar-label">EMEA</span>
                      <span class="ai-chart-bar-val" style="color: var(--sys-color-status-danger-text);">-3.2%</span>
                    </div>
                    <div class="ai-chart-bar-col">
                      <div class="ai-chart-bar-track">
                        <div class="ai-chart-bar-fill" style="height: 48%; background: var(--sys-color-status-success-base);"></div>
                      </div>
                      <span class="ai-chart-bar-label">APAC</span>
                      <span class="ai-chart-bar-val" style="color: var(--sys-color-status-success-text);">+1.8%</span>
                    </div>
                    <div class="ai-chart-bar-col">
                      <div class="ai-chart-bar-track">
                        <div class="ai-chart-bar-fill" style="height: 25%; background: var(--color-brand-placeholder-primary-600);"></div>
                      </div>
                      <span class="ai-chart-bar-label">NA</span>
                      <span class="ai-chart-bar-val" style="color: var(--color-brand-placeholder-primary-600);">+0.4%</span>
                    </div>
                    <div class="ai-chart-bar-col">
                      <div class="ai-chart-bar-track">
                        <div class="ai-chart-bar-fill" style="height: 35%; background: var(--sys-color-status-warning-base);"></div>
                      </div>
                      <span class="ai-chart-bar-label">LATAM</span>
                      <span class="ai-chart-bar-val" style="color: var(--sys-color-status-warning-text);">-0.9%</span>
                    </div>
                  </div>
                </div>

                <!-- 3. INLINE EMBEDDED STRUCTURED DATA TABLE INSIDE AI RESPONSE -->
                <div class="ai-inline-widget-container">
                  <div class="ai-inline-widget-header">
                    <span style="display: flex; align-items: center; gap: 6px;">
                      <i data-lucide="table" class="lucide-icon" style="color: var(--color-brand-placeholder-primary-600);"></i>
                      <span>EMEA Cost Center Variance Deconstruction</span>
                    </span>
                    <button class="btn btn-outline" style="padding: 2px 8px; font-size: 11px;" onclick="showToast('Exporting table to CSV...')">
                      <i data-lucide="download" class="lucide-icon" style="width: 12px; height: 12px;"></i> CSV
                    </button>
                  </div>
                  <table class="ai-inline-table">
                    <thead>
                      <tr>
                        <th>Cost Driver</th>
                        <th style="text-align: right;">October Impact</th>
                        <th style="text-align: right;">Variance</th>
                        <th>Citation Source</th>
                        <th>Action Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style="font-weight: 600;">Transatlantic Shipping Tariffs</td>
                        <td style="text-align: right;" class="tabular-nums font-mono">$48,200</td>
                        <td style="text-align: right;"><span class="status-pill delta-negative">+28.5% ▲</span></td>
                        <td><span style="font-size: 11px; color: var(--color-brand-placeholder-primary-600);">Filing_Doc_Oct.pdf [1]</span></td>
                        <td><span style="color: var(--sys-color-status-danger-base); font-weight: 600;">Critical Review</span></td>
                      </tr>
                      <tr>
                        <td style="font-weight: 600;">Returns Allowance Amortization</td>
                        <td style="text-align: right;" class="tabular-nums font-mono">$14,100</td>
                        <td style="text-align: right;"><span class="status-pill delta-negative">+43.8% ▲</span></td>
                        <td><span style="font-size: 11px; color: var(--color-brand-placeholder-primary-600);">Accounting_v4.xlsx [2]</span></td>
                        <td><span style="color: var(--sys-color-status-warning-base); font-weight: 600;">Formula Update</span></td>
                      </tr>
                      <tr>
                        <td style="font-weight: 600;">Raw Material Import Duty</td>
                        <td style="text-align: right;" class="tabular-nums font-mono">$22,400</td>
                        <td style="text-align: right;"><span class="status-pill delta-positive">+4.2% ●</span></td>
                        <td><span style="font-size: 11px; color: var(--sys-color-text-secondary);">Vendor_Ledger.csv</span></td>
                        <td><span style="color: var(--sys-color-status-success-base); font-weight: 600;">Acceptable</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <!-- 4. Interactive Formula Diff Viewer -->
                <div class="diff-container">
                  <div style="padding: 6px 12px; font-weight: 700; font-size: 11px; background: var(--sys-color-surface-sunken); color: var(--sys-color-text-secondary); display: flex; align-items: center; gap: 6px;">
                    <i data-lucide="code" class="lucide-icon" style="width: 14px; height: 14px; color: var(--color-ai-special-accent-primary);"></i>
                    <span>PROPOSED REVISED FORMULA DIFF</span>
                  </div>
                  <div class="diff-line-del">- net_margin = (gross_revenue - standard_cogs) / gross_revenue;</div>
                  <div class="diff-line-add">+ net_margin = (gross_revenue - standard_cogs - returns_allowance) / gross_revenue;</div>
                  <div class="diff-actions">
                    <button class="btn btn-primary" style="font-size: 11px; padding: 4px 10px;" onclick="showToast('✓ Formula Diff Accepted and committed to state!')">
                      <i data-lucide="check" class="lucide-icon" style="width: 12px; height: 12px;"></i> Accept Changes
                    </button>
                    <button class="btn btn-outline" style="font-size: 11px; padding: 4px 10px;" onclick="showToast('Diff opened in prompt composer for refinement.')">
                      <i data-lucide="edit-3" class="lucide-icon" style="width: 12px; height: 12px;"></i> Refine with AI
                    </button>
                    <button class="btn btn-outline" style="font-size: 11px; padding: 4px 10px; color: var(--sys-color-status-danger-text);" onclick="openRejectFeedbackModal()">
                      <i data-lucide="x" class="lucide-icon" style="width: 12px; height: 12px;"></i> Reject
                    </button>
                  </div>
                </div>

                <!-- 5. Assistant Action Bar -->
                <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 14px; padding-top: 10px; border-top: 1px solid var(--sys-color-border-subtle);">
                  <div style="display: flex; gap: 8px;">
                    <button class="btn btn-outline" style="padding: 4px 8px; font-size: 11px;" onclick="showToast('✓ Full multimodal response copied as Markdown!')">
                      <i data-lucide="copy" class="lucide-icon"></i> Copy Markdown
                    </button>
                    <button class="btn btn-outline" style="padding: 4px 8px; font-size: 11px;" onclick="simulateStreamingResponse()">
                      <i data-lucide="refresh-cw" class="lucide-icon"></i> Regenerate
                    </button>
                  </div>
                  <div style="display: flex; gap: 6px;">
                    <button class="btn btn-outline" style="padding: 4px 8px; font-size: 11px;" onclick="showToast('👍 Response marked as helpful!')">
                      <i data-lucide="thumbs-up" class="lucide-icon"></i>
                    </button>
                    <button class="btn btn-outline" style="padding: 4px 8px; font-size: 11px;" onclick="openRejectFeedbackModal()">
                      <i data-lucide="thumbs-down" class="lucide-icon"></i>
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>

          <!-- Multimodal Prompt Composer with Icon-Only Send Button -->
          <div class="prompt-composer" id="comp-composer-card" onclick="selectComponent(this, 'composer-card', 'Prompt Composer Box')">
            <span class="selection-tag">PromptComposer</span>
            <div class="context-chips-row">
              <div class="context-chip">
                <i data-lucide="file-spreadsheet" class="lucide-icon" style="width: 12px; height: 12px;"></i>
                <span>EMEA_Financials_Q4.csv</span>
                <span class="context-chip-remove" onclick="this.parentElement.remove()">✕</span>
              </div>
              <div class="context-chip">
                <i data-lucide="database" class="lucide-icon" style="width: 12px; height: 12px;"></i>
                <span>Revenue_Table</span>
                <span class="context-chip-remove" onclick="this.parentElement.remove()">✕</span>
              </div>
            </div>

            <textarea class="composer-textarea" id="prompt-input" placeholder="Ask a question about this dashboard or type '/' for slash commands..." oninput="autoGrowTextarea(this)"></textarea>

            <div class="composer-footer">
              <div class="composer-left-actions">
                <button class="slash-pill" onclick="insertSlashCommand()">
                  <i data-lucide="terminal" class="lucide-icon" style="width: 12px; height: 12px;"></i>
                  <span>Slash Commands</span>
                </button>
                <button class="btn btn-outline" style="padding: 4px 8px; border: none; background: transparent;" title="Attach File">
                  <i data-lucide="paperclip" class="lucide-icon"></i>
                </button>
                <button class="btn btn-outline" style="padding: 4px 8px; border: none; background: transparent;" title="Voice Dictation">
                  <i data-lucide="mic" class="lucide-icon"></i>
                </button>
              </div>
              
              <div style="display: flex; align-items: center; gap: 12px;">
                <span class="token-meter" id="token-meter">482 / 8,000 tokens</span>
                <button class="btn-send-icon" id="composer-submit-btn" title="Send Prompt (Enter)" onclick="simulateStreamingResponse()">
                  <i data-lucide="arrow-up" id="send-btn-icon" class="lucide-icon" style="width: 18px; height: 18px;"></i>
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>

    </main>

  </div>

  <!-- ========================================================================
       MODAL 1: EXPORT MODAL (Tokens + Full Component & Layout Export)
       ======================================================================== -->
  <div class="modal-backdrop" id="export-modal" onclick="closeExportModal(event)">
    <div class="modal-dialog" onclick="event.stopPropagation()">
      <div class="modal-header">
        <div style="display: flex; align-items: center; gap: 8px;">
          <i data-lucide="download" class="lucide-icon" style="color: var(--color-brand-placeholder-primary-600); width: 20px; height: 20px;"></i>
          <h2 style="font-size: 16px; font-weight: 700;">Export Brand Design System & Components</h2>
        </div>
        <button class="btn btn-outline" style="padding: 4px 10px;" onclick="closeExportModal()">✕</button>
      </div>

      <div class="modal-tabs">
        <button class="modal-tab-btn active" onclick="switchExportTab('figma-components')">🎨 Figma Components & Layout</button>
        <button class="modal-tab-btn" onclick="switchExportTab('figma-tokens')">📦 Figma Tokens Studio</button>
        <button class="modal-tab-btn" onclick="switchExportTab('lovable')">❤️ Lovable (Tailwind)</button>
        <button class="modal-tab-btn" onclick="switchExportTab('antigravity')">🚀 Antigravity (Agent Rules)</button>
        <button class="modal-tab-btn" onclick="switchExportTab('css')">💻 CSS Variables</button>
      </div>

      <div class="modal-body">
        <div id="export-desc" style="font-size: 13px; color: var(--sys-color-text-secondary); margin-bottom: 12px;">
          Figma Component & Layout specification (Auto-Layout, Frames, Constraints) ready for import:
        </div>
        <pre class="code-export-preview" id="export-code-block"></pre>
      </div>

      <div class="modal-footer">
        <button class="btn btn-outline" onclick="copyModalCode()">
          <i data-lucide="copy" class="lucide-icon"></i> Copy Snippet
        </button>
        <button class="btn btn-primary" onclick="downloadActiveExport()">
          <i data-lucide="download" class="lucide-icon"></i> Download File
        </button>
      </div>
    </div>
  </div>

  <!-- ========================================================================
       MODAL 2: REJECT FEEDBACK CAPTURE MODAL
       ======================================================================== -->
  <div class="modal-backdrop" id="feedback-modal" onclick="closeFeedbackModal(event)">
    <div class="modal-dialog" style="max-width: 500px;" onclick="event.stopPropagation()">
      <div class="modal-header">
        <div style="display: flex; align-items: center; gap: 8px;">
          <i data-lucide="message-square" class="lucide-icon" style="color: var(--sys-color-status-danger-base); width: 18px; height: 18px;"></i>
          <h2 style="font-size: 15px; font-weight: 700;">Why did you reject this recommendation?</h2>
        </div>
        <button class="btn btn-outline" style="padding: 2px 8px;" onclick="closeFeedbackModal()">✕</button>
      </div>

      <div class="modal-body" style="padding: 16px 20px;">
        <p style="font-size: 12px; color: var(--sys-color-text-secondary); margin-bottom: 12px;">
          Your feedback grounds future model reasoning and updates enterprise validation rules.
        </p>

        <label class="feedback-option-chip">
          <input type="radio" name="reject-reason" value="incorrect-calc" checked>
          <span>Incorrect mathematical calculation or wrong formula logic</span>
        </label>
        <label class="feedback-option-chip">
          <input type="radio" name="reject-reason" value="hallucinated-data">
          <span>Hallucinated / unverified citation or data source</span>
        </label>
        <label class="feedback-option-chip">
          <input type="radio" name="reject-reason" value="outdated-policy">
          <span>Violates updated internal accounting or reporting standard</span>
        </label>
        <label class="feedback-option-chip">
          <input type="radio" name="reject-reason" value="irrelevant">
          <span>Does not address the original analytical prompt</span>
        </label>
        <label class="feedback-option-chip">
          <input type="radio" name="reject-reason" value="other">
          <span>Other reason</span>
        </label>

        <div style="margin-top: 12px;">
          <label style="font-size: 12px; font-weight: 600; display: block; margin-bottom: 6px;">
            Additional comments / custom correction (optional):
          </label>
          <textarea id="custom-feedback-input" class="text-input" style="height: 70px; resize: none; padding: 8px;" placeholder="Provide additional context to guide model retraining..."></textarea>
        </div>
      </div>

      <div class="modal-footer" style="padding: 12px 20px;">
        <button class="btn btn-outline" onclick="closeFeedbackModal()">Cancel</button>
        <button class="btn btn-primary" onclick="submitRejectFeedback()">
          <i data-lucide="check" class="lucide-icon"></i> Submit Feedback
        </button>
      </div>
    </div>
  </div>

  <!-- ========================================================================
       MODAL 3: AI ANOMALY DIAGNOSTIC MODAL
       ======================================================================== -->
  <div class="modal-backdrop" id="anomaly-modal" onclick="closeAnomalyModal(event)">
    <div class="modal-dialog" style="max-width: 580px;" onclick="event.stopPropagation()">
      <div class="modal-header">
        <div style="display: flex; align-items: center; gap: 8px;">
          <i data-lucide="alert-triangle" class="lucide-icon" style="color: var(--color-ai-special-accent-primary); width: 20px; height: 20px;"></i>
          <h2 style="font-size: 16px; font-weight: 700;">AI Root Cause Diagnosis: Revenue Anomaly Spike</h2>
        </div>
        <button class="btn btn-outline" style="padding: 2px 8px;" onclick="closeAnomalyModal()">✕</button>
      </div>

      <div class="modal-body" style="padding: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; background: var(--sys-color-surface-sunken); padding: 12px; border-radius: 8px; margin-bottom: 16px;">
          <div>
            <div style="font-size: 11px; text-transform: uppercase; color: var(--sys-color-text-secondary); font-weight: 600;">Anomaly Deviation</div>
            <div style="font-size: 22px; font-weight: 700; color: var(--color-ai-special-accent-primary);">+$42,500.00 (+26.4%)</div>
          </div>
          <span class="status-pill delta-positive">Verified Grounding</span>
        </div>

        <h4 style="font-size: 13px; font-weight: 700; margin-bottom: 6px;">Causal Factor Analysis:</h4>
        <ul style="font-size: 13px; line-height: 1.6; color: var(--sys-color-text-primary); margin-left: 18px; margin-bottom: 16px;">
          <li>Multi-seat enterprise expansion closed on Nov 12 with <strong>Acme Global Corp</strong>.</li>
          <li>Trans-Atlantic cloud usage spiked 310% during European business hours.</li>
          <li>System SLA maintained 100% with zero latency degradation.</li>
        </ul>

        <div style="background: rgba(124, 58, 237, 0.08); border: 1px solid var(--color-ai-special-accent-primary); border-radius: 8px; padding: 12px; font-size: 12px; color: var(--sys-color-text-primary);">
          <strong>✨ Recommended Executive Action:</strong>
          <div style="margin-top: 4px;">Allocate an additional $15,000 capacity reserve to EMEA AWS availability zone to sustain peak momentum into Q1.</div>
        </div>
      </div>

      <div class="modal-footer" style="padding: 12px 20px;">
        <button class="btn btn-outline" onclick="closeAnomalyModal()">Dismiss</button>
        <button class="btn btn-primary" onclick="showToast('✓ Anomaly report sent to executive briefing channel'); closeAnomalyModal();">
          <i data-lucide="share-2" class="lucide-icon"></i> Share with Team
        </button>
      </div>
    </div>
  </div>

  <!-- TOAST NOTIFICATION -->
  <div class="toast" id="toast-notify">✓ Notification message</div>

  <!-- ========================================================================
       STUDIO CORE CLIENT JAVASCRIPT ENGINE
       ======================================================================== -->
  <script>
    // State Store with Dedicated Component Customization Cache
    const state = {
      device: 'laptop',
      density: 'comfortable',
      theme: 'light',
      selectedTarget: 'global', // 'global' or 'kpi-1', 'kpi-2', etc.
      colors: {
        primary: '#7C3AED',
        secondary: '#06B6D4',
        aiAccent: '#EC4899',
        neutralFamily: 'slate',
        canvasBg: '#F8FAFC',
        cardBg: '#FFFFFF',
        borderColor: '#E2E8F0',
        canvasGradient: false,
        cardGradient: false
      },
      geometry: {
        globalRadius: 12,
        padX: 20,
        padY: 20,
        gap: 16,
        borderWidth: 1,
        shadow: 'sm',
        corners: { tl: 12, tr: 12, br: 12, bl: 12 }
      },
      fonts: {
        sans: 'Inter',
        display: 'Inter',
        mono: 'JetBrains Mono'
      },
      activeExportTab: 'figma-components'
    };

    // Color conversion & ramp generation math
    function hexToHsl(hex) {
      let c = hex.replace('#', '');
      if (c.length === 3) c = c.split('').map(x => x + x).join('');
      const r = parseInt(c.substr(0,2), 16) / 255;
      const g = parseInt(c.substr(2,2), 16) / 255;
      const b = parseInt(c.substr(4,2), 16) / 255;
      const max = Math.max(r, g, b), min = Math.min(r, g, b);
      let h, s, l = (max + min) / 2;
      if (max === min) {
        h = s = 0;
      } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
      }
      return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
    }

    function hslToHex(h, s, l) {
      s /= 100; l /= 100;
      const c = (1 - Math.abs(2 * l - 1)) * s;
      const x = c * (1 - Math.abs((h / 60) % 2 - 1));
      const m = l - c / 2;
      let r = 0, g = 0, b = 0;
      if (0 <= h && h < 60) { r = c; g = x; b = 0; }
      else if (60 <= h && h < 120) { r = x; g = c; b = 0; }
      else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
      else if (180 <= h && h < 240) { r = 0; g = x; b = 0; }
      else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
      else if (300 <= h && h < 360) { r = c; g = 0; b = x; }
      r = Math.round((r + m) * 255).toString(16).padStart(2, '0');
      g = Math.round((g + m) * 255).toString(16).padStart(2, '0');
      b = Math.round((b + m) * 255).toString(16).padStart(2, '0');
      return \`#\${r}\${g}\${b}\`.toUpperCase();
    }

    function generateShadeRamp(baseHex) {
      const [h, s] = hexToHsl(baseHex);
      const lightnesses = {
        50: 96, 100: 91, 200: 82, 300: 71, 400: 60,
        500: 50, 600: 42, 700: 34, 800: 25, 900: 17, 950: 10
      };
      const ramp = {};
      for (const [shade, l] of Object.entries(lightnesses)) {
        ramp[shade] = hslToHex(h, s, l);
      }
      return ramp;
    }

    function applyColors() {
      const root = document.documentElement;
      const ramp = generateShadeRamp(state.colors.primary);

      for (const [shade, hex] of Object.entries(ramp)) {
        root.style.setProperty(\`--color-brand-placeholder-primary-\${shade}\`, hex);
      }
      root.style.setProperty('--sys-color-interactive-primary-default', ramp[600]);
      root.style.setProperty('--sys-color-interactive-primary-hover', ramp[700]);
      root.style.setProperty('--sys-color-interactive-primary-active', ramp[800]);
      root.style.setProperty('--sys-color-border-focus', ramp[500]);

      root.style.setProperty('--color-brand-placeholder-secondary-500', state.colors.secondary);
      root.style.setProperty('--color-ai-special-accent-cyan', state.colors.secondary);
      root.style.setProperty('--color-ai-special-accent-primary', state.colors.aiAccent);
      root.style.setProperty('--sys-color-ai-accent', state.colors.aiAccent);
      root.style.setProperty('--sys-color-surface-ai-subtle', \`\${state.colors.aiAccent}0F\`);
      root.style.setProperty('--sys-color-border-ai', state.colors.aiAccent);

      const rampContainer = document.getElementById('primary-ramp-preview');
      if (rampContainer) {
        rampContainer.innerHTML = '';
        [50, 100, 200, 300, 400, 500, 600, 700, 800, 900].forEach(s => {
          const box = document.createElement('div');
          box.style.background = ramp[s];
          box.title = \`\${s}: \${ramp[s]}\`;
          rampContainer.appendChild(box);
        });
      }
    }

    function updatePrimaryColor(hex) {
      if (!/^#([0-9A-F]{3}){1,2}$/i.test(hex)) return;
      state.colors.primary = hex;
      document.getElementById('primary-color-picker').value = hex;
      document.getElementById('primary-hex-input').value = hex;
      document.getElementById('primary-hex-label').textContent = hex;
      applyColors();
    }

    function updateSecondaryColor(hex) {
      if (!/^#([0-9A-F]{3}){1,2}$/i.test(hex)) return;
      state.colors.secondary = hex;
      document.getElementById('secondary-color-picker').value = hex;
      document.getElementById('secondary-hex-input').value = hex;
      document.getElementById('secondary-hex-label').textContent = hex;
      applyColors();
    }

    function updateAiColor(hex) {
      if (!/^#([0-9A-F]{3}){1,2}$/i.test(hex)) return;
      state.colors.aiAccent = hex;
      document.getElementById('ai-color-picker').value = hex;
      document.getElementById('ai-hex-input').value = hex;
      applyColors();
    }

    function updateNeutralFamily(family) {
      state.colors.neutralFamily = family;
      const root = document.documentElement;
      const palettes = {
        slate: { canvas: '#F8FAFC', card: '#FFFFFF', sunken: '#F1F5F9', border: '#E2E8F0' },
        zinc: { canvas: '#F4F4F5', card: '#FFFFFF', sunken: '#E4E4E7', border: '#D4D4D8' },
        neutral: { canvas: '#F5F5F5', card: '#FFFFFF', sunken: '#E5E5E5', border: '#D4D4D4' },
        stone: { canvas: '#F5F5F4', card: '#FAF9F6', sunken: '#E7E5E4', border: '#D6D3D1' }
      };
      const p = palettes[family] || palettes.slate;
      updateCanvasBg(p.canvas);
      updateCardBg(p.card);
      root.style.setProperty('--sys-color-surface-sunken', p.sunken);
      updateBorderColor(p.border);
      showToast(\`Neutral tone applied: \${family.toUpperCase()}\`);
    }

    function updateCanvasBg(hex) {
      state.colors.canvasBg = hex;
      document.getElementById('canvas-bg-picker').value = hex;
      document.getElementById('canvas-bg-input').value = hex;
      document.documentElement.style.setProperty('--sys-color-surface-canvas', hex);
      document.body.style.backgroundColor = hex;
    }

    function toggleCanvasGradient(enabled) {
      state.colors.canvasGradient = enabled;
      document.getElementById('canvas-grad-select').disabled = !enabled;
      if (enabled) {
        updateCanvasGradientPreset(document.getElementById('canvas-grad-select').value);
      } else {
        document.documentElement.style.setProperty('--canvas-bg-gradient', 'none');
        document.body.style.backgroundImage = 'none';
      }
    }

    function updateCanvasGradientPreset(preset) {
      let grad = 'none';
      if (preset === 'subtle-radial') {
        grad = \`radial-gradient(circle at top right, \${state.colors.primary}18, transparent 40%), radial-gradient(circle at bottom left, \${state.colors.secondary}14, transparent 40%)\`;
      } else if (preset === 'linear-brand-tint') {
        grad = \`linear-gradient(180deg, \${state.colors.primary}0D 0%, transparent 35%)\`;
      } else if (preset === 'mesh-ai') {
        grad = \`radial-gradient(at 0% 0%, \${state.colors.primary}15 0px, transparent 50%), radial-gradient(at 100% 100%, \${state.colors.aiAccent}12 0px, transparent 50%)\`;
      }
      document.documentElement.style.setProperty('--canvas-bg-gradient', grad);
      document.body.style.backgroundImage = grad;
    }

    function updateCardBg(hex) {
      state.colors.cardBg = hex;
      document.getElementById('card-bg-picker').value = hex;
      document.getElementById('card-bg-input').value = hex;
      document.documentElement.style.setProperty('--sys-color-surface-card', hex);
      document.documentElement.style.setProperty('--card-custom-bg', hex);
    }

    // ========================================================================
    // FIGMA INSPECTOR: TWO-WAY BINDING TO SPECIFIC COMPONENTS OR GLOBAL
    // ========================================================================
    function getTargetElement() {
      if (state.selectedTarget === 'global') return null;
      return document.getElementById(\`comp-\${state.selectedTarget}\`);
    }

    function handleTargetSelectionChange(val) {
      state.selectedTarget = val;
      document.querySelectorAll('.canvas-selectable').forEach(el => el.classList.remove('selected'));
      const el = getTargetElement();
      if (el) {
        el.classList.add('selected');
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      showToast(\`Inspector target: \${val.toUpperCase()}\`);
    }

    function selectComponent(el, targetId, readableName) {
      document.querySelectorAll('.canvas-selectable').forEach(c => c.classList.remove('selected'));
      el.classList.add('selected');
      state.selectedTarget = targetId;
      document.getElementById('inspector-target-select').value = targetId;
      switchSidebarTab('inspector');
    }

    function setComponentState(stateName) {
      document.querySelectorAll('.state-switcher-group .state-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.toLowerCase() === stateName);
      });
      const target = getTargetElement();
      const elementsToModify = target ? [target] : document.querySelectorAll('.card');

      elementsToModify.forEach(el => {
        el.classList.remove('is-skeleton');
        if (stateName === 'skeleton') {
          el.classList.add('is-skeleton');
        } else if (stateName === 'hover') {
          el.style.transform = 'translateY(-2px)';
          el.style.boxShadow = 'var(--shadow-lg)';
        } else if (stateName === 'error') {
          el.style.borderColor = 'var(--sys-color-status-danger-base)';
        } else {
          el.style.transform = '';
          el.style.boxShadow = '';
          el.style.borderColor = '';
        }
      });
      showToast(\`State: \${stateName.toUpperCase()}\`);
    }

    function updateAutoLayoutPaddingX(val) {
      state.geometry.padX = val;
      document.getElementById('pad-x-badge').textContent = \`\${val}px\`;
      const target = getTargetElement();
      if (target) {
        target.style.setProperty('--card-custom-pad-x', \`\${val}px\`);
      } else {
        document.documentElement.style.setProperty('--card-custom-pad-x', \`\${val}px\`);
      }
    }

    function updateAutoLayoutPaddingY(val) {
      state.geometry.padY = val;
      document.getElementById('pad-y-badge').textContent = \`\${val}px\`;
      const target = getTargetElement();
      if (target) {
        target.style.setProperty('--card-custom-pad-y', \`\${val}px\`);
      } else {
        document.documentElement.style.setProperty('--card-custom-pad-y', \`\${val}px\`);
      }
    }

    function updateAutoLayoutGap(val) {
      state.geometry.gap = val;
      document.getElementById('gap-badge').textContent = \`\${val}px\`;
      document.getElementById('main-kpi-grid').style.setProperty('--kpi-grid-gap', \`\${val}px\`);
    }

    function updateUniformRadius(val) {
      state.geometry.globalRadius = val;
      document.getElementById('radius-val-badge').textContent = \`\${val}px\`;
      document.getElementById('corner-tl').value = val;
      document.getElementById('corner-tr').value = val;
      document.getElementById('corner-br').value = val;
      document.getElementById('corner-bl').value = val;

      const target = getTargetElement();
      if (target) {
        target.style.borderRadius = \`\${val}px\`;
      } else {
        document.documentElement.style.setProperty('--custom-card-radius', \`\${val}px\`);
      }
    }

    function updateIndependentCorners() {
      const tl = document.getElementById('corner-tl').value || 0;
      const tr = document.getElementById('corner-tr').value || 0;
      const br = document.getElementById('corner-br').value || 0;
      const bl = document.getElementById('corner-bl').value || 0;
      const radStr = \`\${tl}px \${tr}px \${br}px \${bl}px\`;

      const target = getTargetElement();
      if (target) {
        target.style.borderRadius = radStr;
      } else {
        document.documentElement.style.setProperty('--card-tl-radius', \`\${tl}px\`);
        document.documentElement.style.setProperty('--card-tr-radius', \`\${tr}px\`);
        document.documentElement.style.setProperty('--card-br-radius', \`\${br}px\`);
        document.documentElement.style.setProperty('--card-bl-radius', \`\${bl}px\`);
      }
    }

    function updateBorderWidth(val) {
      state.geometry.borderWidth = val;
      document.getElementById('border-width-badge').textContent = \`\${val}px\`;
      const target = getTargetElement();
      if (target) {
        target.style.borderWidth = \`\${val}px\`;
      } else {
        document.documentElement.style.setProperty('--custom-card-border-width', \`\${val}px\`);
      }
    }

    function updateBorderColor(hex) {
      state.colors.borderColor = hex;
      document.getElementById('border-color-picker').value = hex;
      document.getElementById('border-color-input').value = hex;
      const target = getTargetElement();
      if (target) {
        target.style.borderColor = hex;
      } else {
        document.documentElement.style.setProperty('--custom-card-border-color', hex);
        document.documentElement.style.setProperty('--sys-color-border-subtle', hex);
      }
    }

    function updateShadowPreset(preset) {
      const presets = {
        'none': 'none',
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.12)',
        'ai-glow': '0 0 20px 2px rgba(124, 58, 237, 0.25)'
      };
      const sh = presets[preset] || presets.sm;
      const target = getTargetElement();
      if (target) {
        target.style.boxShadow = sh;
      } else {
        document.documentElement.style.setProperty('--card-custom-shadow', sh);
      }
    }

    function updateSelectedContentText(field, val) {
      if (state.selectedTarget.startsWith('kpi')) {
        const el = document.getElementById(\`\${state.selectedTarget}-\${field}\`);
        if (el) el.textContent = val;
      }
    }

    function toggleSlotVisibility(slot, isVisible) {
      const target = getTargetElement();
      const parent = target || document;
      parent.querySelectorAll(\`.kpi-slot-\${slot}\`).forEach(el => {
        el.style.display = isVisible ? '' : 'none';
      });
    }

    function saveComponentVariant() {
      const target = state.selectedTarget;
      const list = document.getElementById('saved-components-list');
      const item = document.createElement('div');
      item.style.cssText = 'background: var(--sys-color-surface-sunken); padding: 8px 10px; border-radius: 6px; border: 1px solid var(--sys-color-border-subtle); display: flex; justify-content: space-between; align-items: center;';
      item.innerHTML = \`
        <div>
          <strong style="font-size: 12px;">\${target}.Variant_\${Date.now().toString().slice(-4)}</strong>
          <div style="font-size: 10px; color: var(--sys-color-text-secondary);">Radius: \${state.geometry.globalRadius}px • Pad: \${state.geometry.padX}px</div>
        </div>
        <button class="btn btn-outline" style="padding: 2px 6px; font-size: 10px;" onclick="showToast('Variant applied to canvas')">Apply</button>
      \`;
      list.appendChild(item);
      const count = document.getElementById('saved-count');
      count.textContent = parseInt(count.textContent) + 1;
      showToast(\`✓ Component '\${target}' variant saved to Library registry!\`);
    }

    function switchSidebarTab(tab) {
      document.querySelectorAll('.sidebar-tab-btn').forEach(b => b.classList.remove('active'));
      document.getElementById(\`tab-btn-\${tab}\`).classList.add('active');
      document.getElementById('sidebar-tab-brand-content').style.display = tab === 'brand' ? 'block' : 'none';
      document.getElementById('sidebar-tab-inspector-content').style.display = tab === 'inspector' ? 'block' : 'none';
    }

    // Typography
    function loadGoogleFont(fontName) {
      if (['system-ui', 'monospace'].includes(fontName)) return;
      const cleanName = fontName.replace(/\\s+/g, '+');
      const link = document.getElementById('dynamic-font-link');
      link.href = \`https://fonts.googleapis.com/css2?family=\${cleanName}:wght@400;500;600;700&display=swap\`;
    }

    function updateSansFont(font) {
      state.fonts.sans = font;
      loadGoogleFont(font);
      document.documentElement.style.setProperty('--typography-font-family-sans', font);
      document.body.style.fontFamily = font;
    }

    function updateDisplayFont(font) {
      state.fonts.display = font;
      loadGoogleFont(font);
      document.documentElement.style.setProperty('--typography-font-family-display', font);
    }

    function updateMonoFont(font) {
      state.fonts.mono = font;
      loadGoogleFont(font);
      document.documentElement.style.setProperty('--typography-font-family-mono', font);
    }

    // Presets
    const presets = {
      'ai-violet': { primary: '#7C3AED', secondary: '#06B6D4', aiAccent: '#EC4899', sans: 'Inter' },
      'corporate-blue': { primary: '#2563EB', secondary: '#0D9488', aiAccent: '#8B5CF6', sans: 'Plus Jakarta Sans' },
      'fintech-emerald': { primary: '#059669', secondary: '#F59E0B', aiAccent: '#10B981', sans: 'Inter' },
      'cyber-amber': { primary: '#D97706', secondary: '#3B82F6', aiAccent: '#F59E0B', sans: 'Space Grotesk' },
      'slate-minimal': { primary: '#334155', secondary: '#64748B', aiAccent: '#475569', sans: 'Inter' }
    };

    function applyPresetTheme(presetKey) {
      const p = presets[presetKey];
      if (!p) return;
      updatePrimaryColor(p.primary);
      updateSecondaryColor(p.secondary);
      updateAiColor(p.aiAccent);
      updateSansFont(p.sans);
      document.getElementById('sans-font-select').value = p.sans;
      showToast(\`Applied preset: \${presetKey}\`);
    }

    function resetPalette() { applyPresetTheme('ai-violet'); }

    // Device & Density Modes
    function setDeviceMode(mode) {
      state.device = mode;
      const frame = document.getElementById('viewport-frame');
      frame.className = \`viewport-frame mode-\${mode}\`;
      document.querySelectorAll('.studio-controls .control-pill-group')[0].querySelectorAll('.control-pill').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.toLowerCase().includes(mode));
      });
      showToast(\`Viewport mode: \${mode.toUpperCase()}\`);
    }

    function setDensity(density) {
      state.density = density;
      document.body.setAttribute('data-density', density);
      document.querySelectorAll('.studio-controls .control-pill-group')[1].querySelectorAll('.control-pill').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.toLowerCase() === density);
      });
      showToast(\`Density set to: \${density.toUpperCase()}\`);
    }

    function toggleTheme() {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      document.body.setAttribute('data-theme', state.theme);
      const btn = document.getElementById('theme-toggle-btn');
      btn.innerHTML = state.theme === 'dark' ? '<i data-lucide="moon" class="lucide-icon"></i> Dark' : '<i data-lucide="sun" class="lucide-icon"></i> Light';
      lucide.createIcons();
    }

    // Sparklines
    function handleSparklineHover(e) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const pct = Math.max(0, Math.min(1, x / rect.width));
      const tip = document.getElementById('sparkline-tip');
      tip.style.display = 'block';
      tip.style.left = \`\${x}px\`;
      const val = (175 + pct * 15).toFixed(1);
      const day = Math.round(1 + pct * 29);
      tip.textContent = \`Nov \${day}: \${val}k\`;
    }

    function hideSparklineTooltip() {
      document.getElementById('sparkline-tip').style.display = 'none';
    }

    function autoGrowTextarea(el) {
      el.style.height = 'auto';
      el.style.height = (el.scrollHeight) + 'px';
      const words = el.value.trim().split(/\\s+/).filter(Boolean).length;
      document.getElementById('token-meter').textContent = \`\${Math.round(words * 1.33)} / 8,000 tokens\`;
    }

    function insertSlashCommand() {
      const area = document.getElementById('prompt-input');
      area.value = '/summarize region="EMEA" include_chart=true include_table=true';
      autoGrowTextarea(area);
      area.focus();
    }

    function toggleReasoning() {
      const body = document.getElementById('reasoning-body');
      const isHidden = body.style.display === 'none';
      body.style.display = isHidden ? 'flex' : 'none';
      const chevron = document.getElementById('reasoning-chevron');
      if (chevron) {
        chevron.style.transform = isHidden ? 'rotate(0deg)' : 'rotate(-90deg)';
      }
    }

    function showCitation(id) { document.getElementById(\`popover-\${id}\`).style.display = 'block'; }
    function hideCitation(id) { document.getElementById(\`popover-\${id}\`).style.display = 'none'; }

    // Streaming Simulation
    let streamTimer = null;
    function simulateStreamingResponse() {
      if (streamTimer) clearInterval(streamTimer);
      const canvas = document.getElementById('streaming-text-canvas');
      const btn = document.getElementById('composer-submit-btn');
      btn.innerHTML = '<i data-lucide="square" class="lucide-icon" style="width: 14px; height: 14px;"></i>';
      btn.style.background = '#EF4444';
      lucide.createIcons();

      const fullText = "The 3.2% gross margin contraction in EMEA was driven primarily by emergency transatlantic shipping tariffs [1] combined with delayed returns allowance amortization [2]. Below is the cross-regional variance chart and cost-center table deconstructing the impact.";
      canvas.innerHTML = '<span class="ai-cursor-pulse"></span>';

      let i = 0;
      streamTimer = setInterval(() => {
        if (i < fullText.length) {
          canvas.innerHTML = fullText.substring(0, i + 1) + '<span class="ai-cursor-pulse"></span>';
          i += 4;
        } else {
          clearInterval(streamTimer);
          canvas.innerHTML = \`The <strong>3.2% gross margin contraction in EMEA</strong> during October was primarily caused by two interacting factors: unexpected transatlantic shipping tariffs indexed to emergency bunker fuel surcharges <span class="citation-pill" onmouseenter="showCitation(1)" onmouseleave="hideCitation(1)">1<div class="citation-popover" id="popover-1"><strong>📄 Supply_Chain_Report_Oct.pdf (p.14)</strong><div style="font-size: 11px; color: var(--color-brand-placeholder-primary-600); margin: 2px 0;">96% Grounding Confidence</div><div style="font-size: 11px; color: var(--sys-color-text-secondary);">"...transatlantic shipping surcharges rose by 28.4% starting Oct 1st due to fuel tariff index..."</div></div></span> combined with an unallocated returns reserve adjustment <span class="citation-pill" onmouseenter="showCitation(2)" onmouseleave="hideCitation(2)">2<div class="citation-popover" id="popover-2"><strong>📄 Accounting_Standards_v4.xlsx</strong><div style="font-size: 11px; color: var(--color-brand-placeholder-primary-600); margin: 2px 0;">94% Grounding Confidence</div><div style="font-size: 11px; color: var(--sys-color-text-secondary);">"...reclassifies unallocated return reserves directly to COGS for Q4 adjustments..."</div></div></span>.\`;
          btn.innerHTML = '<i data-lucide="arrow-up" class="lucide-icon" style="width: 18px; height: 18px;"></i>';
          btn.style.background = '';
          lucide.createIcons();
          showToast('✓ AI Token Stream completed!');
        }
      }, 25);
    }

    function simulateAiChartInsight() { openAnomalyModal(); }

    function filterTable(query) {
      const q = query.toLowerCase();
      document.querySelectorAll('#accounts-table tbody tr').forEach(row => {
        row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
      });
    }

    function openAnomalyModal() {
      document.getElementById('anomaly-modal').style.display = 'flex';
      lucide.createIcons();
    }
    function closeAnomalyModal(e) {
      if (e && e.target && e.target !== document.getElementById('anomaly-modal')) return;
      document.getElementById('anomaly-modal').style.display = 'none';
    }

    function openRejectFeedbackModal() {
      document.getElementById('feedback-modal').style.display = 'flex';
      lucide.createIcons();
    }
    function closeFeedbackModal(e) {
      if (e && e.target && e.target !== document.getElementById('feedback-modal')) return;
      document.getElementById('feedback-modal').style.display = 'none';
    }
    function submitRejectFeedback() {
      const reason = document.querySelector('input[name="reject-reason"]:checked')?.value || 'other';
      closeFeedbackModal();
      showToast(\`✓ Feedback captured (\${reason}). Thank you for training model!\`);
    }

    // Export Modal Engine
    function openExportModal() {
      document.getElementById('export-modal').style.display = 'flex';
      switchExportTab(state.activeExportTab);
      lucide.createIcons();
    }
    function closeExportModal(e) {
      if (e && e.target && e.target !== document.getElementById('export-modal')) return;
      document.getElementById('export-modal').style.display = 'none';
    }

    function switchExportTab(tab) {
      state.activeExportTab = tab;
      document.querySelectorAll('.modal-tab-btn').forEach(b => b.classList.remove('active'));
      event?.target?.classList.add('active');

      const ramp = generateShadeRamp(state.colors.primary);
      const codeBlock = document.getElementById('export-code-block');
      const desc = document.getElementById('export-desc');

      if (tab === 'figma-components') {
        desc.textContent = "Figma Auto-Layout Component & Frame Tree Structure (JSON for Figma Plugin / Builder.io / REST API):";
        const figmaLayoutExport = {
          "$schema": "https://figma.com/schemas/component-tree.json",
          "name": "Enterprise Dashboard & Gen AI Component Library",
          "viewport": { "mode": state.device, "width": state.device === 'laptop' ? 1440 : state.device === 'tablet' ? 834 : 390 },
          "styles": {
            "cardRadius": state.geometry.globalRadius,
            "paddingX": state.geometry.padX,
            "paddingY": state.geometry.padY,
            "cardBackground": state.colors.cardBg,
            "canvasBackground": state.colors.canvasBg,
            "primaryBrand": state.colors.primary,
            "aiAccent": state.colors.aiAccent,
            "fontFamily": state.fonts.sans
          },
          "frames": [
            {
              "type": "FRAME",
              "name": "KpiGrid (4 Columns)",
              "layoutMode": "HORIZONTAL",
              "itemSpacing": state.geometry.gap,
              "children": [
                { "type": "COMPONENT", "name": "KpiCard_Revenue", "cornerRadius": state.geometry.globalRadius, "elements": ["Header", "Metric: $4,892,150", "Delta: +14.2%", "Progress: 82%"] },
                { "type": "COMPONENT", "name": "KpiCard_ActiveUsers_Sparkline", "cornerRadius": state.geometry.globalRadius, "elements": ["Header", "Metric: 182,400", "Sparkline: Area Bézier"] },
                { "type": "COMPONENT", "name": "KpiCard_API_Invocations", "cornerRadius": state.geometry.globalRadius, "elements": ["Header", "Metric: 94.8M", "Sparkline: Bar Series"] },
                { "type": "COMPONENT", "name": "KpiCard_SLA_Uptime", "cornerRadius": state.geometry.globalRadius, "elements": ["Header", "Metric: 99.98%", "Sparkline: SLA Binary Ticks"] }
              ]
            },
            {
              "type": "FRAME",
              "name": "ChartSection_Revenue_Forecast",
              "layoutMode": "VERTICAL",
              "elements": ["Cartesian Grid", "Anomaly Indicator (+$42k)", "Forecast Confidence Corridor P90"]
            },
            {
              "type": "FRAME",
              "name": "DataTable_EnterpriseAccounts",
              "layoutMode": "VERTICAL",
              "elements": ["Sticky Headers", "Sortable Columns", "Mobile Card Transformation"]
            },
            {
              "type": "FRAME",
              "name": "GenAI_Multimodal_Studio",
              "layoutMode": "VERTICAL",
              "children": [
                { "type": "COMPONENT", "name": "UserMessageRow", "avatar": "UserIcon", "bubbleFill": "#F1F5F9" },
                { "type": "COMPONENT", "name": "AssistantResponseCard", "avatar": "BotIcon", "multimodal": ["ReasoningAccordion", "NarrativeText", "InlineRegionalChart", "InlineCostTable", "FormulaDiffViewer"] },
                { "type": "COMPONENT", "name": "PromptComposer", "cornerRadius": 14, "features": ["ContextChips", "AutoExpandTextarea", "IconOnlySendButton"] }
              ]
            }
          ]
        };
        codeBlock.textContent = JSON.stringify(figmaLayoutExport, null, 2);
      } else if (tab === 'figma-tokens') {
        desc.textContent = "Figma Tokens Studio (W3C DTCG Format) - Import into Tokens Studio plugin:";
        const figmaTokens = {
          "brand": {
            "primary": { "50": { "$value": ramp[50], "$type": "color" }, "500": { "$value": ramp[500], "$type": "color" }, "600": { "$value": ramp[600], "$type": "color" }, "900": { "$value": ramp[900], "$type": "color" } },
            "secondary": { "$value": state.colors.secondary, "$type": "color" },
            "ai": { "$value": state.colors.aiAccent, "$type": "color" }
          },
          "surfaces": {
            "canvas": { "$value": state.colors.canvasBg, "$type": "color" },
            "card": { "$value": state.colors.cardBg, "$type": "color" },
            "cardRadius": { "$value": \`\${state.geometry.globalRadius}px\`, "$type": "dimension" }
          },
          "typography": {
            "fontFamily": { "sans": { "$value": state.fonts.sans, "$type": "fontFamily" }, "display": { "$value": state.fonts.display, "$type": "fontFamily" }, "mono": { "$value": state.fonts.mono, "$type": "fontFamily" } }
          }
        };
        codeBlock.textContent = JSON.stringify(figmaTokens, null, 2);
      } else if (tab === 'lovable') {
        desc.textContent = "Lovable.dev & Tailwind Config - Copy into your tailwind.config.js:";
        codeBlock.textContent = \`// tailwind.config.js for Lovable
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: { 50: '\${ramp[50]}', 500: '\${ramp[500]}', 600: '\${ramp[600]}', 900: '\${ramp[900]}' },
        ai: { accent: '\${state.colors.aiAccent}', cyan: '\${state.colors.secondary}' },
        surface: { canvas: '\${state.colors.canvasBg}', card: '\${state.colors.cardBg}' }
      },
      borderRadius: { card: '\${state.geometry.globalRadius}px' },
      fontFamily: { sans: ['\${state.fonts.sans}', 'sans-serif'], display: ['\${state.fonts.display}', 'sans-serif'], mono: ['\${state.fonts.mono}', 'monospace'] }
    }
  }
};\`;
      } else if (tab === 'antigravity') {
        desc.textContent = "Antigravity Customization Rules (.antigravity/rules/design-system.md):";
        codeBlock.textContent = \`# Antigravity Design System Directive

## Organizational Brand Tokens
- Primary Brand Hex: \${state.colors.primary} (Default: \${ramp[600]})
- Secondary Accent: \${state.colors.secondary}
- AI Accent / Aura: \${state.colors.aiAccent}
- Canvas Surface: \${state.colors.canvasBg}
- Card Surface: \${state.colors.cardBg}
- Card Corner Radius: \${state.geometry.globalRadius}px
- Auto-Layout Padding: \${state.geometry.padX}px horizontal, \${state.geometry.padY}px vertical

## Multimodal AI Response Directives
1. When generating analytical responses, synthesize Text narrative alongside embedded responsive SVG Charts and high-density Data Tables in the same response container.
2. Render User & AI profile avatars on message rows.
3. Encapsulate Chain of Thought reasoning in borderless accordions.
4. Support diff inspection with reject feedback capture modal.
5. Use icon-only round send buttons in prompt composers.\`;
      } else if (tab === 'css') {
        desc.textContent = "CSS Custom Properties (:root variables):";
        codeBlock.textContent = \`:root {
  --color-brand-placeholder-primary-50: \${ramp[50]};
  --color-brand-placeholder-primary-600: \${ramp[600]};
  --color-brand-placeholder-secondary-500: \${state.colors.secondary};
  --color-ai-special-accent-primary: \${state.colors.aiAccent};
  --sys-color-surface-canvas: \${state.colors.canvasBg};
  --sys-color-surface-card: \${state.colors.cardBg};
  --custom-card-radius: \${state.geometry.globalRadius}px;
  --card-custom-pad-x: \${state.geometry.padX}px;
  --card-custom-pad-y: \${state.geometry.padY}px;
  --typography-font-family-sans: '\${state.fonts.sans}', sans-serif;
  --typography-font-family-display: '\${state.fonts.display}', sans-serif;
  --typography-font-family-mono: '\${state.fonts.mono}', monospace;
}\`;
      }
    }

    function copyModalCode() {
      const code = document.getElementById('export-code-block').textContent;
      navigator.clipboard.writeText(code).then(() => showToast('✓ Code snippet copied to clipboard!'));
    }

    function copyCssVariables() { switchExportTab('css'); copyModalCode(); }

    function downloadActiveExport() {
      const code = document.getElementById('export-code-block').textContent;
      const tab = state.activeExportTab;
      const filenames = {
        'figma-components': 'figma-components-layout.json',
        'figma-tokens': 'figma-tokens-studio.json',
        'lovable': 'tailwind.config.js',
        'antigravity': 'DESIGN_SYSTEM_RULES.md',
        'css': 'brand-tokens.css'
      };
      const filename = filenames[tab] || 'export.txt';
      const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
      showToast(\`✓ Downloaded \${filename}\`);
    }

    function showToast(msg) {
      const toast = document.getElementById('toast-notify');
      toast.textContent = msg;
      toast.style.display = 'block';
      setTimeout(() => { toast.style.display = 'none'; }, 3000);
    }

    window.addEventListener('DOMContentLoaded', () => {
      applyColors();
      applyPresetTheme('ai-violet');
      lucide.createIcons();
    });
  </script>
</body>
</html>
`;

fs.writeFileSync('index.html', htmlContent, 'utf8');
fs.writeFileSync('showcase/index.html', htmlContent, 'utf8');
console.log('Successfully generated index.html and showcase/index.html with full Figma Inspector and Multimodal AI Response!');

