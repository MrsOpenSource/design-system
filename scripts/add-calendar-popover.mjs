import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const catalogPath = path.join(rootDir, 'scripts', 'build-master-catalog.mjs');
let catalogCode = fs.readFileSync(catalogPath, 'utf8');

const oldDatePicker = `                <div>
                  <label class="field-label" style="margin-bottom: 6px;">Date Picker Field</label>
                  <div style="position: relative; display: flex; align-items: center;">
                    <i data-lucide="calendar" class="lucide-icon" style="position: absolute; left: 12px; color: var(--sys-color-text-tertiary);"></i>
                    <input type="text" class="text-input" value="2026-11-09 (Q4 Sprint)" style="padding-left: 36px;">
                  </div>
                </div>`;

const newDatePicker = `                <div style="position: relative;">
                  <label class="field-label" style="margin-bottom: 6px;">Date Picker (Interactive Dropdown Popover)</label>
                  <div style="position: relative; display: flex; align-items: center; cursor: pointer;" onclick="toggleCalendarPopover(event)">
                    <i data-lucide="calendar" class="lucide-icon" style="position: absolute; left: 12px; color: var(--sys-color-text-tertiary);"></i>
                    <input type="text" id="date-picker-input" class="text-input" value="2026-11-09 (Q4 Sprint)" readonly style="padding-left: 36px; cursor: pointer;">
                  </div>

                  <!-- Calendar Dropdown Popover -->
                  <div id="calendar-dropdown-popover" style="display: none; position: absolute; top: calc(100% + 6px); left: 0; width: 280px; background: var(--sys-color-surface-card); border: 1px solid var(--sys-color-border-default); border-radius: 12px; padding: 14px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.15); z-index: 600;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; font-weight: 700; font-size: 13px;">
                      <span>November 2026</span>
                      <div style="display: flex; gap: 4px;">
                        <button class="btn btn-outline" style="padding: 2px 6px; font-size: 11px;">‹</button>
                        <button class="btn btn-outline" style="padding: 2px 6px; font-size: 11px;">›</button>
                      </div>
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; text-align: center; font-size: 11px; margin-bottom: 6px; color: var(--sys-color-text-secondary); font-weight: 600;">
                      <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; text-align: center; font-size: 11px;" id="calendar-days-grid">
                      <div style="padding: 6px 0; color: var(--sys-color-text-tertiary);">1</div>
                      <div style="padding: 6px 0; color: var(--sys-color-text-tertiary);">2</div>
                      <div style="padding: 6px 0; color: var(--sys-color-text-tertiary);">3</div>
                      <div style="padding: 6px 0; color: var(--sys-color-text-tertiary);">4</div>
                      <div style="padding: 6px 0; color: var(--sys-color-text-tertiary);">5</div>
                      <div style="padding: 6px 0; color: var(--sys-color-text-tertiary);">6</div>
                      <div style="padding: 6px 0; color: var(--sys-color-text-tertiary);">7</div>
                      <div style="padding: 6px 0; color: var(--sys-color-text-tertiary);">8</div>
                      <div style="padding: 6px 0; background: var(--color-brand-placeholder-primary-600); color: white; border-radius: 6px; font-weight: 700; cursor: pointer;" onclick="selectCalendarDate('2026-11-09')">9</div>
                      <div style="padding: 6px 0; cursor: pointer;" onclick="selectCalendarDate('2026-11-10')">10</div>
                      <div style="padding: 6px 0; cursor: pointer;" onclick="selectCalendarDate('2026-11-11')">11</div>
                      <div style="padding: 6px 0; cursor: pointer;" onclick="selectCalendarDate('2026-11-12')">12</div>
                      <div style="padding: 6px 0; cursor: pointer;" onclick="selectCalendarDate('2026-11-13')">13</div>
                      <div style="padding: 6px 0; cursor: pointer;" onclick="selectCalendarDate('2026-11-14')">14</div>
                    </div>
                  </div>
                </div>`;

if (catalogCode.includes(oldDatePicker)) {
  catalogCode = catalogCode.replace(oldDatePicker, newDatePicker);
  fs.writeFileSync(catalogPath, catalogCode, 'utf8');
  console.log('✓ Successfully injected interactive calendar popover into build-master-catalog.mjs');
} else {
  console.log('Date picker target not found or already replaced');
}

