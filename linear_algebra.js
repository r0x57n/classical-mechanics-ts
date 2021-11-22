class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

class Vector {
  constructor(p1x, p1y, p2x, p2y) {
    this.x = p2x - p1x;
    this.y = p2y - p1y;
  }

  /* JS doesn't have function overloading...
    constructor(p1, p2) {
    this.x = p2.x - p1.x
    this.y = p2.y - p1.y
  }*/

  /*
   * Scale the vector with given scalar.
   */
  scale(lambda) {
    this.x *= lambda
    this.y *= lambda
  }

  scaleRet(lambda) {
    this.scale(lambda)
    return this
  }

  /*
   * Project this vector onto vector v, return the resulting vector.
   */
  proj(v) {
    var newVec = new Vector(0, 0, 0, 0)
    newVec.x = v.x
    newVec.y = v.y
    newVec.scale(this.dotProd(v) / ( v.abs()**2 ))
    return newVec
  }

  /*
   * Dot product this vector and vector v, return the result.
   */
  dotProd(v) {
    return this.x * v.x + this.y * v.y
  }

  /*
   * Returns the absolute value of this vector.
   */
  abs() {
    return Math.sqrt(this.x**2 + this.y**2)
  }

  add(v) {
    this.x += v.x
    this.y += v.y
  }

  /*
   * Draw the vector onto a canvas context.
   * Since a vector has no position in the plane, we need to know where to start the vector.
   *
   * ctx    - the context to draw it on
   * x, y   - position to start the vector in the canvas
   * scale  - what scale to draw it in
   * color  - what color to draw it in
   */
  draw(ctx, x, y, scale=1, color="blue") {
    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.moveTo(x, y)
    ctx.lineTo(x + this.x * scale, y + this.y * scale)
    ctx.stroke()
  }

  rotate(phi) {
    this.x = Math.round(this.x * Math.cos(phi) - this.y * Math.sin(phi))
    this.y = Math.round(this.x * Math.sin(phi) + this.y * Math.cos(phi))
  }

  sign() {
    if (this.x == 0)
      return Math.sign(this.y)
    else if (this.y == 0)
      return Math.sign(this.x)
    else
      return Math.sign(this.y * this.x)
  }
}

export { Vector, Point }
