const pathRegex = /([^[.\]])+/g

export const get = <T>(obj: any, path: string | string[]): T | undefined => {
  if (!path) return undefined

  const pathArray = Array.isArray(path) ? path : path.match(pathRegex)

  return pathArray?.reduce((prevObj, key) => prevObj && prevObj[key], obj)
}

export const set = (obj: any, path: string | string[], value: any): void => {
  const pathArray = Array.isArray(path) ? path : path.match(pathRegex)

  if (pathArray)
    pathArray.reduce((acc, key, i) => {
      if (acc[key] === undefined) acc[key] = {}
      if (i === pathArray.length - 1) acc[key] = value
      return acc[key]
    }, obj)
}

