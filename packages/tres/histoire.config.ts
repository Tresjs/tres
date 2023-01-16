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
  storyMatch: ['src/playground/**/*.story.vue'],
  collectMaxThreads: 1,
  plugins: [HstVue()],
  defaultStoryProps: {
    iconColor: '#00c5a5',
    /*   responsiveDisabled: true, */
    autoPropsDisabled: true,
  },
})
