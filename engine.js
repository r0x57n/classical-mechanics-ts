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

  draw() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height)

    for(const element of this.elements) {
      element.draw(this.ctx)
    }
  }

  updatePhysics() {
    for(const element of this.elements) {
      element.physics(this.deltaTime)
    }
  }

  loop() {
    window.requestAnimationFrame(this.loop.bind(this))
    this.draw()
    this.updatePhysics()
  }
}

export { Engine }
