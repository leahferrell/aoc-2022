import {readLines} from '../common/services/input-reader-service.js'

const parseInput = async (filename) => {
  const lines = await readLines(filename)

  const stackBase = lines.find((line) => line[1] === '1')
  const stackCount = parseInt(stackBase[stackBase.length - 1])

  const stacks = []

  for (let i = 0; i < stackCount; i++) {
    stacks[i] = []
  }

  lines
    .filter((line) => !line.includes('move') && line.length > 0 && line[1] !== '1')
    .forEach((line) => {
      for (let i = 1; i < line.length ;i += 4) {
        const stack = (i - 1) / 4
        const possibleCrate = line[i]

        if (possibleCrate && possibleCrate !== ' ') {
          stacks[stack].push(possibleCrate)
        }
      }
    }, )

  const moves = lines
    .filter((line) => line.includes('move'))
    .map((line) => {
      const tokens = line.split(' ')

      return {
        count: parseInt(tokens[1]),
        from: parseInt(tokens[3]),
        to: parseInt(tokens[5])
      }
    })

  return {
    stacks,
    moves
  }
}

export const part1 = async (filename) => {
  const moveCrate = (stacks, move) => {
    stacks[move.to - 1].unshift(...stacks[move.from - 1].splice(0, move.count).reverse())
  }

  const input = await parseInput(filename)

  input.moves.forEach((move) => {
    moveCrate(input.stacks, move)
  })

  return input.stacks.map((stack) => stack[0]).join('')
}

export const part2 = async (filename) => {
  const moveCrate = (stacks, move) => {
    stacks[move.to - 1].unshift(...stacks[move.from - 1].splice(0, move.count))
  }

  const input = await parseInput(filename)

  input.moves.forEach((move) => {
    moveCrate(input.stacks, move)
  })

  return input.stacks.map((stack) => stack[0]).join('')
}

const day = {
  execute: async (filename) => {
    console.log(await part1('data/5/' + filename))
    console.log(await part2('data/5/' + filename))
  }
}

export default day
