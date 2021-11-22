import { Engine } from "./engine.js"
import { Vector, Point } from "./linear_algebra.js"
import { Force, MechanicalObject, GRAVITY } from "./physics.js"

class Rectangle {
  constructor(x, y, w, h) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
  }
}

class Circle extends MechanicalObject {
  constructor(radius, x, y, color) {
    super(0.5)
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.strokeStyle = this.color
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.stroke()
  }

  debug() {
    var debug = document.getElementById("debug")
    debug.setAttribute('style', 'white-space: pre;');
    var n = "\r\n"

    var x_y = "(" + this.x + ", " + this.y + ")" + n
    var vel = "Vel: (" + this.velocity.x + ", " + this.velocity.y + ")" + n
    var forces = ""
    for (const force of this.forces) {
      forces += "Force: (" + force.x + ", " + force.y + ")" + n
    }
    debug.textContent = x_y + vel + forces
  }
}

class Wall extends MechanicalObject {
  constructor(x, y, w, h) {
    this.rectangle = new Rectangle(x, y, w, h)
  }
}


const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

var circle = new Circle(20, 20, 20, "green")
var weight = new Vector(0, 0, 0, 1)
weight.scale(circle.mass * GRAVITY)
circle.forces.push(weight)

const engine = new Engine(canvas, ctx)
engine.add(circle)

function addForce() {
  circle.forces.push(new Vector(0, 0, 1, 0))
}

engine.loop()

document.getElementById("btn").addEventListener("click", addForce)
