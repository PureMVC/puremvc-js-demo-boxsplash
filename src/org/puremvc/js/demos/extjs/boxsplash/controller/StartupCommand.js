/**
 * @lends Boxsplash.controller.StartupCommand.prototype
 */
Ext.namespace("Boxsplash.controller");
Ext.define("Boxsplash.controller.StartupCommand", {

  /** @extends org.puremvc.js.multicore.patterns.command.MacroCommand */
  extend: "org.puremvc.js.multicore.patterns.command.MacroCommand",

  /**
   * @class A <code>MacroCommand</code> subclass
   * used to satisfy or initialize dependency handling.<p>
   * In this case, our <code>ShellMediator</code>
   * needs to be registered with the <code>View</code>
   * in order to begin communication with the system.</p>
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
   * Overridden to populate the <code>MacroCommand</code>'s
   * <code>subCommands</code> array.
   *
   * @see Boxsplash.controller.ModelPrepCommand
   * @see Boxsplash.controller.ViewPrepCommand
   */
  initializeMacroCommand: function() {
    this.addSubCommand(Boxsplash.controller.ModelPrepCommand);
    this.addSubCommand(Boxsplash.controller.ViewPrepCommand);
  }
});
