import {readLines} from '../common/services/input-reader-service.js'

const parseInput = async (filename) => {
  const lines = await readLines(filename)

  return lines
	  .filter((line) => line.length > 0)
	  .map((line) => {
			const tokens = line.split(',')

		  const left = tokens[0].split('-')
		  const right = tokens[1].split('-')

		  return {
				left: {
					start: parseInt(left[0]),
					end: parseInt(left[1])
				},
			  right: {
				  start: parseInt(right[0]),
				  end: parseInt(right[1])
			  }
		  }
	  })
}

export const part1 = async (filename) => {
  const input = await parseInput(filename)

	return input.filter((pair) =>
		(
			(pair.left.start <= pair.right.start && pair.left.end >= pair.right.end) ||
			(pair.right.start <= pair.left.start && pair.right.end >= pair.left.end)
		)
	).length
}

export const part2 = async (filename) => {
  const input = await parseInput(filename)

	return input.filter((pair) =>
		(
			(pair.left.start <= pair.right.start && pair.left.end >= pair.right.start) ||
			(pair.right.start <= pair.left.start && pair.right.end >= pair.left.start)
		)
	).length
}

const dayFour = {
  execute: async (filename) => {
    console.log(await part1('data/4/' + filename))
    console.log(await part2('data/4/' + filename))
  }
}

export default dayFour
