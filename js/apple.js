const apple = {
  rand() {
    return Math.floor(Math.random() * NUM_OF_PIXELS)
  },

  create() {
    apple.body = [apple.rand(), apple.rand()]
    
    if (!snake.body.some(item => item + '' == apple.body + '')) {
      apple.createTime = new Date().getTime()
      apple.freshMeter()
    } else {
      apple.create()
    }
  },

  delete() {
    apple.createTime = null
    ctx.clearRect(...getPixel(...apple.body))
  },

  freshMeter() {
    const lineLength =
      (new Date().getTime() - apple.createTime) / (snake.speed / 15)

    apple.score = 13 - Math.floor(lineLength / 60)
    ctx.clearRect(
      0,
      cnv.width,
      cnv.width,
      border.WIDTH + Shadow.OFFSET + Shadow.BLUR * 2
    )

    if (lineLength < FIELD_SIZE + border.WIDTH * 2) {
      ctx.fillStyle = Color.YELLOW
      ctx.fillRect(
        lineLength,
        cnv.width + border.WIDTH + Shadow.OFFSET,
        FIELD_SIZE + border.WIDTH * 2 - lineLength,
        border.WIDTH
      )

      requestAnimationFrame(apple.freshMeter)
    }
  },

  draw() {
    ctx.fillStyle = Color.YELLOW
    ctx.fillRect(...getPixel(...apple.body))
  }
}
