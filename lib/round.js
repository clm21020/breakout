(function() {
  if (typeof Breakout === "undefined") {
    window.Breakout = {};
  }

  var Round = Breakout.Round = function (radius, color) {
    this.radius = radius;
    this.color = color || "#7AFF70";
  };

  Round.prototype.draw = function (ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.center[0], this.center[1], this.radius, 0, 2*Math.PI, true);
    ctx.fill();
  };

  Round.prototype.left = function () {
    return this.center[0] - this.radius;
  };

  Round.prototype.top = function () {
    return this.center[1] - this.radius;
  };

  Round.prototype.right = function () {
    return this.center[0] + this.radius;
  };

  Round.prototype.bottom = function () {
    return this.center[1] + this.radius;
  };
})();
