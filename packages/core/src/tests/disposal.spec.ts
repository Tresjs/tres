import { defineComponent, h, nextTick, ref } from 'vue'
import { createScene } from './utils/scene'
import { beforeAll, describe, expect, it } from './utils/testing'
import { isBufferGeometry, isMaterial, isMesh } from '../utils/is'
import { extend } from '../core/catalogue'
import * as THREE from 'three'
import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three'
import type { TresContext } from '../composables'

describe('disposal', () => {
  beforeAll(() => {
    extend(THREE)
  })

  const checkDisposal = async ({
    template,
    getMesh,
    setupContext = {},
  }: {
    template: string
    getMesh: (context: TresContext) => Mesh
    setupContext?: Record<string, any>
  }) => {
    const exists = ref(true)
    const Component = defineComponent({
      setup: () => ({
        exists,
        ...setupContext,
      }),
      template,
    })
    const { sceneWrapper, context } = await createScene(() => h(Component))
    const mesh = getMesh(context)

    expect(isMesh(mesh)).toBe(true)
    if (!isMesh(mesh)) { throw new Error('never') }

    expect(isBufferGeometry(mesh.geometry)).toBe(true)
    if (!isBufferGeometry(mesh.geometry)) { throw new Error('never') }

    expect(isMaterial(mesh.material)).toBe(true)
    if (!isMaterial(mesh.material)) { throw new Error('never') }

    const disposalSpies = [
      mesh.geometry,
      mesh.material,
    ].map(item => vi.spyOn(item, 'dispose'))

    return {
      exists,
      context,
      sceneWrapper,
      disposalSpies,
    }
  }

  it('should dispose of a mesh, geometry and renderer when a scene is unmounted', async () => {
    const { disposalSpies, sceneWrapper, context } = await checkDisposal({
      template: `<TresMesh v-if="exists" >
        <TresBoxGeometry />
        <TresMeshBasicMaterial />
      </TresMesh>`,
      getMesh: ({ scene }) => scene.value.children[0] as Mesh,
    })

    const rendererSpy = vi.spyOn(context.renderer.instance, 'dispose')
    sceneWrapper.unmount()

    expect(rendererSpy).toHaveBeenCalledOnce()
    disposalSpies.forEach(spy => expect(spy).toHaveBeenCalledOnce())
  })

  it('should dispose of a mesh and geometry when the parent component is unmounted', async () => {
    const { disposalSpies, sceneWrapper, exists } = await checkDisposal({
      template: `<TresGroup v-if="exists">
        <TresMesh>
          <TresBoxGeometry />
          <TresMeshBasicMaterial />
        </TresMesh>
      </TresGroup>`,
      getMesh: ({ scene }) => scene.value.children[0].children[0] as Mesh,
    })

    exists.value = false
    await nextTick()

    disposalSpies.forEach(spy => expect(spy).toHaveBeenCalledOnce())

    sceneWrapper.unmount()
  })

  describe('primitives', () => {
    const checkPrimitiveDisposal = async (withParent: boolean = false) => {
      const geometry = new BoxGeometry()
      const material = new MeshBasicMaterial()
      const meshWithMaterial = new Mesh(geometry, material)

      const primitiveTemplate = '<primitive :object="meshWithMaterial" />'
      const { disposalSpies, sceneWrapper, exists } = await checkDisposal({
        template: withParent
          ? `
        <TresGroup v-if="exists">
          ${primitiveTemplate}
        </TresGroup>`
          : primitiveTemplate,
        getMesh: ({ scene }) => withParent ? scene.value.children[0].children[0] as Mesh : scene.value.children[0] as Mesh,
        setupContext: { meshWithMaterial },
      })

      exists.value = false
      await nextTick()

      disposalSpies.forEach(spy => expect(spy).not.toHaveBeenCalled())

      sceneWrapper.unmount()
    }
    it('should not dispose primitives when unmounted', () => checkPrimitiveDisposal())
    it('should not dispose primitives when parent is unmounted', () => checkPrimitiveDisposal(true))
  })
})
