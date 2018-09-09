// brick.js
'use strict';

class Brick {
  constructor(x, y, width, height, color, durability) {
    this.x = x || 0;
    this.y = y || 0;
    this.width = width || 0;
    this.height = height || 0;
    this.color = color || '#000000';
    this.durability = durability || 0;
  }

  crack() {
    return this.isNotBroken() && !!(this.durability--);
  }

  isBroken() {
    return this.durability == 0;
  }
  isNotBroken() {
    return !this.isBroken();
  }
}

module.exports = Brick;