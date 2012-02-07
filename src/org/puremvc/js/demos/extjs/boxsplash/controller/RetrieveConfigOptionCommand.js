/**
 * @lends Boxsplash.controller.RetrieveConfigOptionCommand.prototype
 */
Ext.namespace("Boxsplash.controller");
Boxsplash.controller.RetrieveConfigOptionCommand = Ext.extend(puremvc.SimpleCommand, {
  /**
   * @class <code>SimpleCommand</code> subclass
   * used to retrieve configuration data from the <code>ConfigProxy</code>.
   *
   * @extends puremvc.SimpleCommand
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
    Boxsplash.controller.RetrieveConfigOptionCommand.superclass.constructor.call(this);
  },

  /**
   * Fulfills the use case given by the <code>Notification</code>.
   * In this case, the retrieval of a specific <code>BoxConfigVO</code>.
   *
   * @param {puremvc.Notification} notification containing the location of a <code>BoxConfigVO</code>.
   *
   * @see Boxsplash.model.vo.BoxConfigVO
   */
  execute: function(notification /* Notification */){
    var configOptionNum = notification.getBody();
    var configProxy = this.facade.retrieveProxy(Boxsplash.model.ConfigProxy.NAME);
    configProxy.retrieveConfigOption(configOptionNum);
  }
});
