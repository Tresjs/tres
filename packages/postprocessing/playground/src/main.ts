import { createApp } from 'vue'
import App from './App.vue'
import { router } from '../../../../apps/playground/src/router/routes/postprocessing/router'
import './style.css'
import 'uno.css'

const app = createApp(App)

app.use(router)

app.mount('#app')

const orginalWarn = console.warn
console.warn = (...args: any[]) => {
  if (!args[0].includes('Component is missing template or render function')) {
    orginalWarn.apply(console, args)
  }
}
