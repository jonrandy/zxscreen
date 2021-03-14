import * as ZXB from './js/zxbox.js'

console.log(ZXB.cssExists())

console.log(ZXB.config)

console.log(ZXB.byteToHTML(0))
console.log(ZXB.byteToHTML(3))
console.log(ZXB.byteToHTML(192))
console.log(ZXB.byteToHTML(170))
console.log(ZXB.byteToHTML(85))
console.log(ZXB.byteToHTML(255))

console.log(ZXB.colIndexToRGB(11))

ZXB.insertCSS()

ZXB.screen(document.getElementById('zxs'), {pixelSize:2})
window.zx = ZXB



