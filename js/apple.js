const apple = {
  getRandomPxl() {
    return [
      Math.floor(Math.random() * NUM_OF_PIXELS),
      Math.floor(Math.random() * NUM_OF_PIXELS)
    ]
  },

  createBase() {
    const proposal = this.getRandomPxl()

    if (!snake.body.some(item => item + '' == proposal + '')) {
      this.body = proposal
      this.createTime = new Date().getTime()
      timer.allPausesLength = 0
    } else {
      this.create()
    }
  },

  createSuper() {
    const proposal = this.getRandomPxl()

    if (
      !snake.body.some(item => item + '' == proposal + '') &&
      proposal + '' != apple.body + ''
    ) {
      this.superApple = proposal
      setTimeout(() => {
        this.superApple = null
      }, snake.speed * 30)
    } else {
      this.createSuper()
    }
  },

  freshMeter() {
    const freshValue =
      (new Date().getTime() - this.createTime - timer.allPausesLength) /
      (snake.speed / 15)

    this.score = 13 - Math.floor(freshValue / 60)

    ctx.clearRect(0, cnv.width, cnv.width, border.WIDTH * 4)

    if (freshValue < FIELD_SIZE + border.WIDTH * 2) {
      ctx.fillStyle = Color.YELLOW
      ctx.fillRect(
        freshValue,
        cnv.width + border.WIDTH + Shadow.OFFSET,
        FIELD_SIZE + border.WIDTH * 2 - freshValue,
        border.WIDTH
      )

      if (!timer.onPause) {
        setTimeout(this.freshMeter.bind(this), 50)
      }
    }
  },

  draw(color) {
    if (this.body) {
      ctx.fillStyle = color
      ctx.fillRect(...getPixel(...this.body))
    }
    if (this.superApple) {
      ctx.fillStyle = Color.BLUE
      ctx.fillRect(...getPixel(...this.superApple))
    }
  }
}
