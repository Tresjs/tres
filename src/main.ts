import { createApp } from 'vue'
import App from './App.vue'

import './style.css'

export const app = createApp(App)

app.mount('#app')

console.log(app)
