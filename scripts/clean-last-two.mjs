import fs from 'fs';

['index.html', 'showcase/index.html'].forEach(filePath => {
  let html = fs.readFileSync(filePath, 'utf8');
  
  html = html.replace(
    `        <div style="width: 44px; height: 44px; border-radius: 12px; background: #FEF2F2; color: #EF4444; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 20px; font-weight: 800;">
          ⚠️
        </div>`,
    `        <div style="width: 44px; height: 44px; border-radius: 12px; background: #FEF2F2; color: #EF4444; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
          <i data-lucide="alert-triangle" class="lucide-icon" style="width: 22px; height: 22px; color: #EF4444;"></i>
        </div>`
  );

  html = html.replace("showToast('✓ AI Recommendation accepted')", "showToast('AI Recommendation accepted')");

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`✓ Cleaned ${filePath}`);
});

