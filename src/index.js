'use strict';

console.debug = (message) => console.log(`[DEBUG] ${message}`);

// load source
const Configuration = require('./core/config/config.js');
// const Brick = require('./core/elements/brick.js');
const Ball = require('./core/elements/ball.js');
const Paddle = require('./core/elements/paddle.js');
// const Painter = require('./render/painter.js');

// config
const options = {
  canvasWidth: 450,
  canvasHeight: 600,
  paddleTop: 100,
};
const CONF = new Configuration(
  options.canvasWidth, 
  options.canvasHeight, 
  options.paddleTop);


// init
var canvas = document.createElement('canvas');
canvas.width = CONF.canvasWidth;
canvas.height = CONF.canvasHeight;

document.body.appendChild(canvas);
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

function _Ball(_x, _y, _r, _c, _dx, _dy) {

  this.x = val => _x = val || _x;
  this.y = val => _y = val || _y;
  this.dx = val => _dx = val || _dx;
  this.dy = val => _dy = val || _dy;
  this.radius = val => _r = val || _r;
  this.color = val => _c = val || _c;

  _Ball.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x(), this.y(), this.radius(), 0, Math.PI*2);
    ctx.fillStyle = this.color();
    ctx.fill();
    ctx.closePath();
  };

  _Ball.prototype.move = function(board) {
    this.move.crossed = this.move.crossed || false;
    if(this.y() - this.radius() + this.dy() <= 0) {
      this.dy(this.dy() * (0-1));
    } else if(this.y() + this.radius() + this.dy() >= canvas.height - CONF.paddleTop) {
      if(this.y() < canvas.height - CONF.paddleTop && this.x() > paddle.x && this.x() <= paddle.x + paddle.width) {
        this.dy(this.dy() * (0-1));
      }
    }
    if(this.x() + this.dx() <  this.radius() || this.x() + this.dx() > canvas.width - this.radius()) {
      this.dx(this.dx() * (0-1));
    } else if( (this.y() > paddle.y && this.y() < paddle.y + paddle.height && this.x() + this.radius() + this.dx() >= paddle.x)
              && (this.y() > paddle.y && this.y() < paddle.y + paddle.height && this.x() - this.radius() + this.dx() <= paddle.x + paddle.width) ) {
      this.dx(this.dx() * (0-1));
    }

    this.x(this.x() + this.dx());
    this.y(this.y() + this.dy());
    console.debug('(x, y) => (' + this.x() + ', ' + this.y() + ', ' + this.dy() + ')');
  };
  _Ball.prototype.detectCollision = (bricks) => {
    var _c = bricks.length;
    for(var c = 0; c < _c; c++) {
      var _r = bricks[c].length;
      for(var r = 0; r < _r; r++) {
        var b = bricks[c][r];
        if(b.durability() > 0 && this.x() + this.radius() > b.x() && this.x() + this.radius() < b.x() + b.w()
            && this.y() + this.radius() > b.y() && this.y() + this.radius() < b.y() + b.h()) {
              console.info('detectCollision');
          // TODO 벽돌 안에 들어가는 버그 수정하기
          if(this.x() < b.x() )
            this.dx((-1)*this.dx());
          else
            this.dy((-1)*this.dy());
          b.collision();
        }
      }
    }
  };
}

function BallManager(number) {
  var balls = [];
  for(var i = 0; i < number; i++) {
    balls[i] = new _Ball(230, 230, 3, 'blue', (Math.random() - 0.5)*4, (Math.random() - 0.5)*4);
  }

  this.get = i => balls[i] || 0;
  this.getAll = () => balls;
  this.length = balls.length;
  this.allGone = () => balls.filter(ball => ball.y() - ball.radius() > canvas.height || ball.x() - ball.radius() < 0 || ball.x()  + ball.radius() > canvas.height).length  == balls.length;
}

function BrickFactory(_r, _c, _w, _h, _color, _padding, _offsetTop, _offsetLeft) {
  function Brick(_x, _y, _w, _h, _c, _durability) {
    this.x = val => _x = val || _x;
    this.y = val => _y = val || _y;
    this.w = val => _w = val || _w;
    this.h = val => _h = val || _h;
    this.c = val => _c = val || _c;
    this.durability = val => _durability = val || _durability;
    this.color = [undefined, 'red', 'orange', 'greent'];
    Brick.prototype.draw = Brick.prototype.draw || function() {
      ctx.beginPath();
      ctx.rect(this.x(), this.y(), this.w(), this.h());
      ctx.fillStyle = this.c();
      ctx.fill();
      ctx.closePath();
    };
    this.collision = function() {
      if(_durability > 0)
      _durability -= 1;
      this.c(this.color[_durability]);
      console.warn(`(${c}, ${r}) => ${_durability}`);
    };
  }

  var color = [undefined, 'red', 'orange', 'green'];
  var bricks = [];
  for(var c = 0; c < _c; c++) {
    bricks[c] = [];
    for(var r = 0; r < _r; r++) {
      var brickX = c * (_w + _padding) + _offsetLeft;
      var brickY = r * (_h + _padding) + _offsetTop;
      var durability = Math.ceil(Math.random()*3) ;
      bricks[c][r] = new Brick(brickX, brickY, _w, _h, color[durability], durability);
    }
  }

  this.getBricks = () => bricks;
  this.getBrick = (x, y) => bricks[x][y];
  BrickFactory.prototype.drawBricks = () => {
    for(var c = 0; c < _c; c++) {
      for(var r = 0; r < _r; r++) {
        if(bricks[c][r].durability() > 0)
          bricks[c][r].draw();
      }
    }
  };
}

  function isOver(ballManager, intervalId) {
    if(ballManager.allGone()) {
      alert('GAME OVER');
      clearInterval(intervalId);
    }
  }
  const paddle = new Paddle(250, 500, 120, 10, 'rgba(36, 68, 38, 0.8)', 3);

  
  
  
  { // LEGACY CODE --------------------------------->

    var ballManager = new BallManager(1);
    var bricks = new BrickFactory(4, 4, 80, 20, 'lightgray', 30, CONF.paddleTop, 25);

    // Board Legacy 대응
    paddle._move = function() {
      if( rightPressed && this.isNotOnRightBoundary(canvas.width) ) {
        this.move();
      } else if( leftPressed && this.isNotOnLeftBoundary(0) ){
        this.move(true);
      } 
    };
    paddle._draw = function() {
      ctx.beginPath();
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    };
    // LEGACY CODE END --------------------------------->
  }


  var intervalId = setInterval(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    bricks.drawBricks();
    ballManager.getAll().forEach(ball => ball.detectCollision(bricks.getBricks()));
    ballManager.getAll().forEach(ball => ball.move(paddle));
    ballManager.getAll().forEach(ball => ball.draw());
    paddle._move();
    paddle._draw();
    isOver(ballManager, intervalId);
  }, 10);
// })();
