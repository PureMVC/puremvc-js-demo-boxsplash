/**
 * @lends Boxsplash.controller.ViewPrepCommand.prototype
 */
Ext.namespace("Boxsplash.controller");
Ext.define("Boxsplash.controller.ViewPrepCommand", {

  /** @extends org.puremvc.js.multicore.patterns.command.SimpleCommand */
  extend: "org.puremvc.js.multicore.patterns.command.SimpleCommand",

  /**
   * @class <code>SimpleCommand</code> subclass that is
   * responsible for preparing the primary View.  This is where the
   * <code>Mediator</code> subclass assigned to the Shell is
   * registered with the <code>Model</code>.
   *
   * @see Boxsplash.view.ShellMediator
   * @see Boxsplash.view.components.Shell
   *
   * @author Justin Wilaby
   * @author Tony DeFusco
   *
   * @constructs
   */
  constructor: function() {
    this.callParent(arguments);
  },

  /**
   * Executes the command. A <code>Notification</code>
   * instance will always be present as an argument to
   * this method.
   * @param {org.puremvc.js.multicore.patterns.observer.Notification} notification The notification containing
   * the view instance in the <code>body</code> property.
   * (In this case our Shell)
   */
  execute: function(notification /* Notification */) {
    // Extract the Shell instance
    var shell = notification.getBody();

    // Register the ShellMediator passing the Shell
    // instance to its constructor.
    this.facade.registerMediator(new Boxsplash.view.ShellMediator(shell));
  }
});
