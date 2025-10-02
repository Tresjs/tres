// vite.config.ts
import Unocss from "file:///Users/alvarosabu/Projects/tres/core/node_modules/.pnpm/unocss@0.65.4_postcss@8.5.6_rollup@4.52.2_vite@7.1.7_@types+node@24.5.2_jiti@2.6.0_ligh_e64b8271b7344fb7b17487f8d63fc0fc/node_modules/unocss/dist/vite.mjs";
import Components from "file:///Users/alvarosabu/Projects/tres/core/node_modules/.pnpm/unplugin-vue-components@29.1.0_@babel+parser@7.28.4_@nuxt+kit@4.1.2_magicast@0.3.5__vue@3.5.22_typescript@5.9.2_/node_modules/unplugin-vue-components/dist/vite.js";
import { defineConfig } from "file:///Users/alvarosabu/Projects/tres/core/node_modules/.pnpm/vite@7.1.7_@types+node@24.5.2_jiti@2.6.0_lightningcss@1.30.1_terser@5.44.0_tsx@4.20.6_yaml@2.8.1/node_modules/vite/dist/node/index.js";
import svgLoader from "file:///Users/alvarosabu/Projects/tres/core/node_modules/.pnpm/vite-svg-loader@5.1.0_vue@3.5.22_typescript@5.9.2_/node_modules/vite-svg-loader/index.js";
var vite_config_default = defineConfig({
  plugins: [
    svgLoader(),
    Unocss(),
    Components({
      // allow auto load markdown components under `.vitepress/theme/components`
      dirs: [".vitepress/theme/components"],
      extensions: ["vue", "md"],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: "components.d.ts"
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYWx2YXJvc2FidS9Qcm9qZWN0cy90cmVzL2NvcmUvYXBwcy9jaWVudG9zLWRvY3Mtdml0ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvYWx2YXJvc2FidS9Qcm9qZWN0cy90cmVzL2NvcmUvYXBwcy9jaWVudG9zLWRvY3Mtdml0ZXByZXNzL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9hbHZhcm9zYWJ1L1Byb2plY3RzL3RyZXMvY29yZS9hcHBzL2NpZW50b3MtZG9jcy12aXRlcHJlc3Mvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgVW5vY3NzIGZyb20gJ3Vub2Nzcy92aXRlJ1xuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgc3ZnTG9hZGVyIGZyb20gJ3ZpdGUtc3ZnLWxvYWRlcidcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHN2Z0xvYWRlcigpLFxuICAgIFVub2NzcygpLFxuICAgIENvbXBvbmVudHMoe1xuICAgICAgLy8gYWxsb3cgYXV0byBsb2FkIG1hcmtkb3duIGNvbXBvbmVudHMgdW5kZXIgYC52aXRlcHJlc3MvdGhlbWUvY29tcG9uZW50c2BcbiAgICAgIGRpcnM6IFsnLnZpdGVwcmVzcy90aGVtZS9jb21wb25lbnRzJ10sXG4gICAgICBleHRlbnNpb25zOiBbJ3Z1ZScsICdtZCddLFxuICAgICAgLy8gYWxsb3cgYXV0byBpbXBvcnQgYW5kIHJlZ2lzdGVyIGNvbXBvbmVudHMgdXNlZCBpbiBtYXJrZG93blxuICAgICAgaW5jbHVkZTogWy9cXC52dWUkLywgL1xcLnZ1ZVxcP3Z1ZS8sIC9cXC5tZCQvXSxcbiAgICAgIGR0czogJ2NvbXBvbmVudHMuZC50cycsXG4gICAgfSksXG4gIF0sXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFrWCxPQUFPLFlBQVk7QUFDclksT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxlQUFlO0FBRXRCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLFVBQVU7QUFBQSxJQUNWLE9BQU87QUFBQSxJQUNQLFdBQVc7QUFBQTtBQUFBLE1BRVQsTUFBTSxDQUFDLDZCQUE2QjtBQUFBLE1BQ3BDLFlBQVksQ0FBQyxPQUFPLElBQUk7QUFBQTtBQUFBLE1BRXhCLFNBQVMsQ0FBQyxVQUFVLGNBQWMsT0FBTztBQUFBLE1BQ3pDLEtBQUs7QUFBQSxJQUNQLENBQUM7QUFBQSxFQUNIO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
