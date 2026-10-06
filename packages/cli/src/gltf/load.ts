import type { Buffer } from 'node:buffer'
import type { AnimationClip, Group } from 'three'
import { readFile, readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, extname, sep } from 'node:path'
import { LoadingManager } from 'three'
import { installDomShim } from './dom-shim'

export interface LoadedGLTF {
  scene: Group
  animations: AnimationClip[]
  /** The runtime needs `useGLTF(url, { draco: true })` for these, or nothing renders. */
  draco: boolean
}

const MIME_TYPES: Record<string, string> = {
  '.bin': 'application/octet-stream',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ktx2': 'image/ktx2',
}

/**
 * `FileLoader` resolves sidecar resources through `fetch`, which in node handles
 * neither bare paths nor `file:` URLs. Inline them as data URIs instead — the only
 * transport both node and three agree on.
 */
function createFileManager(): LoadingManager {
  const manager = new LoadingManager()

  manager.setURLModifier((url) => {
    if (url.startsWith('data:') || url.startsWith('blob:')) {
      return url
    }
    const mime = MIME_TYPES[extname(url).toLowerCase()] ?? 'application/octet-stream'
    return `data:${mime};base64,${readFileSync(url).toString('base64')}`
  })

  return manager
}

/** three ships the decoder next to the loader; find it wherever `three` resolved. */
function dracoDecoderPath(): string {
  const require = createRequire(import.meta.url)
  return `${dirname(require.resolve('three/examples/jsm/libs/draco/draco_decoder.js'))}${sep}`
}

async function parse(data: ArrayBuffer | string, resourcePath: string): Promise<LoadedGLTF> {
  installDomShim()

  const manager = createFileManager()
  const [{ GLTFLoader }, { DRACOLoader }] = await Promise.all([
    import('three/examples/jsm/loaders/GLTFLoader.js'),
    import('three/examples/jsm/loaders/DRACOLoader.js'),
  ])

  const draco = new DRACOLoader(manager).setDecoderPath(dracoDecoderPath())

  try {
    const gltf = await new GLTFLoader(manager).setDRACOLoader(draco).parseAsync(data, resourcePath)
    const extensions: string[] = (gltf.parser as any)?.json?.extensionsUsed ?? []

    return {
      scene: gltf.scene,
      animations: gltf.animations,
      draco: extensions.includes('KHR_draco_mesh_compression'),
    }
  }
  finally {
    // Decoder workers are real threads; leaving them up hangs the CLI on exit.
    draco.dispose()
  }
}

/**
 * Parse a `.glb`/`.gltf` payload with the real `GLTFLoader`, so node names match
 * what `useGLTF` will produce at runtime — sanitization, uniquification and
 * primitive splitting included.
 */
export async function loadGLTF(data: ArrayBuffer): Promise<LoadedGLTF> {
  return parse(data, '')
}

/** Same, from disk, resolving any external `.bin` and textures next to the file. */
export async function loadGLTFFile(path: string): Promise<LoadedGLTF> {
  const buffer = await new Promise<Buffer>((resolve, reject) => {
    readFile(path, (error, contents) => (error ? reject(error) : resolve(contents)))
  })

  const isJSON = extname(path).toLowerCase() === '.gltf'
  const data: string | ArrayBuffer = isJSON
    ? buffer.toString('utf-8')
    : (buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength) as ArrayBuffer)

  return parse(data, `${dirname(path)}${sep}`)
}
