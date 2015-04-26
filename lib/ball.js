(function() {
  if (typeof Breakout === "undefined") {
    window.Breakout = {};
  }

  var Ball = Breakout.Ball = function (options) {
    this.center = options.center || Ball.CENTER;
    this.vel = options.vel || [0,0];
    this.radius = Ball.RADIUS;
  };

  Ball.RADIUS = 10;
  Ball.CENTER = [(Breakout.Game.WIDTH / 2), (Breakout.Game.HEIGHT - 50)];

  Ball.prototype.move = function () {
    this.stayInCanvas();
    for (var i = 0; i < 2; i++) {
      this.center[i] += this.vel[i];
    }
  };

  Ball.prototype.draw = function (ctx) {
    ctx.beginPath();
    ctx.arc(this.center[0], this.center[1], this.radius, 0, 2*Math.PI, true);
    ctx.fill();
  };

  Ball.prototype.stayInCanvas = function () {
    if (this.left() <= 0 || this.right() >= Breakout.Game.WIDTH) {
      this.vel[0] = -this.vel[0];
    }
    if (this.top() <= 0 || this.bottom() >= Breakout.Game.HEIGHT) {
      this.vel[1] = -this.vel[1];
    }
  };

  // sides of the ball, for convenience
  Ball.prototype.left = function() {
    return this.center[0] - this.radius;
  };

  Ball.prototype.top = function() {
    return this.center[1] - this.radius;
  };

  Ball.prototype.right = function() {
    return this.center[0] + this.radius;
  };

  Ball.prototype.bottom = function() {
    return this.center[1] + this.radius;
  };
})();
