(function() {
  if (typeof Breakout === "undefined") {
    window.Breakout = {};
  }

  var Game = Breakout.Game = function (ctx) {
    this.ctx = ctx;
    this.ball = new Breakout.Ball();
    this.paddle = new Breakout.Paddle();
    this.paddleKeys = {};
    this.bricks = [];
    this.addBricks();
    this.drawAll();
    this.addListeners();
  };

  Game.WIDTH = 800;
  Game.HEIGHT = 600;
  Game.PADDLE_DIRS = {
    37: "left",
    39: "right"
  };
  Game.NUM_BRICK_ROWS = 8;
  Game.NUM_BRICK_COLS = 16;

  Game.prototype.addBricks = function() {
    for (var i = 0; i < Game.NUM_BRICK_ROWS; i++) {
      for (var j = 0; j < Game.NUM_BRICK_COLS; j++) {
        this.bricks.push(new Breakout.Brick({
          xy: Breakout.Brick.makeXY(i, j),
          color: Breakout.Brick.blueColorScheme(i, Game.NUM_BRICK_ROWS)
        }));
      }
    }
  };

  Game.prototype.addListeners = function() {
    window.addEventListener("keydown", this.addPaddleKey.bind(this));
    window.addEventListener("keyup", this.removePaddleKey.bind(this));
    window.addEventListener("keypress", this.handleKeypress.bind(this));
  };

  Game.prototype.addPaddleKey = function (event) {
    if (event.keyCode === 37 || event.keyCode === 39) {
      this.paddleKeys[event.keyCode] = true;
    }
  };

  Game.prototype.removePaddleKey = function (event) {
    if (event.keyCode === 37 || event.keyCode === 39) {
      delete this.paddleKeys[event.keyCode];
    }
  };

  Game.prototype.handleKeypress = function (event) {
    if (event.keyCode === 32 && this.isActive()) {
      this.pause();
    } else if (event.keyCode === 32) {
      this.step();
    }
  };

  Game.prototype.isActive = function () {
    return !!this.timeoutID;
  };

  Game.prototype.pause = function () {
    clearTimeout(this.timeoutID);
    this.timeoutID = null;
  };

  Game.prototype.step = function () {
    this.moveAll();
    if (this.missed) {
      this.newTurn();
    } else {
      this.drawAll();
      this.timeoutID = setTimeout(this.step.bind(this), 30);
    }
  };

  Game.prototype.drawAll = function () {
    this.ctx.clearRect(0, 0, Game.WIDTH, Game.HEIGHT);
    this.ball.draw(this.ctx);
    this.paddle.draw(this.ctx);
    this.bricks.forEach(function(brick) {
      brick.draw(this.ctx);
    }, this);
  };

  Game.prototype.moveAll = function () {
    if (this.ball.hitPaddle(this.paddle) === false) {
      this.missed = true;
      return;
    }
    this.ball.move();
    var keysDown = Object.keys(this.paddleKeys);
    if (keysDown.length === 1) {
      this.paddle.move(Game.PADDLE_DIRS[keysDown[0]]);
    }
  };

  Game.prototype.newTurn = function () {
    this.missed = false;
    this.pause();
    this.ball = new Breakout.Ball();
    this.paddle.setStartPos();
    // decrement livesLeft
    this.drawAll();
  };
})();
