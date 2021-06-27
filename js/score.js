const score = {
  total: 0,
  table: 0,
  apples: 0,

  area: [
    cnv.width / 2,
    cnv.width + border.WIDTH * 3,
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
      score.countTimer = setTimeout(score.write, delay)
    }
  },

  earn() {
    if (score.countTimer) clearTimeout(score.countTimer)

    score.apples++

    score.total += baseApple.score
    const delay = 1500 / (score.total - score.table)
    score.write(delay)
  }
}
