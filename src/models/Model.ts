import { APPLICATION } from "../config"
import { IndexAny } from "../controllers/generic"

type SchemaProperty = {
	type: string
	required?: string
	unique?: string
} | string

type DataSchema = {
	id?: string
	added?: number
	edited?: number | null
	validate?: any
} & { [key: string]: SchemaProperty }




class Model {
	constructor(schema: DataSchema) {

	}
}





// [key: string]: SchemaProperty
class Schema implements DataSchema, IndexAny {
	[key: string]
	id?: string
	added?: number
	edited?: number | null
	validate?: any
	errors?: null | IndexAny[] = null

	constructor(schema: any) {
		bindUtils(this)
		this.checkSchema(schema)
		if (!this.errors) this.buildFields(schema)
		this.unbindUtils(this)
		// this.end()
	}

	// end() {
	// }
	
	buildFields(schema: any) {
		Object.keys(schema).forEach((schemaKey: string) => {
			this[schemaKey] = schema[schemaKey]
		})
	}

	checkSchema(schema: any) {
		this.checkKeys(schema)

	}
	
	checkKeys(schema: any) {
		if (!this.hasKeys(schema)) this.newErr({
			message: 'Cannot use a blank schema.',
			loc: 'checkKeys',
			type: 'ValueErr',
			timestamp: APPLICATION.f.startTimer()
		})
	}
}



function newErr(info: any): void {
	// @ts-ignore
	if (!this.errors) this.errors = []
	// @ts-ignore
	this.errors.push(info)
}


function hasKeys(obj: IndexAny): boolean {
	try {
		if (Object.keys(obj).length > 0) return true
		else return false
	} catch (err: any) {
		console.error(err.message)
		return false
	}
}

const UTILS: IndexAny = {
	hasKeys,
	newErr
}

function unbindUtils(obj: IndexAny): void {
	// @ts-ignore
	if (!obj) obj = this
	obj.utils.forEach((utilityKey: string): void => {
		delete obj[utilityKey]
	}) 
	delete obj.utils
	delete obj.errors
}

function bindUtils(obj: IndexAny): void {
	const utils = { ...UTILS, unbindUtils }
	obj.utils = []
	Object.keys(utils).forEach((utilityKey: string): void => {
		obj[utilityKey] = UTILS[utilityKey] || unbindUtils
		obj.utils.push(utilityKey)
	})
}

export { Model, Schema }