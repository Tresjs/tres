import { useLoop } from '@tresjs/core'
import type { Mesh } from 'three'
import { Plane, Vector3 } from 'three'
import type { ShallowRef } from 'vue'
import { computed } from 'vue'
import type { GridMaterialUniforms, GridProps } from './props'

export function useGrid(props: GridProps, mesh: ShallowRef<Mesh>) {
  const materialProps = computed(() => {
    const { args: _args, ...material } = props
    return material
  })

  const plane = new Plane()
  const upVector = new Vector3(0, 1, 0)
  const zeroVector = new Vector3(0, 0, 0)

  // `followCamera` and `fadeFrom` read these two positions.
  useLoop().onBeforeRender(({ camera }) => {
    if (!camera.value) { return }
    plane.setFromNormalAndCoplanarPoint(upVector, zeroVector).applyMatrix4(mesh.value.matrixWorld)

    const material = mesh.value.material as unknown as GridMaterialUniforms
    plane.projectPoint(camera.value.position, material.worldCamProjPosition)
    material.worldPlanePosition.set(0, 0, 0).applyMatrix4(mesh.value.matrixWorld)
  })

  return { materialProps }
}
