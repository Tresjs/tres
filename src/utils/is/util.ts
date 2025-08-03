import { isObject } from './typed'

export const createTypeGuard = <T>(property: keyof T) =>
  (value: unknown): value is T =>
    isObject(value) && property in value && !!((value as T)[property])
