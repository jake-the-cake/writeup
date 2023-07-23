import { NextFunction, Request, Response } from "express"
import { ClientModel } from "../models/client"

export type DataModel<T> = {
	name: string
	schema: T
	fields: string[]
	required?: string[]
	unique?: string[]

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
	model: DataModel<IndexAny>,
	args: ControllerArg
) => ExpressFunction

const create: GenericController = function (model, ...args) {
	let f: () => void, options: IndexAny

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

ClientModel