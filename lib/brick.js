(function() {
  if (typeof Breakout === "undefined") {
    window.Breakout = {};
  }

  var Brick = Breakout.Brick = function (options) {
    this.xy = options.xy;
    this.color = options.color || "#7AFF70";
    this.width = Brick.WIDTH;
    this.height = Brick.HEIGHT;
  };

  Brick.WIDTH = 46;
  Brick.HEIGHT = 20;
  Brick.SPACE_BETWEEN = 4;

  Brick.makeXY = function(row, col) {
    var x = 2 + col * (Brick.WIDTH + Brick.SPACE_BETWEEN);
    var y = 2 + row * (Brick.HEIGHT + Brick.SPACE_BETWEEN);
    return [x, y];
  };

  Brick.blueColorScheme = function (currRow) {
    var colors = [
      "#0099FF",
      "#25B9FF",
      "#52D9FF",
      "#52ECE6",
      "#52FFCC",
      "#00FF99",
      "#4CFF80",
      "#7AFF70",
    ];

    return colors[currRow];
  };

  Brick.prototype.draw = function (ctx) {
    ctx.beginPath(); //???
    ctx.fillStyle = this.color;
    ctx.fillRect(this.xy[0], this.xy[1], this.width, this.height);
  };

  // sides of the brick, for convenience
  Brick.prototype.left = function() {
    return this.xy[0];
  };

  Brick.prototype.top = function() {
    return this.xy[1];
  };

  Brick.prototype.right = function() {
    return this.xy[0] + this.width;
  };

  Brick.prototype.bottom = function() {
    return this.xy[1] + this.height;
  };
})();
