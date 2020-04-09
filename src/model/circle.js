// CONSTANTS
const colourArray = ["#FF6138", "#FFFF9D", "#BEEB9F", "#79BD8F", "#00A388"];

/**
 * This class will represent every dot in the canvas.
 */
export default class Circle {
  /**
   * @param {number} x The x axis.
   * @param {number} y The y axis.
   * @param {number} dx The horizontal speed.
   * @param {number} dy The vertical speed.
   * @param {number} radius the dot diameter
   */
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.colour = colourArray[Math.floor(Math.random() * colourArray.length)];
  }
}
