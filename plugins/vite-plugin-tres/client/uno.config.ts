// uno.config.ts
import { 
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives } from 'unocss'
import { unocssPreset } from '@nuxt/devtools-ui-kit'

export default defineConfig({
  rules: [
    
    ['panel-grids-light', {
      'background-image': 'url("data:image/svg+xml,%0A%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'20\' height=\'20\' transform=\'scale(3)\'%3E%3Crect x=\'0\' y=\'0\' width=\'100%25\' height=\'100%25\' fill=\'white\'/%3E%3Cpath d=\'M 10,-2.55e-7 V 20 Z M -1.1677362e-8,10 H 20 Z\' stroke-width=\'0.2\' stroke=\'hsla(0, 0%25, 98%25, 1)\' fill=\'none\'/%3E%3C/svg%3E")',
      'background-size': '40px 40px',
    }],
    ['panel-grids-dark', {
      'background-image': `url("data:image/svg+xml,%0A%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' transform='scale(3)'%3E%3Crect x='0' y='0' width='100%25' height='100%25' fill='black'/%3E%3Cpath d='M 10,-2.55e-7 V 20 Z M -1.1677362e-8,10 H 20 Z' stroke-width='0.2' stroke='${encodeURIComponent('#141b24')}' fill='none'/%3E%3C/svg%3E");`,
      'background-size': '40px 40px',
    }],
  ],
  shortcuts: [
    {
      // general
      'bg-base': 'bg-white dark:bg-black',
      'text-base': 'text-black dark:text-white',
      'bg-active': 'bg-gray:5',
      'border-base': 'border-gray/20',
      'navbar-base': 'border-b border-base h-50px',
      'transition-base': 'transition-all duration-200',

      'x-divider': 'h-1px w-full bg-gray/15',

      // glass
      'glass-effect': 'backdrop-blur-6 bg-white/80 dark:bg-black/90',
      'navbar-glass': 'sticky z-10 top-0 glass-effect',

      // code
      'code-block': 'dark:bg-[#121212] bg-white',

      // panel grids
      'panel-grids': 'panel-grids-light dark:panel-grids-dark',
      'panel-grids-center': 'panel-grids flex flex-col h-full gap-2 items-center justify-center',

      'selectable-item': 'flex items-center px-2 py-1 rounded cursor-pointer hover:bg-primary-200 dark:(hover:bg-gray-800) @active:(text-white bg-primary-600 hover:(text-white bg-primary-600))',

      // component state
      'state-key': 'text-purple-700 dark:text-purple-300',
      colon: 'text-#444 dark:(text-white)',
      'state-value': 'text-#444 dark:(text-#bdc6cf)',
      'state-value-label': 'text-gray-500',
      'state-value-literal': 'text-#03c dark:(text-#997fff)',
      'state-value-string': 'text-#c41a16',
    }, 
    // eslint-disable-next-line max-len
    [/^theme-card-(\w+)$/, $ => `p2 flex gap2 border border-base bg-base items-center rounded min-w-40 min-h-25 justify-center transition-all saturate-0 op50 shadow hover:(op100 bg-${$[1]}/10 text-${$[1]}6 saturate-100)`],
  ],
  presets: [
    presetAttributify(),
    presetIcons(),
    presetTypography(),
    presetWebFonts(),
    presetUno(),
  ],
})