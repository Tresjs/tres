import { Scene } from 'three'
import { defineComponent, inject, reactive, ref, Ref, shallowRef, toRaw, unref } from 'vue'
import { useFBX } from '.'

export const FBXModel = defineComponent({
  name: 'FBXModel',
  props: {
    path: {
      type: String,
      required: true,
    },
  },
  async setup(props, { expose }) {
    const scene = inject<Ref<Scene>>('local-scene')
    let model = null

    function getModel() {
      return model
    }
    expose({ getModel })

    model = await useFBX(props.path as string)

    if (scene?.value && model.isObject3D) {
      scene.value.add(model)
    }
    return () => {
      model
    }
  },
})
