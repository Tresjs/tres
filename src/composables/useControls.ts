import { Vector3 } from 'three'
import { isReactive, isRef, onUnmounted, provide, reactive, ref, toRefs } from 'vue'
import { Control, Schema, SchemaOrFn } from '../types'

export const CONTROLS_CONTEXT_KEY = Symbol('CONTROLS_CONTEXT_KEY')

const controls = reactive<{ [key: string]: Control }>({})

export function useControlsProvider() {
  provide(CONTROLS_CONTEXT_KEY, controls)
  return controls
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
  
      if (value instanceof Vector3 || value instanceof Vector3 || value instanceof Array) {
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
  for (const key in controls) {
    delete controls[key];
  }
}

export function useControls<
  S extends Schema,
  F extends SchemaOrFn<S> | string,
  G extends SchemaOrFn<S>,
  T extends SchemaOrFn<S>,
>(controlOrFolderName: F, settingsOrDepsOrControl: G, settings?: T) {
  const control = ref()
  if (typeof controlOrFolderName === 'string') {
    if (controlOrFolderName === 'fpsgraph') {
      controls[controlOrFolderName] = {
        label: 'fpsgraph',
        visible: true,
        type: 'fpsgraph',
      }
      control.value = controls[controlOrFolderName]
    } else {
      controls[controlOrFolderName] = {
        label: controlOrFolderName,
        visible: true,
        type: 'folder',
        controls: parseObjectToControls(settingsOrDepsOrControl),
      }
      control.value = controls[controlOrFolderName]
    }
  } else if (typeof controlOrFolderName === 'object' && controlOrFolderName.options) {
    controls[controlOrFolderName.label || 'Dropdown'] = {
      ...settings,
      label: controlOrFolderName.label || 'Dropdown',
      visible: true,
      value: controlOrFolderName.value,
      type: 'select',
      ref: controlOrFolderName,
      options: controlOrFolderName.options,
    }
    control.value = controls[controlOrFolderName.label || 'Dropdown']
  } else if (typeof controlOrFolderName === 'object' && typeof settingsOrDepsOrControl === 'string') {
    controls[settingsOrDepsOrControl] = {
      ...settings,
      label: settingsOrDepsOrControl,
      visible: true,
      value: controlOrFolderName[settingsOrDepsOrControl],
      type: typeof controlOrFolderName[settingsOrDepsOrControl],
      ref: controlOrFolderName,
    }
    control.value = controls[settingsOrDepsOrControl]
  } else if (isReactive(controlOrFolderName)) {
    const iternal = toRefs(controlOrFolderName)
    const parsedControls = parseObjectToControls(iternal);
    for (const parsedControl of parsedControls) {
      controls[parsedControl.label] = parsedControl;
    }
    control.value  = parsedControls
  } else {
    const parsedControls = parseObjectToControls(controlOrFolderName);
    for (const parsedControl of parsedControls) {
      controls[parsedControl.label] = parsedControl;
    }
    control.value  = parsedControls
  }

  onUnmounted(dispose)

/*   const controlRefs = computed(() => {
    const refs = reactive<{ [label: string]: typeof ref }>({})
    for (let key in controls.controls) {
      refs[key] = ref(controls.controls[key].value)
    }
    return toRefs(refs)
  }) */

  return control
}
