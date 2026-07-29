/**
 * GLB fixtures built at test time with three's own GLTFExporter, so they stay in
 * sync with the loader we parse them back with and no binaries live in the repo.
 *
 * Names here are deliberately hostile: dots, spaces and post-sanitization
 * collisions are what real Blender exports look like.
 */
import { Buffer } from 'node:buffer'
import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import type {
  Object3D,
} from 'three'
import {
  AnimationClip,
  Bone,
  BoxGeometry,
  DirectionalLight,
  Float32BufferAttribute,
  Group,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Skeleton,
  SkinnedMesh,
  Uint16BufferAttribute,
  VectorKeyframeTrack,
} from 'three'
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js'

/** GLTFExporter reads its output blob through FileReader, which node lacks. */
function installExporterShim(): void {
  if ('FileReader' in globalThis) {
    return
  }
  // @ts-expect-error minimal stand-in, only the two methods the exporter calls
  globalThis.FileReader = class {
    result: ArrayBuffer | string | null = null
    onloadend: (() => void) | null = null

    readAsArrayBuffer(blob: Blob): void {
      blob.arrayBuffer().then((buffer) => {
        this.result = buffer
        this.onloadend?.()
      })
    }

    readAsDataURL(blob: Blob): void {
      blob.arrayBuffer().then((buffer) => {
        this.result = `data:${blob.type};base64,${Buffer.from(buffer).toString('base64')}`
        this.onloadend?.()
      })
    }
  }
}

async function toGLB(scene: Object3D, animations: AnimationClip[] = []): Promise<ArrayBuffer> {
  installExporterShim()
  const result = await new GLTFExporter().parseAsync(scene, { binary: true, animations })
  return result as ArrayBuffer
}

const GLB_HEADER_BYTES = 12
const GLB_CHUNK_PREFIX_BYTES = 8
const GLB_CHUNK_TYPE_JSON = 0x4E4F534A

function pad(buffer: Buffer, filler: number): Buffer {
  const remainder = buffer.byteLength % 4
  return remainder === 0 ? buffer : Buffer.concat([buffer, Buffer.alloc(4 - remainder, filler)])
}

/**
 * three's exporter never writes `meshes[].name`, but Blender always does, and that
 * name is what the loader suffixes `_1`, `_2`… per primitive. Patch it back in so
 * multi-primitive fixtures look like a real export.
 */
function patchGLBJson(glb: ArrayBuffer, mutate: (json: any) => void): ArrayBuffer {
  const view = Buffer.from(glb)
  const jsonLength = view.readUInt32LE(GLB_HEADER_BYTES)
  const jsonStart = GLB_HEADER_BYTES + GLB_CHUNK_PREFIX_BYTES
  const json = JSON.parse(view.subarray(jsonStart, jsonStart + jsonLength).toString('utf-8'))

  mutate(json)

  const rest = view.subarray(jsonStart + jsonLength)
  const jsonChunk = pad(Buffer.from(JSON.stringify(json), 'utf-8'), 0x20)
  const jsonPrefix = Buffer.alloc(GLB_CHUNK_PREFIX_BYTES)
  jsonPrefix.writeUInt32LE(jsonChunk.byteLength, 0)
  jsonPrefix.writeUInt32LE(GLB_CHUNK_TYPE_JSON, 4)

  const header = Buffer.from(view.subarray(0, GLB_HEADER_BYTES))
  const total = header.byteLength + jsonPrefix.byteLength + jsonChunk.byteLength + rest.byteLength
  header.writeUInt32LE(total, 8)

  const out = Buffer.concat([header, jsonPrefix, jsonChunk, rest])
  return out.buffer.slice(out.byteOffset, out.byteOffset + out.byteLength)
}

function skinnedBoxGeometry(): BoxGeometry {
  const geometry = new BoxGeometry(1, 1, 1)
  const count = geometry.attributes.position.count
  geometry.setAttribute('skinIndex', new Uint16BufferAttribute(new Uint16Array(count * 4), 4))
  geometry.setAttribute(
    'skinWeight',
    new Float32BufferAttribute(Float32Array.from({ length: count * 4 }, (_, i) => (i % 4 === 0 ? 1 : 0)), 4),
  )
  return geometry
}

