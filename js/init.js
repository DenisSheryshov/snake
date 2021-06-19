const cnv = document.createElement('canvas')
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
  COLOR: 'rgba(20, 20, 20, 0.7)',
  BLUR: 4,
  OFFSET: 10
}

const border = {
  WIDTH: 8,
  isAnim: false,
  lineDashOffset: cnv.width * 2,

  draw(color) {
    ctx.lineWidth = border.WIDTH
    ctx.strokeStyle = color

    if (!border.size) {
      border.size = cnv.width - border.WIDTH - Shadow.OFFSET - Shadow.BLUR
    }

    ctx.strokeRect(
      border.WIDTH / 2,
      border.WIDTH / 2 + Shadow.OFFSET + Shadow.BLUR,
      border.size,
      border.size
    )
  },

  clear() {
    if (!border.WIDTH_SHDW) {
      border.WIDTH_SHDW = border.WIDTH + Shadow.OFFSET + Shadow.BLUR
    }

    ctx.clearRect(0, 0, cnv.width, border.WIDTH_SHDW)
    ctx.clearRect(0, 0, border.WIDTH_SHDW + 1, border.size)
    ctx.clearRect(0, border.size, border.size, border.WIDTH_SHDW)
    ctx.clearRect(
      border.size,
      border.WIDTH_SHDW,
      border.WIDTH_SHDW,
      border.size
    )
  },

  anim() {
    requestAnimationFrame(() => {
      ctx.setLineDash([border.size, border.size])
      ctx.lineDashOffset = border.lineDashOffset
      border.lineDashOffset >= 0
        ? (border.lineDashOffset -= 5)
        : (border.lineDashOffset = border.size * 2)
      border.clear()
      border.draw(Color.GREEN)

      if (border.isAnim) {
        border.anim()
      } else {
        ctx.setLineDash([])
        ctx.lineDashOffset = 0
        border.draw(Color.green)
      }
    })
  }
}

const FIELD_SIZE = 720
const NUM_OF_PIXELS = 30
const PXL_SIZE = FIELD_SIZE / NUM_OF_PIXELS

cnv.width = FIELD_SIZE + border.WIDTH * 2 + Shadow.OFFSET + Shadow.BLUR
cnv.height = cnv.width + 100

ctx.font = 'normal 55px AnotherCastle3'
ctx.textBaseline = 'top'

ctx.shadowColor = Shadow.COLOR
ctx.shadowBlur = Shadow.BLUR
ctx.shadowOffsetX = Shadow.OFFSET
ctx.shadowOffsetY = -Shadow.OFFSET

const getPixel = (x, y) => {
  return [
    border.WIDTH + PXL_SIZE * x,
    Shadow.OFFSET + Shadow.BLUR + border.WIDTH + PXL_SIZE * y,
    PXL_SIZE,
    PXL_SIZE
  ]
}

const clearGameArea = () => {
  ctx.clearRect(0, 0, cnv.width, cnv.width)
}
