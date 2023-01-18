import type { App } from 'vue'
import Tres from '@tresjs/core'
import '@kidonng/daisyui/index.css'

export default (app: App) => {
  app.use(Tres)
}
