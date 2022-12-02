import {readLines} from '../common/services/input-reader-service.js'

const parseInput = async (filename) => {
  const lines = await readLines(filename)

  let elfCounts = []
  let currentCount = 0

  lines.forEach((line) => {
    if (line === '') {
      elfCounts.push(currentCount)
      currentCount = 0
    } else {
      currentCount += parseInt(line)
    }
  })

  return elfCounts
}

export const part1 = async (filename) => {
  const elfCounts = await parseInput(filename)

  return Math.max(...elfCounts)
}

export const part2 = async (filename) => {
  const elfCounts = await parseInput(filename)
  return elfCounts
    .sort((a, b) => a - b)
    .slice(-3)
    .reduce((sum, current) => sum + current, 0)
}

export const executeSample = async () => {
  console.log(await part1('data/1/sample.txt'))
  console.log(await part2('data/1/sample.txt'))
}

export const executeInput = async () => {
  console.log(await part1('data/1/input.txt'))
  console.log(await part2('data/1/input.txt'))
}
