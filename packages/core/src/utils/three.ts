import type { Object3D } from 'three'

/**
 * Recursively searches for an Object3D with the specified UUID within a Three.js scene graph.
 *
 * @param node - The root Object3D to start searching from
 * @param uuid - The unique identifier of the object to find
 * @returns The Object3D with the matching UUID, or undefined if not found
 */
export const getObjectByUuid = (node: Object3D, uuid: string): Object3D | undefined => {
  if (node.uuid === uuid) {
    return node
  }

  for (const child of node.children) {
    const found = getObjectByUuid(child, uuid)
    if (found) {
      return found
    }
  }

  return undefined
}
