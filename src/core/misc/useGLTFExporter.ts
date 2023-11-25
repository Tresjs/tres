import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js'
import { ref } from 'vue'
import type { AnimationClip, Object3D } from 'three'
import { useLogger } from '@tresjs/core'

const { logError } = useLogger()

interface gltfExporterOptions {
  fileName?: string
  trs?: boolean
  onlyVisible?: boolean
  binary?: boolean
  maxTextureSize?: number
  animations?: AnimationClip[]
  includeCustomExtensions?: boolean
}

export async function useGLTFExporter(object3D: Object3D, options?: gltfExporterOptions ) {
  const exporter = new GLTFExporter()
  const objectToDownload = ref(object3D)
  const name = options?.fileName || object3D.name || 'scene'

  exporter.parse(
    objectToDownload.value,
    ( gltf: Object3D ) => {
      if ( gltf instanceof ArrayBuffer ) {
        saveArrayBuffer( gltf, `${name}.glb` )
      }
      else {
        const output = JSON.stringify( gltf, null, 2 )
        saveString( output, `${name}.gltf` )
      }
    },
    ( error: any ) => {
      logError( 'An error happened', error )
    },
    options,
  )
  return true
}

function saveString( text: string, filename: string ) {
  save( new Blob( [ text ], { type: 'text/plain' } ), filename )
}

function saveArrayBuffer( buffer: any, filename: string ) {
  save( new Blob( [ buffer ], { type: 'application/octet-stream' } ), filename )
}

function save( blob: Blob, filename: string ) {
  const link = document.createElement( 'a' )
  link.style.display = 'none'
  document.body.appendChild( link )
  link.href = URL.createObjectURL( blob )
  link.download = filename
  link.click()
  link.remove()
}