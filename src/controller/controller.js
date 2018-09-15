// controller.js

'use strict';

console.debug = (message) => console.log(`[DEBUG] ${message}`);
console.trace = () => true;

const Configuration = require('../core/config/config.js');
const Brick = require('../core/elements/brick.js');
const Ball = require('../core/elements/ball.js');
const Paddle = require('../core/elements/paddle.js');
const Painter = require('../render/painter.js');
const Renderer = require('../render/renderer.js');



const PLAYING = Symbol('PLAYING');
const INIT = Symbol('INIT');

class Controller{
  constructor(_init) {
    this[PLAYING] = false;
    this[INIT] = _init || false;
  }
  
  startGame() {
    this[PLAYING] = this[INIT];
    // TODO setTimeInterval

    return this[INIT];
  }

  isPlaying() {
    return this[PLAYING];
  }

  isGameOver() {
    return !this.isPlaying();
  }

  isGameClear() {
    return this.isPlaying() && this.hasExsitingBricks();
  }

  terminateGame() {
    this[PLAYING] = false;
    // TODO clearTimeInterval
  }

  hasExsitingBricks() {
    return false;
  }
}

module.exports = Controller;