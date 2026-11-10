import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// 1. Update scripts/build-master-catalog.mjs
const catalogPath = path.join(rootDir, 'scripts', 'build-master-catalog.mjs');
let catalogCode = fs.readFileSync(catalogPath, 'utf8');

// Update ALL_112_COMPONENTS entries for Alert and Pop-ups
catalogCode = catalogCode.replace(
  `{ num: "28", name: "Persistent Banner", cat: "Communication & Feedback", api: "<Alert variant=\\"warning\\" title=\\"Maintenance scheduled\\" />", desc: "Full-width system notice with actions", device: "Desktop / Tablet / Phone" },`,
  `{ num: "28", name: "Alert Box (Semantic Banner: Info, Success, Warning, Danger)", cat: "Communication & Feedback", api: "<Alert variant=\\"warning\\" title=\\"Maintenance\\" onDismiss={...} />", desc: "Full-width dismissible alert box with semantic icons, actions, and close button", device: "Desktop / Tablet / Phone" },`
);

catalogCode = catalogCode.replace(
  `{ num: "29", name: "Rich Tooltip Popover", cat: "Communication & Feedback", api: "<Tooltip content={<LineageCard />}>...</Tooltip>", desc: "Hover (Desktop) / Tap popover (Touch) helper", device: "Desktop (Hover) / Touch (Tap Popover)" },`,
  `{ num: "29", name: "Rich Tooltip Popover (Contextual Pop-up)", cat: "Communication & Feedback", api: "<Tooltip content={<LineageCard />}>...</Tooltip>", desc: "Interactive floating pop-up anchored to trigger with arrow pointer", device: "Desktop (Hover) / Touch (Tap Popover)" },`
);

catalogCode = catalogCode.replace(
  `{ num: "34", name: "Basic Confirmation Dialog", cat: "Containment & Surfaces", api: "<Modal title=\\"Confirm Delete\\" footer={...}>Body</Modal>", desc: "Centered modal window on desktop", device: "Desktop / Tablet" },`,
  `{ num: "34", name: "Basic Confirmation Dialog (Action Pop-up)", cat: "Containment & Surfaces", api: "<Modal title=\\"Confirm Delete\\" footer={...}>Body</Modal>", desc: "Centered modal pop-up window with Confirm and Cancel buttons", device: "Desktop / Tablet" },`
);

catalogCode = catalogCode.replace(
  `{ num: "35", name: "Alert Dialog with Icon", cat: "Containment & Surfaces", api: "<Modal icon={<AlertTriangle />} title=\\"Warning\\">Body</Modal>", desc: "Security and incident alert modal", device: "Desktop / Tablet" },`,
  `{ num: "35", name: "Alert Dialog with Icon (Security & Incident Alert Pop-up)", cat: "Containment & Surfaces", api: "<Modal icon={<AlertTriangle />} title=\\"Warning\\">Body</Modal>", desc: "High-priority security incident and destructive alert pop-up", device: "Desktop / Tablet" },`
);

catalogCode = catalogCode.replace(
  `{ num: "36", name: "Full-Screen Dialog", cat: "Containment & Surfaces", api: "<Modal fullScreen title=\\"Cluster Config\\">Body</Modal>", desc: "100vw x 100vh modal for complex forms", device: "Mobile / Tablet" },`,
  `{ num: "36", name: "Full-Screen Dialog Pop-up", cat: "Containment & Surfaces", api: "<Modal fullScreen title=\\"Cluster Config\\">Body</Modal>", desc: "100vw x 100vh modal pop-up for complex forms and wizards", device: "Mobile / Tablet" },`
);

catalogCode = catalogCode.replace(
  `{ num: "39", name: "Standard Bottom Sheet", cat: "Containment & Surfaces", api: "<BottomSheet isOpen={open} onClose={...}>Content</BottomSheet>", desc: "Bottom-docked panel with drag handle", device: "Phone (<600px)" },`,
  `{ num: "39", name: "Standard Bottom Sheet Pop-up", cat: "Containment & Surfaces", api: "<BottomSheet isOpen={open} onClose={...}>Content</BottomSheet>", desc: "Thumb-friendly sliding pop-up sheet anchored to bottom of viewport", device: "Phone (<600px)" },`
);

