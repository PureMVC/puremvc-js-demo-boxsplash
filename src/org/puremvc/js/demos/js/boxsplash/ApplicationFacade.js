/**
 * @misc
 * @class <i>concrete</i> Facade implementation used to
 * facilitate the startup process of the MV&C.  This is
 * the 'hub' that accesses and communicates with the Proxies,
 * Mediators and Commands that do the work in your application.
 * <p>
 * Excerpts from "Implementation Idioms and Best Practices" by Cliff Hall:
 * "...By composition then, the Façade implements and exposes the
 * features of the Model, View and Controller; aggregating their
 * functionality and shielding the developer from direct interaction
 * with the Core actors of the framework..."</p>
 * <p> "By convention, it is named ‘ApplicationFacade’, but you
 * may call it whatever you like".</p>
 * <p> "Once the application’s View
 * hierarchy has been built, the PureMVC apparatus is
 * started and the Model and View regions are prepared for use."
 * For more information on creating the  concrete Facade, see
 * page 11 in "Implementation Idioms and Best Practices" by Cliff Hall
 * </p>
 * @extends Facade
 * @author Justin Wilaby
 */
var ApplicationFacade = function(){

    /**
     * Required by MooTools for inheritance.
     * @type Class
     */
    this.Extends = new Class(new Facade());

    /**
     * The <code>Model</code> <code>View</code> and
     * <code>Controller</code> are initialized in a deliberate
     * order to ensure internal dependencies are satisfied before
     * operations are performed.<p>
     * <code>initializeController()</code> should be overridden
     * for the specific purpose of registering your commands. Any attempt to
     * register <code>Mediator</code>s here will result in an error.
     * being thrown because the View has not yet been initialized.</p>
     * <p>calling <code>this.parent()</code> is also required.
     */
    this.initializeController = function()
    {
	// Always call this.parent()
	this.parent();
	this.registerCommand(ApplicationFacade.STARTUP, StartupCommand);
	this.registerCommand(ApplicationFacade.RETRIEVE_CONFIG_OPTION, RetrieveConfigOptionCommand);
    };

    /**
     * Method used to start the system.
     *
     * @param {Shell} viewComponent the Shell instance used as the vew.
     */
    this.startup = function(viewComponent /* Shell */)
    {
	this.sendNotification(ApplicationFacade.STARTUP, viewComponent);
    };
}
/**
 * Constant used to register and identify the notification that should
 * execute the <code>StartupCommand</code>
 * @type String
 * @see StartupCommand
 */
ApplicationFacade.STARTUP = "Startup";
/**
 * Constant used to register and identify the notification that should
 * execute the <code>RetrieveConfigOptionCommand</code>
 * @type String
 * @see RetrieveConfigOptionCommand
 */
ApplicationFacade.RETRIEVE_CONFIG_OPTION = "retrieveConfigOption";
/**
 * Constant used to register and identify the notification that should
 * toggle the animation between start and stop.
 * @type String
 * @see ControlPanel
 * @see WorldSpace
 */
ApplicationFacade.TOGGLE_START_STOP = "toggleStartStop";
/**
 * Constant used to register and identify the notification that
 * is sent when the animation state of the <code>WorldSpace</code>
 * has changed
 * @type String
 * @see ControlPanel
 * @see WorldSpace
 */
ApplicationFacade.ANIMATION_STATE_CHANGED = "animationStateChanged";
/**
 * Singleton implementation for the <code>ApplicationFacade</code>
 * Your Singleton implementation is up to you.  This provides an example
 * that is compatable with JSDoc and most editors' code assistance.
 *
 * @return {ApplicationFacade} the <code>Facade</code> subclass instance
 * used throughout the application.
 */
ApplicationFacade.getInstance = function()
{
    if (Facade.instance == undefined)
    {
	// The classFactory is used as a descriptor for the ApplicatonFacade
	// when hierarchical relationships are required as in this case.
	var classFactory = new Class(new ApplicationFacade());
	Facade.instance = new classFactory();
    }
    return Facade.instance;
};