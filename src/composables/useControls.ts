import { Ref, isRef, provide, reactive, ref, toRefs } from 'vue'

export const CONTROLS_CONTEXT_KEY = Symbol('CONTROLS_CONTEXT_KEY')


export function useControlsProvider() {
  provide(CONTROLS_CONTEXT_KEY, controls)
  return controls
}
// Define the Control type
interface Control {
  label: Ref<string>;
  name: Ref<string>;
  type: Ref<string>;
  value: Ref<any>;
  visible: Ref<boolean>;
  [key: string]: Ref<any> | Ref<boolean>;
}

// Internal state
const controls: { [key: string]: Control } = reactive({});

// Helper function to infer type
const inferType = (value: any): string => {
  if (typeof value === 'boolean') return 'boolean';
  if (typeof value === 'number') return 'number';
  if (typeof value === 'string') return 'string';
  if (value.isVector3 || value.isEuler || value instanceof Array) return 'vector';
  if (value.min !== undefined || value.max !== undefined || value.step !== undefined) return 'range';

  // Add more types as needed
  return 'unknown';
};

export const dispose = (): void => {
  for (const key in controls) {
    delete controls[key];
  }
};

export const useControls = (params: { [key: string]: any }): Control | Control[] => {
  const result: Control[] = [];

  for (const key in params) {
    let value = params[key];

    // If the value is an object with control options
    if (typeof value === 'object' && !isRef(value) && !Array.isArray(value) && value.value !== undefined) {
      const controlOptions = value;
      
    // Ensure the value is a ref
    const reactiveValue = isRef(controlOptions.value) ? controlOptions.value : ref(controlOptions.value);

    const control: Control = {
      label: ref(key),
      name: ref(key),
      type: ref(inferType(controlOptions)),
      value: reactiveValue,
      visible: ref(true),
      [key]: reactiveValue,
      min: controlOptions.min ? ref(controlOptions.min) : undefined,
      max: controlOptions.max ? ref(controlOptions.max) : undefined,
      step: controlOptions.step ? ref(controlOptions.step) : undefined
    };

    controls[key] = control;
    result.push(control);
    continue;
    }

    // If the value is a ref, use it directly
    if (isRef(value)) {
      const control: Control = {
        label: ref(key),
        name: ref(key),
        type: ref(inferType(value.value)),
        value: value,  // Use the passed ref directly
        visible: ref(true),
        [key]: value   // Use the passed ref directly
      };

      // Update the internal state
      controls[key] = control;
      result.push(control);
      continue;
    }

    // If the value is reactive, convert it to ref
    else if (typeof value === 'object' && !Array.isArray(value)) {
      const reactiveRefs = toRefs(value);
      if (reactiveRefs[key]) {
        value = reactiveRefs[key];
      }
    }

    // For non-ref values
    const control: Control = {
      label: ref(key),
      name: ref(key),
      type: ref(inferType(value)),
      value: ref(value),
      visible: ref(true),
      [key]: ref(value)
    };

    // Update the internal state
    controls[key] = control;
    result.push(control);
  }

  return result.length === 1 ? result[0] : result;
};