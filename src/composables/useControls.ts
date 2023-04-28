import { inject, isReactive, isRef, reactive, toRefs } from 'vue'

export const CONTROLS_CONTEXT_KEY = Symbol('CONTROLS_CONTEXT_KEY')

export type Schema = Record<string, any>
export type SchemaOrFn<S extends Schema = Schema> = S | (() => S)

const state = reactive({
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

function parseObjectToControls(obj) {
  return Object.entries(obj).map(([key, value]) => {
    return { label: key, value, type: isRef(value) ? typeof value.value : typeof value }
  })
}

export function useControls<S extends Schema, F extends SchemaOrFn<S> | string>(
  controlOrFolderName: F,
  /* settingsOrDepsOrControl: G, */
) {
  const ctx = inject(CONTROLS_CONTEXT_KEY, {})
  let controls
  if (typeof controlOrFolderName === 'string') {
  } else if (isReactive(controlOrFolderName)) {
    const iternal = toRefs(controlOrFolderName)
    controls = parseObjectToControls(iternal)
  } else {
    controls = parseObjectToControls(controlOrFolderName)
  }

  state.controls = [...state.controls, ...controls]

  return ctx
}