/** One named mesh with a dotted name and a space in its material name. */
export function simpleGLB(): Promise<ArrayBuffer> {
  const scene = new Group()
  scene.name = 'Scene'

  const mesh = new Mesh(new BoxGeometry(1, 1, 1), new MeshStandardMaterial({ name: 'Autumm orange' }))
  mesh.name = 'Cube.001'
  mesh.position.set(0, 2.4, 0)
  scene.add(mesh)

  return toGLB(scene)
}

/**
 * Every node named `Object_N`, the way marketplace assets come out of Sketchfab.
 * The authored-name heuristic finds nothing to slot here, which is the whole point.
 */
export function exporterNamedGLB(): Promise<ArrayBuffer> {
  const scene = new Group()
  scene.name = 'Scene'

  const material = new MeshStandardMaterial({ name: 'Robe' })
  for (const index of [2, 3]) {
    const mesh = new Mesh(new BoxGeometry(1, 1, 1), material)
    mesh.name = `Object_${index}`
    scene.add(mesh)
  }

  return toGLB(scene)
}

/**
 * The shape every Sketchfab download has: a transformed `Sketchfab_model` wrapper
 * over meshes called `Object_N`. The wrapper is noise, but it survives pruning
 * because it carries a rotation.
 */
export function sketchfabGLB(): Promise<ArrayBuffer> {
  const scene = new Group()
  scene.name = 'Scene'

  const wrapper = new Group()
  wrapper.name = 'Sketchfab_model'
  wrapper.rotation.set(-Math.PI / 2, 0, 0)
  scene.add(wrapper)

  const material = new MeshStandardMaterial({ name: 'Robe' })
  for (const index of [2, 3]) {
    const mesh = new Mesh(new BoxGeometry(1, 1, 1), material)
    mesh.name = `Object_${index}`
    wrapper.add(mesh)
  }

  return toGLB(scene)
}

/** A light and a camera: nodes the emitter cannot express as plain Tres elements. */
export function lightAndCameraGLB(): Promise<ArrayBuffer> {
  const scene = new Group()
  scene.name = 'Scene'

  const light = new DirectionalLight('#fff4e6', 2.5)
  light.name = 'Sun'
  light.position.set(5, 10, 5)

  const camera = new PerspectiveCamera(35, 1, 0.1, 100)
  camera.name = 'Shot'

  scene.add(light, camera)

  return toGLB(scene)
}

/** A mesh with morph targets and glTF `extras`, which the loader surfaces as userData. */
export function morphAndMetaGLB(): Promise<ArrayBuffer> {
  const scene = new Group()
  scene.name = 'Scene'

  const geometry = new BoxGeometry(1, 1, 1)
  const positions = geometry.attributes.position
  geometry.morphAttributes.position = [
    new Float32BufferAttribute(Float32Array.from({ length: positions.count * 3 }, () => 0.1), 3),
  ]

  const mesh = new Mesh(geometry, new MeshStandardMaterial({ name: 'Skin' }))
  mesh.name = 'Face'
  mesh.morphTargetInfluences = [0]
  mesh.morphTargetDictionary = { Smile: 0 }
  mesh.userData = { collider: 'trimesh' }
  scene.add(mesh)

  return toGLB(scene)
}

/**
 * A geometry with two material groups, which glTF stores as two primitives and the
 * loader splits back into sibling meshes.
 *
 * `namedNode: false` drops the glTF node name, which is how plenty of exports look.
 * It matters: with a named node the wrapping Group claims the bare name and the
 * primitives start at `_1`, without one the first primitive claims it.
 */
