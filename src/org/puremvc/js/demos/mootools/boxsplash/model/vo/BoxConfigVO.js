/**
 * @misc
 * @class The primary Value Object used to store and retrieve
 * configuration data used in the application
 *
 * @param {String} id the identifier and label of the configuration object.
 * @param {integer} numBoxes The number of <code>Box</code> object to display
 * @param {Number} boxSize width and height of each box
 * @param {Number} focalLength the distance from the lens to the focal point.
 * @param {String} color the color of each <code>Box</code> instance.
 */
var BoxConfigVO = function(id /* String */, numBoxes /* integer */, boxSize /* Number */,  focalLength /* Number */, color /* String */){
    this.id = id;
    this.numBoxes = numBoxes;
    this.boxSize = boxSize;
    this.focalLength = focalLength;
    this.color = color;
};