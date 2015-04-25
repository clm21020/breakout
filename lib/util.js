(function() {
  if (typeof Breakout === "undefined") {
    window.Breakout = {};
  }

  var Util = Breakout.Util = {};

  Util.inherits = function(ChildClass, ParentClass) {
    function Surrogate () {}
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
    ChildClass.prototype.constructor = ChildClass;
  };
})();
