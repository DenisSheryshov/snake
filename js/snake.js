const snake = {
  DEFAULT_BODY: [[4, 15], [3, 15], [2, 15], [1, 15], [0, 15]],
  MAX_SPEED: 50,

  bodySort(a, b) {
    // for shadow overlay fix
    return a[0] - b[0] == 0 ? b[1] - a[1] : a[0] - b[0]
  },

  init() {
    snake.body = [...snake.DEFAULT_BODY]
    snake.currentAxis = 'x'
    snake.course = 'right'
    snake.speed = 300
    snake.sortedBody = [...snake.body].sort(snake.bodySort)
  },

  draw(color) {
    ctx.fillStyle = color
    for (let pxl of snake.sortedBody) {
      ctx.fillRect(...getPixel(...pxl))
    }
  },

  checkFail() {
    const snakeBody = [...snake.body]
    const head = snakeBody.shift()

    if (snakeBody.some(item => item + '' == head + '')) {
      timer.stop()
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
      snake.createEyes()

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
      const tail = snake.body.pop()
      const idx = snake.sortedBody.indexOf(tail)
      snake.sortedBody.splice(idx, 1)
    } else {
      score.earn(apple.score)
      if (snake.speed > snake.MAX_SPEED) {
        snake.speed = Math.round(snake.speed * 0.95)
        snake.crawl('stop')
        snake.crawl('start')
      }
      apple.createBase()
      apple.freshMeter()
    }

    if (apple.superApple) {
      if (snake.body[0] + '' == apple.superApple + '') {
        snake.body.length = 5
        snake.sortedBody = [...snake.body].sort(snake.bodySort)
        apple.superApple = null
        score.earn(20)
        if (snake.speed * 1.15 < 200) {
          snake.speed += Math.round(snake.speed * 1.15)
        }
        snake.crawl('stop')
        snake.crawl('start')
      }
    }
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

    snake.sortedBody.push(newHead[snake.course])
    snake.sortedBody.sort(snake.bodySort)

    snake.currentAxis =
      snake.course == 'right' || snake.course == 'left' ? 'x' : 'y'

    snake.eatApple()
    snake.checkFail()

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
    snake.createEyes()
  },

  crawl(cmd) {
    if (cmd == 'start') {
      snake.moving = setInterval(snake.step, snake.speed)
      return
    }

    if (cmd == 'stop') {
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

  EYE_SIZE: PXL_SIZE / 4,
  EYE_PADDING: PXL_SIZE / 6,

  eyeVariant() {
    return {
      right: [
        -(this.EYE_SIZE + this.EYE_PADDING),
        this.EYE_PADDING,
        -(this.EYE_SIZE + this.EYE_PADDING),
        this.EYE_SIZE + this.EYE_PADDING * 2
      ],
      up: [
        -(PXL_SIZE - this.EYE_PADDING),
        this.EYE_PADDING,
        -(this.EYE_SIZE + this.EYE_PADDING),
        this.EYE_PADDING
      ],
      left: [
        -(PXL_SIZE - this.EYE_PADDING),
        this.EYE_PADDING,
        -(PXL_SIZE - this.EYE_PADDING),
        this.EYE_SIZE + this.EYE_PADDING * 2
      ],
      down: [
        -(PXL_SIZE - this.EYE_PADDING),
        this.EYE_SIZE + this.EYE_PADDING * 2,
        -(this.EYE_SIZE + this.EYE_PADDING),
        this.EYE_SIZE + this.EYE_PADDING * 2
      ]
    }
  },

  createEyes() {
    const [x, y] = getPixel(...snake.body[0])

    const drawEyes = (leftX, leftY, rightX, rightY) => {
      ctx.clearRect(
        x + PXL_SIZE + leftX,
        y + leftY,
        this.EYE_SIZE,
        this.EYE_SIZE
      )
      ctx.clearRect(
        x + PXL_SIZE + rightX,
        y + rightY,
        this.EYE_SIZE,
        this.EYE_SIZE
      )
    }
    drawEyes(...snake.eyeVariant()[snake.course])
  }
}
