const snake = {
  DEFAULT_BODY: [[4, 15], [3, 15], [2, 15], [1, 15], [0, 15]],
  MAX_SPEED: 100,

  init() {
    snake.body = [...snake.DEFAULT_BODY]
    snake.currentAxis = 'x'
    snake.course = 'right'
    snake.speed = 300
    snake.isAlive = true
  },

  draw(color) {
    const sortedBody = [...snake.body].sort((a, b) => {
      return a[0] - b[0] == 0 ? b[1] - a[1] : a[0] - b[0]
    }) // shadow overlay fix

    ctx.fillStyle = color
    for (let pxl of sortedBody) {
      ctx.fillRect(...getPixel(...pxl))
    }
  },

  checkFail() {
    const snakeBody = [...snake.body]
    const head = snakeBody.shift()

    if (snakeBody.some(item => item + '' == head + '')) {
      timer.stop()
      snake.isAlive = false
      snake.showFail()
    }
  },

  showFail() {
    snake.crawl('stop')

    let flag = false
    let counter = 0

    const failAnim = setInterval(() => {
      clearGameArea()
      snake.draw(Color[flag ? 'GREEN' : 'RED'])
      border.draw(Color[flag ? 'GREEN' : 'RED'])
      apple.draw(Color.YELLOW)

      if (counter < 4) {
        counter++
        flag = !flag
      } else {
        clearInterval(failAnim)

        setTimeout(() => {
          clearGameArea()
          startGame()
        }, 1500)
      }
    }, 500)
  },

  eatApple() {
    if (snake.body[0] + '' != apple.body + '') {
      snake.body.pop()
      return
    }

    score.earn()

    if (snake.speed > snake.MAX_SPEED) {
      snake.speed -= 200
      snake.crawl('stop')
      snake.crawl('start')
    } else {
      if (apple.score > 7) {
        console.log(apple.score)
        snake.powerMode()
      }
    }

    apple.create()
  },

  step() {
    const [x, y] = snake.body[0]
    const newHead = {
      right: [x < NUM_OF_PIXELS - 1 ? x + 1 : 0, y],
      left: [x > 0 ? x - 1 : NUM_OF_PIXELS - 1, y],
      up: [x, y > 0 ? y - 1 : NUM_OF_PIXELS - 1],
      down: [x, y < NUM_OF_PIXELS - 1 ? y + 1 : 0]
    }

    snake.body.unshift(newHead[snake.course])
    snake.currentAxis =
      snake.course == 'right' || snake.course == 'left' ? 'x' : 'y'

    snake.eatApple()
    snake.checkFail()
    // snake.createEyes()

    if (snake.onFire) return

    clearGameArea()

    // shadow overlay checkout
    if (snake.body[0][0] > apple.body[0] || snake.body[0][1] < apple.body[1]) {
      apple.draw(Color.YELLOW)
      snake.draw(Color.GREEN)
    } else {
      snake.draw(Color.GREEN)
      apple.draw(Color.YELLOW)
    }
    border.draw(Color.GREEN)
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
      currentAxis: snake.currentAxis,
      dir: snake.course
    }
  },

  load() {
    snake.body = snake.state.body
    snake.currentAxis = snake.state.currentAxis
    snake.course = snake.state.dir
  },

  // createEyes() {
  //   const EYE_SIZE = PXL_SIZE / 4
  //   const EYE_PADDING = PXL_SIZE / 6
  //   const [x, y] = snake.body[0].map(i => i * PXL_SIZE + border.WIDTH)

  //   const drawEyes = (leftX, leftY, rightX, rightY) => {
  //     if (!snake.onFire) {
  //       ctx.clearRect(x + PXL_SIZE + leftX, y + leftY, EYE_SIZE, EYE_SIZE)
  //       ctx.clearRect(x + PXL_SIZE + rightX, y + rightY, EYE_SIZE, EYE_SIZE)
  //     } else {
  //       ctx.fillStyle = Color.yellow
  //       ctx.fillRect(x + PXL_SIZE + leftX, y + leftY, EYE_SIZE, EYE_SIZE)
  //       ctx.fillRect(x + PXL_SIZE + rightX, y + rightY, EYE_SIZE, EYE_SIZE)
  //     }
  //   }

  //   switch (snake.course) {
  //     case 'right': {
  //       drawEyes(
  //         -(EYE_SIZE + EYE_PADDING),
  //         EYE_PADDING,
  //         -(EYE_SIZE + EYE_PADDING),
  //         EYE_SIZE + EYE_PADDING * 2
  //       )
  //       break
  //     }
  //     case 'up': {
  //       drawEyes(
  //         -(PXL_SIZE - EYE_PADDING),
  //         EYE_PADDING,
  //         -(EYE_SIZE + EYE_PADDING),
  //         EYE_PADDING
  //       )
  //       break
  //     }
  //     case 'left': {
  //       drawEyes(
  //         -(PXL_SIZE - EYE_PADDING),
  //         EYE_PADDING,
  //         -(PXL_SIZE - EYE_PADDING),
  //         EYE_SIZE + EYE_PADDING * 2
  //       )
  //       break
  //     }
  //     case 'down': {
  //       drawEyes(
  //         -(PXL_SIZE - EYE_PADDING),
  //         EYE_SIZE + EYE_PADDING * 2,
  //         -(EYE_SIZE + EYE_PADDING),
  //         EYE_SIZE + EYE_PADDING * 2
  //       )
  //       break
  //     }
  //   }
  //   paintPixel(...snake.body[1], snake.headColor)
  // },

  powerMode() {
    snake.onFire = true

    if (snake.fireTime) {
      clearTimeout(snake.fireTime)
    }

    const colorTransit = Color.blueToGreen()

    const changeColor = () => {
      const { value } = colorTransit.next()

      // snake.createEyes()

      if (value && snake.isAlive) {
        clearGameArea()

        snake.draw(value)
        apple.draw(Color.YELLOW)
        border.draw(Color.GREEN)

        snake.fireTime = setTimeout(changeColor, snake.MAX_SPEED)
      } else {
        snake.onFire = false
      }
    }
    changeColor()
  }
}
