'use strict';
const _cWidth = Symbol();
const _cHeight = Symbol();
const _paddleTop = Symbol();

class Configuration {
  constructor(canvasWidth, canvasHeight, paddleTop) {
    this[_cWidth] = canvasWidth || -1;
    this[_cHeight] = canvasHeight || -1;
    this[_paddleTop] = paddleTop || -1;
  }

  get canvasWidth() { return this[_cWidth]; }
  get canvasHeight() { return this[_cHeight]; }
  get paddleTop() { return this[_paddleTop]; }
}

module.exports = Configuration;