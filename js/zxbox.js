const

	STYLE_ID = '_zxb_css',

	BYTECOUNT_BITMAP = 6144,
	BYTECOUNT_ATTRIBUTES = 768,
	BYTECOUNT_SCREEN = BYTECOUNT_BITMAP + BYTECOUNT_ATTRIBUTES,

	BYTE_ELEMENT = 'b',
	BIT_ELEMENTS = ['u', 's'],

	PIXEL_SIZE_VARNAME = '--pixel-size',

	CLASS = {
		screen: 'zxb_scr',
		char: 'c',
		paper: 'p',
		ink: 'i',
		bright: 'b',
		flash: 'f'
	},

	DEFAULT_CONFIG = {
		bright0: 'C0',
		bright1: 'FF',
		baseAddress: 16384
	}

let
	config,
	lastScreen

const
	cssExists = () => !!document.getElementById(STYLE_ID),
	setConfig = cfg => config = {...DEFAULT_CONFIG, ...cfg},
	intToBin = (digits, length) => num => num.toString(2).padStart(length, 0).replace(/0|1/g, m=>digits[+m]),
	elHTML = (type, content='') => `<${type}>${content}</${type}>`,
	emptyEl = type => elHTML(type),
	byteToHTML = intToBin(BIT_ELEMENTS.map(emptyEl), 8),
	colIndexToRGB = i => intToBin(['00', config['bright'+(i&8?1:0)] ], 3)((i&4)>>1 | (i&2)<< 1  | i&1)

function attributeToIPBF(attr) {
    return [
      attr & 7, // ink
      attr >> 3 & 7, // paper
      attr & 64, // bright
      attr & 128 // flash
    ]
}

function screen(container = document.body,	{	pixelSize = 1, initialMemory = new Uint8Array(BYTECOUNT_SCREEN)	} = {}) {
	let
		_mem = new Uint8Array(BYTECOUNT_SCREEN),
		newScreen = {	container, pixelSize,	_mem },
		[byteEls, charEls] = initialiseScreen(newScreen)

	newScreen._bytes = byteEls
	newScreen._chars = charEls

	poke$(0, initialMemory, newScreen)

	lastScreen = {...newScreen}
	return newScreen

}


function initialiseScreen(screen) {
	if (!cssExists()) insertCSS()
	return insertElements(screen)
}


function insertCSS() {
	let styleEl = document.createElement('style')
	styleEl.id = STYLE_ID
	styleEl.innerHTML = buildCSS()
	document.head.appendChild(styleEl)
}


function insertElements(screen, c = CLASS) {
	let
		h = '',
		scr = document.createElement('div')

	scr.className = c.screen
	scr.style.setProperty(PIXEL_SIZE_VARNAME, screen.pixelSize + 'px')

	for (let char=0; char<32*24; char++) {
		h += `<div class="${c.char} i0 p7 b">`
		for (let byte=0; byte<8; byte++) {
			h += elHTML(BYTE_ELEMENT)
		}
		h += `</div>`
	}
	scr.innerHTML = h
	screen.container.appendChild(scr)
	return [ [...scr.getElementsByTagName(BYTE_ELEMENT)], [...scr.getElementsByClassName(c.char)] ]
}


function buildCSS(c = CLASS) {
	let css = `
		.${c.screen} * { box-sizing: border-box; }
		.${c.screen} { font-size: 0; width: calc(var(${PIXEL_SIZE_VARNAME}) * 8 * 32); }
		.${c.char} { width: calc(var(${PIXEL_SIZE_VARNAME}) * 8); height: calc(var(${PIXEL_SIZE_VARNAME}) * 8); display: inline-block; }
		.${c.char} ${BIT_ELEMENTS[0]}, .${c.char} ${BIT_ELEMENTS[1]} {
			height: var(${PIXEL_SIZE_VARNAME});
			width: var(${PIXEL_SIZE_VARNAME});
			display: inline-block;
		}
		.${c.char} ${BIT_ELEMENTS[1]} { border-left: var(${PIXEL_SIZE_VARNAME}) solid; }
	`
	let pCSS = '', iCSS = '', col
	for (let a=0; a<=15; a++) {
		col = '#' + colIndexToRGB(a)
		pCSS += `.${(a&8 ? c.bright+'.': '')+c.paper+(a&7)} { background: ${col}; }`
		iCSS += `.${(a&8 ? c.bright+'.': '')+c.ink+(a&7)} { color: ${col}; }`
	}

	// TODO - add FLASH css

	return css + pCSS + iCSS
}


function poke(address, value, screen = lastScreen) {
	// TODO - properly convert from speccy mem offset to our byte el offset
	let offset = address - config.baseAddress
	screen._mem[offset] = value
	if (offset < BYTECOUNT_BITMAP) {
		setBitmapByte(offset, value, screen)
	} else {
		setAttributeBlock(offset - BYTECOUNT_BITMAP, value, screen)
	}
}

function poke$(address, values, screen = lastScreen) {

}

function setBitmapByte(offset, value, screen) {
	screen._bytes[offset].innerHTML = byteToHTML(value)
}

function setAttributeBlock(offset, value, screen, c = CLASS) {
	let [ink, paper, bright, flash] = attributeToIPBF(value)
	screen._chars[offset].className = `${c.char} ${c.ink+ink} ${c.paper+paper} ${bright ? c.bright : ''} ${flash ? c.flash : ''} `
}



setConfig({})


export {
	cssExists,
	setConfig,
	screen,
	buildCSS,
	byteToHTML,
	colIndexToRGB,
	config,
	insertCSS,
	poke,
	poke$
}