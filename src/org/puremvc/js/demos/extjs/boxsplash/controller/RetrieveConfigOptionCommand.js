/**
 * @lends Boxsplash.controller.RetrieveConfigOptionCommand.prototype
 */
Ext.namespace("Boxsplash.controller");
Ext.define("Boxsplash.controller.RetrieveConfigOptionCommand", {

  /** @extends org.puremvc.js.multicore.patterns.command.SimpleCommand */
  extend: "org.puremvc.js.multicore.patterns.command.SimpleCommand",

  /**
   * @class <code>SimpleCommand</code> subclass
   * used to retrieve configuration data from the <code>ConfigProxy</code>.
   *
   * @see Boxsplash.model.ConfigProxy
   * @see Boxsplash.ApplicationFacade
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
   * Fulfills the use case given by the <code>Notification</code>.
   * In this case, the retrieval of a specific <code>BoxConfigVO</code>.
   *
   * @param {org.puremvc.js.multicore.patterns.observer.Notification} notification containing the location of a <code>BoxConfigVO</code>.
   *
   * @see Boxsplash.model.vo.BoxConfigVO
   */
  execute: function(notification /* Notification */){
    var configOptionNum = notification.getBody();
    var configProxy = this.facade.retrieveProxy(Boxsplash.model.ConfigProxy.NAME);
    configProxy.retrieveConfigOption(configOptionNum);
  }
});
