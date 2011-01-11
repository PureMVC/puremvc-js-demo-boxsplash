/**
 * @misc
 * @class The View used to control the world space and
 * load the various configuration settings available to the user.
 *
 * @extends UIComponent
 * @author Justin Wilaby
 */
var ControlPanel = function(){
    /**
     * @ignore
     */
    this.Extends = UIComponent;

    /**
     * The label displaying the control panel title at the top.
     * @type UIComponent
     */
    this.headerLabel = null;

    /**
     * The label displaying the title for the configuration buttons.
     * @type UIComponent
     */
    this.availableConfigsLabel = null;
    /**
     * The score text control
     * @type UIComponent
     */
    this.currentConfigLabel = null;

    /**
     * The configuration buttons list
     * @type Array
     */
    this.configButtons = [];

    /**
     * Button to start and stop the animation
     * @type UIComponent
     */
    this.stopStartButton = null;

    /**
     * @ignore
     */
    this.initialize = function()
    {
	this.parent('control-panel');
	// Overwrite listener handlers with
	// methods bound to 'this'
	this.button_clickHandler = this.button_clickHandler.bindWithEvent(this);
	this.startStop_clickHandler = this.startStop_clickHandler.bindWithEvent(this);
    };

    /**
     * Creates all children required to create the
     * initial View state of this control and adds them to the DOM.
     */
    this.initializeChildren = function()
    {
	this.headerLabel = new UIComponent('h1',{id:"header-label", html:"Control Panel"});
	this.addChild(this.headerLabel);

	this.availableConfigsLabel = new UIComponent('p', {id:"available-configs-label", html:"Available Configurations:"});
	this.addChild(this.availableConfigsLabel);

	this.currentConfigLabel = new UIComponent('p', {id:"current-config-label", html:"Now Displaying:"});
	this.addChild(this.currentConfigLabel);

	this.stopStartButton = new UIComponent('button', {html:"Start", styles:{"position":"absolute"}});
	this.addChild(this.stopStartButton);
    };

    /**
     * Adds the'click' listener to the startStop button after creation.
     */
    this.childrenInitialized = function()
    {
	this.stopStartButton.addEvent('click', this.startStop_clickHandler);
    };

    /**
     * Creates buttons based on the array of <code>BoxConfigVO</code>
     * objects.  In this case, this function is called from the <code>ControlPanelMediator</code>'s
     * <code>onRegister()</code> method and is based on the data contained
     * within the <code>ConfigProxy</code>'s <code>data</code> property.
     *
     * @param {BoxConfigVO[]} value An array of BoxConfigVO objects to base the config buttons on
     * @see BoxConfigVO
     * @see ControlPanelMediator
     * @see ConfigProxy
     */
    this.setConfigurationButtons = function(value /* Array */)
    {
	// Remove the old buttons if we have them
	var i = 0;
	var button = null;
	if (this.configButtons.length)
	{
	    i = this.configButtons.length;
	    while(i--)
	    {
		button = this.configButtons[i];
		button.removeEvent('click', this.button_clickHandler);
		button.dispose();
	    }
	    this.configButtons = [];
	}
	// Add the new ones based on the passed array
	var posY = 50;
	var len = value.length;
	for (i = 0; i < len; i++)
	{
	    var boxConfigVO = value[i];
	    button = new UIComponent('button', {html:boxConfigVO.id, styles:{position:"absolute", top:posY, left:5, width:150}});
	    // Store the index location of the button so
	    // we can easily find which BoxConfig to load.
	    button.store("index", i);
	    // Add the click handler.
	    button.addEvent('click', this.button_clickHandler);
	    // Add it to the DOM.
	    this.addChild(button);
	    // Retain it in our array for later reference.
	    this.configButtons.push(button);
	    // Position the button.
	    posY += button.getSize().y;
	}
	// Reposition the current config label so
	// that its below the buttons.
	this.currentConfigLabel.setStyle("top", posY.toString() + "px");
	posY += this.currentConfigLabel.getSize().y + 10; // Padding
	// Set the position of the start/stop button
	this.stopStartButton.setStyle("top", (posY + 10).toString() + "px");
    };

    /**
     * Sets the label of the configuration 'p' tag. This function
     * is called by the <code>ControlPanelMediator</code>
     * in response to the <code>ConfigProxy.CONFIG_OPTION_RETRIEVED</code>
     * <code>Notification</code>.
     *
     * @param {String} value the string to append to the label's text
     * @see ControlPanelMediator
     * @see ConfigProxy
     */
    this.setConfigurationLabel = function(value /* String */)
    {
	 this.currentConfigLabel.set("html", "Now Displaying: "+value);
    };

    /**
     * Sets the appropriate label for the startStop button
     * based on the current state of the animation.
     *
     * @param {Boolean} inTween indicates whether or not the animation is running.
     */
    this.animationStateChanged = function(inTween)
    {
	if (inTween)
	    this.stopStartButton.set("html", "Stop");
	else
	    this.stopStartButton.set("html", "Start");
    };

    //------------------------------------------
    // Event Handlers

    /**
     * Handles clicks from the user on conguration buttons
     *
     * @param {Event} event the MouseEvent resulting from a click by the user
     */
    this.button_clickHandler = function(event)
    {
	var buttonElement = event.target;
	var index = buttonElement.retrieve("index");
	// Dispatch our custom event to be
	// picked up by the ControlPanelMediator
	this.fireEvent("loadConfig", index);
    };

    /**
     * Handles clicks from the startStop button
     * @param {Event} event the MouseEvent resulting from a click by the user.
     */
    this.startStop_clickHandler = function(event)
    {
	this.fireEvent("toggleStartStop");
    };
};
ControlPanel = new Class(new ControlPanel());