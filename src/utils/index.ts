import type { nodeOps } from 'src/core/nodeOps'
import type { AttachType, LocalState, TresInstance, TresObject, TresPrimitive } from 'src/types'
import type { Material, Mesh, Object3D, Texture } from 'three'
import type { TresContext } from '../composables/useTresContextProvider'
import { DoubleSide, MathUtils, MeshBasicMaterial, Scene, Vector3 } from 'three'
import { HightlightMesh } from '../devtools/highlight'
import * as is from './is'

export function toSetMethodName(key: string) {
  return `set${key[0].toUpperCase()}${key.slice(1)}`
}

export const merge = (target: any, source: any) => {
  // Iterate through `source` properties and if an `Object` set property to merge of `target` and `source` properties
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object) {
      Object.assign(source[key], merge(target[key], source[key]))
    }
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

export const isHTMLTag = /* #__PURE__ */ makeMap(HTML_TAGS)

export function isDOMElement(obj: any): obj is HTMLElement {
  return obj && obj.nodeType === 1
}

export function kebabToCamel(str: string) {
  return str.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
}

// CamelCase to kebab-case
const hyphenateRE = /\B([A-Z])/g
export function hyphenate(str: string) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
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
  if (!path) {
    return undefined
  }

  // Regex explained: https://regexr.com/58j0k
  const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g)

  return pathArray?.reduce((prevObj, key) => prevObj && prevObj[key], obj)
}

export const set = (obj: any, path: string | string[], value: any): void => {
  // Regex explained: https://regexr.com/58j0k
  const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g)

  if (pathArray) {
    pathArray.reduce((acc, key, i) => {
      if (acc[key] === undefined) {
        acc[key] = {}
      }
      if (i === pathArray.length - 1) {
        acc[key] = value
      }
      return acc[key]
    }, obj)
  }
}

export function deepEqual(a: any, b: any): boolean {
  if (isDOMElement(a) && isDOMElement(b)) {
    const attrsA = a.attributes
    const attrsB = b.attributes

    if (attrsA.length !== attrsB.length) {
      return false
    }

    return Array.from(attrsA).every(({ name, value }) => b.getAttribute(name) === value)
  }
  // If both are primitives, return true if they are equal
  if (a === b) {
    return true
  }

  // If either of them is null or not an object, return false
  if (a === null || typeof a !== 'object' || b === null || typeof b !== 'object') {
    return false
  }

  // Get the keys of both objects
  const keysA = Object.keys(a); const keysB = Object.keys(b)

  // If they have different number of keys, they are not equal
  if (keysA.length !== keysB.length) {
    return false
  }

  // Check each key in A to see if it exists in B and its value is the same in both
  for (const key of keysA) {
    if (!keysB.includes(key) || !deepEqual(a[key], b[key])) {
      return false
    }
  }

  return true
}

export function deepArrayEqual(arr1: any[], arr2: any[]): boolean {
  // If they're not both arrays, return false
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
    return false
  }

  // If they don't have the same length, they're not equal
  if (arr1.length !== arr2.length) {
    return false
  }

  // Check each element of arr1 against the corresponding element of arr2
  for (let i = 0; i < arr1.length; i++) {
    if (!deepEqual(arr1[i], arr2[i])) {
      return false
    }
  }

  return true
}

/**
 * TypeSafe version of Array.isArray
 */
export const isArray = Array.isArray as (a: any) => a is any[] | readonly any[]

export function editSceneObject(scene: Scene, objectUuid: string, propertyPath: string[], value: any): void {
  // Function to recursively find the object by UUID
  const findObjectByUuid = (node: Object3D): Object3D | undefined => {
    if (node.uuid === objectUuid) {
      return node
    }

    for (const child of node.children) {
      const found = findObjectByUuid(child)
      if (found) {
        return found
      }
    }

    return undefined
  }

  // Find the target object
  const targetObject = findObjectByUuid(scene)
  if (!targetObject) {
    console.warn('Object with UUID not found in the scene.')
    return
  }

  // Traverse the property path to get to the desired property
  let currentProperty: any = targetObject
  for (let i = 0; i < propertyPath.length - 1; i++) {
    if (currentProperty[propertyPath[i]] !== undefined) {
      currentProperty = currentProperty[propertyPath[i]]
    }
    else {
      console.warn(`Property path is not valid: ${propertyPath.join('.')}`)
      return
    }
  }

  // Set the new value
  const lastProperty = propertyPath[propertyPath.length - 1]
  if (currentProperty[lastProperty] !== undefined) {
    currentProperty[lastProperty] = value
  }
  else {
    console.warn(`Property path is not valid: ${propertyPath.join('.')}`)
  }
}

