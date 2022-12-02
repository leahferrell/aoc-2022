import fs from 'fs'

export const readFileAsync = (path) => {
	return new Promise((resolve, reject) => {
		fs.readFile(path, 'utf8', (err, data) => {
			if (err) {
				console.error('encountered error: ', err)
				reject(err)
			}
			resolve(data)
		})
	})
}
