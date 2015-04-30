(function() {
  if (typeof Breakout === "undefined") {
    window.Breakout = {};
  }

  var Game = Breakout.Game = function (ctx, backgroundImg) {
    this.ctx = ctx;
    this.img = backgroundImg;
    this.score = 0;
    this.level = 1;
    this.livesLeft = 3;
    this.ball = new Breakout.Ball();
    this.paddle = new Breakout.Paddle();
    this.paddleKeys = {};
    this.bricks = [];
    this.addBricks();
    this.drawAll();
    this.addListeners();
  };

  Game.WIDTH = 800;
  Game.HEIGHT = 550;
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
      this.endTurn();
    } else {
      this.drawAll();
      this.timeoutID = setTimeout(this.step.bind(this), 20);
    }
  };

  Game.prototype.drawAll = function () {
    this.ctx.clearRect(0, 0, Game.WIDTH, Game.HEIGHT);
    this.ctx.drawImage(this.img, 0, 0, Game.WIDTH, Game.HEIGHT);
    this.ball.draw(this.ctx);
    this.paddle.draw(this.ctx);
    this.bricks.forEach(function(brick) {
      brick.draw(this.ctx);
    }, this);
    this.updateInfo();
  };

  Game.prototype.updateInfo = function() {
    document.getElementById("level-num").textContent = this.level;
    document.getElementById("score").textContent = "Score: " + this.score;
    document.getElementById("lives-left").textContent = "Lives Left: " +
      this.livesLeft;
  };

  Game.prototype.moveAll = function () {
    if (this.ball.hitPaddle(this.paddle) === false) {
      this.missed = true;
      return;
    }
    this.checkForBrickHits();
    this.ball.move();
    var keysDown = Object.keys(this.paddleKeys);
    if (keysDown.length === 1) {
      this.paddle.move(Game.PADDLE_DIRS[keysDown[0]]);
    }
  };

  Game.prototype.checkForBrickHits = function () {
    this.bricksHit = [];
    this.bricks.forEach(function(brick, index) {
      if (this.ball.hitBrick(brick)) {
        this.bricksHit.unshift(index);
      }
    }, this);

    if (this.bricksHit.length) {
      this.removeHitBricks();
    }
  };

  Game.prototype.removeHitBricks = function () {
    this.bricksHit.forEach(function(i) {
      this.bricks.splice(i, 1);
      this.score += 10 * this.level;
    }, this);
  };

  Game.prototype.endTurn = function () {
    this.pause();
    if (this.livesLeft > 0) {
      this.livesLeft--;
      this.newTurn();
    } else {
      this.endGame();
    }
  };

  Game.prototype.endGame = function () {
    this.displayLoss();
    window.addEventListener("keypress", this.newGame.bind(this));
  };

  Game.prototype.handleKeypress = function (event) {
    if (event.keyCode === 32 && this.isActive()) {
      this.pause();
    } else if (event.keyCode === 32) {
      this.step();
    }
  };

  Game.prototype.displayLoss = function () {
    this.drawAll();
    this.drawLossMessage();
  };

  Game.prototype.drawLossMessage = function () {
    this.ctx.textAlign = "center";
    var center = Game.WIDTH / 2;
    var score = "Final Score: " + this.score;
    var instruct = "Press ENTER to play again";

    this.ctx.font = "48px Arial, Helvetica, sans-serif";
    this.ctx.fillText("Game Over", center, 300);

    this.ctx.font = "36px Arial, Helvetica, sans-serif";
    this.ctx.fillText(score, center, 350);

    this.ctx.font = "24px Arial, Helvetica, sans-serif";
    this.ctx.fillText(instruct, center, 425);
  };

  Game.prototype.newGame = function (event) {
    if (event.keyCode === 13) {
      this.newGameSetup();
      window.removeEventListener("keypress", this.newGame.bind(this));
    }
  };

  Game.prototype.newGameSetup = function () {
    this.score = 0;
    this.level = 1;
    this.livesLeft = 3;
    this.bricks = [];
    this.addBricks();
    this.newTurn();
  };

  Game.prototype.newTurn = function () {
    this.missed = false;
    this.ball = new Breakout.Ball();
    this.paddle.setStartPos();
    this.drawAll();
  };
})();
