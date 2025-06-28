/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, any>
  export default component
}

interface PerformanceState {
  maxFrames: number
  fps: {
    value: number
    accumulator: number[]
  }
  memory: {
    currentMem: number
    allocatedMem: number
    accumulator: number[]
  }
}

interface Window {
  __TRES__DEVTOOLS__?: {
    cb: (
      { context, performance }:
      { context: TresContext, performance: PerformanceState } // TODO https://github.com/Tresjs/nuxt/issues/163 this type should come from the devtools package
    ) => void
    // You can add other properties of __TRES__DEVTOOLS__ here if needed
  }
}

declare module '*.glsl' {}
declare module '*.json' {}
