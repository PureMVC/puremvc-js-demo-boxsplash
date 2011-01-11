/**
 * @misc
 * @class A <code>MacroCommand</code> subclass
 * used to satisfy or initialize dependency handling.<p>
 * in this case, our <code>ShellMediator</code>
 * needs to be registered with the <code>View</code>
 * in order to begin communication with the system.</p>
 *
 * @extends MacroCommand
 * @author Justin Wilaby
 */
var StartupCommand = function(){

    /**
     * @ignore
     */
    this.Extends = MacroCommand;

    /**
     * Overridden to populate the <code>MacroCommand</code>'s
     * <code>subCommands</code> array
     * @see ModelPrepCommand
     * @see ViewPrepCommand
     */
    this.initializeMacroCommand = function()
    {
	this.addSubCommand(ModelPrepCommand);
	this.addSubCommand(ViewPrepCommand);
    };
};
StartupCommand = new Class(new StartupCommand());