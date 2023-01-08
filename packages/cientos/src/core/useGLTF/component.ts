import { Object3D, Scene } from 'three'
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
    let model: Object3D | null = null

    function getModel() {
      return model
    }
    expose({ getModel })

    const { scene: data } = await useGLTF(props.path as string, { draco: props.draco, decoderPath: props.decoderPath })
    model = data
    if (scene?.value) {
      scene.value.add(model)
    }
    return () => {
      model
    }
  },
})
