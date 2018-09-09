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
});
