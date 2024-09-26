// vite.config.ts
import vue from "file:///Users/devusersteven/Documents/clients/me/oss/tres/tres/node_modules/.pnpm/@vitejs+plugin-vue@5.1.3_vite@5.4.3_@types+node@22.5.4_terser@5.31.6__vue@3.5.3_typescript@5.5.4_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import copy from "file:///Users/devusersteven/Documents/clients/me/oss/tres/tres/node_modules/.pnpm/rollup-plugin-copy@3.5.0/node_modules/rollup-plugin-copy/dist/index.commonjs.js";
import { defineConfig } from "file:///Users/devusersteven/Documents/clients/me/oss/tres/tres/node_modules/.pnpm/vite@5.4.3_@types+node@22.5.4_terser@5.31.6/node_modules/vite/dist/node/index.js";
import banner from "file:///Users/devusersteven/Documents/clients/me/oss/tres/tres/node_modules/.pnpm/vite-plugin-banner@0.8.0/node_modules/vite-plugin-banner/dist/index.mjs";
import dts from "file:///Users/devusersteven/Documents/clients/me/oss/tres/tres/node_modules/.pnpm/vite-plugin-dts@4.1.0_@types+node@22.5.4_rollup@4.21.2_typescript@5.5.4_vite@5.4.3_@types+node@22.5.4_terser@5.31.6_/node_modules/vite-plugin-dts/dist/index.mjs";
import Inspect from "file:///Users/devusersteven/Documents/clients/me/oss/tres/tres/node_modules/.pnpm/vite-plugin-inspect@0.8.7_@nuxt+kit@3.13.1_magicast@0.3.4_rollup@4.21.2_webpack-sources@3.2.3_bv6ye3t62f5bjw34qlzno5jenm/node_modules/vite-plugin-inspect/dist/index.mjs";
import { coverageConfigDefaults } from "file:///Users/devusersteven/Documents/clients/me/oss/tres/tres/node_modules/.pnpm/vitest@2.0.5_@types+node@22.5.4_@vitest+ui@2.0.5_jsdom@25.0.0_terser@5.31.6/node_modules/vitest/dist/config.js";
import { bold, gray, lightGreen, yellow } from "file:///Users/devusersteven/Documents/clients/me/oss/tres/tres/node_modules/.pnpm/kolorist@1.8.0/node_modules/kolorist/dist/esm/index.mjs";
import { resolve } from "file:///Users/devusersteven/Documents/clients/me/oss/tres/tres/node_modules/.pnpm/pathe@1.1.2/node_modules/pathe/dist/index.mjs";