export function createHighlightMaterial(): MeshBasicMaterial {
  return new MeshBasicMaterial({
    color: 0xA7E6D7, // Highlight color, e.g., yellow
    transparent: true,
    opacity: 0.2,
    depthTest: false, // So the highlight is always visible
    side: DoubleSide, // To ensure the highlight is visible from all angles
  })
}
let animationFrameId: number | null = null
export function animateHighlight(highlightMesh: Mesh, startTime: number): void {
  const currentTime = Date.now()
  const time = (currentTime - startTime) / 1000 // convert to seconds

  // Pulsing effect parameters
  const scaleAmplitude = 0.07 // Amplitude of the scale pulsation
  const pulseSpeed = 2.5 // Speed of the pulsation

  // Calculate the scale factor with a sine function for pulsing effect
  const scaleFactor = 1 + scaleAmplitude * Math.sin(pulseSpeed * time)

  // Apply the scale factor
  highlightMesh.scale.set(scaleFactor, scaleFactor, scaleFactor)

  // Update the animation frame ID
  animationFrameId = requestAnimationFrame(() => animateHighlight(highlightMesh, startTime))
}

export function stopHighlightAnimation(): void {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }
}

export function createHighlightMesh(object: TresObject): Mesh {
  const highlightMaterial = new MeshBasicMaterial({
    color: 0xA7E6D7, // Highlight color, e.g., yellow
    transparent: true,
    opacity: 0.2,
    depthTest: false, // So the highlight is always visible
    side: DoubleSide, // To e
  })
  // Clone the geometry of the object. You might need a more complex approach
  // if the object's geometry is not straightforward.
  const highlightMesh = new HightlightMesh(object.geometry.clone(), highlightMaterial)

  return highlightMesh
}

export function extractBindingPosition(binding: any): Vector3 {
  let observer = binding.value
  if (binding.value && binding.value?.isMesh) {
    observer = binding.value.position
  }
  if (Array.isArray(binding.value)) { observer = new Vector3(...observer) }
  return observer
}

function hasMap(material: Material): material is Material & { map: Texture | null } {
  return 'map' in material
}

export function disposeMaterial(material: Material): void {
  if (hasMap(material) && material.map) {
    material.map.dispose()
  }

  material.dispose()
}

export function disposeObject3D(object: TresObject): void {
  if (object.parent) {
    object.removeFromParent?.()
  }
  delete object.__tres
  // Clone the children array to safely iterate
  const children = [...object.children]
  children.forEach(child => disposeObject3D(child))

  if (object instanceof Scene) {
    // Optionally handle Scene-specific cleanup
  }
  else {
    const mesh = object as unknown as Partial<Mesh>
    if (object) {
      object.dispose?.()
    }
    if (mesh.geometry) {
      mesh.geometry.dispose()
      delete mesh.geometry
    }

    if (Array.isArray(mesh.material)) {
      mesh.material.forEach(material => disposeMaterial(material))
      delete mesh.material
    }
    else if (mesh.material) {
      disposeMaterial(mesh.material)
      delete mesh.material
    }
  }
}

/**
 * Like Array.filter, but modifies the array in place.
 * @param array - Array to modify
 * @param callbackFn - A function called for each element of the array. It should return a truthy value to keep the element in the array.
 */
export function filterInPlace<T>(array: T[], callbackFn: (element: T, index: number) => unknown) {
  let i = 0
  for (let ii = 0; ii < array.length; ii++) {
    if (callbackFn(array[ii], ii)) {
      array[i] = array[ii]
      i++
    }
  }
  array.length = i
  return array
}

export function resolve(obj: Record<string, any>, key: string) {
  let target = obj
  if (key.includes('-')) {
    const entries = key.split('-')
    let currKey = entries.shift() as string
    while (target && entries.length) {
      if (!(currKey in target)) {
        currKey = joinAsCamelCase(currKey, entries.shift() as string)
      }
      else {
        target = target[currKey]
        currKey = entries.shift() as string
      }
    }
    return { target, key: joinAsCamelCase(currKey, ...entries) }
  }
  else {
    return { target, key }
  }
}

