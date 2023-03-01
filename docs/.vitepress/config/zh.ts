import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

export const zhConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  themeConfig: {
    sidebar: [
      {
        text: '指南',
        items: [
          // This shows `/guide/index.md` page.
          { text: '简介', link: '/zh/guide/' },
          { text: '快速开始', link: '/zh/guide/getting-started' },
          { text: '您的第一个场景', link: '/zh/guide/your-first-scene' },
        ],
      },
      {
        text: 'API',
        items: [
          { text: '渲染器', link: '/zh/api/renderer' },
          {
            text: '实例, 参数 和 Props',
            link: '/zh/api/instances-arguments-and-props',
          },
          {
            text: '组合式 API',
            link: '/zh/api/composables',
          },
          {
            text: '事件',
            link: '/zh/api/events',
          },
        ],
      },
      {
        text: '示例',
        items: [
          { text: 'Orbit Controls', link: '/zh/examples/orbit-controls' },
          { text: '基础动画', link: '/zh/examples/basic-animations' },
          { text: '分组', link: '/zh/examples/groups' },
          { text: '加载纹理', link: '/zh/examples/load-textures' },
          { text: '加载模型', link: '/zh/examples/load-models' },
          { text: '加载文本', link: '/zh/examples/text-3d' },
        ],
      },
      {
        text: '进阶',

        items: [
          { text: '扩展', link: '/zh/advanced/extending' },
          {
            text: '注意事项',
            link: '/zh/advanced/caveats',
          },
        ],
      },
      {
        text: 'Cientos 💛',
        collapsible: true,
        items: [
          { text: '简介', link: '/zh/cientos/' },
          {
            text: 'Abstractions',
            items: [
              { text: 'Text3D', link: '/zh/cientos/abstractions/text-3d' },
              {
                text: 'useAnimations',
                link: '/zh/cientos/abstractions/use-animations',
              },
              {
                text: '环境',
                link: '/zh/cientos/abstractions/environment',
              },
              {
                text: 'useEnvironment',
                link: '/zh/cientos/abstractions/use-environment',
              },
            ],
          },
          {
            text: '控制器',
            items: [
              {
                text: 'OrbitControls',
                link: '/zh/cientos/controls/orbit-controls',
              },
              {
                text: 'TransformControls',
                link: '/zh/cientos/controls/transform-controls',
              },
            ],
          },
          {
            text: '加载器',
            items: [
              { text: 'useGLTF', link: '/zh/cientos/loaders/use-gltf' },
              { text: 'GLTFModel', link: '/zh/cientos/loaders/gltf-model' },
              { text: 'useFBX', link: '/zh/cientos/loaders/use-fbx' },
              { text: 'FBXModel', link: '/zh/cientos/loaders/fbx-model' },
            ],
          },
          {
            text: '几何',
            items: [
              { text: 'Box', link: '/zh/cientos/shapes/box' },
              { text: 'Circle', link: '/zh/cientos/shapes/circle' },
              { text: 'Cone', link: '/zh/cientos/shapes/cone' },
              { text: 'Dodecahedron', link: '/zh/cientos/shapes/dodecahedron' },
              { text: 'Icosahedron', link: '/zh/cientos/shapes/icosahedron' },
              { text: 'Octahedron', link: '/zh/cientos/shapes/octahedron' },
              { text: 'Plane', link: '/zh/cientos/shapes/plane' },
              { text: 'Ring', link: '/zh/cientos/shapes/ring' },
              { text: 'Sphere', link: '/zh/cientos/shapes/sphere' },
              { text: 'Tetrahedron', link: '/zh/cientos/shapes/tetrahedron' },
              { text: 'Torus', link: '/zh/cientos/shapes/torus' },
              { text: 'TorusKnot', link: '/zh/cientos/shapes/torus-knot' },
              { text: 'Tube', link: '/zh/cientos/shapes/tube' },
            ],
          },
          {
            text: '其他',
            items: [{ text: 'useTweakpane', link: '/zh/cientos/misc/use-tweakpane' }],
          },
        ],
      },
    ],
    nav: [
      { text: '指南', link: '/zh/guide/' },
      { text: 'API', link: '/zh/api/renderer' },
    ],
  },
}
