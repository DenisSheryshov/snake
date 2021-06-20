const apple = {
  create() {
    apple.body = [
      Math.floor(Math.random() * NUM_OF_PIXELS),
      Math.floor(Math.random() * NUM_OF_PIXELS)
    ]

    if (!snake.body.some(item => item + '' == apple.body + '')) {
      apple.createTime = new Date().getTime()
      apple.freshMeter()
      return
    }
    apple.create()
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
