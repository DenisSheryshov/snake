const cnv = document.createElement('canvas')
const ctx = cnv.getContext('2d')

const Color = {
  GREEN: 'rgb(0, 230, 0)',
  YELLOW: 'rgb(255, 255, 0)',
  RED: 'rgb(255, 0, 0)',
  BLUE: 'rgb(34, 34, 255)'
}

const Shadow = {
  COLOR: 'rgba(20, 20, 20, 0.7)',
  BLUR: 4,
  OFFSET: 10
}

const border = {
  WIDTH: 8,

  draw(color) {
    ctx.strokeStyle = color

    ctx.strokeRect(
      border.WIDTH / 2,
      border.WIDTH / 2 + Shadow.OFFSET + Shadow.BLUR,
      border.size,
      border.size
    )
  }
}

const FIELD_SIZE = 720
const NUM_OF_PIXELS = 30
const PXL_SIZE = FIELD_SIZE / NUM_OF_PIXELS

cnv.width = FIELD_SIZE + border.WIDTH * 2 + Shadow.OFFSET + Shadow.BLUR
cnv.height = cnv.width + 100

ctx.font = 'normal 55px AnotherCastle3'
ctx.textBaseline = 'top'
ctx.lineWidth = border.WIDTH

ctx.shadowColor = Shadow.COLOR
ctx.shadowBlur = Shadow.BLUR
ctx.shadowOffsetX = Shadow.OFFSET
ctx.shadowOffsetY = -Shadow.OFFSET

border.size = cnv.width - border.WIDTH - Shadow.OFFSET - Shadow.BLUR

const pixelGrid = []

for (let i = 0; i < NUM_OF_PIXELS; i++) {
  const row = []
  for (let j = 0; j < NUM_OF_PIXELS; j++) {
    row.push([
      border.WIDTH + PXL_SIZE * i,
      Shadow.OFFSET + Shadow.BLUR + border.WIDTH + PXL_SIZE * j,
      PXL_SIZE,
      PXL_SIZE
    ])
  }
  pixelGrid.push(row)
}

const getPixel = (x, y) => pixelGrid[x][y]

const clearGameArea = () => {
  ctx.clearRect(0, 0, cnv.width, cnv.width)
}
