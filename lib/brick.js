(function() {
  if (typeof Breakout === "undefined") {
    window.Breakout = {};
  }

  var Brick = Breakout.Brick = function (options) {
    this.xy = options.xy;
    this.color = options.color || "SeaShell";
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

  Brick.blueColorScheme = function (currRow, totalRows) {
    var colors = [
      "RoyalBlue",
      "DodgerBlue",
      "DeepSkyBlue",
      "PaleTurquoise",
      "Aquamarine",
      "MediumSeaGreen",
      "SeaGreen",
      "Green",
      // "LightGreen",
      // "PaleGreen",
      // "DarkGreen",
      // "SkyBlue",
      // "SpringGreen",
      // "Aqua",
      // "DarkCyan",
      // "LightSeaGreen",
      // "Turquoise",
      // "LawnGreen",
      // "SeaShell",
      // "MediumTurquoise",
      // "GreenYellow",
      // "Lime",
      // "LimeGreen",
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
