/**
 * The emitter builds markup as strings, so nothing else catches a stray quote or an
 * unbalanced tag. Run the real Vue compiler over the output instead of trusting it.
 */
import { describe, expect, it } from 'vitest'
import { compileScript, compileTemplate, parse } from 'vue/compiler-sfc'
import { buildIR } from '../gltf/build-ir'
import { loadGLTF } from '../gltf/load'
import { lightAndCameraGLB, morphAndMetaGLB, nestedGLB, sketchfabGLB, skinnedGLB } from '../gltf/__fixtures__/scenes'
import { emitSFC } from './sfc'

const CASES = {
  'a plain model': () => nestedGLB(),
  'a skinned, animated model': () => skinnedGLB(),
  'lights and cameras': () => lightAndCameraGLB(),
  'morph targets and metadata': () => morphAndMetaGLB(),
  'a sketchfab export': () => sketchfabGLB(),
}

function compile(code: string, id: string) {
  const { descriptor, errors } = parse(code, { filename: `${id}.gen.vue` })
  const script = compileScript(descriptor, { id })
  const template = compileTemplate({
    id,
    filename: `${id}.gen.vue`,
    source: descriptor.template?.content ?? '',
    // Matches what a TresJS app configures; without it every Tres* tag is an unknown component.
    compilerOptions: { isCustomElement: tag => tag.startsWith('Tres') && tag !== 'TresCanvas' },
  })

  return { parseErrors: errors, templateErrors: template.errors, script, template }
}

describe('generated output compiles', () => {
  for (const [label, fixture] of Object.entries(CASES)) {
    it(`compiles ${label}`, async () => {
      const ir = buildIR(await loadGLTF(await fixture()))
      const { code } = emitSFC(ir, { url: '/model.glb', slots: 'all', shadows: true, meta: true })

      const { parseErrors, templateErrors } = compile(code, 'model')

      expect(parseErrors).toEqual([])
      expect(templateErrors).toEqual([])
    })
  }

  it('compiles every slot into a render-slot call', async () => {
    const ir = buildIR(await loadGLTF(await sketchfabGLB()))
    const { code, slots } = emitSFC(ir, { url: '/model.glb', slots: 'all' })

    const { template } = compile(code, 'model')

    // `_renderSlot(` only: the bare name also appears in the compiler's import line.
    expect(template.code.match(/_renderSlot\(/g)?.length).toBe(slots.length)
  })

  it('keeps bracket-access keys intact through compilation', async () => {
    const ir = buildIR(await loadGLTF(await nestedGLB()))
    const { code } = emitSFC(ir, { url: '/model.glb', keepGroups: true })

    const { template, templateErrors } = compile(code, 'model')

    expect(templateErrors).toEqual([])
    expect(template.code).toContain(`['Model-Toy-Rocket']`)
  })
})
