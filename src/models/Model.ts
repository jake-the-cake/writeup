import { APPLICATION } from "../config"
import { DataModel, IndexAny } from "../controllers/generic"
// import { deepStringify } from "../db"
import { randomHex } from "../utils/misc"

class Model implements DataModel<DataSchema>{
	[key: string]: any
	name: string
	schema: DataSchema
	fields: string[]
	required?: string[] | undefined
	unique?: string[] | undefined

	constructor(name: string, schema: DataSchema) {
		this.name = name
		this.schema = schema
		this.fields = Object.keys(this.schema)
		this.specialOptions('required', 'unique')
		// console.log(this)
		this.save('stuff')
	}

	specialOptions(...args: string[]) {
		if (args) args.forEach((propKey: string) => {
			this[propKey] = this.fields.filter((field: string) => (this.schema as any)[field][propKey] === true)
		})
	}

	save(options: any) {
		if (options) console.log('These options mean nothing to me.')
		// this.JSON = deepStringify(this.schema)
		console.log(this)
	}
}


type SchemaProperty = {
	type: string
	required?: boolean
	unique?: boolean
	default?: any
}

interface IndexSchemaProperty {
	[key: string]: SchemaProperty
}

type DataSchema = {
	id?: SchemaProperty
	added?: SchemaProperty
	edited?: SchemaProperty
	validate?: any
	utils?: {
		[key: string]: () => any
	}
	errors?: null | IndexAny[]
}



class Schema implements DataSchema {
	[key: string]: any
	id?: SchemaProperty
	added?: SchemaProperty
	edited?: SchemaProperty
	validate?: any
	utils?: { [key: string]: () => any }
	errors?: null | IndexAny[] = null

	constructor(schema: any) {
		this.utils = UTILS
		this.checkSchema(schema)
		if (!this.errors) this.buildFields(schema)
		// else this.throwErrors()
		delete this.errors
		delete this.utils
		delete this.keys
	}

	buildFields(schema: any) {
		this.keys = Object.keys(schema)
		this.keys.forEach((schemaKey: string) => {
			this[schemaKey] = this.populateFieldProperties(schema[schemaKey])
		})
		this.populateDefaultProperties()
	}

	static defaultPropValue: DataSchema | any = {
		id: { type: 'string', required: true, unique: true, default: randomHex },
		added: { type: 'number', required: true, unique: true, default: APPLICATION.f.startTimer },
		edited: { type: 'number', required: true, unique: true, default: null },
		validate: { type: 'function', required: true, unique: true, default: () => console.log('validation') }
	}

	static schemaPropValues: Partial<SchemaProperty> & {update: (prop: SchemaProperty) => SchemaProperty} = {
		update: function (prop: SchemaProperty): SchemaProperty {
			prop = { ...Schema.schemaPropValues,...prop }
			delete (prop as any).update
			return prop
		},
		required: false,
		unique: false,
		default: null
	}

	populateFieldProperties(prop: SchemaProperty | string): SchemaProperty {
		if (typeof prop === 'string') prop = { type: 'string' }
		return Schema.schemaPropValues.update(prop)
	}

	populateDefaultProperties() {
		Object.keys(Schema.defaultPropValue).forEach((propKey: string) => {
			this[propKey] = Schema.defaultPropValue[propKey]
		})
	}

	checkSchema(schema: any) {
		this.checkKeys(schema)

	}
	
	checkKeys(schema: any) {
		// @ts-ignore
		if (!this.utils!.hasKeys(schema)) this.utils!.newErr({
			message: 'Cannot use a blank schema.',
			loc: 'checkKeys',
			type: 'ValueErr',
			timestamp: APPLICATION.f.startTimer()
		}, this)
	}
}

function newErr(info: any, obj: IndexAny): void {
	// @ts-ignore
	obj = obj || this
	if (!obj.errors) obj.errors = []
	obj.errors.push(info)
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

// @ts-ignore
// function unbindUtils(obj: IndexAny = this): void {
// 	obj.utils.forEach((utilityKey: string): void => {
// 		delete obj[utilityKey]
// 	}) 
// 	delete obj.utils
// 	delete obj.errors
// }

// function bindUtils(obj: IndexAny): void {
// 	const utils = { ...UTILS, unbindUtils }
// 	obj.utils = {}
// 	Object.keys(utils).forEach((utilityKey: string): void => {
// 		obj.utils[utilityKey] = UTILS[utilityKey] || unbindUtils
// 		// obj.utils.push(utilityKey)
// 	})
// }

export { Model, Schema }