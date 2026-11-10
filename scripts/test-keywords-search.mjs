import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

import { ALL_112_COMPONENTS } from './build-master-catalog.mjs';

console.log('Total components:', ALL_112_COMPONENTS.length);

function getKeywords(c) {
  const name = c.name.toLowerCase();
  const cat = c.cat.toLowerCase();
  const desc = c.desc.toLowerCase();
  const kws = [];

  if (name.includes('alert') || desc.includes('alert')) {
    kws.push('alert', 'alert box', 'alertbox', 'notice', 'warning', 'banner');
  }
  if (name.includes('pop') || desc.includes('pop') || name.includes('dialog') || name.includes('sheet') || name.includes('modal') || name.includes('tooltip')) {
    kws.push('pop', 'popup', 'pop-up', 'popover', 'dialog', 'modal', 'overlay');
  }
  if (name.includes('date') || name.includes('time') || name.includes('picker')) {
    kws.push('picker', 'calendar', 'dropdown', 'clock', 'date', 'time', 'popup', 'pop-up');
  }
  if (name.includes('drawer') || name.includes('menu')) {
    kws.push('menu', 'drawer', 'hamburger', 'sidebar', 'popup', 'pop-up');
  }

  return kws.join(' ');
}

// Test alert search
const alertMatches = ALL_112_COMPONENTS.filter(c => {
  const kw = getKeywords(c);
  const text = (c.num + ' ' + c.name + ' ' + c.cat + ' ' + c.desc + ' ' + c.api + ' ' + kw).toLowerCase();
  return text.includes('alert');
});
console.log('Matches for "alert":', alertMatches.length);
alertMatches.forEach(m => console.log(`  - [${m.cat}] #${m.num} ${m.name}`));

// Test pop search
const popMatches = ALL_112_COMPONENTS.filter(c => {
  const kw = getKeywords(c);
  const text = (c.num + ' ' + c.name + ' ' + c.cat + ' ' + c.desc + ' ' + c.api + ' ' + kw).toLowerCase();
  return text.includes('pop');
});
console.log('\nMatches for "pop":', popMatches.length);
popMatches.forEach(m => console.log(`  - [${m.cat}] #${m.num} ${m.name}`));

