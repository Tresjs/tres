import { createApp } from 'vue'
import App from './App.vue'
/* import plugin from '.' */
import './style.css'

export const app = createApp(App)
/* 
app.use(plugin) */
app.mount('#app')
