import {readLines} from '../common/services/input-reader-service.js'

const choices = {
  A: 1, // rock
  B: 2, // paper
  C: 3, // scissors
  X: 1, // rock
  Y: 2, // paper
  Z: 3 // scissors
}

const outcomes = {
  AX: 3, // rock - rock
  AY: 6, // rock - paper
  AZ: 0, // rock - scissors
  BX: 0, // paper - rock
  BY: 3, // paper - paper
  BZ: 6, // paper - scissors
  CX: 6, // scissors - rock
  CY: 0, // scissors - paper
  CZ: 3, // scissors - scissors
}

const results = {
  X: 0,
  Y: 3,
  Z: 6
}

const outcomesPt2 = {
  AX: 3, // rock - lose
  AY: 1, // rock - draw
  AZ: 2, // rock - win
  BX: 1, // paper - lose
  BY: 2, // paper - draw
  BZ: 3, // paper - win
  CX: 2, // scissors - lose
  CY: 3, // scissors - draw
  CZ: 1, // scissors - win
}

const parseInput = async (filename) => {
  const lines = await readLines(filename)

  return lines.filter((line) => line.length > 0)
}

export const part1 = async (filename) => {
  const input = await parseInput(filename)

  return input
    .map((line) => {
      const tokens = line.split(' ')
      const opponentChoice = tokens[0]
      const myChoice = tokens[1]

      return choices[myChoice] + outcomes[opponentChoice + myChoice]
    })
    .reduce((accumulator, next) => accumulator + next, 0)
}

export const part2 = async (filename) => {
  const input = await parseInput(filename)

  return input
    .map((line) => {
      const tokens = line.split(' ')
      const opponentChoice = tokens[0]
      const outcome = tokens[1]

      return outcomesPt2[opponentChoice + outcome] + results[outcome]
    })
    .reduce((accumulator, next) => accumulator + next, 0)
}

const day = {
  execute: async (filename) => {
    console.log(await part1('data/2/' + filename))
    console.log(await part2('data/2/' + filename))
  }
}

export default day
