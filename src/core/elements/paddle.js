// paddle.js
'use strict';

class Paddle {
  constructor(x, y, width, height, color, dx) {
    this.x = x || 0;
    this.y = y || 0;
    this.width = width || 0;
    this.height = height || 0;
    this.color = color || 0;
    this.dx = Math.abs(dx) || 0;
  }

  move(left) {
    if(!!this.dx) {
      const _dx = left ? (-1) * this.dx : this.dx;
      (this.x += _dx);
      return true;
    } else return false;
  }
}

module.exports = Paddle;