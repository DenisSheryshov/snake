const snake = {
  defaultSnakeBody: [[4, 15], [3, 15], [2, 15], [1, 15], [0, 15]],

  init() {
    snake.body = [...snake.defaultSnakeBody]
    snake.currentMoving = 'x'
    snake.dir = 'right'
    snake.speed = 400
  },

  draw(color) {
    for (let pxl of snake.body) {
      paintPixel(...pxl, color)
    }
  },

  checkFail() {
    const bodyStr = snake.body.join(' ') + ' '
    const head = ' ' + snake.body[0] + ' '

    if (bodyStr.includes(head, head.length - 1)) {
      timer.stop()
      snake.showFail()
    }
  },

  showFail() {
    snake.crawl('stop')
    border.create(colors.red)
    snake.draw(colors.red)

    let flag = true
    let counter = 0

    const failAnim = setInterval(() => {
      flag ? snake.draw(colors.green) : snake.draw(colors.red)

      if (counter < 4) {
        counter++
        flag = !flag
      } else {
        clearInterval(failAnim)

        setTimeout(() => {
          snake.draw(null)
          apple.delete()
          startGame()
        }, 1000)
      }
    }, 500)
  },

  step() {
    const [x, y] = snake.body[0]

    switch (snake.dir) {
      case 'right': {
        snake.body.unshift([x < NUM_OF_PIXELS - 1 ? x + 1 : 0, y])
        break
      }
      case 'left': {
        snake.body.unshift([x > 0 ? x - 1 : NUM_OF_PIXELS - 1, y])
        break
      }
      case 'up': {
        snake.body.unshift([x, y > 0 ? y - 1 : NUM_OF_PIXELS - 1])
        break
      }
      case 'down': {
        snake.body.unshift([x, y < NUM_OF_PIXELS - 1 ? y + 1 : 0])
        break
      }
    }

    if (snake.dir == 'right' || snake.dir == 'left') {
      snake.currentMoving = 'x'
    } else {
      snake.currentMoving = 'y'
    }

    if (snake.body[0] + '' != apple.body + '') {
      //apple isn't eaten?
      paintPixel(...snake.body.pop(), null)
    } else {
      snake.scores.counter += apple.score
      snake.scores.write()
      apple.create()

      if (snake.speed > 100) {
        snake.speed -= 10
        snake.crawl('stop')
        snake.crawl('start')
      }
    }

    paintPixel(...snake.body[0], colors.green)
    snake.createEyes()
    snake.checkFail()
  },

  crawl(cmd) {
    if (cmd == 'start') {
      snake.moving = setInterval(snake.step, snake.speed)
    } else if (cmd == 'stop') {
      clearInterval(snake.moving)
    }
  },

  save() {
    snake.state = {
      body: snake.body,
      currentMoving: snake.currentMoving,
      dir: snake.dir
    }
  },

  load() {
    snake.body = snake.state.body
    snake.currentMoving = snake.state.currentMoving
    snake.dir = snake.state.dir
  },

  createEyes() {
    const EYE_SIZE = PXL_SIZE / 4
    const EYE_PADDING = PXL_SIZE / 6
    const [x, y] = snake.body[0].map(i => i * PXL_SIZE + border.width)

    const remove = (leftX, leftY, rightX, rightY) => {
      ctx.clearRect(x + PXL_SIZE + leftX, y + leftY, EYE_SIZE, EYE_SIZE)
      ctx.clearRect(x + PXL_SIZE + rightX, y + rightY, EYE_SIZE, EYE_SIZE)
    }

    switch (snake.dir) {
      case 'right': {
        remove(
          -(EYE_SIZE + EYE_PADDING),
          EYE_PADDING,
          -(EYE_SIZE + EYE_PADDING),
          EYE_SIZE + EYE_PADDING * 2
        )
        break
      }
      case 'up': {
        remove(
          -(PXL_SIZE - EYE_PADDING),
          EYE_PADDING,
          -(EYE_SIZE + EYE_PADDING),
          EYE_PADDING
        )
        break
      }
      case 'left': {
        remove(
          -(PXL_SIZE - EYE_PADDING),
          EYE_PADDING,
          -(PXL_SIZE - EYE_PADDING),
          EYE_SIZE + EYE_PADDING * 2
        )
        break
      }
      case 'down': {
        remove(
          -(PXL_SIZE - EYE_PADDING),
          EYE_SIZE + EYE_PADDING * 2,
          -(EYE_SIZE + EYE_PADDING),
          EYE_SIZE + EYE_PADDING * 2
        )
        break
      }
    }
    paintPixel(...snake.body[1], colors.green)
  },

  scores: {
    counter: 0,

    area: [
      cnv.width / 2,
      cnv.width + border.width * 3,
      cnv.width / 2,
      cnv.height - cnv.width
    ],

    write() {
      ctx.clearRect(...snake.scores.area)

      ctx.fillStyle = colors.green
      ctx.fillText(
        'SCORES: ' + snake.scores.counter,
        cnv.width / 2,
        cnv.width + border.width * 3
      )
    }
  }
}
