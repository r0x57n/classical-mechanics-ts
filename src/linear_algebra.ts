class Point {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
}

class Vector {
  x: number
  y: number

  constructor(p1x: number, p1y: number, p2x: number, p2y: number) {
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
  scale(lambda: number) {
    this.x *= lambda
    this.y *= lambda
  }

  scaleRet(lambda: number) {
    this.scale(lambda)
    return this
  }

  /*
   * Project this vector onto vector v, return the resulting vector.
   */
  proj(v: Vector) {
    var newVec = new Vector(0, 0, 0, 0)
    newVec.x = v.x
    newVec.y = v.y
    newVec.scale(this.dotProd(v) / ( v.abs()**2 ))
    return newVec
  }

  /*
   * Dot product this vector and vector v, return the result.
   */
  dotProd(v: Vector) {
    return this.x * v.x + this.y * v.y
  }

  /*
   * Returns the absolute value of this vector.
   */
  abs() {
    return Math.sqrt(this.x**2 + this.y**2)
  }

  add(v: Vector) {
    this.x += v.x
    this.y += v.y
  }

  rotate(phi: number) {
    this.x = Math.round(this.x * Math.cos(phi) - this.y * Math.sin(phi))
    this.y = Math.round(this.x * Math.sin(phi) + this.y * Math.cos(phi))
  }

  rotateY(phi: number) {
    this.y = Math.round(this.x * Math.sin(phi) + this.y * Math.cos(phi))
  }

  rotateX(phi: number) {
    this.x = Math.round(this.x * Math.cos(phi) - this.y * Math.sin(phi))
  }
}

export { Vector, Point }
