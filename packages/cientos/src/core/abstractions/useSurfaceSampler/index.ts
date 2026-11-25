import {
  Color,
  InterleavedBuffer,
  Object3D,
  Vector3,
} from 'three'
import { MeshSurfaceSampler } from 'three-stdlib'
import { shallowRef, toRef, watch } from 'vue'
import type { InstancedMesh, Mesh, Object3DEventMap } from 'three'
import type { TresObject } from '@tresjs/core'

export interface SurfaceSamplerOptions {
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
  dummy: TresObject
  /**
   * The mesh that's initially passed to the sampler.
   * Use this if you need to apply transforms from your mesh to your instances
   * or if you need to grab attributes from the geometry.
   */
  sampledMesh: Mesh
}

export type TransformFn = (payload: TransformPayload, i: number) => void

export function useSurfaceSampler(options: SurfaceSamplerOptions) {
  // Only these options are reactive. `toRef` reads the property live, so keys
  // that are absent at setup (e.g. `mesh`) are still picked up when added later.
  const mesh = toRef(options, 'mesh')
  const count = toRef(options, 'count')
  const instanceMesh = toRef(options, 'instanceMesh')
  const weight = toRef(options, 'weight')
  // `transform` is intentionally not reactive: it is read once at setup.
  const transform = options.transform

  const buffer = shallowRef(new InterleavedBuffer(new Float32Array((count.value || 16) * 16), 16))

  const updateBuffer = () => {
    const sampledMesh = mesh.value
    if (!sampledMesh) { return }

    const size = count.value || 16
    if (buffer.value.count !== size) {
      buffer.value = new InterleavedBuffer(new Float32Array(size * 16), 16)
    }

    const sampler = new MeshSurfaceSampler(sampledMesh)

    if (weight.value) {
      sampler.setWeightAttribute(weight.value)
    }
    sampler.build()

    const position = new Vector3()
    const normal = new Vector3()
    const color = new Color()
    const dummy = new Object3D<Object3DEventMap>() as TresObject
    const instances = instanceMesh.value

    sampledMesh.updateMatrixWorld(true)

    for (let i = 0; i < size; i++) {
      sampler.sample(position, normal, color)

      if (typeof transform === 'function') {
        transform(
          {
            dummy,
            sampledMesh,
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

      if (instances) {
        instances.setMatrixAt(i, dummy.matrix)
      }
      dummy.matrix.toArray(buffer.value.array, i * 16)
    }
    if (instances) {
      instances.instanceMatrix.needsUpdate = true
    }

    buffer.value.needsUpdate = true
  }

  watch([mesh, count, instanceMesh, weight], updateBuffer, { immediate: true })

  return { buffer }
}
