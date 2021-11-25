class Engine {
  constructor (canvas, ctx) {
    this.canvas = canvas
    this.ctx = ctx
    this.elements = []
    this.deltaTime = 120 / 10000
  }

  add(element) {
    this.elements.push(element)
  }

  update() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (const element of this.elements) {
      if (element.y >= this.canvas.height || element.y <= 0) {
        element.vectors.get("vel").rotateY(Math.PI)
      } else if (element.x >= this.canvas.width || element.x <= 0) {
        element.vectors.get("vel").rotateX(Math.PI)
      }

      element.physics(this.deltaTime, this.ctx)
      element.draw(this.ctx)
      element.debug()
    }
  }

  loop() {
    window.requestAnimationFrame(this.loop.bind(this))
    this.update()
  }
}

export { Engine }
