/* eslint-disable no-console */
import { type MaybeRefOrGetter, onUnmounted, toValue, watch } from 'vue'
import { whenever } from '@vueuse/core'
import { acceleratedRaycast, BVHHelper, MeshBVH } from 'three-mesh-bvh'
import { type BufferGeometry, Group, Mesh, type Object3D, SkinnedMesh } from 'three'
import { isObject3D } from '@tresjs/core'
/**
 * BVH construction options (static - set once at creation, changing requires rebuild)
 */
export interface BVHOptions {
  /** Split strategy, default: SAH (slowest to construct, fastest runtime, least memory). */
  splitStrategy?: 'CENTER' | 'AVERAGE' | 'SAH'
  /** Print out warnings encountered during tree construction, default: false. */
  verbose?: boolean
  /** If true then the bounding box for the geometry is set once the BVH has been constructed, default: true. */
  setBoundingBox?: boolean
  /** The maximum depth to allow the tree to build to, default: 40. */
  maxDepth?: number
  /** The number of triangles to aim for in a leaf node, default: 10. */
  maxLeafSize?: number
  /** If false then an index buffer is created if it does not exist and is rearranged. */
  indirect?: boolean
}

export type UseBVHTarget = Group | Object3D | null | undefined
export interface UseBVHOptions extends BVHOptions {
  /** Enable/disable BVH optimization, default: true. */
  enabled?: MaybeRefOrGetter<boolean>
  /** Use .raycastFirst to retrieve hits which is generally faster, default: false. */
  firstHitOnly?: boolean
  /** Show debug visualization of BVH bounding boxes, default: false. */
  debug?: MaybeRefOrGetter<boolean>
}

interface ProcessedMesh {
  mesh: Mesh | SkinnedMesh
  originalRaycast: typeof Mesh.prototype.raycast
  geometry: BufferGeometry
  boundsTree: MeshBVH
  debugHelper?: BVHHelper
}

/**
 * Vue composable for BVH optimization - speeds up raycasting
 * Automatically computes boundsTree and assigns acceleratedRaycast for meshes
 * Side-effect free: reverts to original raycast when disabled or unmounted
 */
