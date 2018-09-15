// actual.spec.js
'use strict';

const {assert, expect} = require('chai');
const Brick = require('./brick.js');

describe(`core/elements/Brick`, () => {
  it(`constructor_인자가 없을 때_생성자를 호출하면_에러없이 생성된다`, () => {
    const actual = new Brick();
    assert.ok(actual);
  });
  it(`constructor_인자가 없을 때_생성자를 호출하면_초기값이 세팅된다`, () => {
    const actual = new Brick();
    const expected = new Brick(0, 0, 0, 0, '#000000', 0);

    assert.deepEqual(actual, expected);
    assert.equal(0, actual.x);
    assert.equal(0, actual.y);
    assert.equal(0, actual.width);
    assert.equal(0, actual.height);
    assert.equal('#000000', actual.color);
    assert.equal(0, actual.durability);
  });

  it(`constructor_인자가 options객체일 때_생성하면_options로 초기값이 세팅된다`, () => {
    const options = {
      x: 1,
      y: 2,
      width: 3,
      height: 4,
      color: 'black',
      durability: 5
    };
    const actual = new Brick(options);
    const expected = new Brick(1, 2, 3, 4, 'black', 5);
    assert.deepEqual(expected, actual);
  });
  it(`constructor_options객체가 빈 객체일 때_생성하면_초기값이 세팅된다`, () => {
    const options = {};
    const actual = new Brick(options);
    const expected = new Brick(0, 0, 0, 0, '#000000', 0);
    assert.deepEqual(expected, actual);
  });

  it(`constructor_인자가 있을때_생성자를 호출하면_속성을 조회할 수 있다`, () => {
    const actual = new Brick(1, 1, 1, 1, 'blue', 3);
    assert.equal(1, actual.x);
  });

  it(`crack_durability가 0이 아닐때_깨뜨리면_내구성이 줄어든다`, () => {
    const actual = new Brick(1, 1, 1, 1, '', 3);
    assert.isTrue(actual.crack());
    assert.equal(2, actual.durability);
  });

  it(`crack_durability가 1일 때_깨뜨리면_내구성이 0이 된다`, () => {
    const actual = new Brick(1, 1, 1, 1, '', 1);
    assert.isTrue(actual.crack());
    assert.equal(0, actual.durability);
  });

  it(`crack_내구성이 0일때_깨뜨려고 하면_깨지지 않는다`, () => {
    const actual = new Brick(1, 1, 1, 1, '', 0);
    assert.isFalse(actual.crack());
    assert.equal(0, actual.durability);
  });
  
  it(`isBroken_durability가 0일 때_벽돌이 깨졌는지 확인하면_true를 리턴한다`, () => {
    const actual = new Brick(1, 1, 1, 1, '', 0);
    assert.isTrue(actual.isBroken());
  });
  it(`isBroken_durability가 0이 아닐 때_벽돌이 깨졌는지 확인하면_false를 리턴한다`, () => {
    const actual = new Brick(1, 1, 1, 1, '', 3);
    assert.isFalse(actual.isBroken());
  });

  it(`isNotBroken_durability가 0이 아닐 때_벽돌이 안깨졌는지 확인하면_true를 리턴한다`, () => {
    const actual = new Brick(1, 1, 1, 1, '', 1);
    assert.isTrue(actual.isNotBroken());
  });
  it(`isNotBroken_durability가 0일 때_벽돌이 안깨졌는지 확인하면_false를 리턴한다`, () => {
    const actual = new Brick(1, 1, 1, 1, '', 0);
    assert.isFalse(actual.isNotBroken());
  });
});
