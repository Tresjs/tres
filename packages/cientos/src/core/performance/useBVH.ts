import { type MaybeRefOrGetter, type Ref, ref, toValue, watch, watchEffect, onUnmounted } from 'vue'
import { MeshBVH, acceleratedRaycast } from 'three-mesh-bvh'
import { type Object3D, type BufferGeometry, Mesh, SkinnedMesh } from 'three'
/**
 * BVH options interface matching the drei implementation
 */
export interface BVHOptions {
  /** Split strategy, default: SAH (slowest to construct, fastest runtime, least memory) */
  splitStrategy?: 'CENTER' | 'AVERAGE' | 'SAH'
  /** Print out warnings encountered during tree construction, default: false */
  verbose?: boolean
  /** If true then the bounding box for the geometry is set once the BVH has been constructed, default: true */
  setBoundingBox?: boolean
  /** The maximum depth to allow the tree to build to, default: 40 */
  maxDepth?: number
  /** The number of triangles to aim for in a leaf node, default: 10 */
  maxLeafTris?: number
  /** If false then an index buffer is created if it does not exist and is rearranged */
  indirect?: boolean
}

export interface UseBVHOptions extends BVHOptions {
  /** Enabled, default: true */
  enabled?: MaybeRefOrGetter<boolean>
  /** Use .raycastFirst to retrieve hits which is generally faster, default: false */
  firstHitOnly?: boolean
}

interface ProcessedMesh {
  mesh: Mesh | SkinnedMesh
  originalRaycast: typeof Mesh.prototype.raycast
  geometry: BufferGeometry
  boundsTree: MeshBVH
}

/**
 * Vue composable for BVH optimization - speeds up raycasting exponentially
 * Automatically computes boundsTree and assigns acceleratedRaycast for meshes
 * Side-effect free: reverts to original raycast when disabled or unmounted
 */
export function useBVH(options: UseBVHOptions = {}) {
  const {
    enabled = true,
    firstHitOnly = false,
    splitStrategy = 'SAH',
    verbose = false,
    setBoundingBox = true,
    maxDepth = 40,
    maxLeafTris = 10,
    indirect = false,
  } = options

  // Reactive state - track the reactive enabled option
  const isEnabled = ref(toValue(enabled))
  const processedMeshes = ref<ProcessedMesh[]>([])

  // Sync isEnabled with reactive enabled option
  watchEffect(() => {
    isEnabled.value = toValue(enabled)
  })

  // BVH construction options
  const bvhOptions: BVHOptions = {
    splitStrategy,
    verbose,
    setBoundingBox,
    maxDepth,
    maxLeafTris,
    indirect,
  }

  /**
   * Recursively traverse object3D and find all meshes (including SkinnedMesh)
   */
  const getAllMeshes = (object: Object3D): (Mesh | SkinnedMesh)[] => {
    const meshes: (Mesh | SkinnedMesh)[] = []
    
    object.traverse((child) => {
      // Debug logging to see what objects are found
      if (verbose) {
        console.log(`BVH: Found object - Type: ${child.type}, Name: ${child.name || 'unnamed'}`)
      }
      
      // Check for both Mesh and SkinnedMesh using instanceof for more reliable detection
      if ((child instanceof Mesh || child instanceof SkinnedMesh) && 
          'geometry' in child && 'material' in child) {
        if (verbose) {
          console.log(`BVH: Adding mesh - Type: ${child.type}, Name: ${child.name || 'unnamed'}`)
        }
        meshes.push(child as Mesh | SkinnedMesh)
      }
    })
    
    return meshes
  }

  /**
   * Apply BVH optimization to a mesh (Mesh or SkinnedMesh)
   */
  const applyBVHToMesh = (mesh: Mesh | SkinnedMesh): ProcessedMesh | null => {
    if (!mesh.geometry || !mesh.geometry.attributes.position) {
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

            const material = Array.isArray(this.material) ? this.material[0] : this.material
            const side = material?.side ?? raycaster.params.Mesh?.side
            const hit = (boundsTree as MeshBVH).raycastFirst(
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
    } catch (error) {
      if (verbose) {
        console.error('BVH: Failed to create bounds tree for mesh', mesh, error)
      }
      return null
    }
  }

  /**
   * Remove BVH optimization from a mesh
   */
  const removeBVHFromMesh = (processedMesh: ProcessedMesh): void => {
    const { mesh, originalRaycast, geometry } = processedMesh

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
  const applyBVH = (object: Object3D): void => {
    if (!isEnabled.value) {
      if (verbose) {
        console.log('BVH: Optimization disabled, skipping')
      }
      return
    }

    if (verbose) {
      console.log('BVH: Starting mesh detection on object:', object)
    }

    const meshes = getAllMeshes(object)
    
    if (verbose) {
      console.log(`BVH: Found ${meshes.length} meshes to process`)
    }
    
    meshes.forEach((mesh, index) => {
      // Skip if already processed
      const alreadyProcessed = processedMeshes.value.find(pm => pm.mesh === mesh)
      if (alreadyProcessed) {
        if (verbose) {
          console.log(`BVH: Mesh ${index + 1} already processed, skipping`)
        }
        return
      }

      if (verbose) {
        console.log(`BVH: Processing mesh ${index + 1}/${meshes.length} - ${mesh.type}`)
      }

      const processedMesh = applyBVHToMesh(mesh)
      if (processedMesh) {
        processedMeshes.value.push(processedMesh)
        if (verbose) {
          console.log(`BVH: Successfully optimized mesh ${index + 1}`)
        }
      }
    })

    if (verbose) {
      console.log(`BVH: Applied optimization to ${processedMeshes.value.length} meshes`)
    }
  }

  /**
   * Remove BVH optimization from all processed meshes
   */
  const removeBVH = (): void => {
    processedMeshes.value.forEach(removeBVHFromMesh)
    processedMeshes.value = []
  }

  /**
   * Toggle BVH optimization
   */
  const setBVHEnabled = (enabled: boolean): void => {
    isEnabled.value = enabled
  }

  // Watch for enabled state changes
  watch(isEnabled, (newEnabled) => {
    if (!newEnabled) {
      removeBVH()
    }
  })

  // Cleanup on unmount
  onUnmounted(() => {
    removeBVH()
  })

  return {
    // State
    isEnabled,
    processedMeshes: processedMeshes as Ref<readonly ProcessedMesh[]>,
    
    // Methods
    applyBVH,
    removeBVH,
    setBVHEnabled,
    
    // Computed info
    get meshCount() {
      return processedMeshes.value.length
    },
  }
}

/**
 * Type definitions for the composable return
 */
export type UseBVHReturn = ReturnType<typeof useBVH> 