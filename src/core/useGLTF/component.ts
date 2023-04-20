import { TresObject } from '@tresjs/core';
import { defineComponent, ref } from 'vue'
import { useGLTF } from '.'
import { useCientos } from '../useCientos'

export interface GLTFModelProps {
  /**
   *
   * The path to the GLTF file.
   *
   * @type {string}
   * @required
   * @memberof GLTFModelProps
   *
   **/
  path: string
  /**
   *
   * Whether to use Draco compression.
   *
   * @type {boolean}
   * @default false
   * @memberof GLTFModelProps
   *
   **/
  draco?: boolean
  /**
   *
   * The path to the Draco decoder.
   *
   * @type {string}
   * @default 'https://www.gstatic.com/draco/versioned/decoders/1.4.1/'
   * @memberof GLTFModelProps
   *
   **/
  decoderPath?: string
}

export const GLTFModel = defineComponent<GLTFModelProps>({
  name: 'GLTFModel',
  props: ['path', 'draco', 'decoderPath'] as unknown as undefined,

  async setup(props, { expose }) {
    const { state } = useCientos()
    
    const model = ref<TresObject>()

    expose({model})
 
    const { scene } = await useGLTF(props.path as string, { draco: props.draco, decoderPath: props.decoderPath })

    model.value = scene as unknown as TresObject

    if (state.scene) {
      state.scene.add(scene)
    }
    return () => {
      scene
    }
  },
})
