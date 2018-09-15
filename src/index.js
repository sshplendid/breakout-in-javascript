'use strict';

console.debug = (message) => console.log(`[DEBUG] ${message}`);
console.trace = () => true;

// load source
const BrickRepository = require('./core/repository/brick.repository.js');
const Ball = require('./core/elements/ball.js');
const Paddle = require('./core/elements/paddle.js');
const Painter = require('./render/painter.js');
const Renderer = require('./render/renderer.js');

// config
const CONF = {
  windowWidth: window.innerWidth,
  windowHeight: window.innerHeight,
  canvasWidth: 450,
  canvasHeight: 600,
  paddle: {
    top: 500,
    left: 250,
    width: 120,
    height: 10,
    color: 'rgba(36, 68, 38, 0.8)',
    dx: 3
  },
  bricks: {
    row: 4,
    col: 4,
    width: 80,
    height: 20,
    durability: 3,
    colors: ['rgba(0,0,0,0.00)', 'red', 'orange', 'green'],
    padding: 30,
    offset: {
      top: 100,
      left: 25
    }
  },
  balls: {
    x: 230,
    y: 230,
    radius: 3,
    color: 'green',
    dx: 4,
    dy: 4
  }
};


// RENDER: HTML document Element 선언
const container = document.createElement('div');
container.setAttribute('id', 'container');
container.setAttribute('class', 'full');

const app = document.createElement('div');
app.setAttribute('id', 'app');
app.setAttribute('class', 'app full');
const canvas = document.createElement('canvas');
canvas.width = CONF.canvasWidth;
canvas.height = CONF.canvasHeight;
app.appendChild(canvas);
container.appendChild(app);

const mouseCtrl = document.createElement('div');
mouseCtrl.setAttribute('id', 'mouseCtrl');
mouseCtrl.setAttribute('class', 'full mouseCtrl');
const leftCtrl = document.createElement('div');
leftCtrl.setAttribute('id', 'leftCtrl');
leftCtrl.setAttribute('class', 'leftFull');
const rightCtrl = document.createElement('div');
rightCtrl.setAttribute('id', 'rightCtrl');
rightCtrl.setAttribute('class', 'rightFull');
rightCtrl.style.left = `${CONF.windowWidth/2}px`;
mouseCtrl.appendChild(leftCtrl);
mouseCtrl.appendChild(rightCtrl);
leftCtrl.onmousedown = () => { leftPressed = true; };
leftCtrl.onmouseup = () => { leftPressed = false; };
rightCtrl.onmousedown = () => { rightPressed = true; };
rightCtrl.onmouseup = () => { rightPressed = false; };

container.appendChild(mouseCtrl);


// 속성 선언
  // 메서드
const detectCollision = (ball, bricks) => {
  bricks.forEach(brick => {
    if(brick.durability > 0 && ball.x + ball.radius > brick.x && ball.x + ball.radius < brick.x + brick.width
      && ball.y + ball.radius > brick.y && ball.y + ball.radius < brick.y + brick.height) {
      if(ball.x < brick.x )
        ball.dx = (-1)*ball.dx;
      else
        ball.dy = ((-1)*ball.dy);
      
      crush(brick, CONF.bricks.colors); // brick._collision();
    }
  });
};
const isGameOver = (balls) => {
  return hasNoActiveBalls(balls);    
};
const isGameClear = (bricks) => {
  return bricks.hasNoBricks();
}
const hasNoActiveBalls = (balls) => balls.filter(ball => ball.y - ball.radius > canvas.height || ball.x - ball.radius < 0 || ball.x  + ball.radius > canvas.height).length  == balls.length;
const hasActiveBalls = (balls) => !hasNoActiveBalls(balls);

const createBalls = (num) => {
  const balls = [];
  for(let i = 0; i < num; i++) 
    balls.push(new Ball(CONF.balls.x, CONF.balls.y, CONF.balls.radius, CONF.balls.color, (Math.random() - 0.5) * CONF.balls.dx, (Math.random() - 0.5) * CONF.balls.dy));
  return balls;
};

