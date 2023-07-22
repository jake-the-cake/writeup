import { NextFunction, Request, Response } from "express"
import { Schema } from "../models/Model"

export type DataModel<T, K extends keyof T> = {
	name: string
	schema: T
	fields: K[]
	required?: K[]
	unique?: K[]

}

export type IndexAny = {
	[key: string]: any
}

type Req = Request & IndexAny
type Res = Response & IndexAny

type ExpressFunction = (
	req: Req, res: Res, next: NextFunction
) => void

interface ControllerOptions {

}

type ControllerArg = (ControllerOptions | (() => void))[]

type GenericController = (
	model: DataModel<IndexAny, string>,
	args: ControllerArg
) => ExpressFunction

const create: GenericController = function (model, ...args) {
	let f: () => void, options: IndexAny
	// new Schema({data:'here'})
	console.log(new Schema({data:'here'}))
	// new Schema({})
	return (req, res, next) => {
		if (args) args.forEach((arg: ControllerArg) => {
			if (typeof arg === 'function' && !f) f = arg
			if (typeof arg === 'object' && !options) options = arg
		})
		console.log(f)
		console.log(options)
	}
}

export { create }