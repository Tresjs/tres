import { capitalize, isReactive, isRef, provide, reactive, ref, type Ref, toRefs } from 'vue'
import type { LechesControl, LechesSelectOption } from '../types'

export const CONTROLS_CONTEXT_KEY = Symbol('CONTROLS_CONTEXT_KEY')
const DEFAULT_UUID = 'default'

// Internal state
const controlsStore: { [uuid: string]: Record<string, LechesControl> } = reactive({
  default: {},
})

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
  if (value.type === 'graph') {
    return 'graph'
  }

  // Add more types as needed
  return 'unknown'
}

const createControl = <T>(key: string, value: T, type: string, folderName: string | null) => {
  const control = reactive<LechesControl<T>>({
    key,
    label: key,
    name: key,
    type,
    value,
    visible: true,
    icon: '',
    uniqueKey: key,
  })

  if (folderName) {
    control.folder = folderName
    control.label = control.label.replace(folderName.replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim(), '').toLowerCase()
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
  const result: { [key: string]: LechesControl } = {}
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
    values.fpsgraph = ref(control.value)
    return values
  }

  const controls = controlsStore[uuid]

  // Check if controlsParams is a reactive object
  const isParamsReactive = isReactive(controlsParams)
  const reactiveRefs = isParamsReactive ? toRefs(controlsParams as { [key: string]: any }) : {}

  for (let key in controlsParams as any) {
    let value = (controlsParams as any)[key]
    let uniqueKey = key
    const label = `${key}`
    // If controlsParams is reactive, use the reactive ref directly
    if (isParamsReactive && reactiveRefs[key]) {
      value = reactiveRefs[key]
    }

    // If the control is part of a folder, prefix the key with the folder name
    if (folderName) {
      key = `${folderName.replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim()}${capitalize(key)}`
    }
    uniqueKey = `${uuid}-${key}`

    // If the value is an object with control options
    if (typeof value === 'object' && !isRef(value) && !Array.isArray(value) && value.value !== undefined) {
      const controlOptions = value
      const reactiveValue = isRef(controlOptions.value) ? controlOptions.value : ref(controlOptions.value)
      const controlType = controlOptions.type || inferType(controlOptions)
      const control = createControl(key, reactiveValue, controlType, folderName)

      if (controlType === 'select') {
        control.options = (controlOptions.options.map((option: string | LechesSelectOption) => {
          if (typeof option === 'object') {
            if ('text' in option && 'value' in option) {
              return option as LechesSelectOption
            }
          }
          return {
            text: String(option),
            value: option,
          }
        }))
      }

      if (controlType === 'range') {
        control.min = controlOptions.min || 0
        control.max = controlOptions.max || 1
        control.step = controlOptions.step || 0.1
      }

      control.label = controlOptions.label || label
      control.icon = controlOptions.icon || ''
      control.visible = controlOptions.visible !== undefined ? controlOptions.visible : true
      control.uniqueKey = uniqueKey

      // Pass through onUpdate callback if provided
      if (controlOptions.onUpdate) {
        control.onUpdate = controlOptions.onUpdate
      }

      controls[key] = control
      result[key] = control
      values[key] = reactiveValue
      continue
    }

    // If the value is a ref, use it directly
    if (isRef(value)) {
      const control = createControl(key, value, (value.value as any).type || inferType(value.value), folderName)
      controls[key] = control
      result[key] = control
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
    controls[key] = control
    result[key] = control
    values[key] = refValue
    control.uniqueKey = uniqueKey
  }

  return values
}
