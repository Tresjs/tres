export function toSetMethodName(key: string) {
  return `set${key[0].toUpperCase()}${key.slice(1)}`
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

const HTML_TAGS
  = 'html,body,base,head,link,meta,style,title,address,article,aside,footer,'
  + 'header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,'
  + 'figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,'
  + 'data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,'
  + 'time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,'
  + 'canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,'
  + 'th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,'
  + 'option,output,progress,select,textarea,details,dialog,menu,'
  + 'summary,template,blockquote,iframe,tfoot'

export const isHTMLTag = /*#__PURE__*/ makeMap(HTML_TAGS)

export function isDOMElement(obj: any): obj is HTMLElement {
  return obj && obj.nodeType === 1
}

export function kebabToCamel(str: string) {
  return str.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
}

export function makeMap(str: string, expectsLowerCase?: boolean): (key: string) => boolean {
  const map: Record<string, boolean> = Object.create(null)
  const list: Array<string> = str.split(',')
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true
  }
  return expectsLowerCase ? val => !!map[val.toLowerCase()] : val => !!map[val]
}

export const uniqueBy = <T, K>(array: T[], iteratee: (value: T) => K): T[] => {
  const seen = new Set<K>()
  const result: T[] = []

  for (const item of array) {
    const identifier = iteratee(item)
    if (!seen.has(identifier)) {
      seen.add(identifier)
      result.push(item)
    }
  }

  return result
}

export const get = <T>(obj: any, path: string | string[]): T | undefined => {
  if (!path) return undefined

  // Regex explained: https://regexr.com/58j0k
  const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g)

  return pathArray?.reduce((prevObj, key) => prevObj && prevObj[key], obj)
}

export const set = (obj: any, path: string | string[], value: any): void => {
  // Regex explained: https://regexr.com/58j0k
  const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g)

  if (pathArray)
    pathArray.reduce((acc, key, i) => {
      if (acc[key] === undefined) acc[key] = {}
      if (i === pathArray.length - 1) acc[key] = value
      return acc[key]
    }, obj)
}

export function deepEqual(a: any, b: any): boolean {
  if (isDOMElement(a) && isDOMElement(b)) {
    const attrsA = a.attributes
    const attrsB = b.attributes

    if (attrsA.length !== attrsB.length) return false

    return Array.from(attrsA).every(({ name, value }) => b.getAttribute(name) === value)
  }
  // If both are primitives, return true if they are equal
  if (a === b) return true

  // If either of them is null or not an object, return false
  if (a === null || typeof a !== 'object' || b === null || typeof b !== 'object') return false

  // Get the keys of both objects
  const keysA = Object.keys(a), keysB = Object.keys(b)

  // If they have different number of keys, they are not equal
  if (keysA.length !== keysB.length) return false

  // Check each key in A to see if it exists in B and its value is the same in both
  for (const key of keysA) {
    if (!keysB.includes(key) || !deepEqual(a[key], b[key])) return false
  }

  return true
}

export function deepArrayEqual(arr1: any[], arr2: any[]): boolean {
  // If they're not both arrays, return false
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) return false

  // If they don't have the same length, they're not equal
  if (arr1.length !== arr2.length) return false

  // Check each element of arr1 against the corresponding element of arr2
  for (let i = 0; i < arr1.length; i++) {
    if (!deepEqual(arr1[i], arr2[i])) return false
  }

  return true
}

/**
 * TypeSafe version of Array.isArray
 */
export const isArray = Array.isArray as (a: any) => a is any[] | readonly any[]

// Disposes an object and all its properties
export function dispose<TresObj extends { dispose?: () => void; type?: string; [key: string]: any }>(obj: TresObj) {
  if (obj.dispose && obj.type !== 'Scene') obj.dispose()
  for (const p in obj) {
    ;(p as any).dispose?.()
    delete obj[p]
  }
}