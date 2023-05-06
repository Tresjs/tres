import { inject, isReactive, isRef, reactive, toRefs } from 'vue'
import { Control, Schema, SchemaOrFn } from '../types'

export const CONTROLS_CONTEXT_KEY = Symbol('CONTROLS_CONTEXT_KEY')

const state = reactive<{
  controls: Control[]
}>({
  controls: [],
})

export function useControlsProvider() {
  /*   const state = reactive({
    controls: {},
  })

  provide(CONTROLS_CONTEXT_KEY, state)
 */
  return state
}

function parseObjectToControls(obj: Schema): Control[] {
  return Object.entries(obj).map(([key, schema]) => {
    if (!isRef(schema) && schema.value) {
      return {
        ...schema,
        label: schema.label || key,
        value: schema.value,
        type: typeof schema.value.value,
        visible: true,
      }
    }
    return {
      label: schema.label || key,
      value: schema,
      type: isRef(schema) ? typeof schema.value : typeof schema,
      visible: true,
    }
  })
}

function dispose() {
  state.controls = []
}

export function useControls<S extends Schema, F extends SchemaOrFn<S> | string>(
  controlOrFolderName: F,
  /* settingsOrDepsOrControl: G, */
) {
  const ctx = inject(CONTROLS_CONTEXT_KEY, {})
  let controls: Control[] = []
  if (typeof controlOrFolderName === 'string') {
    // TODO: add folder
  } else if (isReactive(controlOrFolderName)) {
    const iternal = toRefs(controlOrFolderName)
    controls = parseObjectToControls(iternal)
  } else {
    controls = parseObjectToControls(controlOrFolderName)
  }

  state.controls = [...state.controls, ...controls]

  return ctx
}

if (import.meta.hot) {
  import.meta.hot.on('vite:beforeUpdate', dispose)
}
