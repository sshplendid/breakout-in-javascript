// brick.repository.spec.js

const {assert} = require('chai');
const BrickRepository = require('./brick.repository.js');

describe(`repository/BrickRepository`, () => {
  it(`constructor`, () => {
    const repo = new BrickRepository();
    assert.isObject(repo);
  });
  it(`createFreshBricks`, () => {
    const repo = new BrickRepository();
    const row = 3, col = 3;
    const options = {
      x: 1,
      y: 2,
      width: 3,
      height: 4,
      color: 'black',
      durability: 5
    };
    assert.isTrue( repo.createFreshBricks(row, col, options) );
    assert.equal( 9, repo.getExistingBrickCount() );
  });
});