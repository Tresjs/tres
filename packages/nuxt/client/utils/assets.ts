import type { AssetLoadData } from '@tresjs/core'
import { bytesToKB, calculateMemoryUsage } from './perf'
import type { Material, Texture } from 'three'
import { Scene, Mesh, WebGLRenderer, PerspectiveCamera, Box3, Vector3, AmbientLight, DirectionalLight } from 'three'

export interface AssetInfo {
  id: string
  name: string
  type: 'texture' | 'material' | 'model'
  size?: string
  dimensions?: string
  format?: string
  usage?: number
  source?: string
  preview?: string // Base64 or URL for preview
  resolution?: string // Resolution in K format (e.g., "1K", "2K")
  object?: unknown // Reference to the original Three.js object
}

export function formatMemorySize(kb: number) {
  if (kb < 1024) return `${kb} KB`
  return `${(kb / 1024).toFixed(1)} MB`
}

/**
 * Extracts all materials from the scene
 */
export function extractMaterials(scene: Scene): AssetInfo[] {
  const materials = new Map<string, Material>()

  scene.traverse((object) => {
    if (object instanceof Mesh && object.material) {
      const mats = Array.isArray(object.material) ? object.material : [object.material]
      mats.forEach((material: Material) => {
        materials.set(material.uuid, material)
      })
    }
  })

  return Array.from(materials.values()).map((material): AssetInfo => ({
    id: material.uuid,
    name: material.name || material.type || 'Unnamed Material',
    type: 'material',
    format: material.type,
    usage: 1, // Materials are lightweight
  }))
}

/**
 * Gets all assets from the scene
 */
export function extractAllAssets(scene: Scene): AssetInfo[] {
  return [
    ...extractMaterials(scene),
  ]
}

// Helper functions
function getTextureFormat(texture: Texture): string {
  const formatMap: Record<number, string> = {
    1023: 'RGB',
    1024: 'RGBA',
    1025: 'Alpha',
    1026: 'Luminance',
    1027: 'LuminanceAlpha',
  }
  return formatMap[texture.format] || 'Unknown'
}

function getTextureSource(texture: Texture): string {
  if (texture.image) {
    if (texture.image.src) return texture.image.src.split('/').pop() || 'Unknown'
    if (texture.image.currentSrc) return texture.image.currentSrc.split('/').pop() || 'Unknown'
  }
  return 'Generated'
}

function getTextureMemoryUsage(texture: Texture): number {
  if (!texture.image) return 0

  const width = texture.image.width || 0
  const height = texture.image.height || 0

  // Estimate bytes per pixel based on format
  let bytesPerPixel = 4 // RGBA default
  if (texture.format === 1023) bytesPerPixel = 3 // RGB
  if (texture.format === 1025) bytesPerPixel = 1 // Alpha

  // Calculate memory usage in KB (GPU memory, not file size)
  const memoryBytes = width * height * bytesPerPixel
  return Math.round(memoryBytes / 1024) // Convert to KB
}

/**
 * Generate a preview image for a texture
 */
function getTexturePreview(texture: Texture): string | undefined {
  try {
    if (texture.image) {
      // For HTMLImageElement, HTMLCanvasElement, or ImageBitmap
      if (texture.image.src) {
        return texture.image.src
      }

      // For canvas or other image types, convert to data URL
      if (texture.image instanceof HTMLCanvasElement) {
        return texture.image.toDataURL()
      }

      // For other image elements, try to get currentSrc
      if (texture.image.currentSrc) {
        return texture.image.currentSrc
      }
    }
  }
  catch (error) {
    console.warn('Failed to get texture preview:', error)
  }
  return undefined
}

function getModelFormat(url: string): string {
  return url.split('.').pop() || 'Unknown'
}

function getModelName(url: string): string {
  return url.split('/').pop()?.split('.').shift() || 'Unknown'
}

/**
 * Attempt to repair corrupted buffer data from devtools messaging
 */
