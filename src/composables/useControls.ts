import { Ref, isReactive, isRef, provide, reactive, ref, toRefs } from 'vue'

export const CONTROLS_CONTEXT_KEY = Symbol('CONTROLS_CONTEXT_KEY')

export interface Control {
  label: Ref<string>;
  name: Ref<string>;
  type: Ref<string>;
  value: Ref<any>;
  visible: Ref<boolean>;
  [key: string]: Ref<any> | boolean;
}

// Internal state
const controls: { [key: string]: Control } = reactive({});

// Helper function to infer type
const inferType = (value: any): string => {
  if (typeof value === 'boolean') return 'boolean';
  if (typeof value === 'number') return 'number';
  if (typeof value === 'string') return 'string';
  // Add more types as needed
  return 'unknown';
};

export function useControlsProvider() {
  provide(CONTROLS_CONTEXT_KEY, controls)
  return controls
}

export const dispose = () => {
  for (const key in controls) {
    delete controls[key];
  }
};

export const useControls = (params: { [key: string]: any }): Control | Control[] => {
  const result: Control[] = [];

  for (const key in params) {
    const value = params[key];
    const type = inferType(value);

    const control: Control = {
      label: ref(key),
      name: ref(key),
      type: ref(type),
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

