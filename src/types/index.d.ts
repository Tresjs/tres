import type { Ref } from 'vue'

export interface SelectOption {
  text: string
  value: string | number
}

export interface Control {
  key: Ref<string>
  label: Ref<string>
  name: Ref<string>
  type: Ref<string>
  value: Ref<any>
  visible: Ref<boolean>
  icon?: Ref<string>
  uniqueKey: Ref<string>
  folder?: Ref<string>
  options?: Ref<SelectOption[]>
  min?: Ref<number>
  max?: Ref<number>
  step?: Ref<number>
  [key: string]: any
}
