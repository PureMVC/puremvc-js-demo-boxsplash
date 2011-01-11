/**
 * @misc
 * @class <code>SimpleCommand</code> subclass that is
 * responsible for preparing the data Model.  This is where all
 * <code>Proxy</code> subclasses are registered with the
 * <code>Model</code>.
 *
 * @extends SimpleCommand
 * @author Justin Wilaby
 */
var ModelPrepCommand = function(){

    /*
     * @ignore
     */
    this.Extends = SimpleCommand;

    /**
     * Registers the <code>ConfigProxy</code> with
     * the <code>Model</code>
     * @see ConfigProxy
     */
    this.execute = function()
    {
	this.facade.registerProxy(new ConfigProxy());
    };
};
ModelPrepCommand = new Class(new ModelPrepCommand());