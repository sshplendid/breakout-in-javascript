// brick.js
'use strict';

class Brick {
  constructor(x, y, width, height, color, durability) {
    if(arguments.length > 0 && arguments[0] instanceof Object) {
      this.x = arguments[0].x || 0;
      this.y = arguments[0].y || 0;
      this.width = arguments[0].width || 0;
      this.height = arguments[0].height || 0;
      this.color = arguments[0].color || '#000000';
      this.durability = arguments[0].durability || 0;
    } else {
      this.x = x || 0;
      this.y = y || 0;
      this.width = width || 0;
      this.height = height || 0;
      this.color = color || '#000000';
      this.durability = durability || 0;
    }
  }

  crack() {
    console.debug(`Brick[${this.x}, ${this.y}] cracked => ${this.durability}`);
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