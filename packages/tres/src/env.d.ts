/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.glsl' {}

declare global {
  // Define the window interface, with type annotations for the properties and methods of the window object
  interface Window {
    // Define the location property, with a type of Location
    __TRES__: {
      app: App
      version: string
    }
  }
}
