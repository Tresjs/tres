/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, any>
  export default component
}

interface Window {
  __TRES__DEVTOOLS__?: {
    cb: Function
    // You can add other properties of __TRES__DEVTOOLS__ here if needed
  }
}

declare module '*.glsl' {}
declare module '*.json' {}
