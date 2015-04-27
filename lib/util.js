(function() {
  if (typeof Breakout === "undefined") {
    window.Breakout = {};
  }

  var Util = Breakout.Util = {};

  Util.inherits = function (ChildClass, ParentClass) {
    function Surrogate () {}
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
    ChildClass.prototype.constructor = ChildClass;
  };

  Util.distance = function (pos1, pos2) {
    var xDiff = pos1[0] - pos2[0];
    var yDiff = pos1[1] - pos2[1];
    var sumOfSquares = Math.pow(xDiff, 2) + Math.pow(yDiff, 2);
    return Math.sqrt(sumOfSquares);
  };
})();
