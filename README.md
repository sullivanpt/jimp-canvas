# A (very) incomplete canvas 2d built on Jimp JS for node

I needed to run [JsBarcCode](http://lindell.me/JsBarcode/) in node, but didn't want to add the complexity
of [node-canvas](https://github.com/Automattic/node-canvas) and cairo into my build system.

## Setup:
```
npm install --save jsbarcode jimp jimp-canvas
```

## Usage as express route handler:
```
const JsBarcode = require('jsbarcode')
const Canvas = require('./jimp-canvas')
function routeHandler (req, res) {
  let canvas = new Canvas()
  JsBarcode(canvas, 'ABC123', {
    format: 'CODE128'
  })
  canvas.getBufferAsPng(function (err, buffer) {
    res.type('.png')
    res.send(buffer)
  })
}
```

## Caveats:
Truly a junk yard implementation of the bare minimum canvas '2d' feature set needed for CODE128 in [JsBarCode canvas renderer](https://github.com/lindell/JsBarcode/blob/master/src/renderers/canvas.js). The font sized is fixed incorrecrly at 16, the colors are fixed at black and white, etc.
