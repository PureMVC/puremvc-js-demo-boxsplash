/**
 * @misc
 * @class <code>SimpleCommand</code> subclass that is
 * responsible for preparing the primary View.  This is where the
 * <code>Mediator</code> subclass assigned to the Shell is
 *  registered with the <code>Model</code>.
 *
 *  @extends SimpleCommand
 *  @see ShellMediator
 *  @see Shell
 *  @author Justin Wilaby
 */
var ViewPrepCommand = function(){
    this.Extends = SimpleCommand;
    /**
     * Executes the command. A <code>Notification</code>
     * instance will always be present as an argument to
     * this method.
     * @param {Notification} notification The notification containing
     * the view instance in the <code>body</code> property.
     * (In this case our Shell)
     */
    this.execute = function(notification /* Notification */)
    {
	// Extract the Shell instance
	var shell = notification.getBody();
	// Register the ShellMediator passing the Shell
	// instance to its constructor.
	this.facade.registerMediator(new ShellMediator(shell));
    };
};
ViewPrepCommand = new Class(new ViewPrepCommand());