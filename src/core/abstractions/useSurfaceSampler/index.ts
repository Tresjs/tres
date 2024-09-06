import {
  Color,
  InterleavedBuffer,
  Object3D,
  Vector3,
} from 'three'
import { MeshSurfaceSampler } from 'three-stdlib'
import { ref } from 'vue'
import type { InstancedMesh, Mesh } from 'three'

export interface useSurfaceSamplerProps {
  /*
   * A function that can be .
   *
   * @type {function}
   * @memberof useSamplerProps
   */
  transform?: TransformFn
  /*
   * Specifies a vertex attribute to be used as a weight when sampling from the surface.
   *
   * @type {string}
   * @memberof useSamplerProps
   */
  weight?: string
  /*
   * Number of samples.
   *
   * @type {number}
   * @memberof useSamplerProps
   */
  count?: number
  /*
   * Surface mesh from which to sample.
   *
   * @type {Mesh}
   * @memberof useSamplerProps
   */
  mesh?: Mesh
  /*
   * Instanced mesh to scatter.
   *
   * @type {InstancedMesh}
   * @memberof useSamplerProps
   */
  instanceMesh?: InstancedMesh | null
}

interface SamplePayload {
  /**
   * The position of the sample.
   */
  position: Vector3
  /**
   * The normal of the mesh at the sampled position.
   */
  normal: Vector3
  /**
   * The vertex color of the mesh at the sampled position.
   */
  color: Color
}

type TransformPayload = SamplePayload & {
  /**
   * The dummy object used to transform each instance.
   * This object's matrix will be updated after transforming & it will be used
   * to set the instance's matrix.
   */
  dummy: Object3D
  /**
   * The mesh that's initially passed to the sampler.
   * Use this if you need to apply transforms from your mesh to your instances
   * or if you need to grab attributes from the geometry.
   */
  sampledMesh: Mesh
}

export type TransformFn = (payload: TransformPayload, i: number) => void

export const useSurfaceSampler = (
  mesh: Mesh,
  count: number = 16,
  instanceMesh?: InstancedMesh | null,
  weight?: string,
  transform?: TransformFn,
) => {
  const arr = new Float32Array(count * 16)
  const buffer = ref(new InterleavedBuffer(arr, 16))

  const updateBuffer = () => {
    if (!mesh) { return }

    const sampler = new MeshSurfaceSampler(mesh)

    if (weight) {
      sampler.setWeightAttribute(weight)
    }
    sampler.build()

    const position = new Vector3()
    const normal = new Vector3()
    const color = new Color()
    const dummy = new Object3D()

    mesh.updateMatrixWorld(true)

    for (let i = 0; i < count; i++) {
      sampler.sample(position, normal, color)

      if (typeof transform === 'function') {
        transform(
          {
            dummy,
            sampledMesh: mesh,
            position,
            normal,
            color,
          },
          i,
        )
      }
      else {
        dummy.position.copy(position)
      }
      dummy.updateMatrix()

      if (instanceMesh) {
        instanceMesh.setMatrixAt(i, dummy.matrix)
      }
      dummy.matrix.toArray(buffer.value.array, i * 16)
    }
    if (instanceMesh) {
      instanceMesh.instanceMatrix.needsUpdate = true
    }

    buffer.value.needsUpdate = true
  }

  updateBuffer()

  return { buffer }
}
