/**
 * @lends Boxsplash.view.WorldSpaceMediator.prototype
 */
Ext.namespace("Boxsplash.view");
Ext.define("Boxsplash.view.WorldSpaceMediator", {

  /** @extends puremvc.Mediator */
  extend: "puremvc.Mediator",

  /**
   * @class The <code>Mediator</code> subclass attached to the
   * <code>WorldSpace</code> <code>View</code>. Its primary responsibilities here
   * are to handle notification from the system that require changing
   * the state of the animation (<code>BoxConfigVO</code> data) This <code>Mediator</code> is
   * registered by the <code>ShellMediator</code>'s constructor.
   *
   * @param {Boxsplash.view.WorldSpace} viewComponent The <code>WorldSpace</code> instance.
   *
   * @see Boxsplash.view.components.WorldSpace
   * @see Boxsplash.view.ShellMediator
   *
   * @author Justin Wilaby
   * @author Tony DeFusco
   *
   * @constructs
   */
  constructor: function(viewComponent /* WorldSpace */) {
    this.callParent([Boxsplash.view.WorldSpaceMediator.NAME, viewComponent]);
    this.worldSpace = this.getViewComponent();
  },

  /**
   * A named shortcut to the <code>WorldSpace</code> instance.
   * This prevents us from having to reference the more
   * ambiguous <code>viewComponent</code> property.
   *
   * @type Boxsplash.view.components.WorldSpace
   */
  worldSpace: null,

  /**
   * Adds the "animationStateChanged" listener to the <code>WorldSpace</code> instance.
   */
  onRegister: function() {
    this.callParent(arguments);

    // Overwrite listener method with one bound to 'this'
    this.animationStateChangedHandler = Ext.bind(this.animationStateChangedHandler, this);

    this.worldSpace.addListener("animationStateChanged", this.animationStateChangedHandler);
  },

  /**
   * Removes listeners so that the <code>View</code> can be properly disposed of and garbage collected.
   */
  onRemove: function() {
    this.callParent(arguments);
    this.worldSpace.removeListener("animationStateChanged", this.animationStateChangedHandler);
  },

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
            Boxsplash.ApplicationFacade.TOGGLE_START_STOP
            ];
  },

  /**
   * Handles notifications broadcasted by the system provided that
   * the <code>Notification</code> is listed in the <code>listNotificationInterests()</code>
   * return value.
   *
   * @param {puremvc.Notification} notification the notification to act upon.
   */
  handleNotification: function(notification /* Notification */) {
    switch (notification.getName()) {
      case Boxsplash.model.ConfigProxy.CONFIG_OPTION_RETRIEVED:
        this.worldSpace.setConfiguration(notification.getBody());
        break;

      case Boxsplash.ApplicationFacade.TOGGLE_START_STOP:
        this.worldSpace.toggleStartStop();
        break;
    }
  },

  /**
   * Handler for "animationStateChanged" events fired from the
   * <code>WorldSpace</code> <code>View</code>. The system is then notified
   * so any interested <code>Mediator</code>'s can act.
   *
   * @param {Boolean} inTween indicates whether or not the animation is running.
   */
  animationStateChangedHandler: function(inTween) {
    this.sendNotification(Boxsplash.ApplicationFacade.ANIMATION_STATE_CHANGED, inTween);
  },

  statics: {
    /**
     * Constant used as a unique name and identifier for this <code>Mediator</code> subclass.
     * @type String
     * @constant
     * @memberof Boxsplash.view.WorldSpaceMediator
     */
    NAME: "WorldSpaceMediator"
  }
});