export interface LechesSelectOption {
  text: string
  value: string | number
}

export interface LechesControl<T = any> {
  key: string
  label: string
  name: string
  type: string
  value: T
  visible: boolean
  icon?: string
  uniqueKey: string
  folder?: string
  options?: LechesSelectOption[]
  min?: number
  max?: number
  step?: number
  onUpdate?: (values: any[]) => void
}
