const timer = {
  area: [
    0,
    cnv.width + border.width * 3,
    cnv.width / 2,
    cnv.height - cnv.width
  ],

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
      timer.write(timer.calcTime(timer.totalTime))
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
    let flag = true

    timer.showPause = setInterval(() => {
      if (flag) {
        timer.write('PAUSE')
      } else {
        timer.write(timer.calcTime(timer.totalTime))
      }
      flag = !flag
    }, 1000)

    border.isAnim = true
    border.anim()
  },

  write(txt) {
    ctx.clearRect(...timer.area)

    ctx.fillStyle = colors.green
    ctx.fillText('TIME: ' + txt, 0, cnv.width + border.width * 3)
  },

  onPause: false
}
