(function() {
  if (typeof Breakout === "undefined") {
    window.Breakout = {};
  }

  var Game = Breakout.Game = function (ctx) {
    this.ctx = ctx;
    this.ball = new Breakout.Ball({
      vel: [5, -5]
    });
    this.paddle = new Breakout.Paddle();
    this.paddleKeys = {};
    this.drawAll();
    window.addEventListener("keypress", this.handleKeypress.bind(this));
    window.addEventListener("keydown", this.addPaddleKey.bind(this));
    window.addEventListener("keyup", this.removePaddleKey.bind(this));
  };

  Game.WIDTH = 800;
  Game.HEIGHT = 600;
  Game.PADDLE_DIRS = {
    37: "left",
    39: "right"
  };

  Game.prototype.handleKeypress = function (event) {
    if (event.keyCode === 32 && this.isActive()) {
      this.pause();
    } else if (event.keyCode === 32) {
      this.step();
    }
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

  Game.prototype.isActive = function () {
    return !!this.timeoutID;
  };

  Game.prototype.moveAll = function () {
    this.ball.move();
    var keysDown = Object.keys(this.paddleKeys);
    if (keysDown.length === 1) {
      this.paddle.move(Game.PADDLE_DIRS[keysDown[0]]);
    }
  };

  Game.prototype.drawAll = function () {
    this.ctx.clearRect(0, 0, Game.WIDTH, Game.HEIGHT);
    this.ball.draw(this.ctx);
    this.paddle.draw(this.ctx);
  };

  Game.prototype.step = function () {
    this.moveAll();
    this.drawAll();
    this.timeoutID = setTimeout(this.step.bind(this), 100);
  };

  Game.prototype.pause = function () {
    clearTimeout(this.timeoutID);
    this.timeoutID = null;
  };
})();
