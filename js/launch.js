const KeyCode = {
  y: {
    '39': 'right',
    '68': 'right',
    '102': 'right',
    '37': 'left',
    '65': 'left',
    '100': 'left'
  },
  x: {
    '38': 'up',
    '87': 'up',
    '104': 'up',
    '40': 'down',
    '83': 'down',
    '98': 'down'
  }
}

const control = () => {
  snake.course = KeyCode[snake.currentAxis][event.keyCode] || snake.course

  if (event.keyCode == 32) {
    if (!timer.onPause) {
      timer.pause()
      snake.crawl('stop')
      snake.save()
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
  snake.init()
  apple.create()
  snake.draw(Color.GREEN)
  snake.crawl('start')

  timer.start('new')
  snake.scores.total = 0
  snake.scores.table = 0
  border.draw(Color.GREEN)
}

document.body.append(cnv)

startGame()
