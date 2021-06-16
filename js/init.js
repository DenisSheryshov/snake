const cnv = document.body.querySelector('canvas')
const ctx = cnv.getContext('2d')

const colors = {
  green: 'rgb(0, 230, 0)',
  yellow: 'rgb(255, 255, 0)',
  red: 'rgb(255, 0, 0)',
  blue: 'rgb(34, 34, 255)',

  blueToGreen: function*() {
    for (let i = 0; i <= 255; i++) {
      yield `rgb(${i <= 34 ? 34 - i : 0}, ${i < 196 ? 34 + i : 230}, ${255 -
        i})`
    }
  }
}

const border = {
  width: 8,
  isAnim: false,
  lineDashOffset: cnv.width * 2,

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
        border.create(colors.green)
      }
    })
  }
}

cnv.width = 720 + border.width * 2
cnv.height = cnv.width + 100

const NUM_OF_PIXELS = 30
const PXL_SIZE = (cnv.width - border.width * 2) / NUM_OF_PIXELS

ctx.lineWidth = border.width
ctx.font = 'normal 50px AnotherCastle3'
ctx.textBaseline = 'top'

const paintPixel = (x, y, color) => {
  const pxl = [
    border.width + PXL_SIZE * x,
    border.width + PXL_SIZE * y,
    PXL_SIZE,
    PXL_SIZE
  ]

  if (color) {
    ctx.fillStyle = color
    ctx.fillRect(...pxl)
  } else {
    ctx.clearRect(...pxl)
  }
}
