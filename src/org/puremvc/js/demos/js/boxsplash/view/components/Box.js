/**
 * @misc
 * @class The particle used in the 3D animations.
 *
 * @param {Number} unscaledWidth The unscaled width of the Box.
 * @param {Number} unscaledHeight The unscaled height of the Box.
 * @extends UIComponent
 * @author Justin Wilaby
 */
var Box = function(unscaledWidth /* Number */, unscaledHeight /* Number */){
    /**
     * @ignore
     */
    this.Extends = UIComponent;

    /**
     * The x postition in 3D coordinate space
     * @type Number
     */
    this.posX = 0;
    /**
     * The Y postition in 3D coordinate space
     * @type Number
     */
    this.posY = 0;
    /**
     * The z postition in 3D coordinate space
     * @type Number
     */
    this.posZ = 0;
    /**
     * Width of the box with no scaling applied
     * @type Number
     */
    this.unscaledWidth = 0;
    /**
     * Height of the box with no scaling applied.
     * @type Number
     */
    this.unscaledHeight = 0;

    /**
     * @ignore
     */
    this.initialize = function(unscaledWidth /* Number */, unscaledHeight /* Number */)
    {
	this.unscaledWidth = unscaledWidth;
	this.unscaledHeight = unscaledHeight;

	this.parent('div',{styles:{"position":"absolute", "width":this.unscaledWidth+"px", "height":this.unscaledHeight+"px"}});
    };
};
Box = new Class(new Box());