function joinAsCamelCase(...strings: string[]): string {
  return strings.map((s, i) => i === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1)).join('')
}

// Checks if a dash-cased string ends with an integer
const INDEX_REGEX = /-\d+$/

export function attach(parent: TresInstance, child: TresInstance, type: AttachType) {
  if (is.str(type)) {
    // NOTE: If attaching into an array (foo-0), create one
    if (INDEX_REGEX.test(type)) {
      const typeWithoutTrailingIndex = type.replace(INDEX_REGEX, '')
      const { target, key } = resolve(parent, typeWithoutTrailingIndex)
      if (!Array.isArray(target[key])) {
        // NOTE: Create the array and augment it with a function
        // that resets the original value if the array is empty or
        // `[undefined, undefined, ...]`. The function will be run
        // every time an element is `detach`ed from the array.
        const previousAttach = target[key]
        const augmentedArray: any[] & { __tresDetach?: () => void } = []
        augmentedArray.__tresDetach = () => {
          if (augmentedArray.every(v => is.und(v))) {
            target[key] = previousAttach
          }
        }
        target[key] = augmentedArray
      }
    }

    const { target, key } = resolve(parent, type)
    child.__tres.previousAttach = target[key]
    target[key] = unboxTresPrimitive(child)
  }
  else {
    child.__tres.previousAttach = type(parent, child)
  }
}

export function detach(parent: any, child: TresInstance, type: AttachType) {
  if (is.str(type)) {
    const { target, key } = resolve(parent, type)
    const previous = child.__tres.previousAttach
    // When the previous value was undefined, it means the value was never set to begin with
    if (previous === undefined) {
      delete target[key]
    }
    // NOTE: If the previous value was not an array, and `attach` turned it into an array
    // then it also set `__tresOnArrayElementsUndefined`. Check for it and revert
    // Otherwise set the previous value
    else {
      target[key] = previous
    }

    if ('__tresDetach' in target) { target.__tresDetach() }
  }
  else {
    child.__tres?.previousAttach?.(parent, child)
  }
  delete child.__tres?.previousAttach
}

export function prepareTresInstance<T extends TresObject>(obj: T, state: Partial<LocalState>, context: TresContext): TresInstance {
  const instance = obj as unknown as TresInstance

  instance.__tres = {
    type: 'unknown',
    eventCount: 0,
    root: context,
    handlers: {},
    memoizedProps: {},
    objects: [],
    parent: null,
    previousAttach: null,
    ...state,
  }

  if (!instance.__tres.attach) {
    if (instance.isMaterial) { instance.__tres.attach = 'material' }
    else if (instance.isBufferGeometry) { instance.__tres.attach = 'geometry' }
    else if (instance.isFog) { instance.__tres.attach = 'fog' }
  }

  return instance
}

export function invalidateInstance(instance: TresObject) {
  const ctx = instance?.__tres?.root

  if (!ctx) { return }

  if (ctx.render && ctx.render.canBeInvalidated.value) {
    ctx.invalidate()
  }
}

export function noop(fn: string): any {
  // eslint-disable-next-line ts/no-unused-expressions
  fn
}

export function setPixelRatio(renderer: { setPixelRatio?: (dpr: number) => void, getPixelRatio?: () => number }, systemDpr: number, userDpr?: number | [number, number]) {
  // NOTE: Optional `setPixelRatio` allows this function to accept
  // THREE renderers like SVGRenderer.
  if (!is.fun(renderer.setPixelRatio)) { return }

  let newDpr = 0

  if (is.arr(userDpr) && userDpr.length >= 2) {
    const [min, max] = userDpr
    newDpr = MathUtils.clamp(systemDpr, min, max)
  }
  else if (is.num(userDpr)) { newDpr = userDpr }
  else { newDpr = systemDpr }

  // NOTE: Don't call `setPixelRatio` unless both:
  // - the dpr value has changed
  // - the renderer has `setPixelRatio`; this check allows us to pass any THREE renderer
  if (newDpr !== renderer.getPixelRatio?.()) { renderer.setPixelRatio(newDpr) }
}

