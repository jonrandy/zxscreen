# ZX Screen

## What is this?

ZXScreen is the result of me challenging myself to write something to display ZX Spectrum graphics in HTML & CSS **without** using the `canvas` element. I'm not really sure how useful this is for anyone, and it's not the fastest thing in the world (each 'screen' uses north of 56,000 HTML elements!) - but hey, it works!

You can view a live demo [here](https://jonrandy.gitlab.io/zxscreen/) (works best on desktop browsers)

For the curious - if you're interested in the technical details of the ZX Spectrum display, you can find a pretty good write-up at [http://www.breakintoprogram.co.uk/computers/zx-spectrum/screen-memory-layout](http://www.breakintoprogram.co.uk/computers/zx-spectrum/screen-memory-layout)

## How to use

ZXScreen is implemented as an ES module (`zxscreen.js` in the repo). Simply import it into your project and start using it. It has no dependencies or side effects. I personally recommend using [Skypack](https://skypack.dev) to do the import:

```js
import * as zxs from 'https://cdn.skypack.dev/zxscreen?min'
```

### Initialising a Screen

To set up a new screen, simply call the `screen` function. You can optionally pass a container for the screen (defaults to `document.body`), and an options object where you can specify the `pixelSize` (defaults to 1), and the `initialMemory` (defaults to the ZX Screen splash image). The screen function actually returns an object containing the screen's data - `container`, `pixelSize`, `_mem` (array containing the image data) - but you needn't worry about this unless you have cause to use it (possibly for using multiple screens at once - which will probably be extremely slow).

```js
zxs.screen(document.getElementById('zxs'), { pixelSize:2 })
```

### Writing to the Screen

All writing to the screen is done directly by writing bytes to the screen memory - ZXScreen provides no graphics routines for drawing text, lines, etc. These are left as an exercise for the reader 😁
```js
// write a single byte to the screen memory
zxs.poke(address, value)
// write multiple bytes to the screen memory (values should be an array/iterable containing byte data)
zxs.poke$(address, values) 
```
Both of the memory writing functions take an optional third parameter which is a `Screen` object returned by the `screen` function. If omitted, the mostly recently created Screen will be written to.

### Utility functions

* `blankScreenMemory` - returns an array with a 'blank' screen. Useful in the `initialMemory` param of the `screen` function. Has optional parameters `attr` (specifies the colour attribute for the screen - defaults to 56 - black ink, white background, not bright, not flashing), and `fill` (specifies the byte value to fill the bitmap portion of the screen with - defaults to 0)
* `ipbfToAttribute` - Takes an array of `[ink, paper, bright, flash]` and converts them to single colour attribute value - `bright` and `flash` are optional and default to 0
* `yposMemoryOffset` - Takes a y coordinate (0 being top row) and returns the memory offset for the start of that row in the bitmap
* `colIndexToRGB` - Should you need it, this function returns the RGB value of the given colour index (0-15)
* `setConfig` - Probably not very useful, but allows you to change the configuration of ZX Screen (RGB values for bright/non-bright, memory base address)
* `config` - Object containing the current config
