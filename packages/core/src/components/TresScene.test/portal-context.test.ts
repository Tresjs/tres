import * as THREE from 'three'
import { extend } from '../../core/catalogue'
import { initializeSceneCreator } from './util'
import { defineComponent, h, provide, shallowRef } from 'vue'
import TresPortal from '../TresPortal.vue'
import { INJECTION_KEY, useTresContext } from '../../composables'
import type { TresContext } from '../../composables'

describe('tresPortal scene-context override', () => {
  extend(THREE)

  // Mirrors MeshPortalMaterial: a wrapper provides a context whose scene is the
  // portal target, so portal children that read useTres().scene see the portal
  // scene (not the main one). provide()/inject() follows the mounted tree, so it
  // reaches slot content through the <TresPortal>/<Teleport>.
  const portalScene = new THREE.Scene()
  let childScene: THREE.Scene | undefined

  const Probe = defineComponent({
    setup() {
      childScene = useTresContext().scene.value as unknown as THREE.Scene
      return () => null
    },
  })

  const Wrapper = defineComponent({
    setup() {
      const ctx = useTresContext()
      provide(INJECTION_KEY, { ...ctx, scene: shallowRef(portalScene) })
      return () => h(TresPortal, { to: portalScene }, { default: () => h(Probe) })
    },
  })

  let mainScene: TresContext['scene']['value']
  let wrapper: { unmount: () => void }

  beforeAll(async () => {
    const { createScene } = await initializeSceneCreator()
    const result = await createScene(() => h(Wrapper))
    wrapper = result.sceneWrapper
    mainScene = result.context.scene.value
  })
  afterAll(() => wrapper.unmount())

  it('portal child injects the overridden portal scene, not the main scene', () => {
    expect(childScene).toBe(portalScene)
    expect(childScene).not.toBe(mainScene)
  })
})
