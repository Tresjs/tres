import { defineConfig } from 'histoire'
import { HstVue } from '@histoire/plugin-vue'

export default defineConfig({
  theme: {
    title: 'TresJS',

    logo: {
      light: '/logo.svg',
      dark: '/logo-dark.svg',
    },
  },
  setupFile: './histoire.setup.ts',
  plugins: [HstVue()],
  defaultStoryProps: {
    iconColor: '#00c5a5',
    responsiveDisabled: true,
    autoPropsDisabled: true,
  },
})
