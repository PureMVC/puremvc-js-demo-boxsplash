/**
 * @misc
 * @class The Configuration <code>Proxy</code> used to house
 * and manipulate (if necessary) configuration data for the BoxSplash
 * application.  The data takes its form as <code>BoxConfigVO</code>
 *  (Value Objects) containing properties that define the state of the
 *  application.
 * <p>In an MVC pattern, the Proxy acts upon notifications from the system
 * or calls to public methods from either <cod>SimpleCommand</code>
 * subclasses or <code>Mediator</code> subclasses to retrieve, store, or
 * manipulate data whether the data's physical location happens to be
 * remote or local.</p>
 */
var ConfigProxy = function(){
    this.Extends = Proxy;

    /*
     * @ignore
     */
    this.initialize = function()
    {
	// Config options to store in the 'data' property of this proxy.
	var configOptions = [
	    new BoxConfigVO('Light', 20, 50, 500, '#FF0000'),
	    new BoxConfigVO('Medium-light', 40, 30, 400, '#00FF00'),
	    new BoxConfigVO('Medium', 80, 20, 300, '#0000FF'),
	    new BoxConfigVO('Heavy-medium', 160, 10, 200, '#FF00FF'),
	    new BoxConfigVO('Heavy (IE Killer)', 320, 5, 200, '#00FFFF')
	];
	this.parent(ConfigProxy.NAME, configOptions);
    };

    /**
     * Retrieves the specified configuration oprion.  In this case
     * by index
     * @param {integer} optionNum The index of the <code>BoxConfigVO</code>
     * stored in the <code>data</code> Object
     */
    this.retrieveConfigOption = function(optionNum /* int */)
    {
	this.sendNotification(ConfigProxy.CONFIG_OPTION_RETRIEVED, this.data[optionNum]);
    };
}
ConfigProxy = new Class(new ConfigProxy());
/**
 * Contstant defining the unique name of this
 * <code>Proxy</code> sublcass
 * @type String
 */
ConfigProxy.NAME = "ConfigProxy";
/**
 * Constant used to name the <i>outbound</i> notification
 * resulting from a call to the <code>retrieveConfigOption</code> method.
 * @type String
 */
ConfigProxy.CONFIG_OPTION_RETRIEVED = "configOptionRetrieved";