export interface LechesSelectOption {
  text: string
  alias: string
  value: string | number
}

export type LechesValue = string | number | boolean

export type LechesCotrolConfigTypes = 'select' | 'button' | 'range' | 'boolean' | 'text' | 'number'
export interface LechesBaseControlConfig {
  value: unknown
  label?: string
  icon?: string
  type?: LechesCotrolConfigTypes
}

export interface LechesSelectControlConfig extends LechesBaseControlConfig {
  options: string[] | LechesSelectOption[]
}

export interface LechesSelectControlButton extends LechesBaseControlConfig {
  variant: 'primary' | 'secondary',
  onClick?: () => void
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'block'
}

export interface LechesControlsConfig {
  [key:string]: 
}

export interface LechesControl<T = unknown> {
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
  onUpdate?: (values: unknown[]) => void
}
