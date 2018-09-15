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
    left: 0,
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

  }
};


// init
var app = document.createElement('div');
app.setAttribute('id', 'app');
app.setAttribute('class', 'app full');

var canvas = document.createElement('canvas');
canvas.width = CONF.canvasWidth;
canvas.height = CONF.canvasHeight;
app.appendChild(canvas);

const painter = new Painter(canvas, 0, 0, CONF.canvasWidth, CONF.canvasHeight);
const paddle = new Paddle(250, 500, 120, 10, 'rgba(36, 68, 38, 0.8)', 3);

document.body.appendChild(app);
var ctx = canvas.getContext('2d');

var rightPressed = false;
var leftPressed = false;

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

document.addEventListener('keyup', keyUpHandler);
document.addEventListener('keydown', keyDownHandler);


function BallManager(number) {
  var balls = [];
  for(var i = 0; i < number; i++) {
    // DEL_LEGACY balls[i] = new _Ball(230, 230, 3, 'blue', (Math.random() - 0.5)*4, (Math.random() - 0.5)*4);
    balls[i] = new Ball(230, 230, 3, 'blue', (Math.random() - 0.5)*4, (Math.random() - 0.5)*4);
    { /*-------- LEGACY START ---------------------------*/
      balls[i]._move = function(paddle) {
        console.trace(`ball{x:${this.x}, y:${this.y}}`);
        if(this.y - this.radius + this.dy <= 0) {
          this.dy = this.dy * (0-1);
        } else if(this.y + this.radius + this.dy >= canvas.height - CONF.bricks.offset.top) {
          if(this.y < canvas.height - CONF.bricks.offset.top && this.x > paddle.x && this.x <= paddle.x + paddle.width) {
            this.dy = this.dy * (0-1);
          }
        }
        if(this.x + this.dx <  this.radius || this.x + this.dx > canvas.width - this.radius) {
          this.dx = this.dx * (0-1);
        } else if( (this.y > paddle.y && this.y < paddle.y + paddle.height && this.x + this.radius + this.dx >= paddle.x)
                  && (this.y > paddle.y && this.y < paddle.y + paddle.height && this.x - this.radius + this.dx <= paddle.x + paddle.width) ) {
          this.dx = this.dx * (0-1);
        }
      
        this.x = this.x + this.dx;
        this.y = this.y + this.dy;
      };
    } /*-------- LEGACY END ---------------------------*/
  }

  
  this.get = i => balls[i] || 0;
  this.getAll = () => balls;
  this.length = balls.length;
  this.allGone = () => balls.filter(ball => ball.y - ball.radius > canvas.height || ball.x - ball.radius < 0 || ball.x  + ball.radius > canvas.height).length  == balls.length;
}

const detectCollision = (ball, bricks) => {
  // balls.forEach(ball => {
    // TODO 충돌 감지 코드 작성!!
    bricks.forEach(brick => {
      if(brick.durability > 0 && ball.x + ball.radius > brick.x && ball.x + ball.radius < brick.x + brick.width
        && ball.y + ball.radius > brick.y && ball.y + ball.radius < brick.y + brick.height) {
        // TODO 벽돌 안에 들어가는 버그 수정하기
        if(ball.x < brick.x )
          ball.dx = (-1)*ball.dx;
        else
          ball.dy = ((-1)*ball.dy);
        
        crush(brick, CONF.bricks.colors); // brick._collision();
      }
    });
  // });
};



function crush(brick, colors) {
  brick.crack();
  brick.color = colors[brick.durability];
  return true;
}
  function isOver(ballManager, intervalId) {
    if(ballManager.allGone()) {
      alert('GAME OVER');
      clearInterval(intervalId);
    }
  }

  

  
  { // LEGACY CODE --------------------------------->
    var ballManager = new BallManager(2);
  }
  var bricks = new BrickRepository(CONF.bricks);
  function movePaddle(sigLeft, sigRight, paddle, config) {
    if(sigLeft && paddle.isNotOnLeftBoundary(0)) return paddle.move(true);
    else if(sigRight && paddle.isNotOnRightBoundary(config.canvasWidth)) return paddle.move(false);
    return undefined;
  }
  function startDrawCanvas(_painter, _bricks, _balls, _paddle, _config) {
    const intervalId = setInterval(function() {
      _painter.clear(0, 0, _config.canvasWidth, _config.canvasHeight);
  
      // bricks.drawBricks();
      /* LEGACY
      _bricks.getBricks().forEach(brickRow => {
        brickRow.forEach(brick => {
          painter.draw(brick);
        });
      });
      */
     _bricks.getBricks().forEach(brick => {
       console.debug(`draw brick: ${brick.x}, ${brick.y}`);
       painter.draw(brick);
     });
      _balls.getAll().forEach(ball => {
        detectCollision(ball, bricks.getBricks());// ball._detectCollision(_bricks.getBricks());
        ball._move(_paddle);
        _painter.draw(ball);
      });
      movePaddle(leftPressed, rightPressed, _paddle, _config);
      _painter.draw(_paddle);
      isOver(_balls, intervalId);
    }, 10);
  }

  var isPlaying = false;
  document.body.onclick = () => {
    if(isPlaying) return;
    startDrawCanvas(painter, bricks, ballManager, paddle, CONF);
    isPlaying = true;
    console.log(`game started`);
  };
  console.log(`refactored: v1.4`);
  