function repairCorruptedBuffers(object: Object3D): boolean {
  let wasCorrupted = false

  object.traverse((child) => {
    if (child.geometry && child.geometry.attributes) {
      // Check and repair each attribute
      Object.keys(child.geometry.attributes).forEach((attributeName) => {
        const attribute = child.geometry.attributes[attributeName]

        if (attribute && attribute.array) {
          // Check if it's corrupted (not a proper TypedArray)
          const isFloat32Array = attribute.array instanceof Float32Array
          const isUint16Array = attribute.array instanceof Uint16Array
          const isUint32Array = attribute.array instanceof Uint32Array

          if (!isFloat32Array && !isUint16Array && !isUint32Array) {
            wasCorrupted = true

            try {
              // Convert serialized array back to proper TypedArray
              let arrayData: number[] = []

              if (typeof attribute.array === 'string') {
                // Handle comma-separated string
                arrayData = attribute.array.split(',').map(Number)
              }
              else if (Array.isArray(attribute.array)) {
                // Handle regular array
                arrayData = attribute.array
              }
              else if (attribute.array.length !== undefined) {
                // Handle array-like object
                arrayData = Array.from(attribute.array as ArrayLike<number>)
              }

              // Determine correct TypedArray type based on attribute name and data
              let repairedArray: Float32Array | Uint16Array | Uint32Array

              if (attributeName === 'index' || attributeName.includes('index')) {
                // Index buffers use integer arrays
                const maxValue = Math.max(...arrayData)
                if (maxValue > 65535) {
                  repairedArray = new Uint32Array(arrayData)
                }
                else {
                  repairedArray = new Uint16Array(arrayData)
                }
              }
              else {
                // Position, normal, uv, etc. use float arrays
                repairedArray = new Float32Array(arrayData)
              }

              attribute.array = repairedArray

              // Mark geometry as needing update
              attribute.needsUpdate = true

              if (process.env.NODE_ENV === 'development') {
                console.log(`Repaired ${attributeName} buffer for geometry:`, child.name, 'as', repairedArray.constructor.name)
              }
            }
            catch (error) {
              if (process.env.NODE_ENV === 'development') {
                console.warn(`Failed to repair ${attributeName} buffer for geometry:`, child.name, error)
              }
              return false
            }
          }
        }
      })

      // Also check and repair the index buffer
      if (child.geometry.index && child.geometry.index.array) {
        const indexArray = child.geometry.index.array
        const isUint16Array = indexArray instanceof Uint16Array
        const isUint32Array = indexArray instanceof Uint32Array

        if (!isUint16Array && !isUint32Array) {
          wasCorrupted = true

          try {
            let arrayData: number[] = []

            if (typeof indexArray === 'string') {
              arrayData = indexArray.split(',').map(Number)
            }
            else if (Array.isArray(indexArray)) {
              arrayData = indexArray
            }
            else if (indexArray.length !== undefined) {
              arrayData = Array.from(indexArray as ArrayLike<number>)
            }

            // Determine if we need Uint16 or Uint32 based on max value
            const maxValue = Math.max(...arrayData)
            let repairedArray: Uint16Array | Uint32Array

            if (maxValue > 65535) {
              repairedArray = new Uint32Array(arrayData)
            }
            else {
              repairedArray = new Uint16Array(arrayData)
            }

            child.geometry.index.array = repairedArray
            child.geometry.index.needsUpdate = true

            if (process.env.NODE_ENV === 'development') {
              console.log(`Repaired index buffer for geometry:`, child.name, 'as', repairedArray.constructor.name)
            }
          }
          catch (error) {
            if (process.env.NODE_ENV === 'development') {
              console.warn(`Failed to repair index buffer for geometry:`, child.name, error)
            }
            return false
          }
        }
      }
    }
  })

  return wasCorrupted
}

/**
 * Check if a model has corrupted buffer data from devtools messaging
 */
