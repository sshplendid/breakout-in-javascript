// controller.spec.js

const {assert} = require('chai');
const Controller = require('./controller.js');

describe(`controller/Controller`, () => {
  it(`constructor`, () => {
    const controller = new Controller();
    assert.isObject(controller);
  });
  
  it(`startGame`, () => {
    const controller = new Controller();
    assert.isNotNull(controller.startGame());
  });

  it(`startGame_화면이 초기화 됐을 때_게임을 시작하면_true를 리턴한다`, () => {
    const initialized = true;
    const controller = new Controller(initialized);
    assert.isTrue(controller.startGame());
  });
  
  it(`startGame_화면이 초기화 전일 때_게임을 시작하면_false를 리턴한다`, () => {
    const initialized = false;
    const controller = new Controller(initialized);
    assert.isFalse(controller.startGame());
  });

  it(`isPlaying_화면이 초기화 됐을 때_게임을 시작하면_Playing 상태로 바뀐다`, () => {
    const initialized = true;
    const controller = new Controller(initialized);
    assert.isTrue(controller.startGame());
    assert.isTrue(controller.isPlaying());
    assert.isFalse(controller.isGameOver());
    assert.isFalse(controller.isGameClear());
  });

  it(`isPlaying_화면이 초기화 전일 때_게임을 시작하면_false를 리턴한다`, () => {
    const initialized = false;
    const controller = new Controller(initialized);
    assert.isFalse(controller.startGame());
    assert.isFalse(controller.isPlaying());
  });
  
  it(`terminateGame`, () => {
    const initialized = true;
    const controller = new Controller(true);
    assert.isTrue(controller.startGame());
    assert.isTrue(controller.isPlaying());
    controller.terminateGame();
    assert.isTrue(controller.isGameOver());
  });
  
  
});