export async function multiPrimitiveGLB({ namedNode = true } = {}): Promise<ArrayBuffer> {
  const scene = new Group()
  scene.name = 'Scene'

  const geometry = new BoxGeometry(1, 1, 1)
  geometry.clearGroups()
  geometry.addGroup(0, 18, 0)
  geometry.addGroup(18, 18, 1)

  const mesh = new Mesh(geometry, [
    new MeshStandardMaterial({ name: 'Autumm orange' }),
    new MeshStandardMaterial({ name: 'Material.003' }),
  ])
  mesh.name = 'Cylinder.001'
  scene.add(mesh)

  return patchGLBJson(await toGLB(scene), (json) => {
    // three's exporter never writes mesh names; Blender always does.
    json.meshes[0].name = 'Cylinder.001'
    if (!namedNode) {
      json.nodes.forEach((node: any) => {
        if (node.mesh !== undefined) {
          delete node.name
        }
      })
    }
  })
}

/** `foo.bar` and `foobar` both sanitize to `foobar`. */
export function collidingNamesGLB(): Promise<ArrayBuffer> {
  const scene = new Group()
  scene.name = 'Scene'

  const material = new MeshStandardMaterial({ name: 'Material' })
  const dotted = new Mesh(new BoxGeometry(), material)
  dotted.name = 'foo.bar'
  const plain = new Mesh(new BoxGeometry(), material)
  plain.name = 'foobar'
  scene.add(dotted, plain)

  return toGLB(scene)
}

/** A hyphenated group (illegal as an identifier, but legal in glTF) wrapping a mesh. */
export function nestedGLB(): Promise<ArrayBuffer> {
  const scene = new Group()
  scene.name = 'Scene'

  const group = new Group()
  group.name = 'Model-Toy-Rocket'
  group.position.set(1, 0, -3)
  scene.add(group)

  const mesh = new Mesh(new BoxGeometry(1, 1, 1), new MeshStandardMaterial({ name: 'Autumm orange' }))
  mesh.name = 'Body'
  mesh.rotation.set(0, Math.PI / 2, 0)
  mesh.scale.setScalar(2)
  group.add(mesh)

  return toGLB(scene)
}

/** Three meshes sharing one geometry and one material: an instancing candidate. */
export function repeatedGeometryGLB(): Promise<ArrayBuffer> {
  const scene = new Group()
  scene.name = 'Scene'

  const geometry = new BoxGeometry(1, 1, 1)
  const material = new MeshStandardMaterial({ name: 'Rock' })

  for (let i = 0; i < 3; i++) {
    const mesh = new Mesh(geometry, material)
    mesh.name = `Rock_${i}`
    mesh.position.setX(i)
    scene.add(mesh)
  }

  return toGLB(scene)
}

/**
 * A `.gltf` + sidecar `.bin` pair on disk, the layout of an unpacked export.
 * Returns the path to the `.gltf`.
 */
export async function writeUnpackedGLTF(dir: string): Promise<string> {
  installExporterShim()

  const scene = new Group()
  scene.name = 'Scene'
  const mesh = new Mesh(new BoxGeometry(1, 1, 1), new MeshStandardMaterial({ name: 'Material' }))
  mesh.name = 'Cube.001'
  scene.add(mesh)

  const json: any = await new GLTFExporter().parseAsync(scene, { binary: false })
  const [, base64] = String(json.buffers[0].uri).split(',')
  json.buffers[0].uri = 'model.bin'

  await mkdir(dir, { recursive: true })
  await writeFile(join(dir, 'model.bin'), Buffer.from(base64, 'base64'))
  const path = join(dir, 'model.gltf')
  await writeFile(path, JSON.stringify(json))

  return path
}

/** A skinned mesh with one bone and one clip. */
export function skinnedGLB(): Promise<ArrayBuffer> {
  const scene = new Group()
  scene.name = 'Scene'

  const bone = new Bone()
  bone.name = 'hand.l'

  const skinned = new SkinnedMesh(skinnedBoxGeometry(), new MeshStandardMaterial({ name: 'Skin' }))
  skinned.name = 'Body'
  skinned.add(bone)
  skinned.bind(new Skeleton([bone]))
  scene.add(skinned)

  const clip = new AnimationClip('Idle', 1, [
    new VectorKeyframeTrack('hand.l.position', [0, 1], [0, 0, 0, 0, 1, 0]),
  ])

  return toGLB(scene, [clip])
}
