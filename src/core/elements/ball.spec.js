// ball.spec.js

const {assert, expect} = require('chai');
const Ball = require('./ball.js');

describe('Ball test suite', function() {
  it('testInstantiate_Ball클래스를_인스턴스화한다', function() {
    const ball = new Ball();
    assert.ok(ball);
  });
  it('testInstantiate_인자가없으면_기본값으로설정한다', function() {
    const ball = new Ball();
    const expected = new Ball(0, 0, 1, '', 0, 0);
    assert.ok(ball);
    assert.deepEqual(ball, expected);
  });
  it('testInstantiate_음수좌표로_인스턴스를생성하면_에러가발생한다', () => {
    assert.throws(() => {
      const ball = new Ball(-1, -1, 2, 'blue', 0, 0);
    });
  });
  it('testInstantiate_반지름이0이하일때_인스턴스를생성하면_에러가발생한다', () => {
    assert.throws(() => {
      const ball = new Ball(2, 4, 0, 'blue', 0, 0);
    });
  });
});

describe(`Ball getter/setter test`, () => {
  it(`testGetX`, () => {
    const ball = new Ball(2, 4, 1, 'blue', 2, 2);
    assert.equal(ball.x, 2);
  });
  it(`testGetY`, () => {
    const ball = new Ball(2, 4, 1, 'blue', 2, 2);
    assert.equal(ball.y, 4);
  });
  it(`testGetRadius`, () => {
    const ball = new Ball(2, 4, 1, 'blue', 2, 2);
    assert.equal(ball.radius, 1);
  });
  it(`testGetColor`, () => {
    const ball = new Ball(2, 4, 1, 'blue', 2, 2);
    assert.equal(ball.color, 'blue');

    ball.color = '#0088ff';
    assert.equal(ball.color, '#0088ff');
  });
  it(`testGetDx`, () => {
    const ball = new Ball(2, 4, 1, 'blue', 2, 2);
    assert.equal(ball.dx, 2);
  });
  it(`testGetDy`, () => {
    const ball = new Ball(2, 4, 1, 'blue', 2, 2);
    assert.equal(ball.dy, 2);
  });
  it(`testSetX`, () => {
    const ball = new Ball();
    ball.x = 5;
    assert.equal(ball.x, 5);
  });
  it(`testSetY`, () => {
    const ball = new Ball();
    ball.y = 5;
    assert.equal(ball.y, 5);
  });
  it(`testSetRadius`, () => {
    const ball = new Ball();
    ball.radius = 3;
    assert.equal(ball.radius, 3);
  });
  it(`testSetColor`, () => {
    const ball = new Ball();
    ball.color = 'blue';
    assert.equal(ball.color, 'blue');
  });
  it(`testSetDx`, () => {
    const ball = new Ball();
    ball.dx = 2;
    assert.equal(ball.dx, 2);
  });
  it(`testSetDy`, () => {
    const ball = new Ball();
    ball.dy = 2;
    assert.equal(2, ball.dy);
  });
});

describe(`Ball method test`, () => {
  it(`testMove`, () => {
    const ball = new Ball(2, 5, 1, '#000000', 1, 1);
    ball.move();
    assert.equal(3, ball.x);
    assert.equal(6, ball.y);
  });
  it(`testMove_dx,dy가_0이면_움직이지않는다`, () => {
    const ball = new Ball(2, 5, 1, '#000000', 0, 0);
    ball.move();
    assert.equal(2, ball.x);
    assert.equal(5, ball.y);
  });
  it(`testIsOn`, () => {
    const ball = new Ball(10, 20, 3, '#000000', 1, 0);
    const point = {x: 15, y: 20};
    
    assert.isTrue(ball.isOn(point.x, point.y));

    
  });
});