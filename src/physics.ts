import { Vector } from "./linear_algebra.js"

const GRAVITY = 9.82
const Y_HAT = new Vector(0, 0, 0, 1)
const X_HAT = new Vector(0, 0, 1, 0)

class VecD extends Vector {
  color: string

  constructor(p1x: number, p1y: number, p2x: number, p2y: number, color="purple") {
    super(p1x, p1y, p2x, p2y)
    this.color = color
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
  draw(ctx: CanvasRenderingContext2D, x: number, y: number, scale=1) {
    ctx.beginPath()
    ctx.strokeStyle = this.color
    ctx.moveTo(x, y)
    ctx.lineTo(x + this.x * scale, y + this.y * scale)
    ctx.stroke()
  }

}

class MechanicalObject {
  x: number
  y: number
  mass: number
  vectors = new Map<string, VecD>()

  constructor(mass: number) {
    this.mass = mass
    this.addVec("vel", 0.0, 0.0, 0.0, 0.0, "blue")
  }

  addVec(id: string, p1x: number, p1y: number, p2x: number, p2y: number, color="purple") {
    var vector = new VecD(p1x, p1y, p2x, p2y, color)

    if (id == "w") {
      vector.scale(this.mass * GRAVITY)
    }

    this.vectors.set(id, vector)
  }

  physics(deltaTime: number, ctx: CanvasRenderingContext2D) {
    // get total forces
    var yTotN = 0
    var xTotN = 0

    for (let [id, vec] of this.vectors) {
      if (id != "vel") {
        yTotN += vec.proj(Y_HAT).abs()
        xTotN += vec.proj(X_HAT).abs()

        vec.draw(ctx, this.x, this.y, 5)
      } else {
        vec.draw(ctx, this.x, this.y, 0.1)
      }
    }

    // handle acceleration
    var acc = new VecD(0.0, 0.0, 0.0, 0.0, "red")

    acc.y += Math.round(yTotN / this.mass)
    acc.x += Math.round(xTotN / this.mass)

    acc.draw(ctx, this.x, this.y, 5)

    // handle velocity
    var velocity = this.vectors.get("vel")
    velocity.add(acc)
    velocity.draw(ctx, this.x, this.y, 0.1)

    var projectedX = velocity.proj(X_HAT)
    var projectedY = velocity.proj(Y_HAT)

    this.x += ( Math.round(projectedX.abs()) ) * deltaTime
    this.y += ( Math.round(projectedY.abs()) ) * deltaTime

    this.vectors.set("vel", velocity)
  }
}

export { VecD, MechanicalObject, GRAVITY };
