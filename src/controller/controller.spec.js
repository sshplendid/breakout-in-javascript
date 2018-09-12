// controller.spec.js

const {assert} = require('chai');
const Controller = require('./controller.js');

describe(`controller/Controller`, () => {
  it(`constructor`, () => {
    const controller = new Controller();
    assert.isObject(controller);
  });
  // it(`makeBricks`, () => {
  //   const controller = new Controller();
  //   assert.isOk(controller.makeBricks(4, 4), `벽돌 생성 실패!`);
  //   assert.isNumber(controller.getExistingBrickCount(), `벽돌을 셀 수 없다`);
  //   assert.isArray(controller.getAvailableBricks(), `벽돌 배열을 가져올 수 없다!`);
  // });
  // it(`makeBricks_row:2,col:2일 때_벽돌을 만들면_cnt:4, array[2][2]의 벽돌이 생성된다`, () => {
  //   const controller = new Controller();
  //   assert.isOk(controller.makeBricks(4, 4), `벽돌 생성 실패!`);
  //   assert.equal(controller.getExistingBrickCount(), 4, `벽돌을 셀 수 없다`);
  //   controller
  //     .getAvailableBricks()
  //     .forEach(row => {
  //       row.forEach(brick => {
  //         assert.isTrue(brick instanceof Brick, `Brick 인스턴스가 아니다!`);
  //       });
  //     });
  // });
});