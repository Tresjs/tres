import type { ToRefs } from 'vue'
import { isReactive, isRef, provide, reactive, ref, toRefs } from 'vue'
import type { Control } from '../types'

export const CONTROLS_CONTEXT_KEY = Symbol('CONTROLS_CONTEXT_KEY')
const DEFAULT_UUID = 'default'

// Internal state
const controlsStore: { [uuid: string]: { [key: string]: Control } } = reactive({})

export function useControlsProvider(uuid: string = DEFAULT_UUID) {
  provide(CONTROLS_CONTEXT_KEY, controlsStore)
  return controlsStore[uuid]
}
// Helper function to infer type
const inferType = (value: any): string => {
  const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$|^0x([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/

  if (typeof value === 'boolean') return 'boolean'
  if (typeof value === 'number') return 'number'
  if (typeof value === 'string' && colorRegex.test(value)) return 'color'
  if (typeof value === 'string') return 'string'
  if (value.isVector3 || value.isVector2 || value.isEuler || value instanceof Array) return 'vector'
  if (value.min !== undefined || value.max !== undefined || value.step !== undefined) return 'range'
  if (
    value.options 
    && Array.isArray(value.options) 
    && value.options.every((option: { text: string; value: string }) => 'text' in option && 'value' in option)) {
    return 'select'
  }
  
  // Add more types as needed
  return 'unknown'
}

const createControl = (key: string, value: any, type: string, folderName: string | null): Control => {
  const control: Control = {
    label: ref(key),
    name: ref(key),
    type: ref(type),
    value: ref(value),
    visible: ref(true),
    [key]: ref(value),
  }

  if (folderName) {
    control.folder = ref(folderName)
  }

  return control
}

export const dispose = (uuid: string = DEFAULT_UUID): void => {
  for (const key in controlsStore[uuid]) {
    delete controlsStore[uuid][key]
  }
}

// eslint-disable-next-line max-len
export const useControls = (
  folderNameOrParams: string | { [key: string]: any },
  paramsOrOptions?: { [key: string]: any } | { uuid?: string },
  options?: { uuid?: string },
): Control | ToRefs<{ [key: string]: Control }> => {
  const result: { [key: string]: Control } = {}

  const folderName = typeof folderNameOrParams === 'string' ? folderNameOrParams : null
  const controlsParams = folderName ? paramsOrOptions as { [key: string]: any } : folderNameOrParams

  const actualOptions = folderName && folderName !== 'fpsgraph' ? options! : paramsOrOptions as { uuid?: string }
  const uuid = actualOptions?.uuid || DEFAULT_UUID

  if (!controlsStore[uuid]) {
    controlsStore[uuid] = reactive({})
  }

  if (folderNameOrParams === 'fpsgraph') {
    const control = createControl('fpsgraph', null, 'fpsgraph', null)
    controlsStore[uuid]['fpsgraph'] = control
    result['fpsgraph'] = control
    return toRefs(reactive(result)) 
  }

  const controls = controlsStore[uuid]

  // Check if controlsParams is a reactive object
  const isParamsReactive = isReactive(controlsParams)
  const reactiveRefs = isParamsReactive ? toRefs(controlsParams as { [key: string]: any }) : {}

  for (const key in controlsParams as any) {
    let value = (controlsParams as any)[key]

    // If controlsParams is reactive, use the reactive ref directly
    if (isParamsReactive && reactiveRefs[key]) {
      value = reactiveRefs[key]
    }

    // If the value is an object with control options
    if (typeof value === 'object' && !isRef(value) && !Array.isArray(value) && value.value !== undefined) {
      const controlOptions = value
      const reactiveValue = isRef(controlOptions.value) ? controlOptions.value : ref(controlOptions.value)
      const controlType = inferType(controlOptions)
      const control = createControl(key, reactiveValue, controlType, folderName)

      if (controlType === 'select') {
        control.options = ref(controlOptions.options)
      }

      if (controlType === 'range') {
        control.min = ref(controlOptions.min)
        control.max = ref(controlOptions.max)
        control.step = ref(controlOptions.step)
      }

      controls[key] = control
      result[key] = control
      continue
    }

    // If the value is a ref, use it directly
    if (isRef(value)) {
      const control = createControl(key, value, inferType(value.value), folderName)
      controls[key] = control
      result[key] = control
      continue
    }

    // If the value is reactive, convert it to ref
    else if (typeof value === 'object' && !Array.isArray(value)) {
      const reactiveRefs = toRefs(value)
      if (reactiveRefs[key]) {
        value = reactiveRefs[key]
      }
    }

    // For non-ref values
    const control = createControl(key, value, inferType(value), folderName)

    // Update the internal state
    controls[key] = control
    result[key] = control
  }

  return Object.keys(result).length > 1 ? toRefs(reactive(result)) : Object.values(result)[0]
}