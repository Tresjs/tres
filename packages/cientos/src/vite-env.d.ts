/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<unknown, unknown, any>
  export default component
}

declare module '*.glsl' {}
declare module '*.json' {}

declare module 'troika-three-text' {
  import type { Mesh } from 'three'

  export class Text extends Mesh {
    text: string
    sync: (callback?: () => void) => void
    dispose: () => void
    [key: string]: any
  }
}
