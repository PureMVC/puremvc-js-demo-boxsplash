/**
 * @lends Boxsplash.view.ControlPanelMediator.prototype
 */
Ext.namespace("Boxsplash.view");
Ext.define("Boxsplash.view.ControlPanelMediator", {

  /** @extends org.puremvc.js.multicore.patterns.mediator.Mediator */
  extend: "org.puremvc.js.multicore.patterns.mediator.Mediator",

  /**
   * @class The <code>Mediator</code> subclass attached to the
   * <code>ControlPanel</code> <code>View</code>. Its primary responsibilities here
   * are to listen for and notify the system of user interactions that change
   * the state of the application including that of other <code>View<code>s; specifically
   * start/stop and config button clicks.  This <code>Mediator</code> is
   * registered by the <code>ShellMediator</code>'s constructor.
   *
   * @param {Boxsplash.view.components.ControlPanel} viewComponent the <code>ControlPanel</code> instance
   * assigned to this mediator.
   *
   * @see Boxsplash.view.components.ControlPanel
   * @see Boxsplash.view.ShellMediator
   *
   * @author Justin Wilaby
   * @author Tony DeFusco
   *
   * @constructs
   */
  constructor: function(viewComponent /* ControlPanel */) {
    this.callParent([Boxsplash.view.ControlPanelMediator.NAME, viewComponent]);
    this.controlPanel = this.getViewComponent();
  },

  /**
   * A named shortcut to the <code>ControlPanel</code> instance.  This
   * prevents us from having to reference the more
   * ambiguous <code>viewComponent</code> property.
   * @type Boxsplash.view.components.ControlPanel
   */
  controlPanel: null,

  /**
   * The <code>ConfigProxy</code> instance registered to the
   * <code>ApplicationFacade</code>. It is retrieved here to act as
   * a descriptor for the initial state of the <code>View</code> based on
   * the <code>data</code> property contents.
   *
   * @type Boxsplash.model.ConfigProxy
   * @see Boxsplash.ApplicationFacade
   */
  configProxy: null,

  /**
   * Provides a list of notification interests to the <code>View</code>.
   * Without an accurate list, the <code>handleNotification()</code> method
   * may not be invoked.  A common mistake made by developers is to provide handling
   * routines in the <code>handleNotification()</code> method but forget to
   * add the notification name in the <code>listNotificationInterests()</code> array.
   * <p>Note that changing this array at runtime will not have any effect on
   * notification interests since this method is called by the <code>View</code>
   * a single time when the <code>Mediator</code> is first registered.
   *
   * @return {String[]} the array of notification names to act upon.
   */
  listNotificationInterests: function() {
    return [
            Boxsplash.model.ConfigProxy.CONFIG_OPTION_RETRIEVED,
            Boxsplash.ApplicationFacade.ANIMATION_STATE_CHANGED
            ];
  },

  /**
   * Handles notifications broadcasted by the system provided that
   * the <code>Notification</code> is listed in the <code>listNotificationInterests()</code>
   * return value.
   *
   * @param {org.puremvc.js.multicore.patterns.observer.Notification} notification the notification to act upon.
   */
  handleNotification: function(notification /* Notification */) {
    switch (notification.getName()) {
      case Boxsplash.model.ConfigProxy.CONFIG_OPTION_RETRIEVED:
        var boxConfigVO = notification.getBody();
        this.controlPanel.setConfigurationLabel(boxConfigVO.id);
        break;

      case Boxsplash.ApplicationFacade.ANIMATION_STATE_CHANGED:
        this.controlPanel.animationStateChanged(notification.getBody());
        break;
    }
  },

  /**
   * Performs actions when the <code>Mediator</code> is registered by
   * the <code>View</code>.  Here we listen for the "loadConfig" and "toggleStartStop"
   * events from the <code>ControlPanel</code> and set the configuration buttons
   * based on the contents of the <code>ConfigProxy</code>'s <code>data</code>
   * property.
   *
   * @see Boxsplash.view.components.ControlPanel
   * @see Boxsplash.model.ConfigProxy
   */
  onRegister: function() {
    this.callParent(arguments);
    this.configProxy = this.facade.retrieveProxy(Boxsplash.model.ConfigProxy.NAME);

    // Replace listener handlers with methods bound to 'this'
    this.loadConfigHandler = Ext.bind(this.loadConfigHandler, this);
    this.toggleStartStopHandler = Ext.bind(this.toggleStartStopHandler, this);

    this.controlPanel.addListener("loadConfig", this.loadConfigHandler);
    this.controlPanel.addListener("toggleStartStop", this.toggleStartStopHandler);
    this.controlPanel.setConfigurationButtons(this.configProxy.data);
  },

  /**
   * Removes listeners so that the <code>View</code> can be properly disposed of
   * and garbage collected.
   */
  onRemove: function() {
    this.callParent(arguments);
    this.controlPanel.removeListener("loadConfig", this.loadConfigHandler);
    this.controlPanel.removeListener("toggleStartStop", this.toggleStartStopHandler);
  },

  /**
   * Event handler for the "loadConfig" event dispatched by the
   * <code>ControlPanel</code> in response to user clicks on any
   * of the configuration buttons.
   *
   * @param {int} index the index of the desired configuration option settings to load.
   */
  loadConfigHandler: function(index) {
    this.sendNotification(Boxsplash.ApplicationFacade.RETRIEVE_CONFIG_OPTION, index);
  },

  /**
   * Event handler for the "toggleStartStop" event dispatched
   * by the <code>ControlPanel</code> in response to user clicks
   * on the <i>startStop</i> button.
   */
  toggleStartStopHandler: function() {
    this.sendNotification(Boxsplash.ApplicationFacade.TOGGLE_START_STOP);
  },

  statics: {
    /**
     * Constant used as the unique name and identifier for this <code>Mediator</code> subclass.
     * @type String
     * @constant
     * @memberof Boxsplash.view.ControlPanelMediator
     */
    NAME: "ControlPanelMediator"
  }
});