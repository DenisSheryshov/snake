const cnv = document.body.querySelector('canvas')
const ctx = cnv.getContext('2d')
const scoresOutput = document.body.querySelector('#scores')

const border = {
  width: 8,
  isAnim: false,
  lineDashOffset: 0,

  create(color) {
    ctx.strokeStyle = color
    ctx.strokeRect(
      border.width / 2,
      border.width / 2,
      cnv.width - border.width,
      cnv.width - border.width
    )
  },

  remove() {
    ctx.clearRect(0, 0, cnv.width, border.width)
    ctx.clearRect(
      cnv.width - border.width,
      border.width,
      border.width,
      cnv.width - border.width
    )
    ctx.clearRect(0, border.width, border.width, cnv.width - border.width)
    ctx.clearRect(
      border.width,
      cnv.width - border.width,
      cnv.width - border.width * 2,
      border.width
    )
  },

  anim() {
    requestAnimationFrame(() => {
      ctx.setLineDash([cnv.width, cnv.width])
      ctx.lineDashOffset = border.lineDashOffset
      border.lineDashOffset <= cnv.width * 2
        ? (border.lineDashOffset += 5)
        : (border.lineDashOffset = 0)
      border.remove()
      border.create()

      if (border.isAnim) {
        border.anim()
      } else {
        ctx.setLineDash([])
        ctx.lineDashOffset = 0
        border.create('#0d0')
      }
    })
  }
}

cnv.width = 720 + border.width * 2
cnv.height = cnv.width + 50

const NUM_OF_PIXELS = 30
const PXL_SIZE = (cnv.width - border.width * 2) / NUM_OF_PIXELS
const SPEED = 400

const gameArea = []

for (let i = 0; i < NUM_OF_PIXELS; i++) {
  const row = []
  for (let j = 0; j < NUM_OF_PIXELS; j++) {
    row.push([
      PXL_SIZE * i + border.width,
      PXL_SIZE * j + border.width,
      PXL_SIZE,
      PXL_SIZE
    ])
  }
  gameArea.push(row)
}

ctx.lineWidth = border.width
