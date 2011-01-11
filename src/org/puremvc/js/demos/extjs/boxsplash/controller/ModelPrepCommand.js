/**
 * @lends Boxsplash.controller.ModelPrepCommand.prototype
 */
Ext.namespace('Boxsplash.controller');
Boxsplash.controller.ModelPrepCommand = Ext.extend(Puremvc.patterns.SimpleCommand, {
  /**
   * @class <code>SimpleCommand</code> subclass that is
   * responsible for preparing the data <code>Model</code>.
   * This is where all <code>Proxy</code> subclasses are
   * registered with the <code>Model</code>.
   *
   * @extends Puremvc.patterns.SimpleCommand
   *
   * @author Justin Wilaby
   * @author Tony DeFusco
   *
   * @constructs
   */
  constructor: function() {
    Boxsplash.controller.ModelPrepCommand.superclass.constructor.call(this);
  },

  /**
   * Registers the <code>ConfigProxy</code> with the <code>Model</code>.
   *
   * @param {Puremvc.patterns.Notification} notification the <code>Notification</code> to handle.
   *
   * @see Boxsplash.model.ConfigProxy
   */
  execute: function(notification /* Notification */) {
    this.facade.registerProxy(new Boxsplash.model.ConfigProxy());
  }
});
