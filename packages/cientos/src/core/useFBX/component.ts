import { Object3D } from 'three'
import { defineComponent } from 'vue'
import { useFBX } from '.'
import { useCientos } from '../useCientos'

export interface FBXModelProps {
  /**
   * Path to the FBX file.
   *
   * @type {string}
   * @memberof FBXModelProps
   * @required
   */
  path: string
}
export const FBXModel = defineComponent<FBXModelProps>({
  name: 'FBXModel',
  props: ['path'] as unknown as undefined,
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
