// controller.js

'use strict';

console.debug = (message) => console.log(`[DEBUG] ${message}`);
console.trace = () => true;

const Configuration = require('../core/config/config.js');
const Brick = require('../core/elements/brick.js');
const Ball = require('../core/elements/ball.js');
const Paddle = require('../core/elements/paddle.js');
const Painter = require('../render/painter.js');



const PLAYING = Symbol('PLAYING');


class Controller{
  constructor() {
    this[PLAYING] = false;
  }
  
  makeBricks(rows, columns) {
    if(this.isPlaying() ) return false;
    const brickArray = [];

    for(let r = 0; r < rows; r++) {
      const rowArray = [];
      for(let c = 0; c < columns; c++) rowArray.push(new Brick());
      brickArray.push(rowArray);
    }
    this[BRICKS] = brickArray;
    return true;
  }

  isPlaying() {
    return this[PLAYING];
  }
}

module.exports = Controller;