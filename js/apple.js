class Apple {
  create() {
    const proposal = [
      Math.floor(Math.random() * NUM_OF_PIXELS),
      Math.floor(Math.random() * NUM_OF_PIXELS)
    ]

    if (!snake.body.some(item => item + '' == proposal + '')) {
      this.body = proposal
      this.createTime = new Date().getTime()
      timer.allPausesLength = 0
    } else {
      this.create()
    }
  }

  freshMeter() {
    const freshValue =
      (new Date().getTime() - this.createTime - timer.allPausesLength) /
      (snake.speed / 15)

    this.score = 13 - Math.floor(freshValue / 60)

    ctx.clearRect(
      0,
      cnv.width,
      cnv.width,
      border.WIDTH + Shadow.OFFSET + Shadow.BLUR * 2
    )

    if (freshValue < FIELD_SIZE + border.WIDTH * 2) {
      ctx.fillStyle = Color.YELLOW
      ctx.fillRect(
        freshValue,
        cnv.width + border.WIDTH + Shadow.OFFSET,
        FIELD_SIZE + border.WIDTH * 2 - freshValue,
        border.WIDTH
      )

      if (!timer.onPause) {
        requestAnimationFrame(this.freshMeter.bind(this))
      }
    }
  }

  draw(color) {
    if (this.body) {
      ctx.fillStyle = color
      ctx.fillRect(...getPixel(...this.body))
    }
  }
}

const baseApple = new Apple()
const superApple = new Apple()
