import { Engine } from "./engine.js"
import { Vector, Point } from "./linear_algebra.js"
import { VecD, MechanicalObject, GRAVITY } from "./physics.js"

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
    var debug = document.getElementById("objectInfo")
    var table = "<table>"
    table += "<tr><th>mass</th><td>" + this.mass + "</td></tr>"
    table += "<tr><th>pos</th><td>(" + this.x.toFixed() + ", " + this.y.toFixed() + ")</td></tr>"
    table += "</table><br><table>"
    table += "<tr><th>id</th><th>vec</th></tr>"

    table += "<tr>"
    table += "</tr>"

    for (let [id, vec] of this.vectors) {
      table += "<tr>"
      table += "<td>" + id + "</td>"
      table += "<td>(" + vec.x.toFixed() + ", " + vec.y.toFixed() + ")</td>"
      table += "</tr>"
    }

    debug.innerHTML = table
  }
}

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

var circle = new Circle(20, 20, 20, "black")
circle.addVec("w", 0, 0, 0, 1, "blue")

const engine = new Engine(canvas, ctx)
engine.add(circle)

function addForce() {
  var p = document.getElementById("vector").value.split(",")
  circle.addVec("add" + circle.vectors.size, p[0], p[1], p[2], p[3], "green")
}

engine.loop()

document.getElementById("addForce").addEventListener("click", addForce)
