/**
 * @lends Boxsplash.ApplicationFacade.prototype
 */
Ext.namespace('Boxsplash');
Boxsplash.ApplicationFacade = Ext.extend(Puremvc.patterns.Facade, {

  /**
   * @class <p>A <i>concrete</i> <code>Facade</code> implementation used to facilitate the startup
   *        process of the MVC. This is the 'hub' that accesses and communicates
   *        with the <code>Proxy</code>s, <code>Mediator</code>s and <code>Command</code>s that
   *        do the work in your application.</p>
   *        <p>
   *        Excerpts from "Implementation Idioms and Best Practices" by Cliff
   *        Hall: "...By composition then, the Facade implements and exposes the
   *        features of the Model, View and Controller; aggregating their
   *        functionality and shielding the developer from direct interaction with
   *        the Core actors of the framework..."
   *        </p>
   *        <p>
   *        "By convention, it is named <i>ApplicationFacade</i>, but you may call
   *        it whatever you like".
   *        </p>
   *        <p>
   *        "Once the application's View hierarchy has been built, the PureMVC
   *        apparatus is started and the Model and View regions are prepared for
   *        use." For more information on creating the concrete Facade, see page
   *        11 in "Implementation Idioms and Best Practices" by Cliff Hall.
   *        </p>
   * @extends Puremvc.patterns.Facade
   * 
   * @author Justin Wilaby
   * @author Tony DeFusco
   *
   * @constructs
   */
  constructor: function() {
    Boxsplash.ApplicationFacade.superclass.constructor.call(this);
  },

  /**
   * The <code>Model</code>, <code>View</code> and <code>Controller</code>
   * are initialized in a deliberate order to ensure internal dependencies are
   * satisfied before operations are performed.
   * <p>
   * <code>initializeController()</code> should be overridden for the specific
   * purpose of registering your commands. Any attempt to register
   * <code>Mediator</code>s here will result in an error being thrown
   * because the <code>View</code> has not yet been initialized.
   * </p>
   * <p>Calling <code>this.parent()</code> is also required.
   */
  initializeController: function() {
    // Always call parent
    Boxsplash.ApplicationFacade.superclass.initializeController.call(this);
    this.registerCommand(Boxsplash.ApplicationFacade.STARTUP, Boxsplash.controller.StartupCommand);
    this.registerCommand(Boxsplash.ApplicationFacade.RETRIEVE_CONFIG_OPTION, Boxsplash.controller.RetrieveConfigOptionCommand);
  },

  /**
   * Method used to start the system.
   *
   * @param {Boxsplash.view.components.Shell} viewComponent the <code>Shell</code> instance used as the <code>View</code>.
   */
  startup: function(viewComponent /* Shell */) {
    this.sendNotification(Boxsplash.ApplicationFacade.STARTUP, viewComponent);
  }
});

Ext.apply(Boxsplash.ApplicationFacade, {
  /**
   * Constant used to register and identify the notification that should execute
   * the <code>StartupCommand</code>
   *
   * @type String
   * @constant
   * @memberof Boxsplash.ApplicationFacade
   * @see Boxsplash.controller.StartupCommand
   */
  STARTUP: "Startup",

  /**
   * Constant used to register and identify the notification that should execute
   * the <code>RetrieveConfigOptionCommand</code>
   *
   * @type String
   * @constant
   * @memberof Boxsplash.ApplicationFacade
   * @see Boxsplash.controller.RetrieveConfigOptionCommand
   */
  RETRIEVE_CONFIG_OPTION: "retrieveConfigOption",

  /**
   * Constant used to register and identify the notification that should toggle
   * the animation between start and stop.
   *
   * @type String
   * @constant
   * @memberof Boxsplash.ApplicationFacade
   * @see Boxsplash.view.components.ControlPanel
   * @see Boxsplash.view.components.WorldSpace
   */
  TOGGLE_START_STOP: "toggleStartStop",

  /**
   * Constant used to register and identify the notification that is sent when
   * the animation state of the <code>WorldSpace</code> has changed
   *
   * @type String
   * @constant
   * @memberof Boxsplash.ApplicationFacade
   * @see Boxsplash.view.components.ControlPanel
   * @see Boxsplash.view.components.WorldSpace
   */
  ANIMATION_STATE_CHANGED: "animationStateChanged",

  /**
   * @memberof Boxsplash.ApplicationFacade
   *
   * @return {Boxsplash.ApplicationFacade} the <code>Facade</code> subclass instance
   * used throughout the application.
   */
  getInstance: function() {
    if (Puremvc.patterns.Facade._instance === null) {
      Puremvc.patterns.Facade._instance = new Boxsplash.ApplicationFacade();
    }
    return Puremvc.patterns.Facade._instance;
  }
});