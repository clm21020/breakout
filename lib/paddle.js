(function() {
  if (typeof Breakout === "undefined") {
    window.Breakout = {};
  }

  var Paddle = Breakout.Paddle = function (options) {
    options = options || {};
    Breakout.Rect.call(this, Paddle.WIDTH, Paddle.HEIGHT, Paddle.COLOR);
    this.setStartPos(options.xy);
    this.hVel = options.hVel || 10;
  };

  Paddle.WIDTH = 100;
  Paddle.HEIGHT = 20;
  Paddle.COLOR = "#003366";
  Paddle.XY = [(Breakout.Game.WIDTH - Paddle.WIDTH) / 2,
     (Breakout.Game.HEIGHT - Paddle.HEIGHT)];

  Breakout.Util.inherits(Paddle, Breakout.Rect);

  Paddle.prototype.setStartPos = function (xy) {
    this.xy = (xy ? xy.slice(0) : Paddle.XY.slice(0));
  };

  Paddle.prototype.move = function (direction) {
    if (!this.atWall(direction)) {
      this.xy[0] += this.xDiff(direction);
    }
  };

  Paddle.prototype.atWall = function (direction) {
    if ((direction === "left" && this.left() > 0) ||
        (direction === "right" && this.right() < Breakout.Game.WIDTH)) {
      return false;
    }
    return true;
  };

  Paddle.prototype.xDiff = function (direction) {
    return (direction === "left" ? -this.hVel : this.hVel);
  };
})();
