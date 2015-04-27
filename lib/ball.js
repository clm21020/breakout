(function() {
  if (typeof Breakout === "undefined") {
    window.Breakout = {};
  }

  var Ball = Breakout.Ball = function (options) {
    options = options || {};
    this.center = options.center || Ball.CENTER.slice(0);
    this.radius = options.radius || Ball.RADIUS;
    this.velScale = options.velScale || 5;
    this.color = options.color || Ball.COLOR;
    this.vel = this.startVel();
  };

  Ball.COLOR = "rgb(39, 63, 135)";
  Ball.RADIUS = 10;
  Ball.CENTER = [(Breakout.Game.WIDTH / 2), (Breakout.Game.HEIGHT - 35)];

  Ball.prototype.startVel = function () {
    return [(1 * this.velScale), (-1 * this.velScale)];
  };

  Ball.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.center[0], this.center[1], this.radius, 0, 2*Math.PI, true);
    ctx.fill();
  };

  Ball.prototype.move = function () {
    this.stayInCanvas();
    for (var i = 0; i < 2; i++) {
      this.center[i] += this.vel[i];
    }
  };

  Ball.prototype.stayInCanvas = function () {
    if (this.left() <= 0 || this.right() >= Breakout.Game.WIDTH) {
      this.vel[0] = -this.vel[0];
    }
    if (this.top() <= 0 || this.bottom() >= Breakout.Game.HEIGHT) {
      this.vel[1] = -this.vel[1];
    }
  };

  Ball.prototype.hitPaddle = function(paddle) {
    if (this.bottom() < paddle.top()) { return null; }

    if (this.xOverlap(paddle)) {
      this.paddleBounce(paddle);
      return true;
    }

    return false;
  };

  Ball.prototype.paddleBounce = function (paddle) {
    var ballCenterX = this.center[0];
    var paddleCenterX = paddle.left() + (paddle.width / 2);

    var hVel = 2 * (ballCenterX - paddleCenterX) / paddle.width;

    this.vel[0] = hVel * this.velScale;
    this.vel[1] = -Math.abs(this.vel[1]);
    return true;
  };

  Ball.prototype.xOverlap = function (obj) {
    var leftOverlap = (obj.left() <= this.left() && this.left() <= obj.right());
    var rightOverlap = (obj.left() <= this.right() && this.right() <= obj.right());

    return leftOverlap || rightOverlap;
  };

  Ball.prototype.yOverlap = function (obj) {
    var topOverlap = (obj.top() <= this.top() && this.top() <= obj.bottom());
    var bottomOverlap = (obj.top() <= this.bottom() && this.bottom() <= obj.bottom());

    return topOverlap || bottomOverlap;
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
