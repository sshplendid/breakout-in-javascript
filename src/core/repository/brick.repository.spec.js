// brick.repository.spec.js

const {assert} = require('chai');
const BrickRepository = require('./brick.repository.js');

const row = 3, col = 3;
const options = {
  row: 3,
  col: 3,
  width: 80,
  height: 20,
  durability: 3,
  colors: ['rgba(0,0,0,0.00)', 'red', 'orange', 'green'],
  padding: 30,
  offset: {
    top: 100,
    left: 25
  }
};

describe(`repository/BrickRepository`, () => {
  it(`constructor`, () => {
    const repo = new BrickRepository();
    assert.isObject(repo);
  });
  it(`constructor_withEmptyOptionsObject`, () => {
    const repo = new BrickRepository({});
    assert.isObject(repo);
  });
  it(`createFreshBricks`, () => {
    const repo = new BrickRepository();
    assert.isTrue( repo.createFreshBricks(row, col, options) );
    assert.equal(repo.getExistingBrickCount(), 9);
  });
  
  it(`getAvailableBricks`, () => {
    const repo = new BrickRepository();
    assert.isArray(repo.getAvailableBricks());
    assert.deepEqual(repo.getAvailableBricks(), repo.getBricks());
  });

  it(`hasNoBricks`, () => {
    const repo = new BrickRepository();
    assert.isArray(repo.getAvailableBricks());
    assert.equal(repo.getExistingBrickCount(), 0);
    assert.isTrue(repo.hasNoBricks());
  });
  
  it(`getIndex_r:${row},c:${col} 일 때_인덱스(1,3)는_6이 나온다`, () => {
    const repo = new BrickRepository();
    assert.isTrue( repo.createFreshBricks(row, col, options) );
    
    assert.equal(repo.getIndex(1, 3), 6);
  });
  it(`getIndex_r:${row},c:${col} 일 때_인덱스(3,3)는_8이 나온다`, () => {
    const repo = new BrickRepository();
    assert.isTrue( repo.createFreshBricks(row, col, options) );
    assert.equal(repo.getIndex(col, row), 8);
  });
  it(`getIndex_r:${row},c:${col} 일 때_인덱스(1,1)는_0이 나온다`, () => {
    const repo = new BrickRepository();
    assert.isTrue( repo.createFreshBricks(row, col, options) );
    assert.equal(repo.getIndex(1, 1), 0);
  });
  it(`getIndex_r:1,c:1 일 때_인덱스(1,1)는_0이 나온다`, () => {
    const repo = new BrickRepository();
    assert.isTrue( repo.createFreshBricks(1, 1, options) );
    assert.equal(repo.getIndex(1, 1), 0);
  });

  it(`getIndex_r:1,c:1 일 때_인덱스(2,1)는_-1이 나온다`, () => {
    const repo = new BrickRepository();
    assert.isTrue( repo.createFreshBricks(1, 1, options) );
    assert.equal(repo.getIndex(2, 1), -1);
  });
  it(`getIndex_r:1,c:1 일 때_인덱스(1,2)는_-1이 나온다`, () => {
    const repo = new BrickRepository();
    assert.isTrue( repo.createFreshBricks(1, 1, options) );
    assert.equal(repo.getIndex(1, 2), -1);
  });
  
  it(`getBrick_r:${row}, c:${col}일 때_2번째 벽돌을 꺼내면_Brick ojbect를 리턴한다`, () => {
    const repo = new BrickRepository();
    assert.isTrue( repo.createFreshBricks(row, col, options) );
    const brick = repo.getBrick(1, 2);
    assert.isObject( brick );
    assert.isTrue(0 < brick.durability && brick.durability <= options.durability);
  });

  it(`getBrick_r:${row}, c:${col}일 때_10번째 벽돌을 꺼내면_undefined를 리턴한다`, () => {
    const repo = new BrickRepository();
    assert.isTrue( repo.createFreshBricks(row, col, options) );
    const brick = repo.getBrick(1, 4);
    assert.isUndefined( brick );
  });
  it(`getBrick_r:${row}, c:${col}일 때_3번째 벽돌을 바꾸면_아무일도 일어나지 않는다`, () => {
    const repo = new BrickRepository(options);
    repo.createFreshBricks(row, col, options);
    const brick = repo.getBrick(col, 1);
    const expectedDurability = brick.durability -1;
    brick.crack();
    assert.equal(expectedDurability, brick.durability);
    assert.deepEqual(repo.getBrick(col, 1), brick);
    assert.equal(repo.getBrick(col, 1).durability, expectedDurability);
  });
});