/**
 * @lends Boxsplash.controller.ModelPrepCommand.prototype
 */
Ext.namespace("Boxsplash.controller");
Ext.define("Boxsplash.controller.ModelPrepCommand", {

  /** @extends puremvc.SimpleCommand */
  extend: "puremvc.SimpleCommand",

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
   * @param {puremvc.Notification} notification the <code>Notification</code> to handle.
   *
   * @see Boxsplash.model.ConfigProxy
   */
  execute: function(notification /* Notification */) {
    this.facade.registerProxy(new Boxsplash.model.ConfigProxy());
  }
});
