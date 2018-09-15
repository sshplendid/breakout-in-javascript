// brick.repository.spec.js

const {assert} = require('chai');
const BrickRepository = require('./brick.repository.js');

const row = 3, col = 3;
const options = {
  x: 1,
  y: 2,
  width: 3,
  height: 4,
  color: 'black',
  durability: 5
};

describe(`repository/BrickRepository`, () => {
  it(`constructor`, () => {
    const repo = new BrickRepository();
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
  });
  
  it(`getIndex_r:${row},c:${col} 일 때_인덱스(1,3)는_2가 나온다`, () => {
    const repo = new BrickRepository();
    assert.isTrue( repo.createFreshBricks(row, col, {}) );
    
    assert.equal(repo.getIndex(1, 3), 6);
  });
  it(`getIndex_r:${row},c:${col} 일 때_인덱스(3,3)는_8이 나온다`, () => {
    const repo = new BrickRepository();
    assert.isTrue( repo.createFreshBricks(row, col, {}) );
    assert.equal(repo.getIndex(col, row), 8);
  });
  it(`getIndex_r:${row},c:${col} 일 때_인덱스(1,1)는_0이 나온다`, () => {
    const repo = new BrickRepository();
    assert.isTrue( repo.createFreshBricks(row, col, {}) );
    assert.equal(repo.getIndex(1, 1), 0);
  });
  it(`getIndex_r:1,c:1 일 때_인덱스(1,1)는_0이 나온다`, () => {
    const repo = new BrickRepository();
    assert.isTrue( repo.createFreshBricks(1, 1, {}) );
    assert.equal(repo.getIndex(1, 1), 0);
  });

  it(`getIndex_r:1,c:1 일 때_인덱스(2,1)는_-1이 나온다`, () => {
    const repo = new BrickRepository();
    assert.isTrue( repo.createFreshBricks(1, 1, {}) );
    assert.equal(repo.getIndex(2, 1), -1);
  });
  it(`getIndex_r:1,c:1 일 때_인덱스(1,2)는_-1이 나온다`, () => {
    const repo = new BrickRepository();
    assert.isTrue( repo.createFreshBricks(1, 1, {}) );
    assert.equal(repo.getIndex(1, 2), -1);
  });
  
  it(`getBrick_r:${row}, c:${col}일 때_2번째 벽돌을 꺼내면_Brick ojbect를 리턴한다`, () => {
    const repo = new BrickRepository();
    assert.isTrue( repo.createFreshBricks(row, col, options) );
    const brick = repo.getBrick(0, 2);
    assert.isObject( brick );
    assert.equal(brick.durability, options.durability);
  });

  it(`getBrick_r:${row}, c:${col}일 때_10번째 벽돌을 꺼내면_undefined를 리턴한다`, () => {
    const repo = new BrickRepository();
    assert.isTrue( repo.createFreshBricks(row, col, options) );
    const brick = repo.getBrick(1, 4);
    assert.isUndefined( brick );
  });
  it(`setBrick_r:${row}, c:${col}일 때_3번째 벽돌을 바꾸면_아무일도 일어나지 않는다`, () => {
    const repo = new BrickRepository();
    repo.createFreshBricks(row, col, options);
    const brick = repo.getBrick(col, 1);
    brick.crack();
    assert.equal(options.durability - 1, brick.durability);
    assert.deepEqual(repo.getBrick(col, 1), brick);
    assert.equal(repo.getBrick(col, 1).durability, 4);
  });
});