import { defineConfig } from 'astro/config'

// https://astro.build/config
import vue from '@astrojs/vue'

// https://astro.build/config
export default defineConfig({
  integrations: [vue({ appEntrypoint: '/src/pages/_app' })],
})
