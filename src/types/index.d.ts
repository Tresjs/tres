export type Schema = Record<string, any>
export type SchemaOrFn<S extends Schema = Schema> = S | (() => S)

export type Control = {
  label: string
  value?: any
  type: string
  visible?: boolean
  min?: number
  max?: number
  step?: number
  icon?: string
  controls?: Control[]
  ref?: Record<string, any>
  options?: Array<{ text: string; value: string }>
}