function checkForCorruptedBuffers(object: Object3D): boolean {
  let hasCorruption = false

  object.traverse((child) => {
    if (child.geometry && child.geometry.attributes) {
      // Check if position attribute exists and has valid data
      const position = child.geometry.attributes.position
      if (position && position.array) {
        // Check if the array contains invalid data (serialized arrays from devtools)
        const isActualTypedArray = position.array instanceof Float32Array

        if (!isActualTypedArray) {
          hasCorruption = true
          // Only log in development
          if (process.env.NODE_ENV === 'development') {
            console.warn('Detected corrupted buffer data in geometry:', child.name)
          }
        }
      }
    }
  })

  return hasCorruption
}

/**
 * Generate a preview image for a 3D model
 */
function getModelPreview(model: Object3D): string | undefined {
  try {
    // Check if the model has corrupted buffer data (from devtools messaging)

    // Create offscreen renderer
    const renderer = new WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
    })
    renderer.setSize(256, 256) // Small preview size
    renderer.setClearColor(0x000000, 0) // Dark gray background for better visibility

    // Create scene and camera
    const scene = new Scene()
    const camera = new PerspectiveCamera(45, 1, 0.1, 1000)

    let object = model
    if (model.scene) {
      object = model.scene
    }

    const cloned = object.clone()

    // Try to repair corrupted buffers first
    repairCorruptedBuffers(cloned)

    // Double-check if there are still corrupted buffers after repair attempt
    const stillCorrupted = checkForCorruptedBuffers(cloned)
    if (stillCorrupted) {
      // Skip preview generation if repair failed
      return undefined
    }

    // Use the original object directly (corruption already checked above)
    scene.add(cloned)

    // Auto-fit camera to model bounds
    const box = new Box3().setFromObject(cloned)
    const center = box.getCenter(new Vector3())
    const size = box.getSize(new Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)

    // Handle empty or invalid bounds
    if (maxDim === 0 || !Number.isFinite(maxDim)) {
      // Fallback positioning
      camera.position.set(3, 3, 3)
      camera.lookAt(0, 0, 0)
    }
    else {
      // Position camera at an angle for better view
      const distance = maxDim * 2.5
      camera.position.set(
        center.x + distance * 0.7,
        center.y + distance * 0.5,
        center.z + distance * 0.7,
      )
      camera.lookAt(center)
    }

    // Add stronger lighting
    const ambientLight = new AmbientLight(0x404040, 0.8)
    const directionalLight1 = new DirectionalLight(0xFFFFFF, 1.0)
    directionalLight1.position.set(1, 1, 1)
    const directionalLight2 = new DirectionalLight(0xFFFFFF, 0.5)
    directionalLight2.position.set(-1, -1, -1)

    scene.add(ambientLight, directionalLight1, directionalLight2)

    // Render to canvas
    renderer.render(scene, camera)
    const dataURL = renderer.domElement.toDataURL('image/png')

    // Cleanup
    renderer.dispose()

    return dataURL
  }
  catch (error) {
    console.warn('Failed to generate model preview:', error)
    return undefined
  }
}

export function formatAsset(asset: AssetLoadData): AssetInfo {
  if (asset.loader.name === 'sg' || asset.loader.name === 'FBXLoader') {
    const preview = getModelPreview(asset.asset)
    return {
      id: asset.id,
      name: asset.name,
      type: 'model',
      format: getModelFormat(asset.url),
      source: getModelName(asset.url),
      usage: bytesToKB(calculateMemoryUsage(asset.asset)),
      preview, // Add model preview
      // object: asset.asset,
    }
  }
  else if (asset.loader.name === 'TextureLoader') {
    const image = asset.asset.image
    const size = image ? `${image.width}x${image.height}` : 'Unknown'
    const preview = getTexturePreview(asset.asset)
    return {
      id: asset.id,
      name: asset.name,
      preview,
      type: 'texture',
      dimensions: size,
      format: getTextureFormat(asset.asset),
      source: getTextureSource(asset.asset),
      usage: getTextureMemoryUsage(asset.asset),
      resolution: `${image.width / 1024}K`,
    }
  }
  return {
    id: asset.id,
    name: asset.name,
    type: 'texture',
    format: getTextureFormat(asset.asset),
    source: getTextureSource(asset.asset),
    usage: getTextureMemoryUsage(asset.asset),
  }
}
