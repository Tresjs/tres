import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

export const jaConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  themeConfig: {
    editLink: {
      pattern: 'https://github.com/tresjs/tres/edit/main/packages/docs/:path',
      text: 'このページへの変更を提案する',
    },
    sidebar: [
      {
        text: 'ガイド',
        items: [
          // This shows `/guide/index.md` page.
          { text: '紹介', link: '/ja/guide/' },
          { text: 'はじめる', link: '/ja/guide/getting-started' },
          { text: '初めてのシーン', link: '/ja/guide/your-first-scene' },
          { text: 'Nuxt', link: '/ja/guide/nuxt' },
          { text: 'トラブルシュート', link: '/ja/guide/troubleshooting' },
          { text: 'v1からの移行', link: '/ja/guide/migration-guide' },
        ],
      },
      {
        text: 'API',
        items: [
          { text: 'TresCanvas', link: '/ja/api/tres-canvas' },
          {
            text: 'インスタンス, 引数やプロパティ',
            link: '/ja/api/instances-arguments-and-props',
          },
          {
            text: 'コンポーザブル',
            link: '/ja/api/composables',
          },
          {
            text: 'イベント',
            link: '/ja/api/events',
          },
        ],
      },

      {
        text: 'Advanced',

        items: [
          { text: 'Extending', link: '/ja/advanced/extending' },
          { text: 'primitive', link: '/ja/advanced/primitive' },
          {
            text: '注意事項',
            link: '/ja/advanced/caveats',
          },
        ],
      },
      {
        text: 'デバグ',
        items: [
          { text: '開発ツール', link: '/ja/debug/devtools' },
        ],
      },
      {
        text: '使用例',
        collapsed: true,
        items: [
          { text: '軌道制御', link: '/ja/examples/orbit-controls' },
          { text: '基本アニメーション', link: '/ja/examples/basic-animations' },
          { text: 'グループ', link: '/ja/examples/groups' },
          { text: 'テクスチャを読み込む', link: '/ja/examples/load-textures' },
          { text: 'モデルを読み込む', link: '/ja/examples/load-models' },
          { text: 'テキストを読み込む', link: '/ja/examples/text-3d' },
          { text: '光と影', link: '/ja/examples/lights-shadows' },
          { text: 'シェーダ', link: '/ja/examples/shaders' },
        ],
      },
      {
        text: 'Directives',
        collapsed: true,
        items: [
          { text: 'v-log', link: '/ja/directives/v-log' },
          { text: 'v-light-helper', link: '/ja/directives/v-light-helper' },
          { text: 'v-always-look-at', link: '/ja/directives/v-always-look-at' },
          { text: 'v-distance-to', link: '/ja/directives/v-distance-to' },
        ],
      },
      {
        text: '生態系',
        items: [
          {
            text: 'Cientos 💛',
            link: 'https://cientos.tresjs.org/',
          },
          {
            text: 'Nuxtモジュール',
            link: 'https://github.com/Tresjs/nuxt',
          },
          {
            text: 'TresLeches 🍰',
            link: 'https://tresleches.tresjs.org/',
          },
          {
            text: '後処理（近々）',
          },
        ],
      },
    ],
    nav: [
      { text: 'ガイド', link: '/ja/guide/' },
      { text: 'API', link: '/ja/api/tres-canvas' },
      /*       { text: 'API', link: '/api/' },
      { text: '設定', link: '/config/' }, */
      {
        text: 'リソース',
        items: [
          { text: 'チーム', link: '/ja/team' },
          { text: 'リリース', link: 'https://github.com/Tresjs/tres/releases' },
          {
            text: 'プレーグラウンド',
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
            text: '生態系',
            items: [
              {
                text: 'Cientos 💛',
                link: 'https://cientos.tresjs.org/',
              },
              {
                text: 'Nuxtモジュール',
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
  },
}