// package.json
var package_default = {
  name: "@tresjs/core",
  type: "module",
  version: "4.2.10",
  packageManager: "pnpm@9.1.4",
  description: "Declarative ThreeJS using Vue Components",
  author: "Alvaro Saburido <hola@alvarosaburido.dev> (https://github.com/alvarosabu/)",
  license: "MIT",
  repository: {
    type: "git",
    url: "git+https://github.com/Tresjs/tres.git"
  },
  keywords: [
    "vue",
    "3d",
    "threejs",
    "three",
    "threejs-vue"
  ],
  sideEffects: false,
  exports: {
    ".": {
      types: "./dist/index.d.ts",
      import: "./dist/tres.js",
      require: "./dist/tres.umd.cjs"
    },
    "./components": {
      types: "./dist/src/components/index.d.ts"
    },
    "./composables": {
      types: "./dist/src/composables/index.d.ts"
    },
    "./types": {
      types: "./dist/src/types/index.d.ts"
    },
    "./utils": {
      types: "./dist/src/utils/index.d.ts"
    },
    "./*": "./*"
  },
  main: "./dist/tres.js",
  module: "./dist/tres.js",
  types: "./dist/index.d.ts",
  files: [
    "*.d.ts",
    "dist"
  ],
  publishConfig: {
    access: "public"
  },
  scripts: {
    dev: "cd playground/vue && npm run dev",
    "dev:nuxt": "cd playground/nuxt && npm run dev",
    build: "vite build",
    test: "vitest --silent",
    "test:noisy": "vitest",
    "test:ci": "vitest run",
    "test:ui": "vitest --ui --coverage.enabled=true",
    release: "release-it",
    coverage: "vitest run --coverage",
    lint: "eslint .",
    "lint:fix": "eslint . --fix",
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:serve": "vitepress serve docs",
    "docs:preview": "vitepress preview docs",
    "docs:contributors": "esno scripts/update-contributors.ts",
    prepare: "node .husky/install.mjs"
  },
  peerDependencies: {
    three: ">=0.133",
    vue: ">=3.4"
  },
  dependencies: {
    "@alvarosabu/utils": "^3.2.0",
    "@vue/devtools-api": "^6.6.3",
    "@vueuse/core": "^11.0.3"
  },
  devDependencies: {
    "@release-it/conventional-changelog": "^8.0.1",
    "@stackblitz/sdk": "^1.11.0",
    "@tresjs/cientos": "4.0.2",
    "@tresjs/eslint-config": "^1.2.0",
    "@types/three": "^0.168.0",
    "@typescript-eslint/eslint-plugin": "^8.4.0",
    "@typescript-eslint/parser": "^8.4.0",
    "@vitejs/plugin-vue": "^5.1.3",
    "@vitest/coverage-c8": "^0.33.0",
    "@vitest/coverage-v8": "^2.0.2",
    "@vitest/ui": "^2.0.2",
    "@vue/test-utils": "^2.4.6",
    eslint: "^9.9.1",
    "eslint-plugin-vue": "^9.28.0",
    esno: "^4.7.0",
    gsap: "^3.12.5",
    husky: "^9.1.5",
    jsdom: "^25.0.0",
    kolorist: "^1.8.0",
    ohmyfetch: "^0.4.21",
    pathe: "^1.1.2",
    "release-it": "^17.5.0",
    "rollup-plugin-analyzer": "^4.0.0",
    "rollup-plugin-copy": "^3.5.0",
    "rollup-plugin-visualizer": "^5.12.0",
    sponsorkit: "^0.15.4",
    three: "^0.168.0",
    unocss: "^0.62.3",
    unplugin: "^1.13.1",
    "unplugin-vue-components": "^0.27.4",
    vite: "^5.4.3",
    "vite-plugin-banner": "^0.8.0",
    "vite-plugin-dts": "4.1.0",
    "vite-plugin-inspect": "^0.8.7",
    "vite-plugin-require-transform": "^1.0.21",
    "vite-svg-loader": "^5.1.0",
    vitepress: "1.3.4",
    vitest: "^2.0.2",
    vue: "3.5.3",
    "vue-demi": "^0.14.10"
  }
};

