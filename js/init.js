const cnv = document.body.querySelector('canvas')
const ctx = cnv.getContext('2d')

const Color = {
  GREEN: 'rgb(0, 230, 0)',
  YELLOW: 'rgb(255, 255, 0)',
  RED: 'rgb(255, 0, 0)',
  BLUE: 'rgb(34, 34, 255)',

  blueToGreen: function*() {
    for (let i = 0; i <= 255; i++) {
      yield `rgb(${i <= 34 ? 34 - i : 0}, ${i < 196 ? 34 + i : 230}, ${255 -
        i})`
    }
  }
}

const Shadow = {
  COLOR: 'rgba(0, 0, 0, 0.7)',
  BLUR: 5,
  OFFSET_X: 7,
  OFFSET_Y: -7
}

const border = {
  WIDTH: 8,
  isAnim: false,
  lineDashOffset: cnv.width * 2,

  create(color) {
    ctx.lineWidth = border.WIDTH
    ctx.strokeStyle = color
    ctx.strokeRect(
      border.WIDTH / 2,
      border.WIDTH / 2 - Shadow.OFFSET_Y + Shadow.BLUR,
      cnv.width - border.WIDTH - Shadow.OFFSET_X - Shadow.BLUR,
      cnv.width - border.WIDTH + Shadow.OFFSET_Y - Shadow.BLUR
    )
  },

  remove() {
    ctx.clearRect(0, 0, cnv.width, border.WIDTH)
    ctx.clearRect(
      cnv.width - border.WIDTH,
      border.WIDTH,
      border.WIDTH,
      cnv.width - border.WIDTH
    )
    ctx.clearRect(0, border.WIDTH, border.WIDTH, cnv.width - border.WIDTH)
    ctx.clearRect(
      border.WIDTH,
      cnv.width - border.WIDTH,
      cnv.width - border.WIDTH * 2,
      border.WIDTH
    )
  },

  anim() {
    requestAnimationFrame(() => {
      ctx.setLineDash([cnv.width, cnv.width])
      ctx.lineDashOffset = border.lineDashOffset
      border.lineDashOffset >= 0
        ? (border.lineDashOffset -= 5)
        : (border.lineDashOffset = cnv.width * 2)
      border.remove()
      border.create()

      if (border.isAnim) {
        border.anim()
      } else {
        ctx.setLineDash([])
        ctx.lineDashOffset = 0
        border.create(Color.green)
      }
    })
  }
}

const FIELD_SIZE = 720
const NUM_OF_PIXELS = 30
const PXL_SIZE = FIELD_SIZE / NUM_OF_PIXELS

cnv.width = FIELD_SIZE + border.WIDTH * 2 + Shadow.OFFSET_X + Shadow.BLUR
cnv.height = cnv.width + 100

ctx.font = 'normal 55px AnotherCastle3'
ctx.textBaseline = 'top'

ctx.shadowColor = Shadow.COLOR
ctx.shadowBlur = Shadow.BLUR
ctx.shadowOffsetX = Shadow.OFFSET_X
ctx.shadowOffsetY = Shadow.OFFSET_Y

const getPixel = (x, y) => {
  return [
    border.WIDTH + PXL_SIZE * x,
    Math.abs(Shadow.OFFSET_Y) + Shadow.BLUR + border.WIDTH + PXL_SIZE * y,
    PXL_SIZE,
    PXL_SIZE
  ]
}
