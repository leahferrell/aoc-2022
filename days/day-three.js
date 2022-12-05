import {readLines} from '../common/services/input-reader-service.js'
import {toChunks} from '../common/utils/array-utils.js'

const LOWERCASE_OFFSET = 'a'.charCodeAt(0)
const UPPERCASE_OFFSET = 'A'.charCodeAt(0) - 26

const parseInput = async (filename) => {
  const lines = await readLines(filename)

  return lines.filter((line) => line.length > 0)
}

const convertItemToPriority = (item) => {
  const offset = (item >= 'A' && item <= 'Z') ? UPPERCASE_OFFSET : LOWERCASE_OFFSET

  return item.charCodeAt(0) - offset + 1
}

const findError = (rucksack) => {
  let leftMap = {}
  let rightMap = {}

  for (let left = 0, right = rucksack.length - 1; left < right; left++, right--) {
    const leftItem = rucksack[left]
    const rightItem = rucksack[right]

    if (leftMap[rightItem] != null) {
      return rightItem
    } else if (rightMap[leftItem] != null) {
      return leftItem
    } else if (leftItem === rightItem) {
      return leftItem
    } else {
      leftMap[leftItem] = true
      rightMap[rightItem] = true
    }
  }

  return null
}

const findBadge = (group) => {
  let firstMap = {}
  let secondMap = {}
  let thirdMap = {}

  const longestGroupLength = Math.max(...(group.map(sack => sack.length)))

  for (let i = 0; i < longestGroupLength; i++) {
    const groupOneItem = group[0].length >= i ? group[0][i] : null
    const groupTwoItem = group[1].length >= i ? group[1][i] : null
    const groupThreeItem = group[2].length >= i ? group[2][i] : null

    if (groupOneItem) firstMap[groupOneItem] = true
    if (groupTwoItem) secondMap[groupTwoItem] = true
    if (groupThreeItem) thirdMap[groupThreeItem] = true

    if (secondMap[groupOneItem] && thirdMap[groupOneItem]) {
      return groupOneItem
    } else if (firstMap[groupTwoItem] && thirdMap[groupTwoItem]) {
      return groupTwoItem
    } else if (firstMap[groupThreeItem] && secondMap[groupThreeItem]) {
      return groupThreeItem
    } else {
      // haven't found a match
    }
  }
  return null
}

export const part1 = async (filename) => {
  const input = await parseInput(filename)

  return input
    .map((rucksack) => findError(rucksack))
    .reduce((sum, error) => sum + convertItemToPriority(error), 0)
}

export const part2 = async (filename) => {
  const input = await parseInput(filename)

  return toChunks(input, 3)
    .map((group) => findBadge(group))
    .reduce((sum, badge) => sum + convertItemToPriority(badge), 0)
}

const day = {
  execute: async (filename) => {
    console.log(await part1('data/3/' + filename))
    console.log(await part2('data/3/' + filename))
  }
}

export default day
