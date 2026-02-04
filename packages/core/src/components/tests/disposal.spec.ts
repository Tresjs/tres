import { defineComponent, h, nextTick, ref } from 'vue'
import { initializeSceneCreator } from './util'
import { beforeAll, describe, expect, it } from '../../utils/test'
import { isBufferGeometry, isMaterial, isMesh } from '../../utils/is'
import { extend } from '../../core/catalogue'
import * as THREE from 'three'
import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three'
import type { TresContext } from '../../composables'
import type { DisposeType } from '../../types'

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

    const { createScene } = await initializeSceneCreator()
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

  it('should not dispose of anything below a component that has the dispose prop set to false or null', async () => {
    [false, null].forEach(async (dispose) => {
      const { disposalSpies, sceneWrapper, exists } = await checkDisposal({
        template: `
        <TresGroup v-if="exists" :dispose="dispose">
          <TresMesh>
            <TresBoxGeometry />
            <TresMeshBasicMaterial />
          </TresMesh>
        </TresGroup>`,
        getMesh: ({ scene }) => scene.value.children[0].children[0] as Mesh,
        setupContext: { dispose },
      })

      exists.value = false
      await nextTick()

      disposalSpies.forEach(spy => expect(spy).not.toHaveBeenCalledOnce())

      sceneWrapper.unmount()
    })
  })

  describe('primitives', () => {
    const checkPrimitiveDisposal = async ({
      dispose = undefined,
      withParent = false,
    }: {
      dispose?: DisposeType
      withParent?: boolean
    } = {}) => {
      const geometry = new BoxGeometry()
      const material = new MeshBasicMaterial()
      const meshWithMaterial = new Mesh(geometry, material)

      const primitiveTemplate = '<primitive :object="meshWithMaterial" :dispose="dispose" />'
      const { disposalSpies, sceneWrapper, exists } = await checkDisposal({
        template: withParent
          ? `
        <TresGroup v-if="exists">
          ${primitiveTemplate}
        </TresGroup>`
          : primitiveTemplate,
        getMesh: ({ scene }) => withParent ? scene.value.children[0].children[0] as Mesh : scene.value.children[0] as Mesh,
        setupContext: { meshWithMaterial, dispose },
      })

      exists.value = false
      await nextTick()

      disposalSpies.forEach(spy => expect(spy).not.toHaveBeenCalled())

      sceneWrapper.unmount()
    }
    it('should not dispose primitives when unmounted', () => checkPrimitiveDisposal())
    it('should not dispose primitives when parent is unmounted', () => checkPrimitiveDisposal({ withParent: true }))

    it('should not dispose primitives when dispose prop is set to default', () => checkPrimitiveDisposal({ dispose: 'default' }))
    it('should not dispose primitives when dispose prop is set to false', () => checkPrimitiveDisposal({ dispose: false }))
    it('should not dispose primitives when dispose prop is set to null', () => checkPrimitiveDisposal({ dispose: null }))

    it('should not dispose primitives when dispose prop is set to default (via parent unmount)', () => checkPrimitiveDisposal({ dispose: 'default', withParent: true }))
    it('should not dispose primitives when dispose prop is set to false (via parent unmount)', () => checkPrimitiveDisposal({ dispose: false, withParent: true }))
    it('should not dispose primitives when dispose prop is set to null (via parent unmount)', () => checkPrimitiveDisposal({ dispose: null, withParent: true }))

    it('should call dispose function when dispose prop has a custom function', async () => {
      const dispose = vi.fn()

      await checkPrimitiveDisposal({ dispose })

      expect(dispose).toHaveBeenCalledOnce()
    })

    it('should dispose primitive when dispose prop is set to true', async () => {
      // using a material as the primitive object because it has a dispose method
      const material = new MeshBasicMaterial()
      const exists = ref(true)

      const Component = defineComponent({
        setup: () => ({
          exists,
          material,
        }),
        template: `
        <TresMesh v-if="exists">
          <primitive :object="material" :dispose="true" />
        </TresMesh>`,
      })

      const { createScene } = await initializeSceneCreator()
      const { sceneWrapper } = await createScene(() => h(Component))

      const disposalSpies = vi.spyOn(material, 'dispose')
      sceneWrapper.unmount()

      expect(disposalSpies).toHaveBeenCalledOnce()
    })
  })
})
