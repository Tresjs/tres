export function toSetMethodName(key: string) {
  return 'set' + key[0].toUpperCase() + key.slice(1)
}

export const merge = (target: any, source: any) => {
  // Iterate through `source` properties and if an `Object` set property to merge of `target` and `source` properties
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object) Object.assign(source[key], merge(target[key], source[key]))
  }

  // Join `target` and modified `source`
  Object.assign(target || {}, source)
  return target
}
