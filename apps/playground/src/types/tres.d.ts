import type { TresPrimitive } from '@tresjs/core'
import type { DefineComponent } from 'vue'

// Example of how to extend the global components with custom primitive prefix
declare module 'vue' {
  interface GlobalComponents {
    myprimitive: DefineComponent<TresPrimitive>
  }
}

export {}
