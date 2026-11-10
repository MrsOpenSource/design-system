import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');
const scripts = [...html.matchAll(/<script(?![^>]*src)[^>]*>([\s\S]*?)<\/script>/gi)];

// Let's create a simulated window object
const mockWindow = {
  navigator: {},
  document: {
    createElement: () => ({ style: {}, focus: () => {}, select: () => {} }),
    body: { appendChild: () => {}, removeChild: () => {} },
    getElementById: (id) => ({
      textContent: '',
      innerHTML: '',
      style: {},
      classList: { add: () => {}, remove: () => {} }
    }),
    querySelectorAll: () => []
  }
};

// Run script 2 with simulated window
const runner = new Function('window', 'document', 'navigator', scripts[1][1]);
runner(mockWindow, mockWindow.document, mockWindow.navigator);

console.log('COMPONENTS_DATA keys count:', Object.keys(mockWindow.COMPONENTS_DATA).length);
console.log('Has copyComponentCode:', typeof mockWindow.copyComponentCode);
console.log('Has openComponentDetailModal:', typeof mockWindow.openComponentDetailModal);
console.log('Has closeComponentDetailModal:', typeof mockWindow.closeComponentDetailModal);
console.log('Has copyModalCode:', typeof mockWindow.copyModalCode);

// Inspect item "01" and "92"
console.log('Component #01:', mockWindow.COMPONENTS_DATA['01'].name, '| Cat:', mockWindow.COMPONENTS_DATA['01'].cat);
console.log('Component #92:', mockWindow.COMPONENTS_DATA['92'].name, '| Cat:', mockWindow.COMPONENTS_DATA['92'].cat);

