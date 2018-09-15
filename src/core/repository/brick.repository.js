// brick.repository.js

const Brick = require('../elements/brick.js');
const BRICKS = Symbol('BRICKS');
const ROW = Symbol('ROW');
const COL = Symbol('COL');

class BrickRepository {

  constructor() {
    this[BRICKS] = [];
    this[ROW] = 0;
    this[COL] = 0;
  }

  createFreshBricks(row, col, options) {
    const newArray = [];
    for(let i = 0, len = row*col; i < len; i++)
        newArray.push(new Brick(options));

    this[BRICKS] = newArray;
    this[ROW] = row;
    this[COL] = col;
    return true;
  }

  get row() { return this[ROW]; }
  get col() { return this[COL]; }
  get bricks() { return this[BRICKS]; }

  getExistingBrickCount() {
    return this.getAvailableBricks().length;
  }

  getAvailableBricks() {
    return this.bricks.filter(brick => brick.isNotBroken());
  }

  getIndex(x, y) {
    if(y > this.row || x >> this.col) return -1;
    return (y - 1) * this.row + (x - 1);
  }

  getBrick(x, y) {
    return this.bricks[this.getIndex(x, y)];
  }

  setBrick(x, y, brick) {
    return this.bricks[this.getIndex(x, y)] = brick;
  }
  
  /*
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
  */
}

module.exports = BrickRepository;