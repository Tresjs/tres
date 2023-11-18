import { createApp } from 'vue'

/* import '@tresjs/leches/styles' */
/* import '@tresjs/leches/styles.css' */

import './style.css'
import App from './App.vue'
import { router } from './router'
import 'uno.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
