/**
 * @lends Boxsplash.view.components.Shell.prototype
 */
Ext.namespace("Boxsplash.view.components");
Ext.define("Boxsplash.view.components.Shell", {

  /** @extends Boxsplash.view.components.core.UIComponent */
  extend: "Boxsplash.view.components.core.UIComponent",

  /**
   * @class Serves as the main application's <code>View</code>.
   * All other <code>View</code>s will become children of this control making
   * the <code>Shell</code> act as the 'stage'.
   *
   * @author Justin Wilaby
   * @author Tony DeFusco
   *
   * @constructs
   */
  constructor: function() {
    this.callParent(["shell"]);
  },

  /**
   * The 'control panel' View instance used in the application.
   *
   * @type Boxsplash.view.components.core.UIComponent
   * @see Boxsplash.view.components.core.UIComponent
   */
  controlPanel: null,

  /**
   * The viewport for the 3D Box animation.
   *
   * @type Boxsplash.view.components.core.UIComponent
   * @see Boxsplash.view.components.core.UIComponent
   */
  worldSpace: null,

  /**
   * Creates and adds the control panel and
   * world space to this as children.
   */
  initializeChildren: function() {
    this.controlPanel = new Boxsplash.view.components.ControlPanel();
    this.addChild(this.controlPanel);
    //-----------------
    this.worldSpace = new Boxsplash.view.components.WorldSpace();
    this.addChild(this.worldSpace);
  }
});
