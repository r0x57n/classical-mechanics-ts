import { Vector, Point } from "./linear_algebra.js"

const GRAVITY = 9.82
const Y_HAT = new Vector(0, 0, 0, 1)
const X_HAT = new Vector(0, 0, 1, 0)

class Force {
  constructor(vec, id=null) {
    this.vec = vec
    this.id = id
  }
}

class MechanicalObject {
  constructor(mass) {
    this.mass = mass
    this.velocity = new Vector(0.0, 0.0, 0.0, 0.0)
    this.forces = []
  }

  physics(deltaTime, ctx) {
    // get total forces
    var yTotN = 0
    var xTotN = 0

    for (const vec of this.forces) {
      yTotN += vec.proj(Y_HAT).abs()
      xTotN += vec.proj(X_HAT).abs()
      vec.draw(ctx, this.x, this.y, 5, "blue")
    }

    // handle acceleration
    var acc = new Vector(0.0, 0.0, 0.0, 0.0)

    acc.y += Math.round(yTotN / this.mass)
    acc.x += Math.round(xTotN / this.mass)

    acc.draw(ctx, this.x, this.y, 5, "red")

    // handle velocity
    this.velocity.add(acc)
    this.velocity.draw(ctx, this.x, this.y, 0.1, "green")

    var projectedX = this.velocity.proj(X_HAT)
    var projectedY = this.velocity.proj(Y_HAT)

    this.x += ( projectedX.sign() * Math.round(projectedX.abs()) ) * deltaTime
    this.y += ( projectedY.sign() * Math.round(projectedY.abs()) ) * deltaTime
  }
}

export { Force, MechanicalObject, GRAVITY };
