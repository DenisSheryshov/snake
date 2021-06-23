const score = {
  total: 0,
  table: 0,

  area: [
    cnv.width / 2,
    cnv.width + border.WIDTH * 3,
    cnv.width / 2,
    cnv.height - cnv.width
  ],

  write() {
    ctx.clearRect(...score.area)

    ctx.fillStyle = Color.GREEN
    ctx.fillText(
      'SCORES: ' + score.table,
      cnv.width / 2,
      cnv.width + border.WIDTH * 3
    )
    if (score.table < score.total) {
      score.table++
      setTimeout(score.write, 100)
    }
  },

  // snake.scores.total += snake.onFire ? apple.score * 3 : apple.score
  // snake.scores.write()

  earn() {
    score.total += snake.onFire ? apple.score * 3 : apple.score
    this.write
  }
}

const timer = {
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

  start(param) {
    if (timer.showPause) clearInterval(timer.showPause)
    timer.startTime = new Date().getTime()

    timer.tick = setInterval(() => {
      timer.sessionTime = new Date().getTime() - timer.startTime

      const options = {
        new: timer.sessionTime,
        resume: timer.sessionTime + timer.gameTime
      }

      timer.totalTime = options[param]

      timer.write(timer.calcTime(timer.totalTime))
      timer.time = timer.calcTime(timer.totalTime)
      score.write()
    }, 200)

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
    // let flag = true

    // timer.showPause = setInterval(() => {
    //   if (flag) {
    //     timer.write('PAUSE')
    //   } else {
    //     timer.write(timer.calcTime(timer.totalTime))
    //   }
    //   flag = !flag
    // }, 1000)

    // border.isAnim = true
    // border.anim()
  },

  write() {
    if (timer.time) {
      ctx.clearRect(...timer.area)
      ctx.fillStyle = Color.GREEN
      ctx.fillText('TIME: ' + timer.time, 0, cnv.width + border.WIDTH * 3)
    }
  },

  onPause: false
}
