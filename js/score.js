const score = {
  total: 0,
  table: 0,
  apples: 0,

  area: [
    cnv.width / 2,
    cnv.width + border.WIDTH * 4,
    cnv.width / 2,
    cnv.height - cnv.width
  ],

  write(delay) {
    ctx.clearRect(...score.area)

    ctx.fillStyle = Color.GREEN
    ctx.fillText(
      'SCORES: ' + score.table,
      cnv.width / 2,
      cnv.width + border.WIDTH * 3
    )
    if (score.table < score.total) {
      score.table++
      score.countTimer = setTimeout(score.write, snake.MAX_SPEED)
    }
  },

  earn(num) {
    if (score.countTimer) clearTimeout(score.countTimer)

    score.apples++

    if (score.apples % 7 == 0) {
      apple.createSuper()
    }

    score.total += num
    score.write()
  }
}
