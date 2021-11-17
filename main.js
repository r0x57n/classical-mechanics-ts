import { Engine } from "./engine.js"
import { Vector, Point } from "./linear_algebra.js"

const GRAVITY = 9.8
const Y_HAT = new Vector(0, 0, 0, 1)
const X_HAT = new Vector(0, 0, 1, 0)

class PhysicsObject {
  constructor(mass) {
    this.forces = []
    this.forces['w'] = new Vector(0, 0, 0, 1)
    this.mass = mass
    this.forces['w'].scale(this.mass * (-GRAVITY))
  }

  physics(deltaTime) {
    var yTot = 0;
    var xTot = 0;

    for (const force of this.forces) {
      yTot += (force.proj(Y_HAT)).abs()
      xTot += (force.proj(X_HAT)).abs()
    }
  }
}

class Circle extends PhysicsObject {
  constructor(radius, x, y, color) {
    super(10)
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
  }

  draw(ctx) {
    this.drawForces(ctx)

    ctx.beginPath()
    ctx.strokeStyle = this.color
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.stroke()
  }
}

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

var testVec2 = new Vector(0, 0, 4, 1)
testVec2.scale(9.82 * 10)
testVec2.draw(ctx, 200, 200, 0.4)

var xVec = testVec2.proj(X_HAT)
xVec.draw(ctx, 200, 200, 0.4)
var yVec = testVec2.proj(Y_HAT)
yVec.draw(ctx, 200, 200, 0.4)

//const engine = new Engine(canvas, ctx)
//engine.add(new Circle(20, 20, 20, "green"))
//engine.loop()
