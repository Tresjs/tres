import { defineConfig } from 'vitepress'

import { sharedConfig } from './shared'
import { enConfig } from './en'
import { esConfig } from './es'
// import { zhConfig } from './zh'

export default defineConfig({
    ...sharedConfig,

    locales: {
        root: {
            label: 'English',
            lang: 'en-US',
            link: '/',
            ...enConfig,
        },
        es: {
            label: 'Spanish',
            lang: 'es',
            link: '/es/',
            ...esConfig,
        },
        // zh: {
        //   label: '简体中文',
        //   lang: 'zh-CN',
        //   link: '/zh/',
        //   ...zhConfig,
        // },
    },
})