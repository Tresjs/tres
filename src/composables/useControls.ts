import { isReactive, isRef, provide, reactive, ref, type Ref, toRefs } from 'vue'
import type { Control, SelectOption } from '../types'

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
  const colorRegex = /^#(?:[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$|^0x(?:[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/

  if (typeof value === 'boolean') { return 'boolean' }
  if (typeof value === 'number') { return 'number' }
  if (typeof value === 'string' && colorRegex.test(value)) { return 'color' }
  if (typeof value === 'string') { return 'string' }
  if (value.isVector3
    || value.isVector2
    || value.isEuler
    || Array.isArray(value.value)
    || value.value.isVector3
    || value.value.isVector2
    || value.value.isEuler
    || Array.isArray(value.value.value)
  ) {
    return 'vector'
  }
  if (value.min !== undefined || value.max !== undefined || value.step !== undefined) { return 'range' }
  if (
    value.options
    && Array.isArray(value.options)) {
    return 'select'
  }

  // Add more types as needed
  return 'unknown'
}

const createControl = (key: string, value: any, type: string, folderName: string | null): Control => {
  const control: Control = {
    key: ref(key),
    label: ref(key),
    name: ref(key),
    type: ref(type),
    value: ref(value),
    visible: ref(true),
    icon: ref(),
    uniqueKey: ref(key),
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

export const useControls = (
  folderNameOrParams: string | { [key: string]: any },
  paramsOrOptions?: { [key: string]: any } | { uuid?: string },
  options?: { uuid?: string },
): { [key: string]: Ref<any> } => {
  const result: { [key: string]: Control } = {}
  const values: { [key: string]: Ref<any> } = {}

  const folderName = typeof folderNameOrParams === 'string' ? folderNameOrParams : null
  const controlsParams = folderName ? paramsOrOptions as { [key: string]: any } : folderNameOrParams

  const actualOptions = folderName && folderName !== 'fpsgraph' ? options! : paramsOrOptions as { uuid?: string }
  const uuid = actualOptions?.uuid || DEFAULT_UUID

  if (!controlsStore[uuid]) {
    controlsStore[uuid] = reactive({})
  }

  if (folderNameOrParams === 'fpsgraph') {
    const control = createControl('fpsgraph', null, 'fpsgraph', null)
    controlsStore[uuid].fpsgraph = control
    result.fpsgraph = control
    values.fpsgraph = control.value
    return values
  }

  const controls = controlsStore[uuid]

  // Check if controlsParams is a reactive object
  const isParamsReactive = isReactive(controlsParams)
  const reactiveRefs = isParamsReactive ? toRefs(controlsParams as { [key: string]: any }) : {}

  for (const key in controlsParams as any) {
    let value = (controlsParams as any)[key]
    let uniqueKey = key

    // If controlsParams is reactive, use the reactive ref directly
    if (isParamsReactive && reactiveRefs[key]) {
      value = reactiveRefs[key]
    }

    // If the control is part of a folder, prefix the key with the folder name
    if (folderName) {
      uniqueKey = `${folderName}${key.charAt(0).toUpperCase() + key.slice(1)}`
    }

    // If the value is an object with control options
    if (typeof value === 'object' && !isRef(value) && !Array.isArray(value) && value.value !== undefined) {
      const controlOptions = value
      const reactiveValue = isRef(controlOptions.value) ? controlOptions.value : ref(controlOptions.value)
      const controlType = controlOptions.type || inferType(controlOptions)
      const control = createControl(key, reactiveValue, controlType, folderName)

      if (controlType === 'select') {
        control.options = ref<SelectOption[]>(controlOptions.options.map((option: string | SelectOption) => {
          if (typeof option === 'object') {
            if ('text' in option && 'value' in option) {
              return option as SelectOption
            }
          }
          return {
            text: String(option),
            value: option,
          }
        }))
      }

      if (controlType === 'range') {
        control.min = ref(controlOptions.min || 0)
        control.max = ref(controlOptions.max || 1)
        control.step = ref(controlOptions.step || 0.1)
      }

      control.label.value = controlOptions.label || key
      if (control.icon?.value) {
        control.icon.value = controlOptions.icon
      }
      control.visible.value = controlOptions.visible !== undefined ? controlOptions.visible : true
      control.uniqueKey.value = uniqueKey
      controls[uniqueKey] = control
      result[uniqueKey] = control
      values[key] = reactiveValue
      continue
    }

    // If the value is a ref, use it directly
    if (isRef(value)) {
      const control = createControl(key, value, (value.value as any).type || inferType(value.value), folderName)
      controls[uniqueKey] = control
      result[uniqueKey] = control
      values[key] = value
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
    const refValue = ref(value)
    const control = createControl(key, refValue, value.type || inferType(value), folderName)

    // Update the internal state
    controls[uniqueKey] = control
    result[uniqueKey] = control
    values[key] = refValue
    control.uniqueKey.value = uniqueKey
  }

  return values
}
