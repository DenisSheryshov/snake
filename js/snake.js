const snake = {
  defaultSnakeBody: [[4, 15], [3, 15], [2, 15], [1, 15], [0, 15]],

  init() {
    snake.body = [...snake.defaultSnakeBody]
    snake.currentMoving = 'x'
    snake.dir = 'right'
  },

  head(param) {
    if (param != 'abs') {
      return snake.body[0]
    } else {
      return {
        x: gameArea[snake.body[0][0]][snake.body[0][1]][0],
        y: gameArea[snake.body[0][0]][snake.body[0][1]][1]
      }
    }
  },

  draw(color) {
    ctx.fillStyle = color
    for (let cell of snake.body) {
      ctx.fillRect(...gameArea[cell[0]][cell[1]])
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
          for (let cell of snake.body) {
            ctx.clearRect(...gameArea[cell[0]][cell[1]])
          }
          apple.delete()
          startGame()
        }, 1000)
      }
    }, 500)
  },

  step() {
    switch (snake.dir) {
      case 'right': {
        snake.body.unshift([
          snake.head()[0] < NUM_OF_PIXELS - 1 ? snake.head()[0] + 1 : 0,
          snake.head()[1]
        ])
        break
      }
      case 'left': {
        snake.body.unshift([
          snake.head()[0] > 0 ? snake.head()[0] - 1 : NUM_OF_PIXELS - 1,
          snake.head()[1]
        ])
        break
      }
      case 'up': {
        snake.body.unshift([
          snake.head()[0],
          snake.head()[1] > 0 ? snake.head()[1] - 1 : NUM_OF_PIXELS - 1
        ])
        break
      }
      case 'down': {
        snake.body.unshift([
          snake.head()[0],
          snake.head()[1] < NUM_OF_PIXELS - 1 ? snake.head()[1] + 1 : 0
        ])
        break
      }
    }

    if (snake.dir == 'right' || snake.dir == 'left') {
      snake.currentMoving = 'x'
    } else {
      snake.currentMoving = 'y'
    }

    if (snake.head() + '' != apple.body + '') {
      //apple isn't eaten?
      const tail = snake.body.pop()
      ctx.clearRect(...gameArea[tail[0]][tail[1]])
    } else {
      snake.scores.counter += apple.score
      snake.scores.write()
      apple.create()
    }

    ctx.fillStyle = colors.green
    ctx.fillRect(...gameArea[snake.head()[0]][snake.head()[1]])
    snake.createEyes()

    snake.checkFail()
  },

  crawl(cmd) {
    if (cmd == 'start') {
      snake.moving = setInterval(snake.step, SPEED)
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

    const remove = (leftX, leftY, rightX, rightY) => {
      ctx.clearRect(
        snake.head('abs').x + PXL_SIZE + leftX,
        snake.head('abs').y + leftY,
        EYE_SIZE,
        EYE_SIZE
      )
      ctx.clearRect(
        snake.head('abs').x + PXL_SIZE + rightX,
        snake.head('abs').y + rightY,
        EYE_SIZE,
        EYE_SIZE
      )
    }
    switch (snake.dir) {
      case 'right': {
        remove(
          -(EYE_SIZE * 2),
          EYE_PADDING,
          -(EYE_SIZE * 2),
          EYE_SIZE + EYE_PADDING * 2
        )
        break
      }
      case 'up': {
        remove(
          -(PXL_SIZE - EYE_PADDING),
          EYE_SIZE,
          -(EYE_SIZE + EYE_PADDING),
          EYE_SIZE
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
    ctx.fillRect(...gameArea[snake.body[1][0]][snake.body[1][1]])
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