export function setPrimitiveObject(
  newObject: TresObject,
  primitive: TresPrimitive,
  setTarget: (object: TresObject) => void,
  nodeOpsFns: Pick<ReturnType<typeof nodeOps>, 'patchProp' | 'insert' | 'remove'>,
  context: TresContext,
) {
  // NOTE: copy added/attached Vue children
  // We need to insert `objects` into `newObject` later.
  // In the meantime, `remove(primitive)` will alter
  // the array, so make a copy.
  const objectsToAttach = [...primitive.__tres.objects]

  const oldObject = unboxTresPrimitive(primitive)
  newObject = unboxTresPrimitive(newObject)
  if (oldObject === newObject) { return true }

  const newInstance: TresInstance = prepareTresInstance(newObject, primitive.__tres ?? {}, context)

  // NOTE: `remove`ing `oldInstance` will modify `parent` and `memoizedProps`.
  // Copy before removing.
  const parent = primitive.parent ?? primitive.__tres.parent ?? null
  const propsToPatch = { ...primitive.__tres.memoizedProps }
  // NOTE: `object` is a reference to `oldObject` and not to be patched.
  delete propsToPatch.object

  // NOTE: detach/deactivate added/attached Vue children, but don't
  // otherwise alter them and don't recurse.
  for (const obj of objectsToAttach) {
    doRemoveDetach(obj, context)
    doRemoveDeregister(obj, context)
  }
  oldObject.__tres.objects = []

  nodeOpsFns.remove(primitive)

  for (const [key, value] of Object.entries(propsToPatch)) {
    nodeOpsFns.patchProp(newInstance, key, newInstance[key], value)
  }

  setTarget(newObject)
  nodeOpsFns.insert(primitive, parent)

  // NOTE: insert added/attached Vue children
  for (const obj of objectsToAttach) {
    nodeOpsFns.insert(obj, primitive)
  }

  return true
}

export function unboxTresPrimitive<T>(maybePrimitive: T): T | TresInstance {
  if (is.tresPrimitive(maybePrimitive)) {
    // NOTE:
    // `primitive` has-a THREE object. Multiple `primitive`s can have
    // the same THREE object. We want to allow the same THREE object
    // to be inserted in the graph in multiple places, where THREE supports
    // that, e.g., materials and geometries.
    // But __tres (`LocalState`) only allows for a single parent.
    // So: copy `__tres` to the object when unboxing.
    maybePrimitive.object.__tres = maybePrimitive.__tres
    return maybePrimitive.object
  }
  else {
    return maybePrimitive
  }
}

export function doRemoveDetach(node: TresObject, context: TresContext) {
  // NOTE: Remove `node` from its parent's __tres parent/objects graph
  const parent = node.__tres?.parent || context.scene.value
  if (node.__tres) { node.__tres.parent = null }
  if (parent && parent.__tres && 'objects' in parent.__tres) {
    filterInPlace(parent.__tres.objects, obj => obj !== node)
  }

  // NOTE: THREE.removeFromParent removes `node` from
  // `parent.children`.
  if (node.__tres?.attach) {
    detach(parent, node as TresInstance, node.__tres.attach)
  }
  else {
    // NOTE: In case this is a primitive, we added the :object, not
    // the primitive. So we "unbox" here to remove the :object.
    // If not a primitive, unboxing returns the argument.
    node.parent?.remove?.(unboxTresPrimitive(node))
    // NOTE: THREE doesn't set `node.parent` when removing `node`.
    // We will do that here to properly maintain the parent/children
    // graph as a source of truth.
    node.parent = null
  }
}

export function doRemoveDeregister(node: TresObject, context: TresContext) {
  // TODO: Refactor as `context.deregister`?
  // That would eliminate `context.deregisterCamera`.
  node.traverse?.((child: TresObject) => {
    context.deregisterCamera(child)
    // deregisterAtPointerEventHandlerIfRequired?.(child as TresObject)
    context.eventManager?.deregisterPointerMissedObject(child)
  })

  // NOTE: Deregister `node`
  context.deregisterCamera(node)
  /*  deregisterAtPointerEventHandlerIfRequired?.(node as TresObject) */
  invalidateInstance(node as TresObject)
}
