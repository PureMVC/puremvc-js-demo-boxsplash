/**
 * @lends Boxsplash.view.ShellMediator.prototype
 */
Ext.namespace("Boxsplash.view");
Ext.define("Boxsplash.view.ShellMediator", {

  /** @extends org.puremvc.js.multicore.patterns.mediator.Mediator */
  extend: "org.puremvc.js.multicore.patterns.mediator.Mediator",

  /**
   * A named shortcut to the <code>Shell</code> instance.  This
   * prevents us from having to reference the more
   * ambiguous <code>viewComponent</code> property.
   * @type Boxsplash.view.components.Shell
   */
  shell: null,

  /**
   * @class The <code>Mediator</code> subclass attached to
   * the <code>Shell</code>.  Its primary responsibility here is
   * to register additional <code>Mediator<code>s for child <code>View</code>s but
   * it can listen for and/or send <code>Notification</code>s and steward
   * state changes for the View.
   *
   * @param {Boxsplash.view.components.Shell} viewComponent the view component to register with the <code>ShellMediator</code>.
   *
   * @see Boxsplash.view.components.Shell
   * @see Boxsplash.view.WorldSpaceMediator
   * @see Boxsplash.view.ControlPanelMediator
   *
   * @author Justin Wilaby
   * @author Tony DeFusco
   *
   * @constructs
   */
  constructor: function(viewComponent /* Shell */) {
    this.callParent([Boxsplash.view.ShellMediator.NAME, viewComponent]);
    this.shell = this.getViewComponent();
  }, 

  /**
   * Called by the <code>View</code> when the <code>Mediator</code> is registered.
   * This method is usually overridden as needed by the subclass.
   */
  onRegister: function() {
    this.callParent(arguments);

    // Handle creation and registration of all remaining Mediators here.
    this.facade.registerMediator(new Boxsplash.view.WorldSpaceMediator(this.shell.worldSpace));
    this.facade.registerMediator(new Boxsplash.view.ControlPanelMediator(this.shell.controlPanel));
  },

  statics: {
    /**
     * Constant used as a unique name for this <code>Mediator</code> subclass.
     * @type String
     * @constant
     * @memberof Boxsplash.view.ShellMediator
     */
    NAME: "ShellMediator"
  }
});