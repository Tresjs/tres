import { defineComponent } from 'vue'
import { useGLTF } from '.'
import { useCientos } from '../useCientos'

export const GLTFModel = defineComponent({
  name: 'GLTFModel',
  props: {
    /**
     * The path to the GLTF file.
     *
     */
    path: String,
    /**
     * Whether to use Draco compression.
     *
     */
    draco: Boolean,
    /**
     * The path to the Draco decoder.
     *
     */
    decoderPath: String,
  },

  async setup(props, { expose }) {
    const { state } = useCientos()

    function getModel() {
      return model
    }
    expose({ getModel })
    const { scene: model } = await useGLTF(props.path as string, { draco: props.draco, decoderPath: props.decoderPath })
    if (state.scene) {
      state.scene.add(model)
    }
    return () => {
      model
    }
  },
})
