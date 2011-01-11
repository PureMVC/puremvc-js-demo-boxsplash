/**
 * @misc
 * @class Serves as the main application's View.  All
 * other Views will become children of this control making
 * the Shell act as the 'stage'
 *
 * @extends UIComponent
 * @author Justin Wilaby
 */
var Shell = function(){
    /**
     * @ignore
     */
    this.Extends = UIComponent;
    /**
     * The 'control panel' View instance used in the application
     * @type UIComponent
     * @see UIComponent
     */
    this.navigation = null;
    /**
     * The viewport for the 3D Box animation.
     * @type UIComponent
     * @see UIComponent
     */
    this.worldSpace = null;
    /**
     * A reference to the <code>ApplicationFacade</code> Singleton.
     * This reference serves no purpose other than to access the <code>startup()</code>
     * method when the initial View has finished being built.
     * @type ApplicationFacade
     */
    this.facade = null;

    /**
     * @ignore
     */
    this.initialize = function()
    {
	this.facade = ApplicationFacade.getInstance();
	this.parent('shell');
    };

    /**
     * Creates and adds the control panel and
     * world space to this as children.
     */
    this.initializeChildren = function()
    {
	this.controlPanel = new ControlPanel();
	this.addChild(this.controlPanel);
	//-----------------
	this.worldSpace = new WorldSpace();
	this.addChild(this.worldSpace);
    };

    /**
     * Once the children are added and the
     * initial state of the View has been build,
     * <code>startup()</code> is called passing
     * a reference to the <code>Shell</code> as an
     * argument which starts the system and initializes
     * the Shell's <code>Mediator</code>
     *
     * @see ApplicationFacade
     * @see StartupCommand
     * @see ViewPrepCommand
     * @see ModelPrepCommand
     * @see ShellMediator
     */
    this.initializationComplete = function()
    {
	this.facade.startup(this);
    };
};
Shell = new Class(new Shell());