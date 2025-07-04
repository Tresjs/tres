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
  variant: 'primary' | 'secondary'
  onClick?: () => void
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'block'
}

// Define specific control types with their value types
export interface LechesBooleanControl extends Omit<LechesControl<boolean>, 'type'> {
  type: 'boolean'
  value: boolean
}

export interface LechesNumberControl extends Omit<LechesControl<number>, 'type'> {
  type: 'number' | 'range'
  value: number
  min?: number
  max?: number
  step?: number
}

export interface LechesStringControl extends Omit<LechesControl<string>, 'type'> {
  type: 'text' | 'color'
  value: string
}

export interface LechesSelectControl extends Omit<LechesControl<string | number>, 'type'> {
  type: 'select'
  value: string | number
  options: LechesSelectOption[]
}

export interface LechesButtonControl extends Omit<LechesControl<LechesSelectControlButton>, 'type'> {
  type: 'button'
  value: LechesSelectControlButton
}

export interface LechesVectorControl extends Omit<LechesControl<any>, 'type'> {
  type: 'vector'
  value: any // Vector2, Vector3, etc.
}

export interface LechesGraphControl extends Omit<LechesControl<any>, 'type'> {
  type: 'graph' | 'fpsgraph'
  value: any
}

// Union type for all control types
export type LechesControlUnion =
  | LechesBooleanControl
  | LechesNumberControl
  | LechesStringControl
  | LechesSelectControl
  | LechesButtonControl
  | LechesVectorControl
  | LechesGraphControl

// Type guards for runtime type checking
export function isBooleanControl(control: LechesControlUnion): control is LechesBooleanControl {
  return control.type === 'boolean'
}

export function isNumberControl(control: LechesControlUnion): control is LechesNumberControl {
  return control.type === 'number' || control.type === 'range'
}

export function isStringControl(control: LechesControlUnion): control is LechesStringControl {
  return control.type === 'text' || control.type === 'color'
}

export function isSelectControl(control: LechesControlUnion): control is LechesSelectControl {
  return control.type === 'select'
}

export function isButtonControl(control: LechesControlUnion): control is LechesButtonControl {
  return control.type === 'button'
}

export function isVectorControl(control: LechesControlUnion): control is LechesVectorControl {
  return control.type === 'vector'
}

export function isGraphControl(control: LechesControlUnion): control is LechesGraphControl {
  return control.type === 'graph' || control.type === 'fpsgraph'
}

// Keep the original LechesControl for backward compatibility
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
