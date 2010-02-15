/**
 * @misc
 * @class The <code>Mediator</code> subclass attached to
 * the <code>Shell</code>.  Its primary responsibility here is
 * to register additional <code>Mediator<code>s for child Views but
 * it can listen for and/or send <code>Notification</code>s and seward
 * state changes for the View
 *
 * @param {Shell} viewComponent to register with the <code>ShellMediator</code>
 * @extends Mediator
 * @see Shell
 * @see WorldSpaceMediator
 * @see ControlPanelMediator
 * @author Justin Wilaby
 */
var ShellMediator = function(viewComponent /* Shell */){
    /**
     * @ignore
     */
    this.Extends = Mediator;
    /**
     * A named shortcut to the Shell instance.  This
     * prevents us from having to reference the more
     * ambiguous <code>viewComponent</code> property.
     * @type Shell
     */
    this.shell = null;

    /**
     * @ignore
     */
    this.initialize = function(viewComponent /* Shell */)
    {
	this.parent(ShellMediator.NAME, viewComponent /* Shell */);
	this.shell = this.getViewComponent();
	// Handle creation and registration of all
	// remaining Mediators here.
	this.facade.registerMediator(new WorldSpaceMediator(this.shell.worldSpace));
	this.facade.registerMediator(new ControlPanelMediator(this.shell.controlPanel));
    };
};
ShellMediator = new Class(new ShellMediator());
/**
 * Constant used as a unique name
 * @type String
 */
ShellMediator.NAME = "ShellMediator";