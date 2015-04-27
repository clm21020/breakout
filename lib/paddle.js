(function() {
  if (typeof Breakout === "undefined") {
    window.Breakout = {};
  }

  var Paddle = Breakout.Paddle = function (options) {
    options = options || {};
    this.xy = options.xy || Paddle.XY.slice(0);
    this.hVel = options.hVel || 10;
    this.width = Paddle.WIDTH;
    this.height = Paddle.HEIGHT;
  };

  Paddle.WIDTH = 100;
  Paddle.HEIGHT = 20;
  Paddle.XY = [(Breakout.Game.WIDTH - Paddle.WIDTH) / 2,
     (Breakout.Game.HEIGHT - Paddle.HEIGHT)];

  Paddle.prototype.move = function (direction) {
    if (!this.atWall(direction)) {
      this.xy[0] += this.xDiff(direction);
    }

  };

  Paddle.prototype.draw = function (ctx) {
    ctx.beginPath(); //???
    ctx.fillRect(this.xy[0], this.xy[1], this.width, this.height);
  };

  Paddle.prototype.resetPos = function () {
    this.xy = Paddle.XY;
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

  // sides of the ball, for convenience
  Paddle.prototype.left = function() {
    return this.xy[0];
  };

  Paddle.prototype.top = function() {
    return this.xy[1];
  };

  Paddle.prototype.right = function() {
    return this.xy[0] + this.width;
  };

  Paddle.prototype.bottom = function() {
    return this.xy[1] + this.height;
  };
})();
