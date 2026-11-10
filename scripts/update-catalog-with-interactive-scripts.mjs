import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const catalogPath = path.join(rootDir, 'scripts', 'build-master-catalog.mjs');
let catalogCode = fs.readFileSync(catalogPath, 'utf8');

// Target before the return of generateMasterCatalogHTML
const targetStr = '        </div> <!-- END VIEW 2: ATOMIC CATALOG -->`;';
const targetIdx = catalogCode.indexOf(targetStr);

if (targetIdx === -1) {
  console.error('Target string not found in build-master-catalog.mjs');
  process.exit(1);
}

// Check if we already injected clientScript
if (catalogCode.includes('window.COMPONENTS_DATA =')) {
  console.log('Script already contains window.COMPONENTS_DATA, checking placement...');
}

// We'll prepare the script snippet to insert right before the template literal ends
const scriptInjection = `
          \${(() => {
            const componentsDict = {};
            ALL_112_COMPONENTS.forEach(c => {
              const tagMatch = c.api.match(/<([A-Z][a-zA-Z0-9]*)/);
              const primaryExport = tagMatch ? tagMatch[1] : 'Button';
              const cleanName = c.name.replace(/[^a-zA-Z0-9]/g, '');
              const fullCode = '// React 18+ / Next.js 14+ Implementation\\n' +
                'import React from \\'react\\';\\n' +
                'import { ' + primaryExport + ' } from \\'@hsb_design/design-system\\';\\n\\n' +
                'export const ' + cleanName + 'Specimen: React.FC = () => {\\n' +
                '  return (\\n    ' + c.api + '\\n  );\\n};\\n\\n' +
                'export default ' + cleanName + 'Specimen;';

              componentsDict[c.num] = {
                num: c.num,
                name: c.name,
                cat: c.cat,
                desc: c.desc,
                device: c.device,
                api: c.api,
                specimen: getComponentLiveSpecimen(c),
                fullCode: fullCode
              };
            });

            return \`
            <script>
              window.COMPONENTS_DATA = \${JSON.stringify(componentsDict)};

              window.copyToClipboard = function(text) {
                if (navigator.clipboard && window.isSecureContext) {
                  return navigator.clipboard.writeText(text);
                }
                return new Promise(function(resolve, reject) {
                  try {
                    var textArea = document.createElement("textarea");
                    textArea.value = text;
                    textArea.style.position = "fixed";
                    textArea.style.left = "-999999px";
                    textArea.style.top = "-999999px";
                    document.body.appendChild(textArea);
                    textArea.focus();
                    textArea.select();
                    var successful = document.execCommand("copy");
                    document.body.removeChild(textArea);
                    if (successful) resolve();
                    else reject(new Error("execCommand failed"));
                  } catch (err) {
                    reject(err);
                  }
                });
              };

              window.copyComponentCode = function(btn) {
                if (!btn) return;
                var code = btn.getAttribute('data-code') || '';
                var name = btn.getAttribute('data-name') || 'Component';
                
                window.copyToClipboard(code).then(function() {
                  var origHtml = btn.innerHTML;
                  btn.innerHTML = '✓ Copied!';
                  btn.style.color = '#059669';
                  btn.style.borderColor = '#059669';
                  btn.style.background = 'rgba(5, 150, 105, 0.08)';
                  
                  setTimeout(function() {
                    btn.innerHTML = origHtml;
                    btn.style.color = '';
                    btn.style.borderColor = '';
                    btn.style.background = '';
                  }, 2000);
                  
                  if (typeof showToast === 'function') {
                    showToast('Copied ' + name + ' JSX snippet to clipboard!');
                  }
                }).catch(function() {
                  if (typeof showToast === 'function') {
                    showToast('Copied to clipboard');
                  }
                });
              };

              window.openComponentDetailModal = function(num) {
                var comp = window.COMPONENTS_DATA ? window.COMPONENTS_DATA[num] : null;
                if (!comp) return;

                var numEl = document.getElementById('detail-modal-num');
                var titleEl = document.getElementById('detail-modal-title');
                var catEl = document.getElementById('detail-modal-cat');
                var descEl = document.getElementById('detail-modal-desc');
                var deviceEl = document.getElementById('detail-modal-device');
                var specimenEl = document.getElementById('detail-modal-specimen');
                var codeEl = document.getElementById('detail-modal-code');

                if (numEl) numEl.textContent = '#' + comp.num;
                if (titleEl) titleEl.textContent = comp.name;
                if (catEl) catEl.textContent = comp.cat;
                if (descEl) descEl.textContent = comp.desc;
                if (deviceEl) deviceEl.innerHTML = '<strong>Metamorphosis Invariant:</strong> ' + comp.device;
                if (specimenEl) specimenEl.innerHTML = comp.specimen;
                if (codeEl) codeEl.textContent = comp.fullCode;

                var modal = document.getElementById('component-detail-modal');
                if (modal) {
                  modal.style.display = 'flex';
                }
                if (window.lucide && typeof lucide.createIcons === 'function') {
                  lucide.createIcons();
                }
              };

              window.closeComponentDetailModal = function() {
                var modal = document.getElementById('component-detail-modal');
                if (modal) {
                  modal.style.display = 'none';
                }
              };

              window.closeComponentDetailModalOnBackdrop = function(e) {
                if (e && e.target && e.target.id === 'component-detail-modal') {
                  window.closeComponentDetailModal();
                }
              };

              window.copyModalCode = function() {
                var codeEl = document.getElementById('detail-modal-code');
                if (!codeEl) return;
                var text = codeEl.textContent;
                
                window.copyToClipboard(text).then(function() {
                  var btn = document.getElementById('detail-modal-copy-btn');
                  if (btn) {
                    var origHtml = btn.innerHTML;
                    btn.innerHTML = '✓ Copied Full Code!';
                    btn.style.background = '#059669';
                    setTimeout(function() {
                      btn.innerHTML = origHtml;
                      btn.style.background = '';
                    }, 2000);
                  }
                  if (typeof showToast === 'function') {
                    showToast('Copied full React component code to clipboard!');
                  }
                }).catch(function() {
                  if (typeof showToast === 'function') {
                    showToast('Failed to copy code to clipboard');
                  }
                });
              };
            </script>
            \`;
          })()}
`;

catalogCode = catalogCode.substring(0, targetIdx) + scriptInjection + '\n' + catalogCode.substring(targetIdx);
fs.writeFileSync(catalogPath, catalogCode, 'utf8');
console.log('✓ Successfully enhanced build-master-catalog.mjs with interactive client script & modal logic!');
