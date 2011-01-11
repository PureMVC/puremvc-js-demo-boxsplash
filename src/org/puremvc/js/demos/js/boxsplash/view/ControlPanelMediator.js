/**
 * @misc
 * @class The <code>Mediator</code> subclass attached to the
 * <code>ControlPanel</code> View. Its primary responsibilities here
 * are to listen for and notify the system of user interactions that change
 * the state of the application including that of other Views; specifically
 * start/stop and config button clicks.  This <code>Mediator</code> is
 * registered by the <code>ShellMediator</code>'s constructor.
 *
 * @param {ControlPanel} viewComponent The <code>ControlPanel</code> instance
 * assigned to this mediator.
 * @see ControlPanel
 * @see ShellMediator
 * @author Justin Wilaby
 */
var ControlPanelMediator = function(viewComponent /* ControlPanel */){

    /**
     * @ignore
     */
    this.Extends = Mediator;
    /**
     * A named shortcut to the ControlPanel instance.  This
     * prevents us from having to reference the more
     * ambiguous <code>viewComponent</code> property.
     * @type ControlPanel
     */
    this.controlPanel = null;

    /**
     * The <code>ConfigProxy</code> instance registered to the
     * <code>ApplicationFacade</code>. It is retrieved here to act as
     * a discriptor for the initial state of the View based on the <code>data</code>
     * property contents.
     *
     * @type ConfigProxy
     * @see ApplicatinFacade
     */
    this.configProxy = null;

    /**
     * @ignore
     */
    this.initialize = function(viewComponent /* ControlPanel */)
    {
	this.parent(ControlPanelMediator.NAME, viewComponent);

	this.controlPanel = this.getViewComponent();
	this.configProxy = this.facade.retrieveProxy(ConfigProxy.NAME);
	// Replace listener handlers with methods bound to 'this'
	this.loadConfigHandler = this.loadConfigHandler.bind(this);
	this.toggleStartStopHandler = this.toggleStartStopHandler.bind(this);
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
	    ApplicationFacade.ANIMATION_STATE_CHANGED
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
		var boxConfigVO = notification.getBody();
		this.controlPanel.setConfigurationLabel(boxConfigVO.id);
		break;

	    case ApplicationFacade.ANIMATION_STATE_CHANGED:
		this.controlPanel.animationStateChanged(notification.getBody());
		break;
	}
    };

    /**
     * Performs actions when the <code>Mediator</code> is registered by
     * the <code>View</code>.  Here we listen for the "loadConfig" and "toggleStartStop"
     * events from the <code>ControlPanel</code> and set the configuration buttons
     * based on the contents of the <code>ConfigProxy</code>'s <code>data</code>
     * property.
     *
     * @see ControlPanel
     * @see ConfigProxy
     */
    this.onRegister = function()
    {
	this.parent();
	this.controlPanel.addEvent("loadConfig", this.loadConfigHandler);
	this.controlPanel.addEvent("toggleStartStop", this.toggleStartStopHandler);

	this.controlPanel.setConfigurationButtons(this.configProxy.data);
    };

     /**
     * Removes listeners so the View can be properly disposed of
     * and garbage collected
     */
    this.onRemove = function()
    {
	this.parent();
	this.controlPanel.removeEvent("loadConfig", this.loadConfigHandler);
	this.controlPanel.removeEvent("toggleStartStop", this.toggleStartStopHandler);
    };

    /**
     * Event handler for the "loadConfig" event dispatched by the
     * <code>ControlPanel</code> in respone to user clicks on any
     * of the configuration buttons.
     */
    this.loadConfigHandler = function(index)
    {
	this.sendNotification(ApplicationFacade.RETRIEVE_CONFIG_OPTION, index);
    };

    /**
     * Event handler for the "toggleStartStop" event dispatched
     * by the <code>ControlPanel</code> in respone to user clicks
     * on the startStop button
     */
    this.toggleStartStopHandler = function()
    {
	this.sendNotification(ApplicationFacade.TOGGLE_START_STOP);
    };
};
ControlPanelMediator = new Class(new ControlPanelMediator());
/**
 * Constant used as the unique name and identifier.
 * @type String
 */
ControlPanelMediator.NAME = "ControlPanelMediator";