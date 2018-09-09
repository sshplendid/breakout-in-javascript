// ball.js
'use strict';

const X = Symbol();
const Y = Symbol();
const RADIUS = Symbol();
const COLOR = Symbol();
const dX = Symbol();
const dY = Symbol();

class Ball {
  constructor(x, y, radius, color, dx, dy) {
    if(arguments.length > 0 && (x < 0 || y < 0 || radius <= 0) )
      throw new Error(`cannot set negative value => {x: ${x}, y: ${y}, radius: ${radius}}`);

    this[X] = x || 0;
    this[Y] = y || 0;
    this[RADIUS] = radius || 1;
    this[COLOR] = color || '';
    this[dX] = dx || 0;
    this[dY] = dy || 0;
  }

  // getter, setter
  get x() { return this[X]; }
  get y() { return this[Y]; }
  get radius() { return this[RADIUS]; }
  get color() { return this[COLOR]; }
  get dx() { return this[dX]; }
  get dy() { return this[dY]; }

  set x(val) { this[X] = val; }
  set y(val) { this[Y] = val; }
  set radius(val) { this[RADIUS] = val; }
  set color(val) { this[COLOR] = val; }
  set dx(val) { this[dX] = val; }
  set dy(val) { this[dY] = val; }

  // other methods
  move() {
    this.x += this.dx;
    this.y += this.dy;
  }

  isOn(_x, _y) {
    const xDiff = Math.abs(this.x - _x);
    const yDiff = Math.abs(this.y - _y);
    // TODO 원의 반지름 구하기
    const _radius = Math.sqrt( Math.pow(xDiff, 2) + Math.pow(yDiff, 2)); 
    
    return this.radius >= _radius;
  }

}

module.exports = Ball;