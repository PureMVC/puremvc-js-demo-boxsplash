/**
 * @misc
 * @class View used as the space for the 3d box animations.
 *
 * @extends UIComponent
 * @author Justin Wilaby
 */
var WorldSpace = function(){

    /**
     * @ignore
     */
    this.Extends = UIComponent;

    /**
     * Boolean indicating whether or not the
     * animation is running
     * @type Boolean
     */
    this.inTween = false;

    /**
     * The array of <code>Box</code> objects currently on stage
     * @type Array
     */
    this.boxes = [];

    /**
     * The id of the interval timer used to update the display
     * @type integer
     */
    this.timerId = 0;
    /**
     * The current focal length of the worldSpace
     * @type Number
     */
    this.focalLength = 0;
    /**
     * The currently calculated angle of the world space.
     * @type Number
     */
    this.angle = 0;
    /**
     * The vanishing point of the world space (always center)
     * @type Object
     */
    this.vp = {x:0, y:0};
    /**
     * The BoxConfigVO currently in play
     * @type BoxConfigVO
     */
    this.currentConfig = null;

    /**
     * @ignore
     */
    this.initialize = function()
    {
	this.parent('world-space');
	this.vp.x = this.getSize().x / 2;
	this.vp.y = this.getSize().y / 2;

	// Overwrite listeners with methods
	// bound to 'this'
	this.mouseMoveHandler = this.mouseMoveHandler.bindWithEvent(this);
    };

    /**
     * Processes data contained in a <code>BoxConfigVO</code> and
     * sets up the world space accordingly
     *
     * @param {BoxConfigVO} value the BoxConfigVO instace as the
     * basis for the <code>WorldSpace</code> state.
     */
    this.setConfiguration = function(value /* BoxConfigVO */)
    {
	// Bail if the BoxConfigVO's are the same
	if (this.currentConfig == value)
	    return;
	this.currentConfig = value;
	// Stop the timer if we have one
	this.stopAnimation();
	this.removeAllBoxes();
	this.createWorldFromConfig();
	this.startAnimation();
    };

    /**
     * Toggles the animation between start and stop
     * and returns true if the animation was started or
     * false if it was stopped.  This method is usually called by the
     * <code>WorldSpaceMediator</code> in response to the
     * <code>ApplicationFacade.TOGGLE_START_STOP</code> notification.
     *
     * @return Boolean true if the animation was started, false if it was stopped.
     * @see WorldSpaceMediator
     * @see ApplicationFacade
     */
    this.toggleStartStop = function()
    {
	if (this.inTween)
	    this.stopAnimation();
	else
	    this.startAnimation();
	return this.inTween;
    };

    /**
     * Stops the animation.
     */
    this.stopAnimation = function()
    {
	this.removeEvent("mousemove", this.mouseMoveHandler);
	if (this.timerId)
	    $clear(this.timerId);
	this.timerId = 0;
	this.angle = 0;
	this.inTween = false;
	// Notify interested entities that the state has changed
	this.fireEvent("animationStateChanged", this.inTween);
    };

    /**
     * @ignore
     * Removes all boxes from the DOM and
     * the <code>boxes</code> array.  Calling this
     * does not stop the interval from running.
     */
    this.removeAllBoxes = function()
    {
	while(this.boxes.length)
	    this.boxes.pop().dispose();
    };

    /**
     * @ignore
     * Creates instances of the <code>Box</code> based on
     * the current <code>BoxConfigVO</code>
     */
    this.createWorldFromConfig = function()
    {
	if (!this.currentConfig)
	    return;

	this.focalLength =  this.currentConfig.focalLength;
	var numBoxes = this.currentConfig.numBoxes;
	var color = this.currentConfig.color;
	var boxSize = this.currentConfig.boxSize;
	// Randomize the placement of the boxes
	// in the world space.
	while(numBoxes--)
	{
	    var box = new Box(boxSize, boxSize);
	    box.posX = Math.random() * 250 - 125;
	    box.posY = Math.random() * 250 - 125;
	    box.posZ = Math.random() * this.focalLength - (this.focalLength / 2);
	    box.setStyles({"background":color, border:"1px solid #FFF"});
	    this.boxes.push(box);
	    this.addChild(box);
	}
    };

    /**
     *	@ignore
     * Starts the Animation.
     */
    this.startAnimation = function()
    {
	if (!this.boxes.length)
	    return;
	this.addEvent("mousemove", this.mouseMoveHandler);
	this.timerId = this.tick.periodical(10, this);
	this.inTween = true;
	// Notify interested entities that the state has changed
	this.fireEvent("animationStateChanged", this.inTween);
    };

    /**
     * @ignore
     * Updates the position, size, z-index and color
     * of each box.
     */
    this.tick = function()
    {
	var i = this.boxes.length;
	var rads = (this.angle * Math.PI) / 180;
	var cos = Math.cos(rads);
	var sin = Math.sin(rads);
	while(i--)
	{
	    var box = this.boxes[i];
	    var x1 = (box.posX * cos) - (box.posZ * sin);
	    var z1 = (box.posZ * cos) + (box.posX * sin);
	    var scale = this.focalLength / (this.focalLength + box.posZ);

	    var progress = z1 > 0 ? z1 /  (this.focalLength / 2) : 0;
	    var bgColor = this.interpolateColor(this.currentConfig.color, "#222222", progress);
	    var borderColor = this.interpolateColor("#FFFFFF", "#010101", progress);
	    box.posX = x1;
	    box.posZ = z1;

	    box.setStyles({
		left:this.vp.x + (box.posX * scale),
		top:this.vp.y + (box.posY * scale),
		width:box.unscaledWidth * scale,
		height:box.unscaledHeight * scale,
		"background-color":bgColor,
		"border-color":borderColor
	    });
	}
	this.sortZ();
    };

    /**
     * @ignore
     * updates the z-order
     */
    this.sortZ = function()
    {
	var copy = this.boxes.concat();
	copy.sort(function(a, b)
	{
	    if(a.posZ < b.posZ)
		return 1;
	    if (a.posZ > b.posZ)
		return -1;
	    return 0;
	});
	var i = copy.length;
	while(i--)
	{
	    var box = copy[i];
	    box.setStyle("z-index", i+1);
	}
    };

    /**
     *@ignore
     * color interpoation method
     */
    this.interpolateColor = function(originalColorHex /* String */, newColorHex /* String */, progress /* Number */)
    {
	var originalColor = parseInt(originalColorHex.replace('#', '0x'));
	var newColor = parseInt(newColorHex.replace('#', '0x'));

	//extacts the red channel
	var origRed = (originalColor & 16711680) >> 16;
	//extacts the green channel
	var origGreen = (originalColor & 65280) >> 8;
	//extacts the blue channel
	var origBlue = originalColor & 255;
	// --------------------------------

	//extacts the red channel
	var newRed = (newColor & 16711680) >> 16;
	//extacts the green channel
	var newGreen = (newColor & 65280) >> 8;
	//extacts the blue channel
	var newBlue = newColor & 255;
	//---------------------------------

	var diffRed = newRed - origRed;
	var diffGreen = newGreen - origGreen;
	var diffBlue = newBlue - origBlue;

	var interpolatedRed = origRed+(diffRed*progress);
	var interpolatedGreen = origGreen+(diffGreen*progress);
	var interpolatedBlue = origBlue+(diffBlue*progress);

	var payload = Math.abs((interpolatedRed << 16) | (interpolatedGreen << 8) | interpolatedBlue);

	return [((payload & 16711680) >> 16), (payload & 65280) >> 8,  payload & 255].rgbToHex();
    };

    /**
     * Event handler for calculating the angle
     * based on the user's local mouse position within
     * the worls space.
     *
     * @param {Event} event the mouseEvent resulting from mouse movement
     */
    this.mouseMoveHandler = function(event)
    {
	this.angle = (event.client.x - this.getPosition().x - this.vp.x) * .01;
    };
};
WorldSpace = new Class(new WorldSpace());