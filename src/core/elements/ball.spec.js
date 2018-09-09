// ball.spec.js
'use strict';

const {assert, expect} = require('chai');
const Ball = require('./ball.js');

describe('core/elements/Ball', function() {
  it('constructor_조건이 없을 때_생성자를 호출하면_정상적으로 인스턴스를 리턴한다', function() {
    const ball = new Ball();
    assert.ok(ball);
  });
  it('constructor_조건이 없을 때_생성자를 호출하면_속성이 기본값으로 설정된다', function() {
    const ball = new Ball();
    const expected = new Ball(0, 0, 1, '', 0, 0);
    assert.ok(ball);
    assert.deepEqual(ball, expected);
  });
  it('constructor_좌표가 음수일 때_생성자를 호출하면_에러가 발생한다', () => {
    assert.throws(() => {
      const ball = new Ball(-1, -1, 2, 'blue', 0, 0);
    });
  });
  it('constructor_반지름이 0이하일 때_새성자를 호출하면_에러가 발생한다', () => {
    assert.throws(() => {
      const ball = new Ball(2, 4, 0, 'blue', 0, 0);
    });
  });

  it(`getter:x`, () => {
    const ball = new Ball(2, 4, 1, 'blue', 2, 2);
    assert.equal(ball.x, 2);
  });
  it(`getter:y`, () => {
    const ball = new Ball(2, 4, 1, 'blue', 2, 2);
    assert.equal(ball.y, 4);
  });
  it(`getter:radius`, () => {
    const ball = new Ball(2, 4, 1, 'blue', 2, 2);
    assert.equal(ball.radius, 1);
  });
  it(`getter:color`, () => {
    const ball = new Ball(2, 4, 1, 'blue', 2, 2);
    assert.equal(ball.color, 'blue');

    ball.color = '#0088ff';
    assert.equal(ball.color, '#0088ff');
  });
  it(`getter:dx`, () => {
    const ball = new Ball(2, 4, 1, 'blue', 2, 2);
    assert.equal(ball.dx, 2);
  });
  it(`getter:dy`, () => {
    const ball = new Ball(2, 4, 1, 'blue', 2, 2);
    assert.equal(ball.dy, 2);
  });
  it(`setter:x`, () => {
    const ball = new Ball();
    ball.x = 5;
    assert.equal(ball.x, 5);
  });
  it(`setter:y`, () => {
    const ball = new Ball();
    ball.y = 5;
    assert.equal(ball.y, 5);
  });
  it(`setter:radius`, () => {
    const ball = new Ball();
    ball.radius = 3;
    assert.equal(ball.radius, 3);
  });
  it(`setter:color`, () => {
    const ball = new Ball();
    ball.color = 'blue';
    assert.equal(ball.color, 'blue');
  });
  it(`setter:dx`, () => {
    const ball = new Ball();
    ball.dx = 2;
    assert.equal(ball.dx, 2);
  });
  it(`setter:dy`, () => {
    const ball = new Ball();
    ball.dy = 2;
    assert.equal(2, ball.dy);
  });

  it(`move`, () => {
    const ball = new Ball(2, 5, 1, '#000000', 1, 1);
    ball.move();
    assert.equal(3, ball.x);
    assert.equal(6, ball.y);
  });
  it(`move_dx, dy가 0일 때_움직이려고 하면_움직이지 않는다`, () => {
    const ball = new Ball(2, 5, 1, '#000000', 0, 0);
    ball.move();
    assert.equal(2, ball.x);
    assert.equal(5, ball.y);
  });
  it(`isOn_원이 점 위에 있을 때_isOn을 호출하면_true를 리턴한다`, () => {
    const ball = new Ball(10, 20, 5, '#000000', 1, 0);
    const point = {x: 14, y: 20};

    assert.isTrue(ball.isOn(point.x, point.y));
  });
  it(`isOn_원이 점과 맞닿을 때_isOn을 호출하면_true를 리턴한다`, () => {
    const ball = new Ball(10, 20, 5, '#000000', 1, 0);
    const point = {x: 15, y: 20};

    assert.isTrue(ball.isOn(point.x, point.y));
  });
  it(`isOn_원이 점 바깥에 있을 때_isOn을 호출하면_true를 리턴한다`, () => {
    const ball = new Ball(10, 20, 5, '#000000', 1, 0);
    const point = {x: 16, y: 20};
    
    assert.isFalse(ball.isOn(point.x, point.y));
  });
});