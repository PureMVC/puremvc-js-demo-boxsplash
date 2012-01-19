/**
 * @lends Boxsplash.controller.ModelPrepCommand.prototype
 */
Ext.namespace("Boxsplash.controller");
Ext.define("Boxsplash.controller.ModelPrepCommand", {

  /** @extends org.puremvc.js.multicore.patterns.command.SimpleCommand */
  extend: "org.puremvc.js.multicore.patterns.command.SimpleCommand",

  /**
   * @class <code>SimpleCommand</code> subclass that is
   * responsible for preparing the data <code>Model</code>.
   * This is where all <code>Proxy</code> subclasses are
   * registered with the <code>Model</code>.
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
   * Registers the <code>ConfigProxy</code> with the <code>Model</code>.
   *
   * @param {org.puremvc.js.multicore.patterns.observer.Notification} notification the <code>Notification</code> to handle.
   *
   * @see Boxsplash.model.ConfigProxy
   */
  execute: function(notification /* Notification */) {
    this.facade.registerProxy(new Boxsplash.model.ConfigProxy());
  }
});
