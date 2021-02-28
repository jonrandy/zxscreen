const

	STYLE_ID = '_zxbox_css',
	BIT_ELEMENTS = ['u', 's'],

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
	emptyEl = type => `<${type}></${type}>`,
	bytetoHTML = intToBin(BIT_ELEMENTS.map(emptyEl), 8),
	colIndexToRGB = i => intToBin(['00', config['bright_'+(i&8?1:0)] ], 3)((i&4)>>1 | (i&2)<< 1  | i&1)


function screen(container = document.body,	{	pixelSize = 1	} = {}) {

	return lastScreen = {
		container,
		pixelSize
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