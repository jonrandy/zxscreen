const

	STYLE_ID = '_zxb_css',

	BYTE_ELEMENT = 'b',
	BIT_ELEMENTS = ['u', 's'],

	CLASS = {
		screen: 'zxb_scr',
		char: 'c',
		paper: 'p',
		ink: 'i',
		bright: 'b',
		flash: 'f'
	},

	DEFAULT_CONFIG = {
		bright_0: 'C0',
		bright_1: 'FF'
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
	bytetoHTML = intToBin(BIT_ELEMENTS.map(emptyEl), 8),
	colIndexToRGB = i => intToBin(['00', config['bright_'+(i&8?1:0)] ], 3)((i&4)>>1 | (i&2)<< 1  | i&1)


function screen(container = document.body,	{	pixelSize = 1, initialMemory = []	} = {}) {

	let _mem = initialMemory

	return lastScreen = {
		container,
		pixelSize,
		_mem
	}

}


function buildCSS() {

}






setConfig({})


export {
	cssExists,
	setConfig,
	screen,
	buildCSS,
	bytetoHTML,
	colIndexToRGB,
	config
}