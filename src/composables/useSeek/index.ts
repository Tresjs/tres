import type { Object3D, Scene } from 'three'
import { useLogger } from '../useLogger'

/**
 * Seek composable return type
 *
 * @export
 * @interface UseSeekReturn
 */
export interface UseSeekReturn {
  seek: (parent: Scene | Object3D, property: string, value: string) => Object3D | null
  seekByName: (parent: Scene | Object3D, value: string) => Object3D | null
  seekAll: (parent: Scene | Object3D, property: string, value: string) => Object3D[]
  seekAllByName: (parent: Scene | Object3D, value: string) => Object3D[]
}

/**
 * Composable that provides utilities to easily traverse and navigate through complex scenes and object children graphs
 *
 * @export
 * @return {*}  {UseSeekReturn}
 */
export function useSeek(): UseSeekReturn {
  const { logWarning } = useLogger()

  /**
   * Returns a child object of the parent given a property
   *
   * @param {(Scene | Object3D)} parent
   * @param {string} property
   * @param {string} value
   * @return {*}  {(Object3D | null)}
   */
  function seek(parent: Scene | Object3D, property: string, value: string): Object3D | null {
    let foundChild: Object3D | null = null

    parent.traverse((child) => {
      if ((child as any)[property] === value) {
        foundChild = child
      }
    })

    if (!foundChild) {
      logWarning(`Child with ${property} '${value}' not found.`)
    }

    return foundChild
  }

  /**
   * Returns an array of child objects of the parent given a property
   *
   * @param {(Scene | Object3D)} parent
   * @param {string} property
   * @param {string} value
   * @return {*}  {(Object3D[])}
   */
  function seekAll(parent: Scene | Object3D, property: string, value: string): Object3D[] {
    const foundChildren: Object3D[] = []

    parent.traverse((child) => {
      if ((child as any)[property].includes(value)) {
        foundChildren.push(child)
      }
    })

    if (!foundChildren.length) {
      logWarning(`Children with ${property} '${value}' not found.`)
    }

    return foundChildren
  }

  /**
   * Returns a child object of the parent given a child.name
   *
   * @param {(Scene | Object3D)} parent
   * @param {string} value
   * @return {*}  {(Object3D | null)}
   */
  function seekByName(parent: Scene | Object3D, value: string): Object3D | null {
    return seek(parent, 'name', value)
  }

  /**
   * Returns an array of child objects of the parent given a child.name
   *
   * @param {(Scene | Object3D)} parent
   * @param {string} value
   * @return {*}  {(Object3D[])}
   */
  function seekAllByName(parent: Scene | Object3D, value: string): Object3D[] {
    return seekAll(parent, 'name', value)
  }

  return {
    seek,
    seekByName,
    seekAll,
    seekAllByName,
  }
}
