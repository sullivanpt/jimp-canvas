const Jimp = require('jimp')

let globalFont
let globalFontSize = {
  width: 16,
  height: 16
}
Jimp.loadFont(Jimp.FONT_SANS_16_BLACK).then(function (font) {
  console.log('font loaded')
  globalFont = font
});

class Canvas {
  constructor() {
    this.transform = { x: 0, y: 0 }
    this.fillStyle = 0xFF0000FF
  }
  init () {
    if (this.image) return
    if (!this.width || !this.height) return
    this.image = new Jimp(this.width, this.height) // TODO: callback here?
  }
  getX (x) { return this.transform.x + x }
  getY (y) { return this.transform.y + y }
  getBufferAsPng (callback) {
    if (!this.image) this.image = new Jimp(0, 0)
    return this.image.getBuffer(Jimp.MIME_PNG, callback)
  }
  getContext (contextType) {
    if (contextType !== '2d') return null
    return this // pretend we are our own CanvasRenderingContext2D
  }
  save () { } // TODO: not needed for my use case
  restore () { } // TODO: not needed for my use case
  clearRect () { } // TODO: not needed for my use case
  fillRect (x, y, width, height) {
    this.init()
    let rgba = (this.fillStyle === '#000000') ? {
      r: 0, g: 0, b: 0, a: 255
    } : {
      r: 255, g: 255, b: 255, a: 255
    }
    this.image.scan(this.getX(x), this.getY(y), width, height, function (x, y, idx) {
      // x, y is the position of this pixel on the image
      // idx is the position start position of this rgba tuple in the bitmap Buffer
      // this is the image

      this.bitmap.data[ idx + 0 ] = rgba.r
      this.bitmap.data[ idx + 1 ] = rgba.g
      this.bitmap.data[ idx + 2 ] = rgba.b
      this.bitmap.data[ idx + 3 ] = rgba.a

      // rgba values run from 0 - 255
      // e.g. this.bitmap.data[idx] = 0; // removes red from this pixel
    })
  }
  fillText (text, x, y) {
    if (!globalFont) return
    this.init()
    // this.font 20px
    // this.textAlign center
    let offset = this.measureText(text).width / 2
    this.image.print(globalFont, this.getX(x - offset), this.getY(y - globalFontSize.height), text)
  }
  measureText (text) {
    return {
      width: text.length * globalFontSize.width
    }
  }
  translate (x, y) {
    this.transform.x += x
    this.transform.y += y
  }
}

module.exports = Canvas