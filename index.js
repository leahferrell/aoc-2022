import {executeInput, executeSample} from './days/day-one.js'

const run = async () => {
	await executeSample()
	await executeInput()
}

run()
	.then(() => console.log('success!'))
