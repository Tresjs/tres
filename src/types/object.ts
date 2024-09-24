/** @description Utility type to exclude properties with the type `never` */
export type NonNever<T extends object> = {
  [K in keyof T as T[K] extends never ? never : K]: T[K];
}

/** @description Utility type to extract only **methods** of an `object` */
export type Methods<T extends object> = NonNever<{
  [K in keyof T]: T[K] extends (...args: any[]) => any ? T[K] : never;
}>

export type CallableProps<T extends object = object> = Record<keyof Methods<T>, (...args: any[]) => unknown>
