const apple = {
  rand() {
    return Math.floor(Math.random() * NUM_OF_PIXELS)
  },

  create() {
    apple.body = [apple.rand(), apple.rand()]
    const appleBodyStr = apple.body.toString() + ' '
    const snakeBodyStr = snake.body.join(' ') + ' '

    if (!snakeBodyStr.includes(appleBodyStr)) {
      paintPixel(...apple.body, colors.yellow)
      apple.createTime = new Date().getTime()
      apple.freshMeter()
    } else {
      apple.create()
    }
  },

  delete() {
    apple.createTime = null
    paintPixel(...apple.body, null)
  },

  freshMeter() {
    requestAnimationFrame(() => {
      const freshMeterWidth =
        (new Date().getTime() - apple.createTime) / (snake.speed / 15)

      apple.score = 13 - Math.floor(freshMeterWidth / 60)

      ctx.fillStyle = colors.yellow
      ctx.fillRect(0, cnv.width + border.width, cnv.width, border.width)
      ctx.clearRect(0, cnv.width + border.width, freshMeterWidth, border.width)

      if (freshMeterWidth < cnv.width) {
        apple.freshMeter()
      }
    })
  }
}
