// config.spec.js

const {assert, expect} = require('chai');
const Configuration = require('./config.js');

describe(`core/config/Configuration`, () => {
  it(`constructor_인자없이_초기화하면_기본값이설정된다.`, () => {
    const conf = new Configuration();
    assert.ok(conf);
    assert.isNumber(conf.canvasHeight);
    assert.isNumber(conf.canvasWidth);
    assert.isNumber(conf.paddleTop);
  });

  it(`constructor_인자가존재할때_초기화하면_접근이가능하다`, () => {
    const conf = new Configuration(1,2,3);
    assert.ok(conf);
    assert.isNumber(conf.canvasHeight);
    assert.isNumber(conf.canvasWidth);
    assert.isNumber(conf.paddleTop);
  });

  it(`getter:CanvasWidth`, () => {
    const conf = new Configuration(1, 2, 3);
    assert.isNumber(conf.canvasWidth);
    assert.equal(conf.canvasWidth, 1);
  });
  it(`getter:CanvasHeight`, () => {
    const conf = new Configuration(1, 2, 3);
    assert.isNumber(conf.canvasHeight);
    assert.equal(conf.canvasHeight, 2);
  });
  it(`getter:PaddleTop`, () => {
    const conf = new Configuration(1, 2, 3);
    assert.isNumber(conf.paddleTop);
    assert.equal(conf.paddleTop, 3);
  });
  it(`setter:CanvasWidth__속성 값을 바꾸면_값은 바뀌지 않는다`, () => {
    const conf = new Configuration(1, 1, 1);
    conf.canvasWidth = 3;
    assert.notEqual(conf.canvasWidth, 3);
  });
  it(`setter:CanvasHeight__속성 값을 바꾸면_값은 바뀌지 않는다`, () => {
    const conf = new Configuration(1, 1, 1);
    conf.canvasWidth = 3;
    assert.notEqual(conf.canvasHeight, 3);
  });
  it(`setter:PaddleTop__속성 값을 바꾸면_값은 바뀌지 않는다`, () => {
    const conf = new Configuration(1, 1, 1);
    conf.paddleTop = 3;
    assert.notEqual(conf.paddleTop, 3);
  });

});