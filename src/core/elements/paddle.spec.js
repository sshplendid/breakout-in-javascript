// paddle.spec.js
'use strict';

const {assert} = require('chai');
const Paddle = require('./paddle.js');

describe(`core/elements/Paddle`, () => {
  it(`constructor`, () => {
    const actual = new Paddle();
    assert.ok(actual);
  });
  it(`constructor_인자가 없을 때_생성자를 호출하면_기본값이 설정된다`, () => {
    const actual = new Paddle();
    const expected = new Paddle(0, 0, 0, 0, 0);
    assert.deepEqual(actual, expected);
  });
  it(`constructor_인자가 있을 때_생성자를 호출하면_인자에 맞게 설정된다`, () => {
    const actual = new Paddle(1, 1, 1, 1, 1);

    assert.equal(actual.x, 1);
    assert.equal(actual.y, 1);
    assert.equal(actual.width, 1);
    assert.equal(actual.height, 1);
    assert.equal(actual.color, 1);
  });

  it(`move_인자가 true일 때_이동하면_왼쪽으로 움직인다`, () => {
    const actual = new Paddle(1, 1, 1, 1, 1, 1);
    assert.isTrue(actual.move(true));
    assert.equal(actual.x, 0);
    assert.isTrue(actual.move(true));
    assert.equal(actual.x, -1);
  });
  it(`move_인자가 false일 때_이동하면_오른쪽으로 움직인다`, () => {
    const actual = new Paddle(-1, 1, 1, 1, 1, 1);
    assert.isTrue(actual.move(false));
    assert.equal(actual.x, 0);
    assert.isTrue(actual.move(false));
    assert.equal(actual.x, 1);
  });
  it(`move_인자가 없을 때_이동하면_오른쪽으로 움직인다`, () => {
    const actual = new Paddle(1, 1, 1, 1, 1, 1);
    assert.isTrue(actual.move());
    assert.equal(actual.x, 2);
  });
  it(`move_dx가 0일 때_움직임은_없다`, () => {
    const actual = new Paddle(1, 1, 1, 1, 1, 0);
    assert.isFalse(actual.move(true));
  });
  it(`isOnBoundary`, () => {
    const actual = new Paddle(2, 1, 5, 1, 1, 1);
    assert.isFalse(actual.isOnBoundary(0, 10)); 
  });
  it(`isOnBoundary_x가 0이 될때까지 왼쪽으로 움직일 때_경계를 확인하면_ture를 리턴한다`, () => {
    const actual = new Paddle(2, 1, 6, 1, 1, 1);
    assert.isFalse(actual.isOnBoundary(0, 10)); 
    
    actual.move(true);
    assert.isFalse(actual.isOnBoundary(0, 10)); 
    
    actual.move(true);
    assert.isTrue(actual.isOnBoundary(0, 10), `x => ${actual.x}`); 
  });
  it(`isOnBoundary_x가 10이 될때까지 오른쪽으로 움직일 때_경계를 확인하면_ture를 리턴한다`, () => {
    const actual = new Paddle(2, 1, 6, 1, 1, 1);
    assert.isFalse(actual.isOnBoundary(0, 10), `x => ${actual.x}`); 
    
    actual.move();
    assert.isFalse(actual.isOnBoundary(0, 10), `x => ${actual.x}`); 
    
    actual.move();
    assert.isTrue(actual.isOnBoundary(0, 10), `x => ${actual.x}`); 
  });

  it(`isNotOnBoundary`, () => {
    const actual = new Paddle(2, 2, 6, 3, 1, 1);
    assert.isTrue(actual.isNotOnBoundary(0, 10), `(x, width) => {${actual.x}, ${actual.width}}`);
    assert.isTrue(actual.isNotOnLeftBoundary(0) && actual.isNotOnRightBoundary(10), `(x, width) => {${actual.x}, ${actual.width}}`);
    
    actual.move(true);
    assert.isTrue(actual.isNotOnBoundary(0, 10), `(x, width) => {${actual.x}, ${actual.width}}`);
    assert.isTrue(actual.isNotOnLeftBoundary(0) && actual.isNotOnRightBoundary(10), `(x, width) => {${actual.x}, ${actual.width}}`);
    
    actual.move(true);
    assert.isFalse(actual.isNotOnBoundary(0, 10), `(x, width) => {${actual.x}, ${actual.width}}`);
    assert.isFalse(actual.isNotOnLeftBoundary(0), `(x, width) => {${actual.x}, ${actual.width}}`);
    assert.isTrue(actual.isNotOnRightBoundary(10), `(x, width) => {${actual.x}, ${actual.width}}`);
  });
});
