import { Vector3 } from 'three'
import { isReactive, isRef, onUnmounted, reactive, toRefs } from 'vue'
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
    let type = 'string'
    let value
    const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$|^0x([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/

    if (!isRef(schema) && schema.value) {
      type = typeof schema.value
      value = schema.value
    } else if (isRef(schema)) {
      type = typeof schema.value
      value = schema.value
    } else {
      type = typeof schema
      value = schema
    }

    if (type === 'number' && (schema.step || schema.max || schema.min)) {
      type = 'range'
    }

    if (type === 'string' && colorRegex.test(value)) {
      type = 'color'
    }

    if (value instanceof Vector3 || value instanceof Vector3 || value instanceof Array<number>) {
      type = 'vector'
    }

    if (!isRef(schema) && schema.value) {
      return {
        ...schema,
        label: schema.label || key,
        value: schema.value,
        type,
        visible: true,
      }
    }
    return {
      label: schema.label || key,
      value: schema,
      type,
      visible: true,
    }
  })
}

export function dispose() {
  state.controls = []
}

export function useControls<
  S extends Schema,
  F extends SchemaOrFn<S> | string,
  G extends SchemaOrFn<S>,
  T extends SchemaOrFn<S>,
>(controlOrFolderName: F, settingsOrDepsOrControl: G, settings?: T) {
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
  } else if (typeof controlOrFolderName === 'object' && typeof settingsOrDepsOrControl === 'string') {
    controls.push({
      ...settings,
      label: settingsOrDepsOrControl,
      visible: true,
      value: controlOrFolderName[settingsOrDepsOrControl],
      type: typeof controlOrFolderName[settingsOrDepsOrControl],
      ref: controlOrFolderName,
    })
  } else if (isReactive(controlOrFolderName)) {
    const iternal = toRefs(controlOrFolderName)
    controls = parseObjectToControls(iternal)
  } else {
    controls = parseObjectToControls(controlOrFolderName)
  }

  state.controls = [...state.controls, ...controls]

  onUnmounted(dispose)

  return { state, controls }
}