// vite.config.ts
var __vite_injected_original_dirname = "/Users/devusersteven/Documents/clients/me/oss/tres/tres";
console.log(`${lightGreen("\u25B2")} ${gray("\u25A0")} ${yellow("\u25CF")} ${bold("Tres")} v${package_default.version}`);
var vite_config_default = defineConfig({
  server: {
    port: 5174
  },
  plugins: [
    vue({
      isProduction: false,
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith("Tres") && tag !== "TresCanvas"
        }
      }
    }),
    dts({
      insertTypesEntry: true
    }),
    banner({
      content: `/**
 * name: ${package_default.name}
 * version: v${package_default.version}
 * (c) ${(/* @__PURE__ */ new Date()).getFullYear()}
 * description: ${package_default.description}
 * author: ${package_default.author}
 */`
    }),
    Inspect()
  ],
  test: {
    environment: "jsdom",
    globals: true,
    coverage: {
      provider: "v8",
      exclude: [
        ...coverageConfigDefaults.exclude,
        "playground/**",
        "docs/**",
        "**/sponsorkit**/**"
      ]
    }
  },
  build: {
    lib: {
      entry: resolve(__vite_injected_original_dirname, "src/index.ts"),
      name: "tres",
      fileName: "tres"
    },
    watch: {
      include: [resolve(__vite_injected_original_dirname, "src")]
    },
    copyPublicDir: false,
    rollupOptions: {
      plugins: [
        copy({
          targets: [{ src: "src/types/tres-components.d.ts", dest: "dist/types" }]
        })
        /*   analyze(), */
        /*    visualizer({
          open: true,
          gzipSize: true,
          brotliSize: true,
        }), */
      ],
      external: ["vue", "@vueuse/core", "three"],
      output: {
        exports: "named",
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          "vue": "Vue",
          "@vueuse/core": "VueUseCore",
          "three": "Three"
        }
      }
    }
  },
  optimizeDeps: {
    exclude: ["vue", "three"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2RldnVzZXJzdGV2ZW4vRG9jdW1lbnRzL2NsaWVudHMvbWUvb3NzL3RyZXMvdHJlc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2RldnVzZXJzdGV2ZW4vRG9jdW1lbnRzL2NsaWVudHMvbWUvb3NzL3RyZXMvdHJlcy92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvZGV2dXNlcnN0ZXZlbi9Eb2N1bWVudHMvY2xpZW50cy9tZS9vc3MvdHJlcy90cmVzL3ZpdGUuY29uZmlnLnRzXCI7Ly8vIDxyZWZlcmVuY2UgdHlwZXM9XCJ2aXRlc3RcIiAvPlxuXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcblxuaW1wb3J0IGNvcHkgZnJvbSAncm9sbHVwLXBsdWdpbi1jb3B5J1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCBiYW5uZXIgZnJvbSAndml0ZS1wbHVnaW4tYmFubmVyJ1xuaW1wb3J0IGR0cyBmcm9tICd2aXRlLXBsdWdpbi1kdHMnXG5pbXBvcnQgSW5zcGVjdCBmcm9tICd2aXRlLXBsdWdpbi1pbnNwZWN0J1xuXG5pbXBvcnQgeyBjb3ZlcmFnZUNvbmZpZ0RlZmF1bHRzIH0gZnJvbSAndml0ZXN0L2NvbmZpZydcblxuLyogaW1wb3J0IGFuYWx5emUgZnJvbSAncm9sbHVwLXBsdWdpbi1hbmFseXplcidcbiAqLyAvKiBpbXBvcnQgeyB2aXN1YWxpemVyIH0gZnJvbSAncm9sbHVwLXBsdWdpbi12aXN1YWxpemVyJyAqL1xuaW1wb3J0IHsgYm9sZCwgZ3JheSwgbGlnaHRHcmVlbiwgeWVsbG93IH0gZnJvbSAna29sb3Jpc3QnXG5cbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoZSdcblxuaW1wb3J0IHBrZyBmcm9tICcuL3BhY2thZ2UuanNvbidcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbmNvbnNvbGUubG9nKGAke2xpZ2h0R3JlZW4oJ1x1MjVCMicpfSAke2dyYXkoJ1x1MjVBMCcpfSAke3llbGxvdygnXHUyNUNGJyl9ICR7Ym9sZCgnVHJlcycpfSB2JHtwa2cudmVyc2lvbn1gKVxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IDUxNzQsXG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICB2dWUoe1xuICAgICAgaXNQcm9kdWN0aW9uOiBmYWxzZSxcbiAgICAgIHRlbXBsYXRlOiB7XG4gICAgICAgIGNvbXBpbGVyT3B0aW9uczoge1xuICAgICAgICAgIGlzQ3VzdG9tRWxlbWVudDogdGFnID0+IHRhZy5zdGFydHNXaXRoKCdUcmVzJykgJiYgdGFnICE9PSAnVHJlc0NhbnZhcycsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pLFxuICAgIGR0cyh7XG4gICAgICBpbnNlcnRUeXBlc0VudHJ5OiB0cnVlLFxuICAgIH0pLFxuICAgIGJhbm5lcih7XG4gICAgICBjb250ZW50OiBgLyoqXFxuICogbmFtZTogJHtwa2cubmFtZX1cXG4gKiB2ZXJzaW9uOiB2JHtcbiAgICAgICAgcGtnLnZlcnNpb25cbiAgICAgIH1cXG4gKiAoYykgJHtuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCl9XFxuICogZGVzY3JpcHRpb246ICR7cGtnLmRlc2NyaXB0aW9ufVxcbiAqIGF1dGhvcjogJHtwa2cuYXV0aG9yfVxcbiAqL2AsXG4gICAgfSksXG4gICAgSW5zcGVjdCgpLFxuICBdLFxuICB0ZXN0OiB7XG4gICAgZW52aXJvbm1lbnQ6ICdqc2RvbScsXG4gICAgZ2xvYmFsczogdHJ1ZSxcbiAgICBjb3ZlcmFnZToge1xuICAgICAgcHJvdmlkZXI6ICd2OCcsXG4gICAgICBleGNsdWRlOiBbXG4gICAgICAgIC4uLmNvdmVyYWdlQ29uZmlnRGVmYXVsdHMuZXhjbHVkZSxcbiAgICAgICAgJ3BsYXlncm91bmQvKionLFxuICAgICAgICAnZG9jcy8qKicsXG4gICAgICAgICcqKi9zcG9uc29ya2l0KiovKionLFxuICAgICAgXSxcbiAgICB9LFxuICB9LFxuICBidWlsZDoge1xuICAgIGxpYjoge1xuICAgICAgZW50cnk6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2luZGV4LnRzJyksXG4gICAgICBuYW1lOiAndHJlcycsXG4gICAgICBmaWxlTmFtZTogJ3RyZXMnLFxuICAgIH0sXG4gICAgd2F0Y2g6IHtcbiAgICAgIGluY2x1ZGU6IFtyZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpXSxcbiAgICB9LFxuICAgIGNvcHlQdWJsaWNEaXI6IGZhbHNlLFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgY29weSh7XG4gICAgICAgICAgdGFyZ2V0czogW3sgc3JjOiAnc3JjL3R5cGVzL3RyZXMtY29tcG9uZW50cy5kLnRzJywgZGVzdDogJ2Rpc3QvdHlwZXMnIH1dLFxuICAgICAgICB9KSxcbiAgICAgICAgLyogICBhbmFseXplKCksICovXG4gICAgICAgIC8qICAgIHZpc3VhbGl6ZXIoe1xuICAgICAgICAgIG9wZW46IHRydWUsXG4gICAgICAgICAgZ3ppcFNpemU6IHRydWUsXG4gICAgICAgICAgYnJvdGxpU2l6ZTogdHJ1ZSxcbiAgICAgICAgfSksICovXG4gICAgICBdLFxuXG4gICAgICBleHRlcm5hbDogWyd2dWUnLCAnQHZ1ZXVzZS9jb3JlJywgJ3RocmVlJ10sXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgZXhwb3J0czogJ25hbWVkJyxcbiAgICAgICAgLy8gUHJvdmlkZSBnbG9iYWwgdmFyaWFibGVzIHRvIHVzZSBpbiB0aGUgVU1EIGJ1aWxkXG4gICAgICAgIC8vIGZvciBleHRlcm5hbGl6ZWQgZGVwc1xuICAgICAgICBnbG9iYWxzOiB7XG4gICAgICAgICAgJ3Z1ZSc6ICdWdWUnLFxuICAgICAgICAgICdAdnVldXNlL2NvcmUnOiAnVnVlVXNlQ29yZScsXG4gICAgICAgICAgJ3RocmVlJzogJ1RocmVlJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgb3B0aW1pemVEZXBzOiB7XG4gICAgZXhjbHVkZTogWyd2dWUnLCAndGhyZWUnXSxcbiAgfSxcbn0pXG4iLCAie1xuICBcIm5hbWVcIjogXCJAdHJlc2pzL2NvcmVcIixcbiAgXCJ0eXBlXCI6IFwibW9kdWxlXCIsXG4gIFwidmVyc2lvblwiOiBcIjQuMi4xMFwiLFxuICBcInBhY2thZ2VNYW5hZ2VyXCI6IFwicG5wbUA5LjEuNFwiLFxuICBcImRlc2NyaXB0aW9uXCI6IFwiRGVjbGFyYXRpdmUgVGhyZWVKUyB1c2luZyBWdWUgQ29tcG9uZW50c1wiLFxuICBcImF1dGhvclwiOiBcIkFsdmFybyBTYWJ1cmlkbyA8aG9sYUBhbHZhcm9zYWJ1cmlkby5kZXY+IChodHRwczovL2dpdGh1Yi5jb20vYWx2YXJvc2FidS8pXCIsXG4gIFwibGljZW5zZVwiOiBcIk1JVFwiLFxuICBcInJlcG9zaXRvcnlcIjoge1xuICAgIFwidHlwZVwiOiBcImdpdFwiLFxuICAgIFwidXJsXCI6IFwiZ2l0K2h0dHBzOi8vZ2l0aHViLmNvbS9UcmVzanMvdHJlcy5naXRcIlxuICB9LFxuICBcImtleXdvcmRzXCI6IFtcbiAgICBcInZ1ZVwiLFxuICAgIFwiM2RcIixcbiAgICBcInRocmVlanNcIixcbiAgICBcInRocmVlXCIsXG4gICAgXCJ0aHJlZWpzLXZ1ZVwiXG4gIF0sXG4gIFwic2lkZUVmZmVjdHNcIjogZmFsc2UsXG4gIFwiZXhwb3J0c1wiOiB7XG4gICAgXCIuXCI6IHtcbiAgICAgIFwidHlwZXNcIjogXCIuL2Rpc3QvaW5kZXguZC50c1wiLFxuICAgICAgXCJpbXBvcnRcIjogXCIuL2Rpc3QvdHJlcy5qc1wiLFxuICAgICAgXCJyZXF1aXJlXCI6IFwiLi9kaXN0L3RyZXMudW1kLmNqc1wiXG4gICAgfSxcbiAgICBcIi4vY29tcG9uZW50c1wiOiB7XG4gICAgICBcInR5cGVzXCI6IFwiLi9kaXN0L3NyYy9jb21wb25lbnRzL2luZGV4LmQudHNcIlxuICAgIH0sXG4gICAgXCIuL2NvbXBvc2FibGVzXCI6IHtcbiAgICAgIFwidHlwZXNcIjogXCIuL2Rpc3Qvc3JjL2NvbXBvc2FibGVzL2luZGV4LmQudHNcIlxuICAgIH0sXG4gICAgXCIuL3R5cGVzXCI6IHtcbiAgICAgIFwidHlwZXNcIjogXCIuL2Rpc3Qvc3JjL3R5cGVzL2luZGV4LmQudHNcIlxuICAgIH0sXG4gICAgXCIuL3V0aWxzXCI6IHtcbiAgICAgIFwidHlwZXNcIjogXCIuL2Rpc3Qvc3JjL3V0aWxzL2luZGV4LmQudHNcIlxuICAgIH0sXG4gICAgXCIuLypcIjogXCIuLypcIlxuICB9LFxuICBcIm1haW5cIjogXCIuL2Rpc3QvdHJlcy5qc1wiLFxuICBcIm1vZHVsZVwiOiBcIi4vZGlzdC90cmVzLmpzXCIsXG4gIFwidHlwZXNcIjogXCIuL2Rpc3QvaW5kZXguZC50c1wiLFxuICBcImZpbGVzXCI6IFtcbiAgICBcIiouZC50c1wiLFxuICAgIFwiZGlzdFwiXG4gIF0sXG4gIFwicHVibGlzaENvbmZpZ1wiOiB7XG4gICAgXCJhY2Nlc3NcIjogXCJwdWJsaWNcIlxuICB9LFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwiZGV2XCI6IFwiY2QgcGxheWdyb3VuZC92dWUgJiYgbnBtIHJ1biBkZXZcIixcbiAgICBcImRldjpudXh0XCI6IFwiY2QgcGxheWdyb3VuZC9udXh0ICYmIG5wbSBydW4gZGV2XCIsXG4gICAgXCJidWlsZFwiOiBcInZpdGUgYnVpbGRcIixcbiAgICBcInRlc3RcIjogXCJ2aXRlc3QgLS1zaWxlbnRcIixcbiAgICBcInRlc3Q6bm9pc3lcIjogXCJ2aXRlc3RcIixcbiAgICBcInRlc3Q6Y2lcIjogXCJ2aXRlc3QgcnVuXCIsXG4gICAgXCJ0ZXN0OnVpXCI6IFwidml0ZXN0IC0tdWkgLS1jb3ZlcmFnZS5lbmFibGVkPXRydWVcIixcbiAgICBcInJlbGVhc2VcIjogXCJyZWxlYXNlLWl0XCIsXG4gICAgXCJjb3ZlcmFnZVwiOiBcInZpdGVzdCBydW4gLS1jb3ZlcmFnZVwiLFxuICAgIFwibGludFwiOiBcImVzbGludCAuXCIsXG4gICAgXCJsaW50OmZpeFwiOiBcImVzbGludCAuIC0tZml4XCIsXG4gICAgXCJkb2NzOmRldlwiOiBcInZpdGVwcmVzcyBkZXYgZG9jc1wiLFxuICAgIFwiZG9jczpidWlsZFwiOiBcInZpdGVwcmVzcyBidWlsZCBkb2NzXCIsXG4gICAgXCJkb2NzOnNlcnZlXCI6IFwidml0ZXByZXNzIHNlcnZlIGRvY3NcIixcbiAgICBcImRvY3M6cHJldmlld1wiOiBcInZpdGVwcmVzcyBwcmV2aWV3IGRvY3NcIixcbiAgICBcImRvY3M6Y29udHJpYnV0b3JzXCI6IFwiZXNubyBzY3JpcHRzL3VwZGF0ZS1jb250cmlidXRvcnMudHNcIixcbiAgICBcInByZXBhcmVcIjogXCJub2RlIC5odXNreS9pbnN0YWxsLm1qc1wiXG4gIH0sXG4gIFwicGVlckRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJ0aHJlZVwiOiBcIj49MC4xMzNcIixcbiAgICBcInZ1ZVwiOiBcIj49My40XCJcbiAgfSxcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQGFsdmFyb3NhYnUvdXRpbHNcIjogXCJeMy4yLjBcIixcbiAgICBcIkB2dWUvZGV2dG9vbHMtYXBpXCI6IFwiXjYuNi4zXCIsXG4gICAgXCJAdnVldXNlL2NvcmVcIjogXCJeMTEuMC4zXCJcbiAgfSxcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQHJlbGVhc2UtaXQvY29udmVudGlvbmFsLWNoYW5nZWxvZ1wiOiBcIl44LjAuMVwiLFxuICAgIFwiQHN0YWNrYmxpdHovc2RrXCI6IFwiXjEuMTEuMFwiLFxuICAgIFwiQHRyZXNqcy9jaWVudG9zXCI6IFwiNC4wLjJcIixcbiAgICBcIkB0cmVzanMvZXNsaW50LWNvbmZpZ1wiOiBcIl4xLjIuMFwiLFxuICAgIFwiQHR5cGVzL3RocmVlXCI6IFwiXjAuMTY4LjBcIixcbiAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9lc2xpbnQtcGx1Z2luXCI6IFwiXjguNC4wXCIsXG4gICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvcGFyc2VyXCI6IFwiXjguNC4wXCIsXG4gICAgXCJAdml0ZWpzL3BsdWdpbi12dWVcIjogXCJeNS4xLjNcIixcbiAgICBcIkB2aXRlc3QvY292ZXJhZ2UtYzhcIjogXCJeMC4zMy4wXCIsXG4gICAgXCJAdml0ZXN0L2NvdmVyYWdlLXY4XCI6IFwiXjIuMC4yXCIsXG4gICAgXCJAdml0ZXN0L3VpXCI6IFwiXjIuMC4yXCIsXG4gICAgXCJAdnVlL3Rlc3QtdXRpbHNcIjogXCJeMi40LjZcIixcbiAgICBcImVzbGludFwiOiBcIl45LjkuMVwiLFxuICAgIFwiZXNsaW50LXBsdWdpbi12dWVcIjogXCJeOS4yOC4wXCIsXG4gICAgXCJlc25vXCI6IFwiXjQuNy4wXCIsXG4gICAgXCJnc2FwXCI6IFwiXjMuMTIuNVwiLFxuICAgIFwiaHVza3lcIjogXCJeOS4xLjVcIixcbiAgICBcImpzZG9tXCI6IFwiXjI1LjAuMFwiLFxuICAgIFwia29sb3Jpc3RcIjogXCJeMS44LjBcIixcbiAgICBcIm9obXlmZXRjaFwiOiBcIl4wLjQuMjFcIixcbiAgICBcInBhdGhlXCI6IFwiXjEuMS4yXCIsXG4gICAgXCJyZWxlYXNlLWl0XCI6IFwiXjE3LjUuMFwiLFxuICAgIFwicm9sbHVwLXBsdWdpbi1hbmFseXplclwiOiBcIl40LjAuMFwiLFxuICAgIFwicm9sbHVwLXBsdWdpbi1jb3B5XCI6IFwiXjMuNS4wXCIsXG4gICAgXCJyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXJcIjogXCJeNS4xMi4wXCIsXG4gICAgXCJzcG9uc29ya2l0XCI6IFwiXjAuMTUuNFwiLFxuICAgIFwidGhyZWVcIjogXCJeMC4xNjguMFwiLFxuICAgIFwidW5vY3NzXCI6IFwiXjAuNjIuM1wiLFxuICAgIFwidW5wbHVnaW5cIjogXCJeMS4xMy4xXCIsXG4gICAgXCJ1bnBsdWdpbi12dWUtY29tcG9uZW50c1wiOiBcIl4wLjI3LjRcIixcbiAgICBcInZpdGVcIjogXCJeNS40LjNcIixcbiAgICBcInZpdGUtcGx1Z2luLWJhbm5lclwiOiBcIl4wLjguMFwiLFxuICAgIFwidml0ZS1wbHVnaW4tZHRzXCI6IFwiNC4xLjBcIixcbiAgICBcInZpdGUtcGx1Z2luLWluc3BlY3RcIjogXCJeMC44LjdcIixcbiAgICBcInZpdGUtcGx1Z2luLXJlcXVpcmUtdHJhbnNmb3JtXCI6IFwiXjEuMC4yMVwiLFxuICAgIFwidml0ZS1zdmctbG9hZGVyXCI6IFwiXjUuMS4wXCIsXG4gICAgXCJ2aXRlcHJlc3NcIjogXCIxLjMuNFwiLFxuICAgIFwidml0ZXN0XCI6IFwiXjIuMC4yXCIsXG4gICAgXCJ2dWVcIjogXCIzLjUuM1wiLFxuICAgIFwidnVlLWRlbWlcIjogXCJeMC4xNC4xMFwiXG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFFQSxPQUFPLFNBQVM7QUFFaEIsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sWUFBWTtBQUNuQixPQUFPLFNBQVM7QUFDaEIsT0FBTyxhQUFhO0FBRXBCLFNBQVMsOEJBQThCO0FBSXZDLFNBQVMsTUFBTSxNQUFNLFlBQVksY0FBYztBQUUvQyxTQUFTLGVBQWU7OztBQ2hCeEI7QUFBQSxFQUNFLE1BQVE7QUFBQSxFQUNSLE1BQVE7QUFBQSxFQUNSLFNBQVc7QUFBQSxFQUNYLGdCQUFrQjtBQUFBLEVBQ2xCLGFBQWU7QUFBQSxFQUNmLFFBQVU7QUFBQSxFQUNWLFNBQVc7QUFBQSxFQUNYLFlBQWM7QUFBQSxJQUNaLE1BQVE7QUFBQSxJQUNSLEtBQU87QUFBQSxFQUNUO0FBQUEsRUFDQSxVQUFZO0FBQUEsSUFDVjtBQUFBLElBQ0E7QUFBQSxJ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
