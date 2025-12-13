import type { Mesh } from 'three'
import { Matrix4, Vector3 } from 'three'
import { DecalGeometry } from 'three-stdlib'
import type { DecalData } from './DecalTypes'

export function updateDecalGeometry(
  targetMesh: Mesh,
  parent: Mesh,
  decal: DecalData,
  baseOffset = 0.01,
  layerGap = 0.001,
) {
  if (!targetMesh || !parent) { return }

  parent.updateMatrixWorld(true)

  if (targetMesh.geometry) {
    targetMesh.geometry.dispose()
  }

  const geometry = new DecalGeometry(
    parent as Mesh,
    decal.position,
    decal.orientation,
    decal.size,
  )

  const helperParent = targetMesh.parent
  const inverseMatrix = helperParent
    ? helperParent.matrixWorld.clone().invert()
    : new Matrix4()

  geometry.applyMatrix4(inverseMatrix)

  const worldNormal = new Vector3(0, 0, 1).applyEuler(decal.orientation)
  const localNormal = worldNormal.clone().transformDirection(inverseMatrix).normalize()

  const currentZ = decal.zIndex ?? 0

  const parentScale = parent.scale.x || 1
  const totalOffset = (baseOffset + (currentZ * layerGap)) / parentScale

  geometry.translate(
    localNormal.x * totalOffset,
    localNormal.y * totalOffset,
    localNormal.z * totalOffset,
  )

  targetMesh.geometry = geometry
}

export function getTextureNameForExport(tex: any): string {
  if (!tex) { return 'unknown_texture' }
  if (tex.name) { return tex.name }
  if (tex.userData && tex.userData.name) { return tex.userData.name }
  if (tex.image && tex.image.src) {
    const filename = tex.image.src.split('/').pop()?.split('?')[0]
    if (filename) { return decodeURIComponent(filename) }
  }
  return 'unknown_texture'
}
