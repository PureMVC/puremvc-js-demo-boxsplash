/**
 * @lends Boxsplash.view.components.WorldSpace.prototype
 */
Ext.namespace("Boxsplash.view.components");
Boxsplash.view.components.WorldSpace = Ext.extend(Boxsplash.view.components.core.UIComponent, {
  /**
   * @class <code>View</code> used as the space for the 3D box animations.
   *
   * @extends Boxsplash.view.components.core.UIComponent
   *
   * @author Justin Wilaby
   * @author Tony DeFusco
   *
   * @constructs
   */
  constructor: function() {
    Boxsplash.view.components.WorldSpace.superclass.constructor.call(this, "world-space", {events:{animationStateChanged:true}});

    // Overwrite listeners with methods bound to 'this' instance of the class.
    this.mouseMoveHandler = this.mouseMoveHandler.createDelegate(this);
    this.tick = this.tick.createDelegate(this);
    this.startAnimation = this.startAnimation.createDelegate(this);
    this.stopAnimation = this.stopAnimation.createDelegate(this);
  },

  /**
   * Boolean indicating whether or not the animation is running.
   *
   * @type Boolean
   */
  inTween: false,

  /**
   * The array of <code>Box</code> objects currently on stage.
   *
   * @type Array
   */
  boxes: [],

  /**
   * The current focal length of the <code>WorldSpace</code>.
   *
   * @type Number
   */
  focalLength: 0,

  /**
   * The currently calculated angle of the <code>WorldSpace</code>.
   *
   * @type Number
   */
  angle: 0,

  /**
   * The vanishing point of the <code>WorldSpace</code> (always center).
   *
   * @type Object
   */
  vp: {x: 0, y: 0},

  /**
   * The <code>BoxConfigVO</code> currently in play.
   *
   * @type Boxsplash.model.vo.BoxConfigVO
   */
  currentConfig: null,

  /**
   * Processes data contained in a <code>BoxConfigVO</code> and
   * sets up the <code>WorldSpace</code> accordingly.
   *
   * @param {Boxsplash.model.vo.BoxConfigVO} value the <code>BoxConfigVO</code> instance as the
   * basis for the <code>WorldSpace</code> state.
   */
  setConfiguration: function(value /* BoxConfigVO */) {
    // Bail if the BoxConfigVO's are the same.
    if (this.currentConfig != value) {
      this.currentConfig = value;

      // Stop the timer if we have one running.
      this.stopAnimation();
      this.removeAllBoxes();
      this.createWorldFromConfig();
      this.startAnimation();
    }
  },

  /**
   * Toggles the animation between start and stop
   * and returns true if the animation was started or
   * false if it was stopped.  This method is usually called by the
   * <code>WorldSpaceMediator</code> in response to the
   * <code>ApplicationFacade.TOGGLE_START_STOP</code> notification.
   *
   * @return true if the animation was started, false if it was stopped.
   * @type Boolean
   *
   * @see Boxsplash.view.WorldSpaceMediator
   * @see Boxsplash.ApplicationFacade
   */
  toggleStartStop: function() {
    if (this.inTween) {
      this.stopAnimation();
    }
    else {
      this.startAnimation();
    }
    return this.inTween;
  },

  /**
   * @private
   * Configuration options for setting up a timer-managed task with Ext.TaskMgr.
   */
  task: {
    run: null,
    interval: 10 // 1/100 second
  },

  /**
   * Removes all boxes from the DOM and
   * the <code>boxes</code> array.  Calling this
   * does not stop the interval from running.
   */
  removeAllBoxes: function() {
    while (this.boxes.length) {
      Ext.removeNode(this.boxes.pop().element.dom);
    }
  },

  /**
   * Creates instances of the <code>Box</code> based on
   * the current <code>BoxConfigVO</code>.
   */
  createWorldFromConfig: function() {
    if (this.currentConfig) { 
      this.focalLength =  this.currentConfig.focalLength;
      var numBoxes = this.currentConfig.numBoxes;
      var color = this.currentConfig.color;
      var boxSize = this.currentConfig.boxSize;

      // Randomize the placement of the boxes in the world space.
      while (numBoxes--) {
        var box = new Boxsplash.view.components.Box(boxSize, boxSize);
        box.posX = Math.random() * 250 - 125;
        box.posY = Math.random() * 250 - 125;
        box.posZ = Math.random() * this.focalLength - (this.focalLength / 2);
        box.element.setStyle({"background":color, border:"1px solid #FFF"});
        this.boxes.push(box);
        this.addChild(box);
      }
    }
  },

  /**
   * Starts the Animation.
   */
  startAnimation: function() {
    if (!this.inTween) {
      var worldSpace = this.element;
      this.vp.x = worldSpace.getWidth() / 2;
      this.vp.y = worldSpace.getHeight() / 2;

      if (this.boxes.length) {
        this.element.addListener("mousemove", this.mouseMoveHandler);
        this.task.run = this.tick;
        Ext.TaskMgr.start(this.task);
        this.inTween = true;

        // Notify interested entities that the state has changed.
        this.fireEvent("animationStateChanged", this.inTween);
      }
    }
  },

  /**
   * Stops the animation.
   */
  stopAnimation: function() {
    if (this.inTween) {
      this.element.removeListener("mousemove", this.mouseMoveHandler);

      Ext.TaskMgr.stop(this.task);
      this.task.run = this.tick;

      this.angle = 0;
      this.inTween = false;

      // Notify interested entities that the state has changed.
      this.fireEvent("animationStateChanged", this.inTween);
    }
  },

  /**
   * Updates the position, size, z-index and color
   * of each box for each "tick" of the timer.
   */
  tick: function() {
    var i = this.boxes.length;
    var rads = (this.angle * Math.PI) / 180;
    var cos = Math.cos(rads);
    var sin = Math.sin(rads);
    while(i--) {
      var box = this.boxes[i];
      var x1 = (box.posX * cos) - (box.posZ * sin);
      var z1 = (box.posZ * cos) + (box.posX * sin);
      var scale = this.focalLength / (this.focalLength + box.posZ);

      var progress = (z1 > 0) ? z1 /  (this.focalLength / 2) : 0;
      var bgColor = this.interpolateColor(this.currentConfig.color, "#222222", progress);
      var borderColor = this.interpolateColor("#FFFFFF", "#010101", progress);
      box.posX = x1;
      box.posZ = z1;

      box.element.setStyle({
        left: this.vp.x  + (box.posX * scale),
        top: this.vp.y + (box.posY * scale),
        width: box.unscaledWidth * scale,
        height: box.unscaledHeight * scale,
        "background-color": bgColor,
        "border-color": borderColor
      });

    }
    this.sortZ();
  },

  /**
   * Updates the z-order position of each <code>Box</code> in the array of <code>Box</code>es.
   */
  sortZ: function() {
    var copy = this.boxes.concat();
    copy.sort(function(a, b) {
      var retVal = (b.posZ == a.posZ ? 0 : ((b.posZ > a.posZ ? 1 : -1)));
      return retVal;
    });

    var count = copy.length;
    for (var i = 0; i < count; i++) {
      var zIndex = count - i;
      var box = copy[zIndex - 1];
      box.element.setStyle("z-index", zIndex);
    }
  },

  /**
   * A routine for interpolating the appropriate color a given distance between two given colors.
   *
   * @param originalColorHex {String} the RGB color value of the start color.
   * @param newColorHex {String} the RGB color value for the end color.
   * @param progress {Number} the ratio between the start and end colors.
   *
   * @return the RGB color value for the color that occurs between the given start and end colors.
   * @type String
   */
  interpolateColor: function(originalColorHex /* String */, newColorHex /* String */, progress /* Number */) {
    var originalColor = parseInt(originalColorHex.replace('#', '0x'));
    var newColor = parseInt(newColorHex.replace('#', '0x'));

    // Extracts the red channel.
    var origRed = (originalColor & 0xFF0000) >> 16;

    // Extracts the green channel.
    var origGreen = (originalColor & 0xFF00) >> 8;

    // Extracts the blue channel.
    var origBlue = originalColor & 0xFF;
    // --------------------------------

    // Extracts the red channel.
    var newRed = (newColor & 0xFF0000) >> 16;

    // Extracts the green channel.
    var newGreen = (newColor & 0xFF00) >> 8;

    // Extracts the blue channel.
    var newBlue = newColor & 0xFF;
    //---------------------------------

    var diffRed = newRed - origRed;
    var diffGreen = newGreen - origGreen;
    var diffBlue = newBlue - origBlue;

    var interpolatedRed = origRed + (diffRed * progress);
    var interpolatedGreen = origGreen + (diffGreen * progress);
    var interpolatedBlue = origBlue + (diffBlue * progress);

    var payload = Math.abs((interpolatedRed << 16) | (interpolatedGreen << 8) | interpolatedBlue);

    return "#" + this.rgbToHex([((payload & 0xFF0000) >> 16), (payload & 0xFF00) >> 8,  payload & 0xFF]);
  },

  /**
   * Event handler for calculating the angle
   * based on the user's local mouse position within
   * the world space.
   *
   * @param {Event} event the mouseEvent resulting from mouse movement.
   * @param {Object} target the target Object of the resultant mouseEvent.
   */
  mouseMoveHandler: function(event, target) {
    event.preventDefault();
    var newAngle = (event.getXY()[0] - this.element.getX() - this.vp.x) * .01;
    this.angle = newAngle;
  },

  /**
   * Utility routine for converting a color value specified as
   * an array of Red, Green, and Blue decimal values to a numerical
   * hex value for representation as RGB String notation.
   *
   * @param value {Number[]} an array of RGB color components to convert.
   *
   * @return the hex string value that represents an RGB color.
   * @type String
   */
  rgbToHex: function(value) {
    /**
     * Converts a decimal value to its corresponding hex value as a string.
     * @inner
     * @param N the decimal value to convert to a hex string.
     */
    function _toHex(N) {
      if (N == null) {
        return "00";
      }
      N = parseInt(N);
      if (N == 0 || isNaN(N)) {
        return "00";
      }
      N = Math.max(0, N);
      N = Math.min(N, 255);
      N = Math.round(N);
      return "0123456789ABCDEF".charAt((N-N % 16) / 16)
          + "0123456789ABCDEF".charAt(N % 16);
    };
    var R = value[0], G = value[1], B = value[2];
    return _toHex(R) + _toHex(G) + _toHex(B);
   }
});
