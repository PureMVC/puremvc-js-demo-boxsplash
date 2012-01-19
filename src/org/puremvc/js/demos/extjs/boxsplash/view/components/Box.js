/**
 * @lends Boxsplash.view.components.Box.prototype
 */
Ext.namespace("Boxsplash.view.components");
Ext.define("Boxsplash.view.components.Box", {

  /** @extends Boxsplash.view.components.core.UIComponent */
  extend: "Boxsplash.view.components.core.UIComponent",

  /**
   * @class The particle used in the 3D animations.
   *
   * @param {Number} unscaledWidth The unscaled width of the Box.
   * @param {Number} unscaledHeight The unscaled height of the Box.
   *
   * @author Justin Wilaby
   * @author Tony DeFusco
   *
   * @constructs
   */
  constructor: function(unscaledWidth /* Number */, unscaledHeight /* Number */) {
    this.callParent([{tag: 'div'}, null, {
      "position": "absolute",
      "width": unscaledWidth + "px",
      "height": unscaledHeight + "px"
    }]);
    this.unscaledWidth = unscaledWidth;
    this.unscaledHeight = unscaledHeight;
  },

  /**
   * The x position in 3D coordinate space.
   * 
   * @type Number
   */
  posX: 0,

  /**
   * The Y position in 3D coordinate space.
   * 
   * @type Number
   */
  posY: 0,

  /**
   * The z position in 3D coordinate space.
   * 
   * @type Number
   */
  posZ: 0,

  /**
   * Width of the box with no scaling applied.
   *
   * @type Number
   */
  unscaledWidth: 0,

  /**
   * Height of the box with no scaling applied.
   * 
   * @type Number
   */
  unscaledHeight: 0
});
