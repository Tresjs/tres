import * as THREE from 'three'
import { extend } from '../../core/catalogue'
import { initializeSceneCreator } from './util'
import { defineComponent, h, nextTick, ref } from 'vue'
import { isMesh } from '../../utils/is'
import TresPortal from '../TresPortal.vue'
import type { TresContext } from '../../composables'

describe('tresPortal', () => {
  extend(THREE)

  const portalScene = new THREE.Scene()
  const showSecond = ref(false)

  // Render-function tree (bypasses template compiler; tests the component directly).
  const Component = defineComponent({
    setup() {
      return () => [
        h('TresMesh', { uuid: 'main-mesh' }, [h('TresBoxGeometry'), h('TresMeshBasicMaterial')]),
        h(TresPortal, { to: portalScene }, {
          default: () => [
            h('TresMesh', { uuid: 'portal-1' }, [h('TresBoxGeometry'), h('TresMeshBasicMaterial')]),
            showSecond.value
              ? h('TresMesh', { uuid: 'portal-2' }, [h('TresSphereGeometry'), h('TresMeshBasicMaterial')])
              : null,
          ],
        }),
      ]
    },
  })

  let scene: TresContext['scene']['value']
  let wrapper: { unmount: () => void }

  beforeAll(async () => {
    const { createScene } = await initializeSceneCreator()
    const result = await createScene(() => h(Component))
    wrapper = result.sceneWrapper
    scene = result.context.scene.value
  })
  afterAll(() => wrapper.unmount())

  it('keeps non-portal children in the main scene', () => {
    expect(scene.children.some((c: any) => c.uuid === 'main-mesh')).toBe(true)
  })

  it('reparents portal children into the target scene, not the main scene', () => {
    expect(scene.children.some((c: any) => c.uuid === 'portal-1')).toBe(false)
    const inPortal = portalScene.children.find((c: any) => c.uuid === 'portal-1')
    expect(inPortal && isMesh(inPortal)).toBe(true)
  })

  it('reactively adds and removes portal children', async () => {
    expect(portalScene.children.some((c: any) => c.uuid === 'portal-2')).toBe(false)
    showSecond.value = true
    await nextTick()
    expect(portalScene.children.some((c: any) => c.uuid === 'portal-2')).toBe(true)
    expect(scene.children.some((c: any) => c.uuid === 'portal-2')).toBe(false)
    showSecond.value = false
    await nextTick()
    expect(portalScene.children.some((c: any) => c.uuid === 'portal-2')).toBe(false)
  })
})
