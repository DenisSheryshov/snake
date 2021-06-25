const timer = {
  prevSessiontTime: 0,
  allPausesLength: 0,
  onPause: false,

  area: [
    0,
    cnv.width + border.WIDTH * 3,
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

  start() {
    timer.gameStartTime = new Date().getTime()

    timer.tick = setInterval(() => {
      timer.gameTotalTime =
        new Date().getTime() - timer.gameStartTime + timer.prevSessiontTime

      timer.write()
      score.write()
    }, 200)
    timer.onPause = false
    // border.isAnim = false

    if (timer.pauseStartTime) {
      timer.allPausesLength += timer.gameStartTime - timer.pauseStartTime
    }
  },

  stop() {
    clearInterval(timer.tick)
    timer.prevSessiontTime = 0
  },

  pause() {
    clearInterval(timer.tick)
    timer.prevSessiontTime = timer.gameTotalTime
    timer.pauseStartTime = new Date().getTime()
    timer.onPause = true
  },

  write() {
    ctx.clearRect(...timer.area)
    ctx.fillStyle = Color.GREEN
    ctx.fillText(
      'TIME: ' + timer.calcTime(timer.gameTotalTime),
      0,
      cnv.width + border.WIDTH * 3
    )
  }
}
