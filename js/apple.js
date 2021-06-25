class Apple {
  create() {
    this.body = [
      Math.floor(Math.random() * NUM_OF_PIXELS),
      Math.floor(Math.random() * NUM_OF_PIXELS)
    ]

    if (!snake.body.some(item => item + '' == this.body + '')) {
      this.createTime = new Date().getTime()
      return
    }
    this.create()
  }

  freshMeter() {
    const lineLength =
      (new Date().getTime() - this.createTime) / (snake.speed / 15)

    this.score = 13 - Math.floor(lineLength / 60)

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

      if (!timer.onPause) {
        requestAnimationFrame(this.freshMeter.bind(this))
      }
      // requestAnimationFrame(this.freshMeter.bind(this))
    }
  }

  // freshMeter(param) {

  //   const lineLength =
  //     (new Date().getTime() - this.createTime) / (snake.speed / 15)

  //   this.score = 13 - Math.floor(lineLength / 60)

  //   ctx.clearRect(
  //     0,
  //     cnv.width,
  //     cnv.width,
  //     border.WIDTH + Shadow.OFFSET + Shadow.BLUR * 2
  //   )

  //   if (lineLength < FIELD_SIZE + border.WIDTH * 2) {
  //     ctx.fillStyle = Color.YELLOW
  //     ctx.fillRect(
  //       lineLength,
  //       cnv.width + border.WIDTH + Shadow.OFFSET,
  //       FIELD_SIZE + border.WIDTH * 2 - lineLength,
  //       border.WIDTH
  //     )

  //     if (!timer.onPause) {
  //       requestAnimationFrame(this.freshMeter.bind(this))
  //     }
  //     // requestAnimationFrame(this.freshMeter.bind(this))
  //   }
  // }

  draw(color) {
    ctx.fillStyle = color
    ctx.fillRect(...getPixel(...this.body))
  }
}

const baseApple = new Apple()
const superApple = new Apple()
