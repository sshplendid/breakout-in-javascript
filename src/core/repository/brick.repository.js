// brick.repository.js

const Brick = require('../elements/brick.js');
const BRICKS = Symbol('BRICKS');
const ROW = Symbol('ROW');
const COL = Symbol('COL');
const COLORS = Symbol('COLORS');
const OPTIONS = Symbol('OPTIONS');

class BrickRepository {

  constructor(options) {
    this[BRICKS] = [];
    if(options) {
      this[ROW] = options.row || 0;
      this[COL] = options.col || 0;
      this[COLORS] = options.colors || [];
      this[OPTIONS] = options;
      this.createFreshBricks(this.row, this.col, options);
    }
  }

  createFreshBricks(row, col, options) {
    this[BRICKS] = [];
    this[ROW] = this[ROW] || row || options.row;
    this[COL] = this[COL] || col || options.col;

     for(var c = 0; c < col; c++) {
       for(var r = 0; r < row; r++) {
         var brickX = c * (options.width + options.padding) + options.offset.left;
         var brickY = r * (options.height + options.padding) + options.offset.top;
         var durability = Math.ceil(Math.random()*options.durability) ;
         
         const brick = new Brick(brickX, brickY, options.width, options.height, options.colors[durability], durability);
         this[BRICKS].push(brick);
        }
      }
    return true;
  }

  get row() { return this[ROW]; }
  get col() { return this[COL]; }
  get bricks() { return this[BRICKS]; }

  getExistingBrickCount() {
    return this.getAvailableBricks().length;
  }

  getBricks() {
    return this.getAvailableBricks();
  }
  getAvailableBricks() {
    return this.bricks.filter(brick => brick.isNotBroken());
  }

  getIndex(x, y) {
    if(y > this.row || x >> this.col) return -1;
    return (y - 1) * this.row + (x - 1);
  }

  getBrick(x, y) {
    return this.bricks[this.getIndex(x, y)] || undefined;
  }
}

module.exports = BrickRepository;