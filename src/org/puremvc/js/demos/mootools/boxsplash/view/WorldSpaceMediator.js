/**
 * @misc
 * @class The <code>Mediator</code> subclass attached to the
 * <code>WorldSpace</code> View. Its primary responsibilities here
 * are to handle notification from the system that require changing
 * the state of the animation (BoxConfigVO data) This <code>Mediator</code> is
 * registered by the <code>ShellMediator</code>'s constructor.
 *
 *@param {WorldSpace} viewComponent The <code>WorldSpace</code> instance.
 * @extends Mediator
 * @see WorldSpace
 * @see ShellMediator
 * @author Justin Wilaby
 */
var WorldSpaceMediator = function(viewComponent /* WorldSpace */){

    /**
     * @ignore
     */
    this.Extends = Mediator;
    /**
     * A named shortcut to the WorldSpace instance.  This
     * prevents us from having to reference the more
     * ambiguous <code>viewComponent</code> property.
     *
     * @type WorldSpace
     */
    this.worldSpace = null;

    /**
     * @ignore
     */
    this.initialize = function(viewComponent /* WorldSpace */)
    {
	this.parent(WorldSpaceMediator.NAME, viewComponent);
	this.worldSpace = this.getViewComponent();
	// Overrite listener method with ones bound to 'this'
	this.animationStateChangedHandler = this.animationStateChangedHandler.bind(this);
    };

    /**
     * Adds the "animationStateChanged" listener to the <code>WorldSpace</code> instance
     */
    this.onRegister = function()
    {
	this.worldSpace.addEvent("animationStateChanged", this.animationStateChangedHandler);
    };

    /**
     * Removes listeners so the View can be properly disposed of
     * and garbage collected
     */
    this.onRemove = function()
    {
	this.worldSpace.removeEvent("animationStateChanged", this.animationStateChangedHandler);
    };

    /**
     * Provides a list of notification interests to the <code>View</code>.
     * Without an accurate list, the <code>handleNotification()</code> method will
     * may be invoked.  A common mistake by developers is to provide handling
     * routines in the <code>handleNotification()</code> method but forget to
     * add the notification name in the <code>listNotificationInterests()</code> array.
     * <p>Note that changing this array at runtime will not have any affect on
     * notification interests since this method is called by the <code>View</code>
     * a single time when the <code>Mediator</code> is first registered.
     *
     * @return {String[]} the array of notification names to act upon.
     */
    this.listNotificationInterests = function()
    {
	return [
	    ConfigProxy.CONFIG_OPTION_RETRIEVED,
	    ApplicationFacade.TOGGLE_START_STOP
	];
    };

    /**
     * Handles notifications broadcasted by the system provided
     * the notification is listed in the <code>listNotificationInterests()</code>
     * return value.
     *
     * @param {Notification} notification The notification to act upon.
     */
    this.handleNotification = function(notification /* Notification */)
    {
	switch(notification.getName())
	{
	    case ConfigProxy.CONFIG_OPTION_RETRIEVED:
		this.worldSpace.setConfiguration(notification.getBody());
		break;

	    case ApplicationFacade.TOGGLE_START_STOP:
		this.worldSpace.toggleStartStop();
		break;
	}
    };

    /**
     * Handler for "animationStateChaned" events fired from the
     * <code>WorldSpace</code> View. The system is then notified
     * so any interested <code>Mediator</code>'s can act
     *
     * @param {Boolean} inTween indicates whether or not the animation is running.
     */
    this.animationStateChangedHandler = function(inTween)
    {
	this.sendNotification(ApplicationFacade.ANIMATION_STATE_CHANGED, inTween);
    };
};
WorldSpaceMediator = new Class(new WorldSpaceMediator());
/**
 * Constant used as a unique name and identifier
 * @type String
 */
WorldSpaceMediator.NAME = "WorldSpaceMediator";