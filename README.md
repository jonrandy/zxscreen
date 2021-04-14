# ZX Screen

## What is this?

ZXScreen is the result of me challenging myself to write something to display ZX Spectrum graphics in HTML & CSS **without** using the `canvas` element. I'm not really sure how useful this is for anyone, and it's not the fastest thing in the world (each 'screen' uses north of 56,000 HTML elements!) - but hey, it works!

You can view a live demo [here](https://jonrandy.gitlab.io/zxscreen/) (works best on desktop browsers)

For the curious - if you're interested in the technical details of the ZX Spectrum display, you can find a pretty good writeup at [http://www.breakintoprogram.co.uk/computers/zx-spectrum/screen-memory-layout](http://www.breakintoprogram.co.uk/computers/zx-spectrum/screen-memory-layout)

## How to use

ZXScreen is implemented as an ES module (`zxscreen.js` in the repo). Simply import it into your project and start using it. It has no dependencies or side effects. I personally recommend using [Skypack](https://skypack.dev) to do the import:

```js
import * as zxs from 'https://cdn.skypack.dev/zxscreen?min'
```

