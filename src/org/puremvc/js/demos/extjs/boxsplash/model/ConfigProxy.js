/**
 * @lends Boxsplash.model.ConfigProxy.prototype
 */
Ext.namespace("Boxsplash.model");
Boxsplash.model.ConfigProxy = Ext.extend(puremvc.Proxy, {
  /**
   * @class The Configuration <code>Proxy</code> used to house
   * and manipulate (if necessary) configuration data for the BoxSplash
   * application.  The data takes its form as <code>BoxConfigVO</code>
   * (Value Objects) containing properties that define the state of the
   * application.
   * <p>In an MVC pattern, the <code>Proxy</code> acts upon notifications from the system
   * or calls to public methods from either <code>SimpleCommand</code>
   * subclasses or <code>Mediator</code> subclasses to retrieve, store, or
   * manipulate data whether the data"s physical location happens to be
   * remote or local.</p>
   *
   * @extends puremvc.Proxy
   *
   * @author Justin Wilaby
   * @author Tony DeFusco
   *
   * @constructs
   */
  constructor: function() {
    // Config options to store in the "data" property of this proxy.
    var configOptions = [ new Boxsplash.model.vo.BoxConfigVO("Light", 20, 50, 500, "#FF0000"),
      new Boxsplash.model.vo.BoxConfigVO("Medium-light", 40, 30, 400, "#00FF00"),
      new Boxsplash.model.vo.BoxConfigVO("Medium", 80, 20, 300, "#0000FF"),
      new Boxsplash.model.vo.BoxConfigVO("Heavy-medium", 160, 10, 200, "#FF00FF"),
      new Boxsplash.model.vo.BoxConfigVO("Heavy (IE Killer)", 320, 5, 200, "#00FFFF") ];
    Boxsplash.model.ConfigProxy.superclass.constructor.call(this, Boxsplash.model.ConfigProxy.NAME, configOptions);
  },

  /**
   * Retrieves the specified configuration option.  In this case, by index.
   * 
   * @param {int} optionNum The index of the <code>BoxConfigVO</code>
   * stored in the <code>data</code> Object.
   */
  retrieveConfigOption: function(optionNum /* int */) {
    this.sendNotification(Boxsplash.model.ConfigProxy.CONFIG_OPTION_RETRIEVED,
        this.data[optionNum]);
  }
});

Ext.apply(Boxsplash.model.ConfigProxy, {
  /**
   * Constant defining the unique name of this <code>Proxy</code> subclass.
   * @type String
   * @constant
   * @memberof Boxsplash.model.ConfigProxy
   */
  NAME: "ConfigProxy",

  /**
   * Constant used to name the <i>outbound</i> notification
   * resulting from a call to the <code>retrieveConfigOption</code> method.
   * @type String
   * @constant
   * @memberof Boxsplash.model.ConfigProxy
   */
  CONFIG_OPTION_RETRIEVED: "configOptionRetrieved"
});