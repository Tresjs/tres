import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

export const zhConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  themeConfig: {
    editLink: {
      pattern: 'https://github.com/tresjs/tres/edit/main/packages/docs/:path',
      text: '对本页内容给出建议',
    },
    sidebar: [
      {
        text: '使用指南',
        items: [
          { text: '简介', link: '/zh/guide/' },
          { text: '入门指南', link: '/zh/guide/getting-started' },
          { text: '你的第一个场景', link: '/zh/guide/your-first-scene' },
          { text: 'Nuxt', link: '/zh/guide/nuxt' },
          { text: '故障排除', link: '/zh/guide/troubleshooting' },
          { text: '从 v1 迁移', link: '/zh/guide/migration-guide' },
        ],
      },
      {
        text: 'API',
        items: [
          { text: 'TresCanvas', link: '/zh/api/tres-canvas' },
          {
            text: '实例, 参数和 props',
            link: '/zh/api/instances-arguments-and-props',
          },
          {
            text: '组合式函数',
            link: '/zh/api/composables',
          },
          {
            text: '事件',
            link: '/zh/api/events',
          },
        ],
      },

      {
        text: '进阶',

        items: [
          { text: '扩展', link: '/zh/advanced/extending' },
          { text: '原语', link: '/zh/advanced/primitive' },
          {
            text: '注意事项',
            link: '/zh/advanced/caveats',
          },
        ],
      },
      {
        text: 'Debug',
        items: [
          { text: 'Devtools', link: '/zh/debug/devtools' },
        ],
      },
      {
        text: '范例',
        collapsed: true,
        items: [
          { text: '轨道控制器', link: '/zh/examples/orbit-controls' },
          { text: '基础动画', link: '/zh/examples/basic-animations' },
          { text: '组', link: '/zh/examples/groups' },
          { text: '加载贴图', link: '/zh/examples/load-textures' },
          { text: '加载模型', link: '/zh/examples/load-models' },
          { text: '加载文本', link: '/zh/examples/text-3d' },
          { text: '光照和阴影', link: '/zh/examples/lights-shadows' },
          { text: '着色器', link: '/zh/examples/shaders' },
        ],
      },
      {
        text: '指令',
        collapsed: true,
        items: [
          { text: 'v-log', link: '/zh/directives/v-log' },
          { text: 'v-light-helper', link: '/zh/directives/v-light-helper' },
          { text: 'v-always-look-at', link: '/zh/directives/v-always-look-at' },
          { text: 'v-distance-to', link: '/zh/directives/v-distance-to' },
        ],
      },
      {
        text: '生态系统',
        items: [
          {
            text: 'Cientos 💛',
            link: 'https://cientos.tresjs.org/',
          },
          {
            text: 'Nuxt module',
            link: 'https://github.com/Tresjs/nuxt',
          },
          {
            text: 'TresLeches 🍰',
            link: 'https://tresleches.tresjs.org/',
          },
          {
            text: 'Post-processing (Soon)',
          },
        ],
      },
    ],
    nav: [
      { text: '使用指南', link: '/zh/guide/' },
      { text: 'API', link: '/zh/api/tres-canvas' },
      /*       { text: 'API', link: '/api/' },
      { text: 'Config', link: '/config/' }, */
      {
        text: '资源',
        items: [
          { text: '团队', link: '/zh/team' },
          { text: '版本发布', link: 'https://github.com/Tresjs/tres/releases' },
          {
            text: '演练场',
            link: 'https://playground.tresjs.org/',
          },
          {
            text: 'Github',
            link: 'https://github.com/Tresjs/tres/',
          },
          {
            text: 'Issues',
            link: 'https://github.com/Tresjs/tres/issues',
          },
          {
            text: '生态系统',
            items: [
              {
                text: 'Cientos 💛',
                link: 'https://cientos.tresjs.org/',
              },
              {
                text: 'Nuxt 模块',
                link: 'https://github.com/Tresjs/nuxt',
              },
              {
                text: 'TresLeches 🍰',
                link: 'https://tresleches.tresjs.org/',
              },
            ],
          },
        ],
      },
    ],
    darkModeSwitchLabel: "外观",
    sidebarMenuLabel: "菜单",
    returnToTopLabel: "返回顶部",
    langMenuLabel: "更改语言",
    lastUpdatedText: "最近更新",
    outlineTitle: "此页面上",
    docFooter: {
      next: "下一页",
      prev: "上一页"
    }
  },
}
