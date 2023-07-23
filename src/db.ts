import JSONdb from "simple-json-db"
import { IndexAny } from "./controllers/generic"

const cb = () => {
	console.log('Connected to DB')
}

function connectDB(loc: string, serve: () => void, callback: () => void = cb): Promise<any> {
	return new Promise((resolve, reject) => {
		try {
			resolve({ db: new JSONdb(loc), serve, callback })
		} catch (err: any) {
			reject(err)
		}
	})
}

// function deepStringify(obj: IndexAny ): any {
// 	if (typeof obj === 'object') {
// 		const objKeys = Object.keys(obj)
// 		if (objKeys.length > 0) objKeys.forEach((key: string | number) => {
// 			if (Number(key) * 0 !== 0 && obj !== undefined && typeof obj !== 'string') {
// 				console.log( typeof obj)
// 				// console.log(obj)
// 				// obj = deepStringify(obj[key])
// 			}
// 		})
// 	}
// 	return JSON.stringify(obj)
// }

export { connectDB } //, deepStringify }