catalogCode = catalogCode.replace(
  `{ num: "40", name: "Modal Bottom Sheet", cat: "Containment & Surfaces", api: "<AdaptiveDialog isOpen={open} onClose={...}>Content</AdaptiveDialog>", desc: "Auto-transforms to bottom sheet on mobile", device: "Desktop (Modal) / Phone (Bottom Sheet)" },`,
  `{ num: "40", name: "Modal Bottom Sheet Pop-up (Responsive Adaptive Pop-up)", cat: "Containment & Surfaces", api: "<AdaptiveDialog isOpen={open} onClose={...}>Content</AdaptiveDialog>", desc: "Auto-detecting pop-up: Centered Modal on desktop, Bottom Sheet on mobile", device: "Desktop (Modal) / Phone (Bottom Sheet)" },`
);

catalogCode = catalogCode.replace(
  `{ num: "50", name: "Modal Navigation Drawer", cat: "Navigation Systems", api: "<HamburgerMenu isOpen={open} onToggle={...} />", desc: "3-bar morphing trigger with slide-over drawer", device: "Phone / Tablet (<1024px)" },`,
  `{ num: "50", name: "Modal Navigation Drawer (Hamburger Pop-up Menu)", cat: "Navigation Systems", api: "<HamburgerMenu isOpen={open} onToggle={...} />", desc: "Sliding side drawer pop-up with backdrop dimming", device: "Phone / Tablet (<1024px)" },`
);

