// renderer.js

const WINDOW = Symbol();
const DOCUMENT = Symbol();

const isWindow = window => typeof Window == 'function' && window instanceof Window;
const isNotWindow = window => !isWindow(window);
const isDocument = document => typeof HTMLDocument == 'function' && document instanceof HTMLDocument;
const isNotDocument = document => !this.isDocument(document);

class Renderer {
  constructor(window) {
    if(isNotWindow(window)) return new Error('cannot access window!');
    if(isNotDocument(window.document)) return new Error(`cannot access document!`);

    this[WINDOW] = window || {};
    this[DOCUMENT] = window.document || {};
  }
  get window() { return this[WINDOW]; }
  get document() { return this[DOCUMENT]; }
  
  getWidth() { return this.window.innerWidth; }
  getHeight() { return this.window.innerHeight; }
  
  createApp() {
    const app = createDiv('app', 'app full');

  }

  createStartPage() {
    const startPage = createDiv('startPage', 'full');
    
  }

  hideElement(el) {
    el.style.display = 'none';
  }

  showElement(el) {
    el.style.display = 'block';
  }

  createDiv(id, classes) {
    return createElemen('div', id, classes);
  }

  createElement(elementName, id, classes) {
    const joining = classes.reduce((a, b) => `${a} ${b}`);
    
    const div = document.createElement(elementName);
    div.setAttribute('id', id);
    div.setAttribute('class', joining);

    return div;
  }

  appendElement(parent, element) {
    parent.appendChild(element);
  }

  bindEventListener(action, eventListener) {
    this.document.addEventListener(action, eventListener);
  }
}

module.exports = Renderer;