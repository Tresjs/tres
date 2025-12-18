export const kebabCase = (str: string) => {
  const re = /(\d+|([A-Z][a-z]+)|[a-z]+|([A-Z]+)(?![a-z]))/g

  return (String(str ?? '').match(re) || []).map(x => x.toLowerCase()).join('-')
}
