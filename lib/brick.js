(function() {
  if (typeof Breakout === "undefined") {
    window.Breakout = {};
  }

  var Brick = Breakout.Brick = function (options) {
    this.xy = options.xy;
    Breakout.Rect.call(this, Brick.WIDTH, Brick.HEIGHT, options.color);
  };

  Brick.WIDTH = 46;
  Brick.HEIGHT = 20;
  Brick.SPACE_BETWEEN = 4;

  Breakout.Util.inherits(Brick, Breakout.Rect);

  Brick.makeXY = function (row, col) {
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
})();
