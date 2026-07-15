const numbersAtEnd = /\d*$/
const underscoresNumbersAtEnd = /_*\d*$/

export function stripUnderscoresNumbersFromEnd(str: string) {
  return str.replace(underscoresNumbersAtEnd, '')
}

export function getNumbersFromEnd(str: string) {
  const matches = str.match(numbersAtEnd)
  if (matches) {
    return Number.parseInt(matches[matches.length - 1])
  }
  return null
}
