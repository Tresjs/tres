import type { GLTFIR } from '../gltf/ir'
import { Buffer } from 'node:buffer'
import { mkdir, mkdtemp, readFile, rm, stat, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest'
import { collidingNamesGLB, nestedGLB, repeatedGeometryGLB, simpleGLB } from '../gltf/__fixtures__/scenes'
import gltf from './gltf'

describe('gltf command', () => {
  let dir: string
  const log = vi.spyOn(console, 'log').mockImplementation(() => {})
  const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

  beforeAll(async () => {
    dir = await mkdtemp(join(tmpdir(), 'tres-cli-'))
  })

  afterEach(() => {
    log.mockClear()
    warn.mockClear()
  })

  afterAll(async () => {
    await rm(dir, { recursive: true, force: true })
    vi.restoreAllMocks()
  })

  async function fixture(name: string, glb: Promise<ArrayBuffer>, subdir = ''): Promise<string> {
    const target = join(dir, subdir)
    await mkdir(target, { recursive: true })
    const path = join(target, name)
    await writeFile(path, Buffer.from(await glb))
    return path
  }

  const output = () => log.mock.calls.flat().join('\n')
  const warnings = () => warn.mock.calls.flat().join('\n')

  it('writes a .gen.vue next to the model', async () => {
    const path = await fixture('robot.glb', nestedGLB())

    await gltf.call({} as any, path, {})

    const generated = await readFile(join(dir, 'robot.gen.vue'), 'utf-8')
    expect(generated).toContain('<template v-if="!isLoading">')
  })

  it('never writes into public/, which the bundler copies but never compiles', async () => {
    const path = await fixture('robot.glb', nestedGLB(), 'app/public/models')
    await writeFile(join(dir, 'app', 'package.json'), '{}')
    await mkdir(join(dir, 'app', 'src'), { recursive: true })

    await gltf.call({} as any, path, {})

    await expect(readFile(join(dir, 'app/src/models/Robot.gen.vue'), 'utf-8')).resolves.toContain('useGLTF')
    await expect(readFile(join(dir, 'app/public/models/Robot.gen.vue'), 'utf-8')).rejects.toThrow()
  })

  it('says where it put a component it had to relocate', async () => {
    const path = await fixture('rover.glb', nestedGLB(), 'moved/public/models')
    await writeFile(join(dir, 'moved', 'package.json'), '{}')
    await mkdir(join(dir, 'moved', 'src'), { recursive: true })

    await gltf.call({} as any, path, {})

    expect(output()).toContain('src/models')
  })

  it('uses app/ when the project keeps its source there', async () => {
    const path = await fixture('robot.glb', nestedGLB(), 'nuxtapp/public/models')
    await writeFile(join(dir, 'nuxtapp', 'package.json'), '{}')
    await writeFile(join(dir, 'nuxtapp', 'nuxt.config.ts'), 'export default {}')
    await mkdir(join(dir, 'nuxtapp', 'app'), { recursive: true })

    await gltf.call({} as any, path, {})

    await expect(readFile(join(dir, 'nuxtapp/app/models/Robot.gen.vue'), 'utf-8')).resolves.toContain('useGLTF')
  })

  it('falls back to models/ at the project root when there is no src or app', async () => {
    const path = await fixture('robot.glb', nestedGLB(), 'flat/public/models')
    await writeFile(join(dir, 'flat', 'package.json'), '{}')

    await gltf.call({} as any, path, {})

    await expect(readFile(join(dir, 'flat/models/Robot.gen.vue'), 'utf-8')).resolves.toContain('useGLTF')
  })

  it('derives the component filename from the model, in PascalCase', async () => {
    const path = await fixture('toy-rocket.glb', nestedGLB())

    await gltf.call({} as any, path, {})

    await expect(readFile(join(dir, 'ToyRocket.gen.vue'), 'utf-8')).resolves.toContain('<template>')
  })

  it('serves a model under public/ from the public root', async () => {
    const path = await fixture('robot.glb', nestedGLB(), 'served/public/models')

    await gltf.call({} as any, path, {})

    const generated = await readFile(join(dir, 'served/models/Robot.gen.vue'), 'utf-8')
    expect(generated).toContain(`useGLTF<ModelNodes, ModelMaterials>('/models/robot.glb')`)
  })

  it('warns when it cannot infer the url', async () => {
    const path = await fixture('loose.glb', nestedGLB(), 'nowhere')

    await gltf.call({} as any, path, {})

    expect(warnings()).toContain('--url')
  })

  it('honours an explicit --url', async () => {
    const path = await fixture('robot.glb', nestedGLB(), 'explicit')

    await gltf.call({} as any, path, { url: '/assets/robot.glb' })

    const generated = await readFile(join(dir, 'explicit/Robot.gen.vue'), 'utf-8')
    expect(generated).toContain(`useGLTF<ModelNodes, ModelMaterials>('/assets/robot.glb')`)
  })

  it('writes where -o says', async () => {
    const path = await fixture('robot.glb', nestedGLB(), 'out')
    const target = join(dir, 'out', 'custom', 'Model.vue')

    await gltf.call({} as any, path, { output: target })

    await expect(readFile(target, 'utf-8')).resolves.toContain('<template>')
  })

  it('prints instead of writing with --console', async () => {
    const path = await fixture('robot.glb', nestedGLB(), 'printed')

    await gltf.call({} as any, path, { console: true })

    expect(output()).toContain('<template>')
    await expect(readFile(join(dir, 'printed/Robot.gen.vue'), 'utf-8')).rejects.toThrow()
  })

  it('overwrites its own previous output', async () => {
    const path = await fixture('robot.glb', nestedGLB(), 'again')
    await gltf.call({} as any, path, {})

    await expect(gltf.call({} as any, path, {})).resolves.toBeUndefined()
  })

  it('refuses to clobber a file it did not generate', async () => {
    const path = await fixture('robot.glb', nestedGLB(), 'handwritten')
    const target = join(dir, 'handwritten', 'Robot.gen.vue')
    await writeFile(target, '<template>mine</template>')

    await expect(gltf.call({} as any, path, {})).rejects.toThrow(/--force/)
    await expect(readFile(target, 'utf-8')).resolves.toBe('<template>mine</template>')
  })

  it('clobbers anyway with --force', async () => {
    const path = await fixture('robot.glb', nestedGLB(), 'forced')
    const target = join(dir, 'forced', 'Robot.gen.vue')
    await writeFile(target, '<template>mine</template>')

    await gltf.call({} as any, path, { force: true })

    await expect(readFile(target, 'utf-8')).resolves.toContain('useGLTF')
  })

  it('passes emitter flags through', async () => {
    const path = await fixture('robot.glb', nestedGLB(), 'flags')

    await gltf.call({} as any, path, { console: true, shadows: true, keepnames: true, precision: 4 })

    expect(output()).toContain('cast-shadow receive-shadow')
    expect(output()).toContain('name="Body"')
    expect(output()).toContain('1.5708')
  })

  it('reports what it wrote', async () => {
    const path = await fixture('robot.glb', nestedGLB(), 'report')

    await gltf.call({} as any, path, {})

    expect(output()).toContain('Robot.gen.vue')
    expect(output()).toContain('2 slots')
  })

  it('reports name collisions on stderr', async () => {
    const path = await fixture('collide.glb', collidingNamesGLB(), 'collide')

    await gltf.call({} as any, path, { console: true })

    expect(warnings()).toContain('foobar_1')
  })

  it('prints the IR as JSON with --json', async () => {
    const path = await fixture('simple.glb', simpleGLB(), 'json')

    await gltf.call({} as any, path, { json: true })

    const ir = JSON.parse(output()) as GLTFIR
    expect(ir.nodes.Cube001).toBeDefined()
  })

  it('pluralizes mesh as meshes in --dry-run', async () => {
    const path = await fixture('meshes.glb', repeatedGeometryGLB(), 'dry')

    await gltf.call({} as any, path, { dryRun: true })

    expect(output()).toContain('3 meshes')
  })

  it('optimizes to a separate -transformed.glb and generates against it', async () => {
    const path = await fixture('robot.glb', nestedGLB(), 'served/public/models')

    await gltf.call({} as any, path, { transform: true, console: true })

    await expect(stat(join(dir, 'served/public/models/robot-transformed.glb'))).resolves.toBeDefined()
    await expect(stat(join(dir, 'served/public/models/robot.glb'))).resolves.toBeDefined()
    expect(output()).toContain(`useGLTF<ModelNodes, ModelMaterials>('/models/robot-transformed.glb'`)
  })

  it('reports the saving with both sizes', async () => {
    const path = await fixture('robot.glb', nestedGLB(), 'saving')

    await gltf.call({} as any, path, { transform: true, console: true })

    expect(output()).toMatch(/robot\.glb.*robot-transformed\.glb/s)
  })

  it('keeps the component named after the original model', async () => {
    const path = await fixture('rover.glb', nestedGLB(), 'namecheck')

    await gltf.call({} as any, path, { transform: true })

    await expect(readFile(join(dir, 'namecheck/Rover.gen.vue'), 'utf-8')).resolves.toContain('useGLTF')
    await expect(readFile(join(dir, 'namecheck/RoverTransformed.gen.vue'), 'utf-8')).rejects.toThrow()
  })

  it('enables the draco loader for the compressed output', async () => {
    const path = await fixture('robot.glb', nestedGLB(), 'dracocheck')

    await gltf.call({} as any, path, { transform: true, console: true })

    expect(output()).toContain('{ draco: true }')
  })

  it('does not transform under --dry-run', async () => {
    const path = await fixture('robot.glb', nestedGLB(), 'drytransform')

    await gltf.call({} as any, path, { transform: true, dryRun: true })

    await expect(stat(join(dir, 'drytransform/robot-transformed.glb'))).rejects.toThrow()
  })

  it('fails loudly when the file does not exist', async () => {
    await expect(gltf.call({} as any, join(dir, 'missing.glb'), {})).rejects.toThrow(/missing\.glb/)
  })

  it('points at the relative path when given a url-shaped one', async () => {
    await fixture('robot.glb', nestedGLB(), 'public/models')
    const cwd = vi.spyOn(process, 'cwd').mockReturnValue(dir)

    try {
      await expect(gltf.call({} as any, '/public/models/robot.glb', {}))
        .rejects
        .toThrow(/did you mean public\/models\/robot\.glb/)
    }
    finally {
      cwd.mockRestore()
    }
  })
})
