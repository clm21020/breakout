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
      if (event.keyCode === 13) {
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
    setTimeout(this.step.bind(this), 100);

  };
})();
