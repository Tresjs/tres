import { Buffer } from 'node:buffer'
import { mkdtemp, readFile, rm, stat, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { simpleGLB } from './__fixtures__/scenes'
import { loadGLTF } from './load'
import { transformGLTF } from './transform'

/**
 * A textured .glb built with glTF-Transform itself: three's exporter cannot encode
 * an image in node, and a real texture is the only way to exercise the webp path
 * and see a size reduction worth asserting on.
 */
async function texturedGLB(textureSize = 2048): Promise<ArrayBuffer> {
  const [{ Document, NodeIO }, { default: sharp }] = await Promise.all([
    import('@gltf-transform/core'),
    import('sharp'),
  ])

  // A patterned texture, not a flat colour: prune() legitimately collapses a
  // solid-colour texture into a material factor, which would defeat the webp test.
  const channels = 3
  const raw = Buffer.alloc(textureSize * textureSize * channels)
  for (let y = 0; y < textureSize; y++) {
    for (let x = 0; x < textureSize; x++) {
      const i = (y * textureSize + x) * channels
      raw[i] = (x ^ y) & 0xFF
      raw[i + 1] = (x * 3) & 0xFF
      raw[i + 2] = (y * 3) & 0xFF
    }
  }
  const png = await sharp(raw, { raw: { width: textureSize, height: textureSize, channels } }).png().toBuffer()

  const doc = new Document()
  const buffer = doc.createBuffer()
  const position = doc.createAccessor().setType('VEC3').setBuffer(buffer).setArray(new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 0]))
  const texcoord = doc.createAccessor().setType('VEC2').setBuffer(buffer).setArray(new Float32Array([0, 0, 1, 0, 0, 1]))
  const texture = doc.createTexture('color').setImage(new Uint8Array(png)).setMimeType('image/png')
  const material = doc.createMaterial('Painted').setBaseColorTexture(texture)
  const primitive = doc.createPrimitive()
    .setAttribute('POSITION', position)
    .setAttribute('TEXCOORD_0', texcoord)
    .setMaterial(material)
  const mesh = doc.createMesh('Plane').addPrimitive(primitive)
  const node = doc.createNode('Plane').setMesh(mesh)
  doc.createScene('Scene').addChild(node)

  const glb = await new NodeIO().writeBinary(doc)
  return glb.buffer.slice(glb.byteOffset, glb.byteOffset + glb.byteLength) as ArrayBuffer
}

describe('transformGLTF', () => {
  let dir: string

  beforeAll(async () => {
    dir = await mkdtemp(join(tmpdir(), 'tres-transform-'))
  })

  afterAll(async () => {
    await rm(dir, { recursive: true, force: true })
  })

  async function write(name: string, glb: ArrayBuffer): Promise<string> {
    const path = join(dir, name)
    await writeFile(path, Buffer.from(glb))
    return path
  }

  it('writes a separate optimized file and leaves the source untouched', async () => {
    const source = await texturedGLB()
    const input = await write('untouched.glb', source)
    const output = join(dir, 'untouched-transformed.glb')

    await transformGLTF(input, output)

    await expect(stat(output)).resolves.toBeDefined()
    expect(new Uint8Array(await readFile(input)).byteLength).toBe(source.byteLength)
  })

  it('reports before and after byte sizes, and shrinks a textured model', async () => {
    const input = await write('robot.glb', await texturedGLB())
    const output = join(dir, 'robot-transformed.glb')

    const { before, after } = await transformGLTF(input, output)

    expect(before).toBeGreaterThan(0)
    expect(after).toBeGreaterThan(0)
    expect(after).toBeLessThan(before)
  })

  it('produces a file our own loader can parse', async () => {
    const input = await write('loadable.glb', await texturedGLB(512))
    const output = join(dir, 'loadable-transformed.glb')

    await transformGLTF(input, output)

    const loaded = await loadGLTF(new Uint8Array(await readFile(output)).buffer as ArrayBuffer)
    expect(loaded.scene).toBeDefined()
  })

  it('converts textures to webp and clamps them to the resolution', async () => {
    const input = await write('webp.glb', await texturedGLB(2048))
    const output = join(dir, 'webp-transformed.glb')

    await transformGLTF(input, output, { format: 'webp', resolution: 512 })

    const [{ NodeIO }, { ALL_EXTENSIONS }, { createDecoderModule }] = await Promise.all([
      import('@gltf-transform/core'),
      import('@gltf-transform/extensions'),
      import('draco3dgltf'),
    ])
    const sharp = (await import('sharp')).default
    const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({ 'draco3d.decoder': await createDecoderModule() })
    const doc = await io.readBinary(new Uint8Array(await readFile(output)))
    const texture = doc.getRoot().listTextures()[0]

    expect(texture.getMimeType()).toBe('image/webp')
    const meta = await sharp(Buffer.from(texture.getImage()!)).metadata()
    expect(meta.width).toBeLessThanOrEqual(512)
  })

  it('draco-compresses geometry so our loader reports draco', async () => {
    const input = await write('draco.glb', await texturedGLB(256))
    const output = join(dir, 'draco-transformed.glb')

    await transformGLTF(input, output)

    const loaded = await loadGLTF(new Uint8Array(await readFile(output)).buffer as ArrayBuffer)
    expect(loaded.draco).toBe(true)
  })

  it('runs the simplify path without error when asked', async () => {
    const input = await write('simplify.glb', await simpleGLB())
    const output = join(dir, 'simplify-transformed.glb')

    await expect(transformGLTF(input, output, { simplify: true, ratio: 0.5 })).resolves.toBeDefined()
    await expect(stat(output)).resolves.toBeDefined()
  })
})
