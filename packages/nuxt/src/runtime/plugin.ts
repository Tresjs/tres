import { defineNuxtPlugin } from '#app'
import { useCatalogue } from '@tresjs/core'

export default defineNuxtPlugin(nuxtApp => {
  const { catalogue, extend } = useCatalogue(nuxtApp.vueApp, 'Tres')
  nuxtApp.vueApp.provide('catalogue', catalogue)
  nuxtApp.vueApp.provide('extend', extend)
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
