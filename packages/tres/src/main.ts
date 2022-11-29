import { createApp } from 'vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import App from './App.vue'
import plugin from '.'
import './style.css'

export const app = createApp(App)

app.use(plugin, {
  extends: {
    OrbitControls,
  },
})
app.mount('#app')
