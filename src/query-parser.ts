import {stringify} from 'qs'
import {unique} from 'shorthash'
import sharpdefs from './sharpdefs'

// DEFINITIONS
interface SharpOptions {
	w?: number,
	h?: number,
	mode?: string
	g?: string,
	bg?: string,
	blur?: number,
	bw?: boolean,
	overlay?: string,
	overlayGravity?: string
}

export default class QueryParser {

	event: any
	options: SharpOptions
	overlaySrc: string
	filename: string
	optionString: string
	format: string

	constructor (event) {
		this.event = event

		this.options = {}

		this.getSizeOptions()
		this.getEfxOptions()
		this.getOverlayOptions()
		this.getOutputFormat()
		this.getFilename()
	}

	getSizeOptions(){
		const query = this.event.queryStringParameters
		if (!query) return {}

		if (parseInt(query.w)){
			this.options.w = parseInt(query.w)
		}
		if (parseInt(query.h)){
			this.options.h = parseInt(query.h)
		}
		if (!this.options.w && !this.options.h) return

		if (sharpdefs.mode.indexOf(query.mode) > -1){
			this.options.mode = query.mode
		}
		if (this.options.mode === 'crop' && sharpdefs.gravity.indexOf(query.g) > -1){
			this.options.g = query.g
		}
	}

	getEfxOptions(){
		const query = this.event.queryStringParameters
		if (!query) return {}

		const blur = parseFloat(query.blur)

		if ( blur > 0.3 && blur < 1000 ){
			this.options.blur = blur
		}
		if (query.bw === 'true' || query.bw === true){
			this.options.bw = true
		}
	}

	getOverlayOptions(){
		// Options for Compositing images (watermark)
		const query = this.event.queryStringParameters
		if (!query) return {}

		if (query.overlay){
			this.options.overlay = unique(query.overlay)
			this.overlaySrc = query.overlay
		}
		if (this.options.overlay && sharpdefs.gravity.indexOf(query.overlayGravity) > -1){
			this.options.overlayGravity = query.overlayGravity
		}
	}

	getOutputFormat(){
		const path = this.event.path
		const ext = path.substr(path.lastIndexOf('.') + 1)
		if (sharpdefs.format.indexOf(ext) > -1) this.format = ext
		else if (ext === 'jpg') this.format = 'jpeg'
		else  this.format = 'jpeg'
	}

	getFilename(){
		const path = this.event.path.split('/')
		const original = path[path.length -1]
		this.optionString = stringify(this.options, { encode: false })
		this.filename = this.optionString ? original + '?' + this.optionString : original
	}
}
