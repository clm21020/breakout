(function() {
  if (typeof Breakout === "undefined") {
    window.Breakout = {};
  }

  var Ball = Breakout.Ball = function (options) {
    options = options || {};
    this.center = options.center || Ball.CENTER.slice(0);
    this.radius = options.radius || Ball.RADIUS;
    this.velScale = options.velScale || 6;
    this.color = options.color || Ball.COLOR;
    this.vel = this.startVel();
  };

  Ball.COLOR = "#003366";
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
    if (this.left() <= 0) {
      this.vel[0] = Math.abs(this.vel[0]);
    } else if (this.right() >= Breakout.Game.WIDTH) {
      this.vel[0] = -Math.abs(this.vel[0]);
    }
    if (this.top() <= 0) {
      this.vel[1] = Math.abs(this.vel[1]);
    }
  };

  Ball.prototype.atBottom = function () {
    return (this.bottom() >= Breakout.Game.HEIGHT);
  };

  Ball.prototype.hit = function(obj) {
    var xOverlap = this.xOverlap(obj);
    var yOverlap = this.yOverlap(obj);

    if (!xOverlap || !yOverlap) {
      return false;
    } else if (obj.constructor === Breakout.Paddle) {
      this.paddleBounce(obj, yOverlap);
    } else if(obj.constructor === Breakout.Brick) {
      this.brickBounce(xOverlap, yOverlap);
    }

    return true;
  };

  Ball.prototype.paddleBounce = function (paddle, yOverlap) {
    var ballCenterX = this.center[0];
    var paddleCenterX = paddle.left() + (paddle.width / 2);

    var hVel = 2 * (ballCenterX - paddleCenterX) / paddle.width;

    this.vel[0] = hVel * this.velScale;
    this.vel[1] = Math.abs(this.vel[1]) * (-1 * yOverlap);
  };

  Ball.prototype.brickBounce = function(xOverlap, yOverlap) {
    if (xOverlap === 1) {
      this.vel[0] *= -1;
    }
    if (yOverlap === 1) {
      this.vel[1] *= -1;
    }
  };

  Ball.prototype.xOverlap = function (obj) {
    var leftOverlap = (obj.left() <= this.left() && this.left() <= obj.right());
    var rightOverlap = (obj.left() <= this.right() && this.right() <= obj.right());

    if (leftOverlap && rightOverlap) {
      return 2;
    } else if (leftOverlap || rightOverlap) {
      return 1;
    } else {
      return 0;
    }
  };

  Ball.prototype.yOverlap = function (obj) {
    var topOverlap = (obj.top() <= this.top() && this.top() <= obj.bottom());
    var bottomOverlap = (obj.top() <= this.bottom() && this.bottom() <= obj.bottom());

    if (topOverlap && bottomOverlap) {
      return 2;
    } else if (topOverlap || bottomOverlap) {
      return 1;
    } else {
      return 0;
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
