/**
 * @misc
 * @class <code>SimpleCommand</code> subclass
 * used to retrieve configuration data from the <code>ConfigProxy</code>
 * @see ConfigProxy
 * @see ApplicationFacade
 */
var RetrieveConfigOptionCommand = function(){

    /**
     * @ignore
     */
    this.Extends = SimpleCommand;

    /**
     * Fulfills the use case give by the <code>Notification</code>.
     * In this case, the retrieval of a specific <code>BoxConfigVO</code>
     * @param {Notification} notification containing the location of a <code>BoxConfigVO</code>.
     * @see BoxConfigVO
     */
    this.execute = function(notification /* Notification */)
    {
	var configOptionNum = notification.getBody();
	var configProxy = this.facade.retrieveProxy(ConfigProxy.NAME);
	configProxy.retrieveConfigOption(configOptionNum);
    };
};
RetrieveConfigOptionCommand = new Class(new RetrieveConfigOptionCommand());