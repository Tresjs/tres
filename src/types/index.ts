export interface SelectOption {
  text: string
  value: string | number
}

export interface Control<T = any> {
  key: string
  label: string
  name: string
  type: string
  value: T
  visible: boolean
  icon?: string
  uniqueKey: string
  folder?: string
  options?: SelectOption[]
  min?: number
  max?: number
  step?: number
}
