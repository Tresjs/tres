import { Scene } from 'three'
import { defineComponent, inject, Ref } from 'vue'
import { useGLTF } from '.'

export const GLTFModel = defineComponent({
  name: 'GLTFModel',
  props: {
    path: String,
    draco: Boolean,
    decoderPath: String,
  },

  async setup(props, { expose }) {
    const scene = inject<Ref<Scene>>('local-scene')

    function getModel() {
      return model
    }
    expose({ getModel })
    const { scene: model } = await useGLTF(props.path as string, { draco: props.draco, decoderPath: props.decoderPath })
    if (scene?.value) {
      scene.value.add(model)
    }
    return () => {
      model
    }
  },
})
