import { inject, isReactive, isRef, reactive, toRefs } from 'vue'

export const CONTROLS_CONTEXT_KEY = Symbol('CONTROLS_CONTEXT_KEY')

export type Schema = Record<string, any>
export type SchemaOrFn<S extends Schema = Schema> = S | (() => S)

const state = reactive({
  controls: {},
})

export function useControlsProvider() {
  /*   const state = reactive({
    controls: {},
  })

  provide(CONTROLS_CONTEXT_KEY, state)
 */
  return state
}

function parseObjectToControls(obj, state) {
  return Object.entries(obj).forEach(([key, value]) => {
    state.controls[key] = { value, type: isRef(value) ? typeof value.value : typeof value }
  })
}

export function useControls<S extends Schema, F extends SchemaOrFn<S> | string>(
  controlOrFolderName: F,
  /* settingsOrDepsOrControl: G, */
) {
  const ctx = inject(CONTROLS_CONTEXT_KEY, {})

  if (typeof controlOrFolderName === 'string') {
  } else if (isReactive(controlOrFolderName)) {
    const controls = toRefs(controlOrFolderName)
    parseObjectToControls(controls, state)
  } else {
    parseObjectToControls(controlOrFolderName, state)
  }

  return ctx
}
