import type { Transform } from '@gltf-transform/core'
import { stat } from 'node:fs/promises'

/** The formats sharp can encode; webp is the default and wins on nearly every asset. */
export type TextureFormat = 'webp' | 'jpeg' | 'png' | 'avif'

export interface TransformOptions {
  /** Max texture width/height, aspect preserved. Default 1024. */
  resolution?: number
  /** Target texture format. Default webp. */
  format?: TextureFormat
  /** Collapse geometry with meshoptimizer. Off by default; it is lossy. */
  simplify?: boolean
  /** Fraction of vertices to keep when simplifying. Default 0 (as few as the error allows). */
  ratio?: number
  /** Error ceiling when simplifying, as a fraction of mesh radius. Default 0.001. */
  error?: number
  /** Skip join(), which merges compatible meshes into one draw call. */
  keepMeshes?: boolean
  /** Skip palette(), which batches simple materials into a texture atlas. */
  keepMaterials?: boolean
}

export interface TransformResult {
  /** Source file size in bytes. */
  before: number
  /** Optimized file size in bytes. */
  after: number
}

const DEFAULT_RESOLUTION = 1024
const DEFAULT_FORMAT: TextureFormat = 'webp'
const DEFAULT_ERROR = 0.001

/** min unique materials/meshes before palette/instance pay off; glTF-Transform's own default. */
const BATCH_MIN = 5

/**
 * Optimize a model with glTF-Transform and write it to a new file, returning the
 * before/after sizes. The source is only ever read, never written.
 *
 * Every heavy dependency (glTF-Transform, sharp, draco, meshopt) is imported here
 * rather than at module load, so the plain `gltf` command pays nothing for a
 * pipeline it never runs.
 */
export async function transformGLTF(
  input: string,
  output: string,
  options: TransformOptions = {},
): Promise<TransformResult> {
  const {
    resolution = DEFAULT_RESOLUTION,
    format = DEFAULT_FORMAT,
    simplify: doSimplify = false,
    ratio = 0,
    error = DEFAULT_ERROR,
    keepMeshes = false,
    keepMaterials = false,
  } = options

  const [
    { NodeIO },
    { ALL_EXTENSIONS },
    fns,
    { createDecoderModule, createEncoderModule },
    { MeshoptSimplifier },
    { default: sharp },
  ] = await Promise.all([
    import('@gltf-transform/core'),
    import('@gltf-transform/extensions'),
    import('@gltf-transform/functions'),
    import('draco3dgltf'),
    import('meshoptimizer'),
    import('sharp'),
  ]).catch((cause) => {
    throw new Error(`Could not load the optimization toolchain (glTF-Transform, sharp, draco). Reinstall dependencies and try again.`, { cause })
  })

  const io = new NodeIO()
    .registerExtensions(ALL_EXTENSIONS)
    .registerDependencies({
      'draco3d.decoder': await createDecoderModule(),
      'draco3d.encoder': await createEncoderModule(),
    })

  const document = await io.read(input)

  // Weld is required before simplify, and the simplifier's wasm must be ready.
  await MeshoptSimplifier.ready

  const pipeline: Transform[] = [
    fns.dedup(),
    ...(keepMaterials ? [] : [fns.palette({ min: BATCH_MIN })]),
    fns.flatten(),
    fns.dequantize(),
    ...(keepMeshes ? [] : [fns.join()]),
    fns.weld(),
    ...(doSimplify ? [fns.simplify({ simplifier: MeshoptSimplifier, ratio, error })] : []),
    fns.resample(),
    fns.prune(),
    fns.sparse(),
    fns.textureCompress({ encoder: sharp, targetFormat: format, resize: [resolution, resolution] }),
    fns.draco(),
  ]

  await document.transform(...pipeline)
  await io.write(output, document)

  const [source, optimized] = await Promise.all([stat(input), stat(output)])
  return { before: source.size, after: optimized.size }
}
