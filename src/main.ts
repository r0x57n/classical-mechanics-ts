import { Engine } from "./engine.js"
import { MechanicalObject, GRAVITY } from "./physics.js"

class Circle extends MechanicalObject {
  radius: number
  color: string

  constructor(radius: number, x: number, y: number, color: string) {
    super(0.5)
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.strokeStyle = this.color
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.stroke()
  }

  debug() {
    var debug = document.getElementById("objectInfo")
    var table = "<table>"
    table += "<tr><th>gravity</th><td>" + GRAVITY + "</td>"
    table += "</table><br><table>"
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

const canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement
const ctx: CanvasRenderingContext2D = canvas.getContext("2d")

var circle = new Circle(20, 20, 20, "black")
circle.addVec("w", 0, 0, 0, 1, "blue")

const engine = new Engine(canvas, ctx)
engine.add(circle)

function addForce() {
  var p = (<HTMLInputElement> document.getElementById("vector")).value.split(",")
  circle.addVec("add" + circle.vectors.size, parseInt(p[0]), parseInt(p[1]),
                parseInt(p[2]), parseInt(p[3]), "green")
}

engine.loop()

document.getElementById("addForce").addEventListener("click", addForce)
