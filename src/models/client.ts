import { Model, Schema } from "./Model";

const Client = new Schema({
	name: 'string',
	location: 'string',
	email: {
		type: 'string',
		required: true
	}
})

const ClientModel = new Model('Client', Client)

export { ClientModel }