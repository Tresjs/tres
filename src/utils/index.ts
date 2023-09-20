/**
 * Update the function signature to explicitly specify the type of the props parameter
 *
 * @export
 * @template T
 * @template K
 * @param {T} obj
 * @param {K[]} props
 * @return {*}  {Pick<T, K>}
 */
export function pick<T extends object, K extends keyof T>(obj: T, props: K[]): Pick<T, K> {
  const pickedProperties = {} as Pick<T, K>
  for (const prop of props) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      pickedProperties[prop] = obj[prop]
    }
  }
  return pickedProperties
}

/**
 * Check if the object has a setter for the given property
 *
 * @export
 * @param {*} obj
 * @param {string} prop
 * @return {*}  {boolean}
 */
export function hasSetter(obj: any, prop: string): boolean {
  const setterName = `set${prop[0].toUpperCase()}${prop.slice(1)}`
  return obj[setterName] !== undefined
}