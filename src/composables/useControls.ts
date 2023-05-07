import { inject, isReactive, isRef, onUnmounted, reactive, toRefs } from 'vue'
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

export function useControls<S extends Schema, F extends SchemaOrFn<S> | string, G extends SchemaOrFn<S>>(
  controlOrFolderName: F,
  settingsOrDepsOrControl: G,
) {
  const ctx = inject(CONTROLS_CONTEXT_KEY, {})
  let controls: Control[] = []
  if (typeof controlOrFolderName === 'string') {
    if (controlOrFolderName === 'fpsgraph') {
      controls.push({
        label: 'fpsgraph',
        visible: true,
        type: 'fpsgraph',
      })
    } else {
      controls.push({
        label: controlOrFolderName,
        visible: true,
        type: 'folder',
        controls: parseObjectToControls(settingsOrDepsOrControl),
      })
    }
  } else if (isReactive(controlOrFolderName)) {
    const iternal = toRefs(controlOrFolderName)
    controls = parseObjectToControls(iternal)
  } else {
    controls = parseObjectToControls(controlOrFolderName)
  }

  state.controls = [...state.controls, ...controls]

  onUnmounted(dispose)

  return ctx
}