const moveBall = (_ball, _paddle) => {
  if(_ball.y - _ball.radius + _ball.dy <= 0) {
    _ball.dy = _ball.dy * (0-1);
  } else if(_ball.y + _ball.radius + _ball.dy >= canvas.height - CONF.bricks.offset.top) {
    if(_ball.y < canvas.height - CONF.bricks.offset.top && _ball.x > _paddle.x && _ball.x <= _paddle.x + _paddle.width) {
      _ball.dy = _ball.dy * (0-1);
    }
  }
  if(_ball.x + _ball.dx <  _ball.radius || _ball.x + _ball.dx > canvas.width - _ball.radius) {
    _ball.dx = _ball.dx * (0-1);
  } else if( (_ball.y > _paddle.y && _ball.y < _paddle.y + _paddle.height && _ball.x + _ball.radius + _ball.dx >= _paddle.x)
            && (_ball.y > _paddle.y && _ball.y < _paddle.y + _paddle.height && _ball.x - _ball.radius + _ball.dx <= _paddle.x + _paddle.width) ) {
    _ball.dx = _ball.dx * (0-1);
  }

  _ball.x = _ball.x + _ball.dx;
  _ball.y = _ball.y + _ball.dy;
};
const crush = (_brick, _colors) => {
  _brick.crack();
  _brick.color = _colors[_brick.durability];
  return true;
};
const terminateGame = (_intervalId, _message, _painter, _config) => {
  console.log(`Game terminated => ${_message}`);
  clearInterval(_intervalId);
  _painter.clear(0, 0, _config.canvasWidth, _config.canvasHeight);
}
const movePaddle = (_sigLeft, _sigRight, _paddle, _config)  =>{
  if(_sigLeft && _paddle.isNotOnLeftBoundary(0)) return _paddle.move(true);
  else if(_sigRight && _paddle.isNotOnRightBoundary(_config.canvasWidth)) return _paddle.move(false);
  return undefined;
};

const startDrawCanvas = (_painter, _bricks, _balls, _paddle, _config) => {
  const intervalId = setInterval(function() {
    _painter.clear(0, 0, _config.canvasWidth, _config.canvasHeight);

    _bricks.getBricks().forEach(brick => {
      painter.draw(brick);
    });
    _balls.forEach(ball => {
      detectCollision(ball, bricks.getBricks());// ball._detectCollision(_bricks.getBricks());
      moveBall(ball, _paddle); // ball._move(_paddle);
      _painter.draw(ball);
    });
    movePaddle(leftPressed, rightPressed, _paddle, _config);
    _painter.draw(_paddle);
    if(isGameOver(_balls) || isGameClear(_bricks)) {
      terminateGame(intervalId, '게임이 끝났다', _painter, _config);
    }
  }, 10);
  console.debug(`intervalId => ${intervalId}`);
};

var rightPressed = false;
var leftPressed = false;
const keyDownHandler = (e) =>{
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
};
const keyUpHandler = (e) => {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
};

  // 멤버
const painter = new Painter(canvas, 0, 0, CONF.canvasWidth, CONF.canvasHeight);
const balls = createBalls(2);
const bricks = new BrickRepository(CONF.bricks);
const paddle = new Paddle(CONF.paddle.left, CONF.paddle.top, CONF.paddle.width, CONF.paddle.height, CONF.paddle.color, CONF.paddle.dx);
var isPlaying = false;


// init
// RENDER app container 선언
document.body.appendChild(container);
document.addEventListener('keyup', keyUpHandler);
document.addEventListener('keydown', keyDownHandler);

var els = document.querySelectorAll('*');
Array.prototype.forEach.call(els, (el) => {
  el.mousedown = () => console.log(`${el.nodeName}: ${el.id}`);
});
  
document.body.onclick = () => {
  if(isPlaying) return;
  startDrawCanvas(painter, bricks, balls, paddle, CONF);
  isPlaying = true;
  console.log(`game started`);
};
console.log(`refactored: v1.4`);
  

