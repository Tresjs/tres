// vite.config.ts
import { defineConfig } from "file:///Users/alvarosabu/Projects/tres/cientos/node_modules/.pnpm/vite@4.4.9_@types+node@20.5.4/node_modules/vite/dist/node/index.js";
import vue from "file:///Users/alvarosabu/Projects/tres/cientos/node_modules/.pnpm/@vitejs+plugin-vue@4.3.3_vite@4.4.9_vue@3.3.4/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import AutoImport from "file:///Users/alvarosabu/Projects/tres/cientos/node_modules/.pnpm/unplugin-auto-import@0.16.6_@vueuse+core@10.3.0/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///Users/alvarosabu/Projects/tres/cientos/node_modules/.pnpm/unplugin-vue-components@0.25.1_vue@3.3.4/node_modules/unplugin-vue-components/dist/vite.mjs";
import { resolve } from "file:///Users/alvarosabu/Projects/tres/cientos/node_modules/.pnpm/pathe@1.1.1/node_modules/pathe/dist/index.mjs";
import glsl from "file:///Users/alvarosabu/Projects/tres/cientos/node_modules/.pnpm/vite-plugin-glsl@1.1.2_vite@4.4.9/node_modules/vite-plugin-glsl/src/index.js";
import UnoCSS from "file:///Users/alvarosabu/Projects/tres/cientos/node_modules/.pnpm/unocss@0.54.0_postcss@8.4.28_vite@4.4.9/node_modules/unocss/dist/vite.mjs";
import { templateCompilerOptions } from "file:///Users/alvarosabu/Projects/tres/cientos/node_modules/.pnpm/@tresjs+core@3.0.1_three@0.155.0_vue@3.3.4/node_modules/@tresjs/core/dist/tres.js";
var __vite_injected_original_dirname = "/Users/alvarosabu/Projects/tres/cientos/playground";
var vite_config_default = defineConfig({
  plugins: [
    glsl(),
    vue(templateCompilerOptions),
    AutoImport({
      dts: true,
      eslintrc: {
        enabled: true
        // <-- this
      },
      imports: ["vue"]
    }),
    Components({
      /* options */
    }),
    UnoCSS({
      /* options */
    })
  ],
  resolve: {
    alias: {
      "@tresjs/cientos": resolve(__vite_injected_original_dirname, "../src/")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYWx2YXJvc2FidS9Qcm9qZWN0cy90cmVzL2NpZW50b3MvcGxheWdyb3VuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2FsdmFyb3NhYnUvUHJvamVjdHMvdHJlcy9jaWVudG9zL3BsYXlncm91bmQvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2FsdmFyb3NhYnUvUHJvamVjdHMvdHJlcy9jaWVudG9zL3BsYXlncm91bmQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoZSdcbmltcG9ydCBnbHNsIGZyb20gJ3ZpdGUtcGx1Z2luLWdsc2wnXG5pbXBvcnQgVW5vQ1NTIGZyb20gJ3Vub2Nzcy92aXRlJ1xuaW1wb3J0IHsgdGVtcGxhdGVDb21waWxlck9wdGlvbnMgfSBmcm9tICdAdHJlc2pzL2NvcmUnXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgZ2xzbCgpLFxuICAgIHZ1ZSh0ZW1wbGF0ZUNvbXBpbGVyT3B0aW9ucyksXG4gICAgQXV0b0ltcG9ydCh7XG4gICAgICBkdHM6IHRydWUsXG4gICAgICBlc2xpbnRyYzoge1xuICAgICAgICBlbmFibGVkOiB0cnVlLCAvLyA8LS0gdGhpc1xuICAgICAgfSxcbiAgICAgIGltcG9ydHM6IFsndnVlJ10sXG4gICAgfSksXG4gICAgQ29tcG9uZW50cyh7XG4gICAgICAvKiBvcHRpb25zICovXG4gICAgfSksXG4gICAgVW5vQ1NTKHtcbiAgICAgIC8qIG9wdGlvbnMgKi9cbiAgICB9KSxcbiAgXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQHRyZXNqcy9jaWVudG9zJzogcmVzb2x2ZShfX2Rpcm5hbWUsICcuLi9zcmMvJyksXG4gICAgfSxcbiAgfSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXdVLFNBQVMsb0JBQW9CO0FBQ3JXLE9BQU8sU0FBUztBQUNoQixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLGVBQWU7QUFDeEIsT0FBTyxVQUFVO0FBQ2pCLE9BQU8sWUFBWTtBQUNuQixTQUFTLCtCQUErQjtBQVB4QyxJQUFNLG1DQUFtQztBQVV6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxLQUFLO0FBQUEsSUFDTCxJQUFJLHVCQUF1QjtBQUFBLElBQzNCLFdBQVc7QUFBQSxNQUNULEtBQUs7QUFBQSxNQUNMLFVBQVU7QUFBQSxRQUNSLFNBQVM7QUFBQTtBQUFBLE1BQ1g7QUFBQSxNQUNBLFNBQVMsQ0FBQyxLQUFLO0FBQUEsSUFDakIsQ0FBQztBQUFBLElBQ0QsV0FBVztBQUFBO0FBQUEsSUFFWCxDQUFDO0FBQUEsSUFDRCxPQUFPO0FBQUE7QUFBQSxJQUVQLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxtQkFBbUIsUUFBUSxrQ0FBVyxTQUFTO0FBQUEsSUFDakQ7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
