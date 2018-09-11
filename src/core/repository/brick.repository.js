// brick.repository.js

const Brick = require('../elements/brick.js');
const BRICKS = Symbol('BRICKS');
const EMTPY = Symbol('EMPTY_BRICK');

class BrickRepository {


  createFreshBricks(row, col, options) {
    const newArray = [];
    for(let i = 0, len = row*col; i < len; i++)
        newArray.push(new Brick(options));

    this[BRICKS] = newArray;
    return true;
  }
  getExistingBrickCount() {
    return this[BRICKS].filter(brick => brick.isNotBroken()).length;
  }

  getAvailableBricks() {
    return [];
  }
}

module.exports = BrickRepository;