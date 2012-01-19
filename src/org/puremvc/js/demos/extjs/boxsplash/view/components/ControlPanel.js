/**
 * @lends Boxsplash.view.components.ControlPanel.prototype
 */
Ext.namespace("Boxsplash.view.components");
Ext.define("Boxsplash.view.components.ControlPanel", {

  /** @extends Boxsplash.view.components.core.UIComponent */
  extend: "Boxsplash.view.components.core.UIComponent",

  /**
   * @class The <code>View</code> used to control the world space and
   * load the various configuration settings available to the user.
   *
   * @author Justin Wilaby
   * @author Tony DeFusco
   *
   * @constructs
   */
  constructor: function() {
    this.callParent(["control-panel", {events:{loadConfig:true, toggleStartStop:true}}]);

    // Overwrite listener handlers with methods bound to 'this'
    this.button_clickHandler = Ext.bind(this.button_clickHandler, this);
    this.startStop_clickHandler = Ext.bind(this.startStop_clickHandler, this);
  },

  /**
   * The label displaying the control panel title at the top.
   *
   * @type Boxsplash.view.components.core.UIComponent
   */
  headerLabel: null,

  /**
   * The label displaying the title for the configuration buttons.
   *
   * @type Boxsplash.view.components.core.UIComponent
   */
  availableConfigsLabel: null,

  /**
   * The label displaying the the currently selected configuration.
   *
   * @type Boxsplash.view.components.core.UIComponent
   */
  currentConfigLabel: null,

  /**
   * The configuration buttons list.
   *
   * @type Array
   */
  configButtons: [],

  /**
   * Button to start and stop the animation.
   *
   * @type Boxsplash.view.components.core.UIComponent
   */
  stopStartButton: null,

  /**
   * Creates all children required to create the initial <code>View</code> state of this
   * control and adds them to the DOM.
   */
  initializeChildren: function() {
    this.headerLabel = new Boxsplash.view.components.core.UIComponent({tag: 'h1', id: 'header-label', html: 'Control Panel'});
    this.addChild(this.headerLabel);

    this.availableConfigsLabel = new Boxsplash.view.components.core.UIComponent({tag: 'p', id: 'available-configs-label', html: 'Available Configurations:'});
    this.addChild(this.availableConfigsLabel);

    this.currentConfigLabel = new Boxsplash.view.components.core.UIComponent({tag: 'p', id: 'current-config-label', html: 'Now Displaying:'});
    this.addChild(this.currentConfigLabel);

    this.stopStartButton = new Boxsplash.view.components.core.UIComponent({tag: 'button', id: 'startButton', html: 'Start'}, null, {position: 'absolute'});
    this.addChild(this.stopStartButton);
  },

  /**
   * Adds the 'click' listener to the startStop button after creation.
   */
  childrenInitialized: function() {
    this.stopStartButton.element.addListener('click', this.startStop_clickHandler);
  },

  /**
   * Called after <code>childrenInitialized()</code>.
   * Override this method to perform any final processing
   * before the child is considered initialized.
   */
  initializationComplete: function(){
    this.callParent(arguments);
  },

  /**
   * Creates buttons based on the array of <code>BoxConfigVO</code>
   * objects.  In this case, this function is called from the <code>ControlPanelMediator</code>'s
   * <code>onRegister()</code> method and is based on the data contained
   * within the <code>ConfigProxy</code>'s <code>data</code> property.
   *
   * @param {Boxsplash.model.vo.BoxConfigVO[]} value An array of BoxConfigVO objects to base the config buttons on.
   *
   * @see Boxsplash.model.vo.BoxConfigVO
   * @see Boxsplash.view.ControlPanelMediator
   * @see Boxsplash.model.ConfigProxy
   */
  setConfigurationButtons: function(value /* Array of BoxConfigVO */) {
    var button = null;

    // Remove the old buttons if we have them.
    while (this.configButtons.length > 0) {
      button = this.configButtons.pop();
      Ext.removeNode(button.element);
    }
    this.configButtons = [];

    // Add the new ones based on the passed array.
    var posY = 50;
    var len = value.length;
    for (var i = 0; i < len; i++)	{
      var boxConfigVO = value[i];
      var buttonId = '_button' + (i + 1);
      button = new Boxsplash.view.components.core.UIComponent({tag: 'button', id: buttonId, html: boxConfigVO.id}, null, {position: "absolute", top: posY, left: 5, width: 150});

      // Store the index location of the button so
      // we can easily find which BoxConfig to load.
      button.element.dom["__index"] = i;

      // Add the click handler.
      button.element.addListener('click', this.button_clickHandler);
    
      // Retain it in our array for later reference.
      this.configButtons.push(button);

      this.addChild(button);

      // Position the button.
      posY += button.element.getHeight();
    }

    // Reposition the current config label so that it's below the buttons.
    Ext.DomHelper.applyStyles(this.currentConfigLabel.element.dom, {top: posY.toString() + "px"});
    posY += this.currentConfigLabel.element.getHeight() + 10; // Padding

    // Set the position of the start/stop button.
    Ext.DomHelper.applyStyles(this.stopStartButton.element.dom, {top: (posY + 10).toString() + "px"});
  },

  /**
   * Sets the label of the configuration 'p' tag. This function
   * is called by the <code>ControlPanelMediator</code>
   * in response to the <code>ConfigProxy.CONFIG_OPTION_RETRIEVED</code>
   * <code>Notification</code>.
   *
   * @param {String} value the string to append to the label's text.
   *
   * @see Boxsplash.view.ControlPanelMediator
   * @see Boxsplash.model.ConfigProxy
   */
  setConfigurationLabel: function(value /* String */) {
    Ext.fly('current-config-label').update("Now Displaying: " + value);
  },

  /**
   * Sets the appropriate label for the startStop button
   * based on the current state of the animation.
   *
   * @param {Boolean} inTween indicates whether or not the animation is running.
   */
  animationStateChanged: function(inTween) {
    var wrapper = Ext.fly('startButton');
    if (inTween) {
      wrapper.update("Stop");
    }
    else {
      wrapper.update("Start");
    }
  },

  /**
   * Event handler for handling clicks from the user on configuration buttons.
   *
   * @param {Event} event the MouseEvent resulting from a click by the user.
   */
  button_clickHandler: function(event, buttonElement) {
    var index = buttonElement["__index"];

    // Dispatch our custom event to be picked up by the ControlPanelMediator.
    this.fireEvent("loadConfig", index);
  },

  /**
   * Event handler for handling clicks from the startStop button.
   * 
   * @param {Event} event the MouseEvent resulting from a click by the user.
   */
  startStop_clickHandler: function(event, buttonElement) {
    this.fireEvent("toggleStartStop");
  }
});
