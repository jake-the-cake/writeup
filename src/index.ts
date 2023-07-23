import express from 'express'
import http from 'http'
import { APPLICATION } from './config'
import { create } from './controllers/generic'
import { connectDB } from './db'
import { ClientModel } from './models/client'

connectDB('./data.json', startApp)
	.then(({ db, serve, callback }: any) => {
		console.log(db)
		if (db) serve()
		callback()
	})
	.catch((err: any) => console.log(err))

function startApp() {
	const app = express()
	const port = APPLICATION.PORT
	// @ts-ignore
	app.get('/', create(ClientModel, {data:'stuff'}, () => {console.log('')}))
	http.createServer(app).listen(port, () => {
		console.log(`Server running on port ${ port }`)
	})
}