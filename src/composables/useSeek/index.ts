import { useLogger } from '../useLogger'

/**
 * Seek composable return type
 *
 * @export
 * @interface UseSeekReturn
 */
export interface UseSeekReturn {
  seek: (parent: THREE.Scene | THREE.Object3D, property: string, value: string) => THREE.Object3D | null
  seekByName: (parent: THREE.Scene | THREE.Object3D, value: string) => THREE.Object3D | null
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
   * @param {(THREE.Scene | THREE.Object3D)} parent
   * @param {string} property
   * @param {string} value
   * @return {*}  {(THREE.Object3D | null)}
   */
  function seek(parent: THREE.Scene | THREE.Object3D, property: string, value: string): THREE.Object3D | null {
    let foundChild: THREE.Object3D | null = null

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
   * Returns a child object of the parent given a child.name
   *
   * @param {(THREE.Scene | THREE.Object3D)} parent
   * @param {string} value
   * @return {*}  {(THREE.Object3D | null)}
   */
  function seekByName(parent: THREE.Scene | THREE.Object3D, value: string): THREE.Object3D | null {
    return seek(parent, 'name', value)
  }

  return {
    seek,
    seekByName,
  }
}
