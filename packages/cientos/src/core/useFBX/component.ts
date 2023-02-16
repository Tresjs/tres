import { Object3D, Scene } from 'three'
import { defineComponent, inject, Ref } from 'vue'
import { useFBX } from '.'
import { useCientos } from '../useCientos'

export const FBXModel = defineComponent({
  name: 'FBXModel',
  props: {
    path: {
      type: String,
      required: true,
    },
  },
  async setup(props, { expose }) {
    const { state } = useCientos()
    let model: Object3D | null = null

    function getModel() {
      return model
    }
    expose({ getModel })

    model = await useFBX(props.path as string)

    if (state.scene && model.isObject3D) {
      state.scene.add(model)
    }
    return () => {
      model
    }
  },
})