// Define Rich Section 5 with Alert Boxes and Pop-up Showcase
const richSection5 = `          <!-- SECTION 5: FEEDBACK & OVERLAYS -->
          <section id="cat-feedback" class="card" style="padding: 24px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <h3 style="font-size: 18px; font-weight: 700; display: flex; align-items: center; gap: 8px; margin: 0;">
                <i data-lucide="bell" class="lucide-icon" style="color: var(--color-brand-placeholder-primary-600);"></i> 5. Feedback, Pop-ups & Overlay Components
              </h3>
              <span class="badge badge-primary">Accessible Overlays</span>
            </div>
            <p style="font-size: 13px; color: var(--sys-color-text-secondary); margin-bottom: 24px;">
              Complete overlay suite: Dismissible Alert Boxes across 4 semantic variants, Contextual Pop-ups & Popovers, Confirmation Pop-up Modals, Adaptive Dialogs, Snackbars/Toasts, and Progress Loaders.
            </p>

            <!-- 1. ALERT BOXES SHOWCASE (4 SEMANTIC VARIANTS) -->
            <div style="border: 1px solid var(--sys-color-border-subtle); border-radius: 12px; padding: 20px; margin-bottom: 24px; background: var(--sys-color-surface-sunken);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em;">Alert Boxes (All 4 Semantic Variants)</span>
                  <span class="badge" style="background: rgba(37,99,235,0.1); color: var(--color-brand-placeholder-primary-600); font-size: 10px;">Interactive Dismissible</span>
                </div>
                <button class="btn btn-outline" style="font-size: 11px; padding: 4px 10px;" onclick="resetAlerts()">
                  ↺ Reset Dismissed Alerts
                </button>
              </div>

              <div style="display: flex; flex-direction: column; gap: 12px;" id="alert-boxes-container">
                <!-- Info Alert Box -->
                <div id="demo-alert-info" class="eds-alert" style="display: flex; align-items: flex-start; gap: 12px; padding: 14px 16px; border-radius: 10px; background: #EFF6FF; border: 1px solid #BFDBFE; color: #1E40AF; font-size: 13px;">
                  <i data-lucide="info" class="lucide-icon" style="width: 18px; height: 18px; flex-shrink: 0; color: #2563EB; margin-top: 2px;"></i>
                  <div style="flex: 1;">
                    <div style="font-weight: 700; margin-bottom: 2px; font-size: 13px;">System Scheduled Maintenance (Info Alert Box)</div>
                    <div style="opacity: 0.9; line-height: 1.4; font-size: 12px;">Transatlantic cluster re-indexing scheduled for 02:00 UTC. Zero downtime expected.</div>
                  </div>
                  <button class="btn btn-outline" style="font-size: 11px; padding: 3px 8px; border-color: #BFDBFE; color: #1E40AF;" onclick="showToast('Maintenance schedule: 02:00 - 02:30 UTC')">Details</button>
                  <button onclick="dismissAlert('demo-alert-info')" style="background: none; border: none; font-size: 16px; color: #1E40AF; cursor: pointer; padding: 0 4px; line-height: 1;" title="Dismiss alert">&times;</button>
                </div>

                <!-- Success Alert Box -->
                <div id="demo-alert-success" class="eds-alert" style="display: flex; align-items: flex-start; gap: 12px; padding: 14px 16px; border-radius: 10px; background: #ECFDF5; border: 1px solid #A7F3D0; color: #065F46; font-size: 13px;">
                  <i data-lucide="check-circle" class="lucide-icon" style="width: 18px; height: 18px; flex-shrink: 0; color: #10B981; margin-top: 2px;"></i>
                  <div style="flex: 1;">
                    <div style="font-weight: 700; margin-bottom: 2px; font-size: 13px;">All 112 Components Verified & Active (Success Alert Box)</div>
                    <div style="opacity: 0.9; line-height: 1.4; font-size: 12px;">Complete Material-level component directory active with 100% W3C DTCG token fidelity.</div>
                  </div>
                  <button class="btn btn-outline" style="font-size: 11px; padding: 3px 8px; border-color: #A7F3D0; color: #065F46;" onclick="showToast('Audit complete: 0 warnings, 112 passed')">View Audit</button>
                  <button onclick="dismissAlert('demo-alert-success')" style="background: none; border: none; font-size: 16px; color: #065F46; cursor: pointer; padding: 0 4px; line-height: 1;" title="Dismiss alert">&times;</button>
                </div>

                <!-- Warning Alert Box -->
                <div id="demo-alert-warning" class="eds-alert" style="display: flex; align-items: flex-start; gap: 12px; padding: 14px 16px; border-radius: 10px; background: #FFFBEB; border: 1px solid #FDE68A; color: #92400E; font-size: 13px;">
                  <i data-lucide="alert-triangle" class="lucide-icon" style="width: 18px; height: 18px; flex-shrink: 0; color: #F59E0B; margin-top: 2px;"></i>
                  <div style="flex: 1;">
                    <div style="font-weight: 700; margin-bottom: 2px; font-size: 13px;">High Memory Utilization Threshold (Warning Alert Box)</div>
                    <div style="opacity: 0.9; line-height: 1.4; font-size: 12px;">Telemetry threshold exceeded 85% capacity. Auto-scaling pod provisioning in progress.</div>
                  </div>
                  <button class="btn btn-outline" style="font-size: 11px; padding: 3px 8px; border-color: #FDE68A; color: #92400E;" onclick="showToast('Auto-scaler provisioning 2 additional nodes')">Scale Now</button>
                  <button onclick="dismissAlert('demo-alert-warning')" style="background: none; border: none; font-size: 16px; color: #92400E; cursor: pointer; padding: 0 4px; line-height: 1;" title="Dismiss alert">&times;</button>
                </div>

                <!-- Destructive / Danger Alert Box -->
                <div id="demo-alert-danger" class="eds-alert" style="display: flex; align-items: flex-start; gap: 12px; padding: 14px 16px; border-radius: 10px; background: #FEF2F2; border: 1px solid #FCA5A5; color: #991B1B; font-size: 13px;">
                  <i data-lucide="alert-octagon" class="lucide-icon" style="width: 18px; height: 18px; flex-shrink: 0; color: #EF4444; margin-top: 2px;"></i>
                  <div style="flex: 1;">
                    <div style="font-weight: 700; margin-bottom: 2px; font-size: 13px;">Security Revocation Event (Destructive Alert Box)</div>
                    <div style="opacity: 0.9; line-height: 1.4; font-size: 12px;">Emergency credential revocation initiated following unauthorized token access attempt.</div>
                  </div>
                  <button class="btn btn-outline" style="font-size: 11px; padding: 3px 8px; border-color: #FCA5A5; color: #991B1B;" onclick="showToast('Credentials rotated. Session tokens invalidated.')">Rotate Key</button>
                  <button onclick="dismissAlert('demo-alert-danger')" style="background: none; border: none; font-size: 16px; color: #991B1B; cursor: pointer; padding: 0 4px; line-height: 1;" title="Dismiss alert">&times;</button>
                </div>
              </div>
            </div>

            <!-- 2. POP-UPS, POPOVERS & CONFIRMATION MODALS -->
            <div style="border: 1px solid var(--sys-color-border-subtle); border-radius: 12px; padding: 20px; margin-bottom: 24px;">
              <div style="font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 14px;">
                Pop-ups, Popovers & Confirmation Dialogs (Interactive Triggers)
              </div>

              <div style="display: flex; flex-wrap: wrap; gap: 12px; position: relative;">
                <!-- Popover / Context Menu Trigger -->
                <div style="position: relative; display: inline-block;">
                  <button class="btn btn-primary" style="font-size: 12px; padding: 8px 14px;" onclick="togglePopoverDemo(event)">
                    <i data-lucide="message-square" class="lucide-icon"></i> 💬 Open Context Pop-up
                  </button>

                  <!-- Anchored Floating Pop-up Card -->
                  <div id="demo-context-popover" style="display: none; position: absolute; top: calc(100% + 10px); left: 0; width: 280px; background: var(--sys-color-surface-card); border: 1px solid var(--sys-color-border-default); border-radius: 12px; padding: 16px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.15), 0 8px 10px -6px rgba(0,0,0,0.1); z-index: 500;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                      <span style="font-weight: 700; font-size: 13px;">Quick Settings Pop-up</span>
                      <button onclick="togglePopoverDemo(event)" style="background: none; border: none; cursor: pointer; font-size: 14px; color: var(--sys-color-text-secondary);">&times;</button>
                    </div>
                    <p style="font-size: 11px; color: var(--sys-color-text-secondary); margin-bottom: 12px;">
                      Contextual floating pop-up card with anchored pointer and direct state triggers.
                    </p>
                    <div style="display: flex; flex-direction: column; gap: 8px; font-size: 12px;">
                      <label style="display: flex; align-items: center; justify-content: space-between; cursor: pointer;">
                        <span>Telemetry Streaming</span>
                        <input type="checkbox" checked>
                      </label>
                      <label style="display: flex; align-items: center; justify-content: space-between; cursor: pointer;">
                        <span>Auto-dismiss Toasts</span>
                        <input type="checkbox" checked>
                      </label>
                    </div>
                    <div style="margin-top: 12px; pt-2; border-top: 1px solid var(--sys-color-border-subtle); display: flex; justify-content: flex-end;">
                      <button class="btn btn-outline" style="font-size: 11px; padding: 4px 10px;" onclick="togglePopoverDemo(event)">Done</button>
                    </div>
                  </div>
                </div>

                <!-- Delete Confirmation Pop-up Trigger -->
                <button class="btn btn-danger" style="font-size: 12px; padding: 8px 14px;" onclick="openConfirmPopupDemo()">
                  <i data-lucide="trash-2" class="lucide-icon"></i> ⚠️ Delete Confirmation Pop-up
                </button>

                <!-- Adaptive Modal / Bottom Sheet Trigger -->
                <button class="btn btn-outline" style="font-size: 12px; padding: 8px 14px;" onclick="triggerAdaptiveDialogDemo()">
                  <i data-lucide="maximize-2" class="lucide-icon"></i> 📱 Adaptive Modal Pop-up
                </button>

                <!-- Toast Triggers -->
                <button class="btn btn-outline" style="font-size: 12px; padding: 8px 14px;" onclick="triggerSnackbarDemo('success', 'Production database backup verified')">
                  <i data-lucide="check" class="lucide-icon"></i> ✓ Success Toast
                </button>
                <button class="btn btn-outline" style="font-size: 12px; padding: 8px 14px;" onclick="triggerSnackbarDemo('error', 'API Rate limit exceeded on node-04')">
                  <i data-lucide="x" class="lucide-icon"></i> ✕ Error Toast
                </button>
              </div>
            </div>

            <!-- 3. PROGRESS INDICATORS & SKELETON LOADERS -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
              <div style="border: 1px solid var(--sys-color-border-subtle); border-radius: 10px; padding: 16px;">
                <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: var(--sys-color-text-secondary); margin-bottom: 12px;">
                  Progress Indicators (Linear & Circular)
                </div>
                <div style="display: flex; flex-direction: column; gap: 14px;">
                  <div>
                    <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 4px;">
                      <span>Linear Determinate</span>
                      <strong style="font-family: monospace;">68%</strong>
                    </div>
                    <div style="height: 6px; border-radius: 9999px; background: var(--sys-color-surface-sunken); overflow: hidden;">
                      <div style="width: 68%; height: 100%; background: var(--color-brand-placeholder-primary-600); border-radius: 9999px;"></div>
                    </div>
                  </div>
                  <div style="display: flex; align-items: center; gap: 16px;">
                    <div style="display: flex; align-items: center; gap: 8px; font-size: 12px;">
                      <div class="spinner" style="width: 20px; height: 20px; border-width: 2px;"></div>
                      <span>Indeterminate Spinner</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px; font-size: 12px;">
                      <div style="position: relative; width: 28px; height: 28px;">
                        <svg viewBox="0 0 36 36" style="width: 100%; height: 100%; transform: rotate(-90deg);">
                          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--sys-color-border-subtle)" stroke-width="4" />
                          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--color-brand-placeholder-primary-600)" stroke-width="4" stroke-dasharray="75, 100" />
                        </svg>
                      </div>
                      <span>Circular (75%)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div style="border: 1px solid var(--sys-color-border-subtle); border-radius: 10px; padding: 16px;">
                <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: var(--sys-color-text-secondary); margin-bottom: 12px;">
                  Skeleton Loaders (Shimmer Effect)
                </div>
                <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 10px;">
                  <div style="width: 36px; height: 36px; border-radius: 50%; background: var(--sys-color-surface-sunken); animation: pulse 1.5s infinite;"></div>
                  <div style="flex: 1; display: flex; flex-direction: column; gap: 6px;">
                    <div style="height: 12px; width: 60%; background: var(--sys-color-surface-sunken); border-radius: 4px; animation: pulse 1.5s infinite;"></div>
                    <div style="height: 10px; width: 90%; background: var(--sys-color-surface-sunken); border-radius: 4px; animation: pulse 1.5s infinite;"></div>
                  </div>
                </div>
                <div style="height: 14px; width: 100%; background: var(--sys-color-surface-sunken); border-radius: 4px; animation: pulse 1.5s infinite;"></div>
              </div>
            </div>
          </section>`;

// Replace old section 5 in build-master-catalog.mjs
const sec5Start = '<!-- SECTION 5: FEEDBACK & OVERLAYS -->';
const sec6Start = '<!-- SECTION 6: GEN AI ORGANISMS -->';

const sec5Idx = catalogCode.indexOf(sec5Start);
const sec6Idx = catalogCode.indexOf(sec6Start);

if (sec5Idx !== -1 && sec6Idx !== -1) {
  catalogCode = catalogCode.substring(0, sec5Idx) + richSection5 + '\n\n          ' + catalogCode.substring(sec6Idx);
  fs.writeFileSync(catalogPath, catalogCode, 'utf8');
  console.log('✓ Successfully updated scripts/build-master-catalog.mjs with Rich Alert Boxes and Pop-up suite!');
} else {
  console.error('Could not find Section 5 boundaries in build-master-catalog.mjs');
  process.exit(1);
}

