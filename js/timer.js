const timer = {
  output: document.body.querySelector('#time'),

  calcTime(timestamp) {
    timestamp = Math.floor(timestamp / 1000)

    const seconds = timestamp % 60
    timestamp -= seconds
    timestamp = Math.floor(timestamp / 60)
    const minutes = timestamp % 60

    const fixLength = num => (num < 10 ? '0' + num : num)

    return `${fixLength(minutes)}:${fixLength(seconds)}`
  },

  start(param) {
    if (timer.showPause) clearInterval(timer.showPause)
    timer.startTime = new Date().getTime()

    timer.tick = setInterval(() => {
      timer.sessionTime = new Date().getTime() - timer.startTime
      if (param == 'new') {
        timer.totalTime = timer.sessionTime
      } else if (param == 'resume') {
        timer.totalTime = timer.sessionTime + timer.gameTime
      }

      timer.output.textContent = timer.calcTime(timer.totalTime)
    }, 100)

    border.isAnim = false
  },

  stop() {
    clearInterval(timer.tick)
    clearInterval(timer.showPause)
    timer.gameTime = 0
  },

  pause() {
    clearInterval(timer.tick)
    timer.gameTime = timer.totalTime

    timer.showPause = setInterval(() => {
      if (timer.output.textContent == 'PAUSE') {
        timer.output.textContent = timer.calcTime(timer.totalTime)
      } else {
        timer.output.textContent = 'PAUSE'
      }
    }, 1000)

    border.isAnim = true
    border.anim()
  },

  onPause: false
}
