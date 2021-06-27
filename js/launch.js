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
      timer.start()
      snake.load()
      snake.crawl('start')
      baseApple.freshMeter()
    }
  }
}

document.body.append(cnv)

const startGame = () => {
  window.addEventListener('keydown', control)
  snake.init()
  timer.allPausesLength = 0
  score.total = 0
  score.table = 0
  score.apples = 0

  setTimeout(() => {
    baseApple.create()
    snake.crawl('start')

    setTimeout(() => {
      baseApple.createTime = new Date().getTime()
      baseApple.freshMeter()
      timer.start()
      score.write()
    }, 1000)
  }, 1000)
}

showLoading = new Promise(resolve => {
  ctx.fillStyle = Color.GREEN
  let meterValue = 0

  const increaseMeter = () => {
    clearGameArea()
    ctx.fillRect(border.WIDTH, cnv.height / 2.5, meterValue, cnv.height / 15)
    ctx.fillText('Loading...', cnv.width / 3, cnv.height / 2)

    if (meterValue < cnv.width - border.WIDTH - Shadow.OFFSET - Shadow.BLUR) {
      meterValue += 7
      requestAnimationFrame(increaseMeter)
    } else {
      resolve()
    }
  }
  increaseMeter()
})

showLoading.then(() => startGame())
