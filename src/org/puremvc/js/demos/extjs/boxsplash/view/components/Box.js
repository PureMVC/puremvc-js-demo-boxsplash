/**
 * @lends Boxsplash.view.components.Box.prototype
 */
Ext.namespace("Boxsplash.view.components");
Boxsplash.view.components.Box = Ext.extend(Boxsplash.view.components.core.UIComponent, {
  /**
   * @class The particle used in the 3D animations.
   *
   * @param {Number} unscaledWidth The unscaled width of the Box.
   * @param {Number} unscaledHeight The unscaled height of the Box.
   *
   * @extends Boxsplash.view.components.core.UIComponent
   * 
   * @author Justin Wilaby
   * @author Tony DeFusco
   *
   * @constructs
   */
  constructor: function(unscaledWidth /* Number */, unscaledHeight /* Number */) {
    this.unscaledWidth = unscaledWidth;
    this.unscaledHeight = unscaledHeight;
    Boxsplash.view.components.Box.superclass.constructor.call(this, {tag: 'div'}, null, {
      "position": "absolute",
      "width": this.unscaledWidth + "px",
      "height": this.unscaledHeight + "px"
    });
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
