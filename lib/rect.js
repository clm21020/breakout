(function() {
  if (typeof Breakout === "undefined") {
    window.Breakout = {};
  }

  var Rect = Breakout.Rect = function (width, height, color) {
    this.width = width;
    this.height = height;
    this.color = color || "#7AFF70";
  };

  Rect.prototype.draw = function (ctx) {
    ctx.beginPath(); //???
    ctx.fillStyle = this.color;
    ctx.fillRect(this.xy[0], this.xy[1], this.width, this.height);
  };

  Rect.prototype.left = function () {
    return this.xy[0];
  };

  Rect.prototype.top = function () {
    return this.xy[1];
  };

  Rect.prototype.right = function () {
    return this.xy[0] + this.width;
  };

  Rect.prototype.bottom = function () {
    return this.xy[1] + this.height;
  };
})();
