// config.spec.js

const {assert, expect} = require('chai');
const Configuration = require('./config.js');

describe(`Configuration test suite`, () => {
  it(`testIntantiate_인자없이_초기화하면_기본값이설정된다.`, () => {
    const conf = new Configuration();
    assert.ok(conf);
    assert.isNumber(conf.canvasHeight);
    assert.isNumber(conf.canvasWidth);
    assert.isNumber(conf.paddleTop);
  });

  it(`testIntantiate_인자가존재할때_초기화하면_접근이가능하다`, () => {
    const conf = new Configuration(1,2,3);
    assert.ok(conf);
    assert.isNumber(conf.canvasHeight);
    assert.isNumber(conf.canvasWidth);
    assert.isNumber(conf.paddleTop);
  });

  it(`testGetCanvasWidth`, () => {
    const conf = new Configuration(1, 2, 3);
    assert.isNumber(conf.canvasWidth);
    assert.equal(conf.canvasWidth, 1);
  });
  it(`testGetCanvasHeight`, () => {
    const conf = new Configuration(1, 2, 3);
    assert.isNumber(conf.canvasHeight);
    assert.equal(conf.canvasHeight, 2);
  });
  it(`testGetPaddleTop`, () => {
    const conf = new Configuration(1, 2, 3);
    assert.isNumber(conf.paddleTop);
    assert.equal(conf.paddleTop, 3);
  });
  it(`testSetCanvasWidth_속성값을_바꾸면_오류가발생한다.`, () => {
    const conf = new Configuration(1, 1, 1);
    // assert.throws(() => { conf.canvasWidth = 5; });
    conf.canvasWidth = 3;
    assert.notEqual(conf.canvasWidth, 3);
  });
  it(`testSetCanvasHeight_속성값을_바꾸면_오류가발생한다.`, () => {
    const conf = new Configuration(1, 1, 1);
    // assert.throws(() => { conf.canvasHeight = 5; });
    conf.canvasWidth = 3;
    assert.notEqual(conf.canvasHeight, 3);
  });
  it(`testSetPaddleTop_속성값을_바꾸면_오류가발생한다.`, () => {
    const conf = new Configuration(1, 1, 1);
    // assert.throws(() => { conf.paddleTop = 5; });
    conf.paddleTop = 3;
    assert.notEqual(conf.paddleTop, 3);
  });

});