export const useBVH = (
  /** The object or group to apply BVH to. Usually the model */
  target: MaybeRefOrGetter<UseBVHTarget>,
  {
    enabled = true,
    firstHitOnly = false,
    splitStrategy = 'SAH',
    verbose = false,
    setBoundingBox = true,
    maxDepth = 40,
    maxLeafSize = 10,
    indirect = false,
    debug = false,
  }: UseBVHOptions = {},
): void => {
  const DEBUG_OPACITY = 0.3

  let processedMeshes: ProcessedMesh[] = []
  const debugGroup = new Group()
  debugGroup.name = 'BVH-Debug-Helpers'

  // BVH construction options
  const bvhOptions: BVHOptions = {
    splitStrategy,
    verbose,
    setBoundingBox,
    maxDepth,
    maxLeafSize,
    indirect,
  }

  /**
   * Recursively traverse object3D and find all meshes (including SkinnedMesh)
   */
  const getAllMeshes = (object: NonNullable<UseBVHTarget>): (Mesh | SkinnedMesh)[] => {
    const meshes: (Mesh | SkinnedMesh)[] = []

    object.traverse((child) => {
      if (verbose) {
        console.log(`BVH: Found object - Type: ${child.type}, Name: ${child.name || 'unnamed'}`)
      }

      if ((child instanceof Mesh || child instanceof SkinnedMesh)
        && 'geometry' in child && 'material' in child) {
        meshes.push(child as Mesh | SkinnedMesh)
      }
    })

    return meshes
  }

  /**
   * Apply BVH optimization to a mesh (Mesh or SkinnedMesh)
   */
  const applyBVHToMesh = (mesh: Mesh | SkinnedMesh): ProcessedMesh | null => {
    if (!mesh.geometry?.attributes.position) {
      if (verbose) {
        console.warn('BVH: Mesh has no geometry or position attribute', mesh)
      }
      return null
    }

    // Store original raycast method
    const originalRaycast = mesh.raycast

    try {
      // Compute bounds tree for the geometry
      const boundsTree = new MeshBVH(mesh.geometry, bvhOptions)

      // Store the bounds tree on the geometry for three-mesh-bvh
      mesh.geometry.boundsTree = boundsTree

      // Apply accelerated raycast
      if (firstHitOnly) {
        // Use raycastFirst for better performance when only first hit is needed
        mesh.raycast = function (raycaster, intersects) {
          const boundsTree = this.geometry.boundsTree
          if (boundsTree) {
            // Check layer intersection
            if (!this.layers.test(raycaster.layers)) {
              return
            }

            if (!(boundsTree instanceof MeshBVH)) {
              return
            }

            const material = Array.isArray(this.material) ? this.material[0] : this.material
            const side = material?.side ?? raycaster.params.Mesh?.side
            const hit = boundsTree.raycastFirst(
              raycaster.ray,
              side,
              raycaster.near,
              raycaster.far,
            )

            if (hit) {
              hit.object = this
              intersects.push(hit)
            }
          }
          else {
            originalRaycast.call(this, raycaster, intersects)
          }
        }
      }
      else {
        // Use standard accelerated raycast
        mesh.raycast = acceleratedRaycast
      }

      return {
        mesh,
        originalRaycast,
        geometry: mesh.geometry,
        boundsTree,
      }
    }
    catch (error) {
      if (verbose) {
        console.error('BVH: Failed to create bounds tree for mesh', mesh, error)
      }
      return null
    }
  }

  /**
   * Create debug helper for a processed mesh
   */
  const createDebugHelper = (processedMesh: ProcessedMesh): void => {
    const hasHelper = !!processedMesh.debugHelper
    if (hasHelper || !isObject3D(processedMesh.mesh)) {
      return
    }

    const helper = new BVHHelper(processedMesh.mesh, processedMesh.boundsTree, maxDepth)
    helper.opacity = DEBUG_OPACITY
    helper.update()
    processedMesh.debugHelper = helper
    processedMesh.mesh.parent?.add(helper)
  }

  /**
   * Remove debug helper from a processed mesh
   */
  const removeDebugHelper = (processedMesh: ProcessedMesh): void => {
    if (!processedMesh.debugHelper) {
      return
    }

    processedMesh.debugHelper.removeFromParent()
    processedMesh.debugHelper = undefined
  }

  /**
   * Remove BVH optimization from a mesh
   */
  const removeBVHFromMesh = (processedMesh: ProcessedMesh): void => {
    const { mesh, originalRaycast, geometry } = processedMesh

    // Remove debug helper first
    removeDebugHelper(processedMesh)

    // Restore original raycast method
    mesh.raycast = originalRaycast

    // Dispose the BVH to free memory using geometry's disposeBoundsTree method
    if (geometry.disposeBoundsTree) {
      geometry.disposeBoundsTree()
    }
    else if (geometry.boundsTree) {
      // Fallback: clear the reference if disposeBoundsTree is not available
      geometry.boundsTree = undefined
    }
  }

  /**
   * Apply BVH optimization to an object and all its mesh children
   */
  const applyBVH = (object: NonNullable<UseBVHTarget>): void => {
    if (!toValue(enabled)) {
      if (verbose) {
        console.log('BVH: Optimization disabled, skipping')
      }
      return
    }

    const meshes = getAllMeshes(object)
    const unprocessedMeshes = meshes.filter(mesh => !processedMeshes.some(pm => pm.mesh === mesh))

    unprocessedMeshes.forEach((mesh) => {
      const processedMesh = applyBVHToMesh(mesh)
      if (processedMesh) {
        processedMeshes.push(processedMesh)

        // Create debug helper if debug is enabled
        if (toValue(debug)) {
          createDebugHelper(processedMesh)
        }
      }
    })

    if (verbose) {
      console.log(`BVH: Applied optimization to ${processedMeshes.length} meshes`)
    }
  }

  /**
   * Remove BVH optimization from all processed meshes
   */
  const removeBVH = (): void => {
    processedMeshes.forEach(removeBVHFromMesh)
    processedMeshes = []
  }

  whenever(() => toValue(target), () => {
    const objectValue = toValue(target)
    if (objectValue && toValue(enabled)) {
      applyBVH(objectValue)
    }
  })

  watch(() => toValue(enabled), (enabled) => {
    if (enabled) {
      const objectValue = toValue(target)
      if (objectValue) {
        applyBVH(objectValue)
      }
    }
    else {
      removeBVH()
    }
  })

  watch(() => toValue(debug), () => {
    processedMeshes.forEach(toValue(debug) ? createDebugHelper : removeDebugHelper)
  }, { immediate: true })

  onUnmounted(() => {
    removeBVH()
  })
}
