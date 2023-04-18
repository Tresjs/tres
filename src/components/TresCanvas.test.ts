import { mount } from '@vue/test-utils'
import TresCanvas from './TresCanvas'
import { BasicShadowMap, sRGBEncoding, NoToneMapping } from 'three'

const TresScene = {
  template: `<TresCanvas window-size="true">
  <TresPerspectiveCamera :position="[5, 5, 5]" :look-at="[0, 0, 0]" />

  <TresMesh>
    <TresSphereGeometry :args="[2, 32, 32]" />
    <TresMeshNormalMaterial />
  </TresMesh>
  <TresGridHelper />
  <TresAmbientLight :intensity="1" />
  <Suspense>
    <EffectComposer>
      <Glitch />
    </EffectComposer>
  </Suspense>
</TresCanvas>`,
  components: {
    TresCanvas,
  },
}

describe('TresCanvas', () => {
  it('should work', () => {
    const wrapper = mount(TresScene, {
      attachTo: document.body,
    })
    const canvas = wrapper.find('canvas')
    expect(canvas).toBeDefined()
    /* const canvas = wrapper.find('canvas')

    expect(canvas.attributes('__spector_context_type')).toBe('webgl2') */
  })
})
