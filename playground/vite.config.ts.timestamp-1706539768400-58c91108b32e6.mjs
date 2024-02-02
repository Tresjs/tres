// vite.config.ts
import { defineConfig } from "file:///Users/alvarosabu/Projects/tres/core/node_modules/.pnpm/vite@5.0.10/node_modules/vite/dist/node/index.js";
import vue from "file:///Users/alvarosabu/Projects/tres/core/node_modules/.pnpm/@vitejs+plugin-vue@4.5.2_vite@5.0.10_vue@3.3.13/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { resolve } from "file:///Users/alvarosabu/Projects/tres/core/node_modules/.pnpm/pathe@1.1.1/node_modules/pathe/dist/index.mjs";
import AutoImport from "file:///Users/alvarosabu/Projects/tres/core/node_modules/.pnpm/unplugin-auto-import@0.17.2_@vueuse+core@10.7.0/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///Users/alvarosabu/Projects/tres/core/node_modules/.pnpm/unplugin-vue-components@0.26.0_vue@3.3.13/node_modules/unplugin-vue-components/dist/vite.js";
import glsl from "file:///Users/alvarosabu/Projects/tres/core/node_modules/.pnpm/vite-plugin-glsl@1.2.1_vite@5.0.10/node_modules/vite-plugin-glsl/src/index.js";
import UnoCSS from "file:///Users/alvarosabu/Projects/tres/core/node_modules/.pnpm/unocss@0.58.0_postcss@8.4.32_vite@5.0.10/node_modules/unocss/dist/vite.mjs";
import { templateCompilerOptions } from "file:///Users/alvarosabu/Projects/tres/core/dist/tres.js";
import { qrcode } from "file:///Users/alvarosabu/Projects/tres/core/node_modules/.pnpm/vite-plugin-qrcode@0.2.3_vite@5.0.10/node_modules/vite-plugin-qrcode/dist/index.js";
import VueDevTools from "file:///Users/alvarosabu/Projects/tres/core/node_modules/.pnpm/vite-plugin-vue-devtools@1.0.0-rc.6_pug@3.0.2_vite@5.0.10/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
var __vite_injected_original_dirname = "/Users/alvarosabu/Projects/tres/core/playground";
var vite_config_default = defineConfig({
  plugins: [
    glsl(),
    VueDevTools(),
    vue({
      script: {
        propsDestructure: true
      },
      ...templateCompilerOptions
    }),
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
    }),
    qrcode()
    // only applies in dev mode
  ],
  resolve: {
    alias: {
      "@tresjs/core": resolve(__vite_injected_original_dirname, "../src/index.ts")
    },
    dedupe: ["three"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYWx2YXJvc2FidS9Qcm9qZWN0cy90cmVzL2NvcmUvcGxheWdyb3VuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2FsdmFyb3NhYnUvUHJvamVjdHMvdHJlcy9jb3JlL3BsYXlncm91bmQvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2FsdmFyb3NhYnUvUHJvamVjdHMvdHJlcy9jb3JlL3BsYXlncm91bmQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aGUnXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcbmltcG9ydCBnbHNsIGZyb20gJ3ZpdGUtcGx1Z2luLWdsc2wnXG5pbXBvcnQgVW5vQ1NTIGZyb20gJ3Vub2Nzcy92aXRlJ1xuaW1wb3J0IHsgdGVtcGxhdGVDb21waWxlck9wdGlvbnMgfSBmcm9tICdAdHJlc2pzL2NvcmUnXG5pbXBvcnQgeyBxcmNvZGUgfSBmcm9tICd2aXRlLXBsdWdpbi1xcmNvZGUnXG5pbXBvcnQgVnVlRGV2VG9vbHMgZnJvbSAndml0ZS1wbHVnaW4tdnVlLWRldnRvb2xzJ1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIGdsc2woKSxcbiAgICBWdWVEZXZUb29scygpLFxuICAgIHZ1ZSh7XG4gICAgICBzY3JpcHQ6IHtcbiAgICAgICAgcHJvcHNEZXN0cnVjdHVyZTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICAuLi50ZW1wbGF0ZUNvbXBpbGVyT3B0aW9ucyxcbiAgICB9KSxcbiAgICBBdXRvSW1wb3J0KHtcbiAgICAgIGR0czogdHJ1ZSxcbiAgICAgIGVzbGludHJjOiB7XG4gICAgICAgIGVuYWJsZWQ6IHRydWUsIC8vIDwtLSB0aGlzXG4gICAgICB9LFxuICAgICAgaW1wb3J0czogWyd2dWUnXSxcbiAgICB9KSxcbiAgICBDb21wb25lbnRzKHtcbiAgICAgIC8qIG9wdGlvbnMgKi9cbiAgICB9KSxcbiAgICBVbm9DU1Moe1xuICAgICAgLyogb3B0aW9ucyAqL1xuICAgIH0pLFxuICAgIHFyY29kZSgpLCAvLyBvbmx5IGFwcGxpZXMgaW4gZGV2IG1vZGVcbiAgXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQHRyZXNqcy9jb3JlJzogcmVzb2x2ZShfX2Rpcm5hbWUsICcuLi9zcmMvaW5kZXgudHMnKSxcbiAgICB9LFxuICAgIGRlZHVwZTogWyd0aHJlZSddLFxuICB9LFxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBK1QsU0FBUyxvQkFBb0I7QUFDNVYsT0FBTyxTQUFTO0FBQ2hCLFNBQVMsZUFBZTtBQUN4QixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLFVBQVU7QUFDakIsT0FBTyxZQUFZO0FBQ25CLFNBQVMsK0JBQStCO0FBQ3hDLFNBQVMsY0FBYztBQUN2QixPQUFPLGlCQUFpQjtBQVR4QixJQUFNLG1DQUFtQztBQVl6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxLQUFLO0FBQUEsSUFDTCxZQUFZO0FBQUEsSUFDWixJQUFJO0FBQUEsTUFDRixRQUFRO0FBQUEsUUFDTixrQkFBa0I7QUFBQSxNQUNwQjtBQUFBLE1BQ0EsR0FBRztBQUFBLElBQ0wsQ0FBQztBQUFBLElBQ0QsV0FBVztBQUFBLE1BQ1QsS0FBSztBQUFBLE1BQ0wsVUFBVTtBQUFBLFFBQ1IsU0FBUztBQUFBO0FBQUEsTUFDWDtBQUFBLE1BQ0EsU0FBUyxDQUFDLEtBQUs7QUFBQSxJQUNqQixDQUFDO0FBQUEsSUFDRCxXQUFXO0FBQUE7QUFBQSxJQUVYLENBQUM7QUFBQSxJQUNELE9BQU87QUFBQTtBQUFBLElBRVAsQ0FBQztBQUFBLElBQ0QsT0FBTztBQUFBO0FBQUEsRUFDVDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsZ0JBQWdCLFFBQVEsa0NBQVcsaUJBQWlCO0FBQUEsSUFDdEQ7QUFBQSxJQUNBLFFBQVEsQ0FBQyxPQUFPO0FBQUEsRUFDbEI7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
