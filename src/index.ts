import express from 'express'
import JSONdb from 'simple-json-db'
import http from 'http'
import { APPLICATION } from './config'
import { create } from './controllers/generic'

const DB = new JSONdb('./data.json')

if (DB) startApp()

function startApp() {
	const app = express()
	const port = APPLICATION.PORT
	// @ts-ignore
	app.get('/', create({}, {data:'stuff'}, () => {console.log('')}))
	http.createServer(app).listen(port, () => {
		console.log(`Server running on port ${ port }`)
	})
}