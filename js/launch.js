const control = () => {
  const check = (keyCodesStr, axis) => {
    if (keyCodesStr.includes(event.keyCode) && snake.currentMoving == axis) {
      return true
    } else {
      return false
    }
  }

  if (check('39, 68, 102', 'y')) {
    snake.dir = 'right'
  } else if (check('37, 65, 100', 'y')) {
    snake.dir = 'left'
  } else if (check('38, 87, 104', 'x')) {
    snake.dir = 'up'
  } else if (check('40, 83, 98', 'x')) {
    snake.dir = 'down'
  }

  if (event.keyCode == 32) {
    if (!timer.onPause) {
      timer.pause()
      snake.save()
      snake.crawl('stop')
    } else {
      timer.start('resume')
      snake.load()
      snake.crawl('start')
    }
    timer.onPause = !timer.onPause
  }
}

window.addEventListener('keydown', control)

const startGame = () => {
  border.create(colors.green)
  snake.scores.counter = 0
  snake.scores.write()
  snake.init()
  snake.draw(colors.green)
  snake.crawl('start')
  apple.create()
  timer.start('new')
}

startGame()
