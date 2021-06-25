const timer = {
  prevSessiontTime: 0,
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

      timer.write(timer.calcTime(timer.gameTotalTime))
      timer.time = timer.calcTime(timer.gameTotalTime)
      score.write()
    }, 200)

    // border.isAnim = false
  },

  stop() {
    clearInterval(timer.tick)
    timer.prevSessiontTime = 0
  },

  pause() {
    clearInterval(timer.tick)
    timer.prevSessiontTime = timer.gameTotalTime
  },

  write() {
    if (timer.time) {
      ctx.clearRect(...timer.area)
      ctx.fillStyle = Color.GREEN
      ctx.fillText('TIME: ' + timer.time, 0, cnv.width + border.WIDTH * 3)
    }
  }
}
