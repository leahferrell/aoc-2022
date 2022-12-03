export const toChunks = (input, chunkSize) => {
  const chunks = []

  for (let i = 0; i < input.length; i += chunkSize) {
    chunks.push(input.slice(i, i + chunkSize))
  }

  return chunks
}
