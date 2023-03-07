import Tres from '@tresjs/core'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.provide('catalogue', ref({}))
  nuxtApp.vueApp.provide('extends', () => {})
  // nuxtApp.vueApp.use(Tres)
  // const prefix = options?.prefix || 'Tres'
  // // Register core components
  // app.component(`${prefix}Canvas`, TresCanvas)
  // app.component(`${prefix}Scene`, Scene)
  // // Initialize catalogue
  // const { catalogue, extend } = useCatalogue(app, prefix)
  // app.provide('catalogue', catalogue)
  // app.provide('extend', extend)
  // app.provide('useTres', useTres())
  // // Create components from catalogue
  // const { createComponentInstances } = useInstanceCreator(prefix)
  // const components = createComponentInstances(catalogue)
  // components.forEach(([key, cmp]) => {
  //   app.component(key as string, cmp as Component)
  // })
})
