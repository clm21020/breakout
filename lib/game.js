(function() {
  if (typeof Breakout === "undefined") {
    window.Breakout = {};
  }

  var Game = Breakout.Game = function (ctx) {
    this.ctx = ctx;
    this.ball = new Breakout.Ball({
      vel: [5, -5]
    });
    this.drawBall();
    window.addEventListener("keypress", function(event) {
      if (event.keyCode === 32 && this.timeoutID) {
        this.pause();
      } else if (event.keyCode === 32) {
        this.step();
      }
    }.bind(this));
  };

  Game.WIDTH = 800;
  Game.HEIGHT = 600;

  Game.prototype.moveBall = function() {
    this.ball.move();
  };

  Game.prototype.drawBall = function() {
    this.ctx.clearRect(0, 0, Game.WIDTH, Game.HEIGHT);
    this.ball.draw(this.ctx);
  };

  Game.prototype.step = function() {
    this.moveBall();
    this.drawBall();
    this.timeoutID = setTimeout(this.step.bind(this), 100);
  };

  Game.prototype.pause = function () {
    clearTimeout(this.timeoutID);
    this.timeoutID = null;
  };
})();
