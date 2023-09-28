// vite.config.ts
import { defineConfig } from "file:///Users/tino/Code/tresjs/post-processing/node_modules/.pnpm/vite@4.3.9/node_modules/vite/dist/node/index.js";
import vue from "file:///Users/tino/Code/tresjs/post-processing/node_modules/.pnpm/@vitejs+plugin-vue@4.2.3_vite@4.3.9_vue@3.3.4/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import banner from "file:///Users/tino/Code/tresjs/post-processing/node_modules/.pnpm/vite-plugin-banner@0.7.0/node_modules/vite-plugin-banner/dist/index.mjs";
import dts from "file:///Users/tino/Code/tresjs/post-processing/node_modules/.pnpm/vite-plugin-dts@2.3.0_vite@4.3.9/node_modules/vite-plugin-dts/dist/index.mjs";
import analyze from "file:///Users/tino/Code/tresjs/post-processing/node_modules/.pnpm/rollup-plugin-analyzer@4.0.0/node_modules/rollup-plugin-analyzer/index.js";
import { visualizer } from "file:///Users/tino/Code/tresjs/post-processing/node_modules/.pnpm/rollup-plugin-visualizer@5.9.2/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import { resolve } from "file:///Users/tino/Code/tresjs/post-processing/node_modules/.pnpm/pathe@1.1.1/node_modules/pathe/dist/index.mjs";
import { lightGreen, magenta, gray, bold } from "file:///Users/tino/Code/tresjs/post-processing/node_modules/.pnpm/kolorist@1.8.0/node_modules/kolorist/dist/esm/index.mjs";

// package.json
var package_default = {
  name: "@tresjs/post-processing",
  description: "Post-processing library for TresJS",
  version: "0.4.0",
  type: "module",
  author: "Alvaro Saburido <hola@alvarosaburido.dev> (https://github.com/alvarosabu/)",
  files: [
    "dist",
    "*.d.ts"
  ],
  license: "MIT",
  main: "./dist/tres-postprocessing.js",
  module: "./dist/tres-postprocessing.js",
  exports: {
    ".": {
      types: "./dist/index.d.ts",
      import: "./dist/tres-postprocessing.js"
    },
    "./*": "./*"
  },
  publishConfig: {
    access: "public"
  },
  keywords: [
    "vue",
    "3d",
    "threejs",
    "three",
    "post-processing",
    "effects",
    "fx"
  ],
  scripts: {
    dev: "vite",
    playground: "cd playground && npm run dev",
    build: "vite build",
    preview: "vite preview",
    release: "release-it",
    lint: "eslint . --ext .js,.jsx,.ts,.tsx,.vue",
    "lint:fix": "pnpm run lint --fix",
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs"
  },
  peerDependencies: {
    three: ">=0.133",
    vue: ">=3.3"
  },
  dependencies: {
    "@tresjs/core": "^3.0.1",
    "@vueuse/core": "^10.2.0",
    postprocessing: "^6.32.1",
    "three-stdlib": "^2.23.10"
  },
  devDependencies: {
    "@release-it/conventional-changelog": "^5.1.1",
    "@tresjs/eslint-config-vue": "^0.2.0",
    "@types/three": "^0.152.1",
    "@vitejs/plugin-vue": "^4.2.3",
    gsap: "^3.12.1",
    kolorist: "^1.8.0",
    pathe: "^1.1.1",
    prettier: "^2.8.8",
    "release-it": "^15.11.0",
    "rollup-plugin-analyzer": "^4.0.0",
    "rollup-plugin-visualizer": "^5.9.2",
    three: "^0.153.0",
    typescript: "^5.1.3",
    unocss: "^0.53.3",
    vite: "^4.3.9",
    "vite-plugin-banner": "^0.7.0",
    "vite-plugin-dts": "2.3.0",
    "vite-svg-loader": "^4.0.0",
    vitepress: "1.0.0-beta.3",
    vue: "^3.3.4",
    "vue-tsc": "^1.8.1"
  }
};

// vite.config.ts
var __vite_injected_original_dirname = "/Users/tino/Code/tresjs/post-processing";
console.log(`${lightGreen("\u25B2")} ${gray("\u25A0")} ${magenta("\u{1D5EB}")} ${bold("Tres/post-processing")} v${package_default.version}`);
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "/@": resolve(__vite_injected_original_dirname, "./src")
    },
    dedupe: ["@tresjs/core"]
  },
  plugins: [
    vue({
      script: {
        propsDestructure: true
      },
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
    })
  ],
  build: {
    lib: {
      entry: resolve(__vite_injected_original_dirname, "src/index.ts"),
      name: "tres-postprocessing",
      fileName: "tres-postprocessing"
    },
    copyPublicDir: false,
    watch: {
      include: [resolve(__vite_injected_original_dirname, "src")]
    },
    rollupOptions: {
      plugins: [
        analyze(),
        visualizer({
          gzipSize: true,
          brotliSize: true,
          open: false
        })
      ],
      external: ["three", "vue", "@tresjs/core", "postprocessing"],
      output: {
        exports: "named",
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          "@tresjs/core": "TresjsCore",
          three: "Three",
          vue: "Vue",
          postprocessing: "Postprocessing"
        }
      }
    }
  },
  optimizeDeps: {
    exclude: ["three", "vue", "@tresjs/core", "postprocessing"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3Rpbm8vQ29kZS90cmVzanMvcG9zdC1wcm9jZXNzaW5nXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvdGluby9Db2RlL3RyZXNqcy9wb3N0LXByb2Nlc3Npbmcvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3Rpbm8vQ29kZS90cmVzanMvcG9zdC1wcm9jZXNzaW5nL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuXG5pbXBvcnQgYmFubmVyIGZyb20gJ3ZpdGUtcGx1Z2luLWJhbm5lcidcbmltcG9ydCBkdHMgZnJvbSAndml0ZS1wbHVnaW4tZHRzJ1xuaW1wb3J0IGFuYWx5emUgZnJvbSAncm9sbHVwLXBsdWdpbi1hbmFseXplcidcbmltcG9ydCB7IHZpc3VhbGl6ZXIgfSBmcm9tICdyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXInXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aGUnXG5cbmltcG9ydCB7IGxpZ2h0R3JlZW4sIG1hZ2VudGEsIGdyYXksIGJvbGQgfSBmcm9tICdrb2xvcmlzdCdcblxuaW1wb3J0IHBrZyBmcm9tICcuL3BhY2thZ2UuanNvbidcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbmNvbnNvbGUubG9nKGAke2xpZ2h0R3JlZW4oJ1x1MjVCMicpfSAke2dyYXkoJ1x1MjVBMCcpfSAke21hZ2VudGEoJ1x1RDgzNVx1RERFQicpfSAke2JvbGQoJ1RyZXMvcG9zdC1wcm9jZXNzaW5nJyl9IHYke3BrZy52ZXJzaW9ufWApXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICcvQCc6IHJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMnKSxcbiAgICB9LFxuICAgIGRlZHVwZTogWydAdHJlc2pzL2NvcmUnXSxcbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIHZ1ZSh7XG4gICAgICBzY3JpcHQ6IHtcbiAgICAgICAgcHJvcHNEZXN0cnVjdHVyZTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZToge1xuICAgICAgICBjb21waWxlck9wdGlvbnM6IHtcbiAgICAgICAgICBpc0N1c3RvbUVsZW1lbnQ6IHRhZyA9PiB0YWcuc3RhcnRzV2l0aCgnVHJlcycpICYmIHRhZyAhPT0gJ1RyZXNDYW52YXMnLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgICBkdHMoe1xuICAgICAgaW5zZXJ0VHlwZXNFbnRyeTogdHJ1ZSxcbiAgICB9KSxcbiAgICBiYW5uZXIoe1xuICAgICAgY29udGVudDogYC8qKlxcbiAqIG5hbWU6ICR7cGtnLm5hbWV9XFxuICogdmVyc2lvbjogdiR7XG4gICAgICAgIHBrZy52ZXJzaW9uXG4gICAgICB9XFxuICogKGMpICR7bmV3IERhdGUoKS5nZXRGdWxsWWVhcigpfVxcbiAqIGRlc2NyaXB0aW9uOiAke3BrZy5kZXNjcmlwdGlvbn1cXG4gKiBhdXRob3I6ICR7cGtnLmF1dGhvcn1cXG4gKi9gLFxuICAgIH0pLFxuICBdLFxuICBidWlsZDoge1xuICAgIGxpYjoge1xuICAgICAgZW50cnk6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2luZGV4LnRzJyksXG4gICAgICBuYW1lOiAndHJlcy1wb3N0cHJvY2Vzc2luZycsXG4gICAgICBmaWxlTmFtZTogJ3RyZXMtcG9zdHByb2Nlc3NpbmcnLFxuICAgIH0sXG4gICAgY29weVB1YmxpY0RpcjogZmFsc2UsXG4gICAgd2F0Y2g6IHtcbiAgICAgIGluY2x1ZGU6IFtyZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpXSxcbiAgICB9LFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgYW5hbHl6ZSgpLFxuICAgICAgICB2aXN1YWxpemVyKHtcbiAgICAgICAgICBnemlwU2l6ZTogdHJ1ZSxcbiAgICAgICAgICBicm90bGlTaXplOiB0cnVlLFxuICAgICAgICAgIG9wZW46IGZhbHNlLFxuICAgICAgICB9KSxcbiAgICAgIF0sXG4gICAgICBleHRlcm5hbDogWyd0aHJlZScsICd2dWUnLCAnQHRyZXNqcy9jb3JlJywgJ3Bvc3Rwcm9jZXNzaW5nJ10sXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgZXhwb3J0czogJ25hbWVkJyxcbiAgICAgICAgLy8gUHJvdmlkZSBnbG9iYWwgdmFyaWFibGVzIHRvIHVzZSBpbiB0aGUgVU1EIGJ1aWxkXG4gICAgICAgIC8vIGZvciBleHRlcm5hbGl6ZWQgZGVwc1xuICAgICAgICBnbG9iYWxzOiB7XG4gICAgICAgICAgJ0B0cmVzanMvY29yZSc6ICdUcmVzanNDb3JlJyxcbiAgICAgICAgICB0aHJlZTogJ1RocmVlJyxcbiAgICAgICAgICB2dWU6ICdWdWUnLFxuICAgICAgICAgIHBvc3Rwcm9jZXNzaW5nOiAnUG9zdHByb2Nlc3NpbmcnLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICBvcHRpbWl6ZURlcHM6IHtcbiAgICBleGNsdWRlOiBbJ3RocmVlJywgJ3Z1ZScsICdAdHJlc2pzL2NvcmUnLCAncG9zdHByb2Nlc3NpbmcnXSxcbiAgfSxcbn0pXG4iLCAie1xuICBcIm5hbWVcIjogXCJAdHJlc2pzL3Bvc3QtcHJvY2Vzc2luZ1wiLFxuICBcImRlc2NyaXB0aW9uXCI6IFwiUG9zdC1wcm9jZXNzaW5nIGxpYnJhcnkgZm9yIFRyZXNKU1wiLFxuICBcInZlcnNpb25cIjogXCIwLjQuMFwiLFxuICBcInR5cGVcIjogXCJtb2R1bGVcIixcbiAgXCJhdXRob3JcIjogXCJBbHZhcm8gU2FidXJpZG8gPGhvbGFAYWx2YXJvc2FidXJpZG8uZGV2PiAoaHR0cHM6Ly9naXRodWIuY29tL2FsdmFyb3NhYnUvKVwiLFxuICBcImZpbGVzXCI6IFtcbiAgICBcImRpc3RcIixcbiAgICBcIiouZC50c1wiXG4gIF0sXG4gIFwibGljZW5zZVwiOiBcIk1JVFwiLFxuICBcIm1haW5cIjogXCIuL2Rpc3QvdHJlcy1wb3N0cHJvY2Vzc2luZy5qc1wiLFxuICBcIm1vZHVsZVwiOiBcIi4vZGlzdC90cmVzLXBvc3Rwcm9jZXNzaW5nLmpzXCIsXG4gIFwiZXhwb3J0c1wiOiB7XG4gICAgXCIuXCI6IHtcbiAgICAgIFwidHlwZXNcIjogXCIuL2Rpc3QvaW5kZXguZC50c1wiLFxuICAgICAgXCJpbXBvcnRcIjogXCIuL2Rpc3QvdHJlcy1wb3N0cHJvY2Vzc2luZy5qc1wiXG4gICAgfSxcbiAgICBcIi4vKlwiOiBcIi4vKlwiXG4gIH0sXG4gIFwicHVibGlzaENvbmZpZ1wiOiB7XG4gICAgXCJhY2Nlc3NcIjogXCJwdWJsaWNcIlxuICB9LFxuICBcImtleXdvcmRzXCI6IFtcbiAgICBcInZ1ZVwiLFxuICAgIFwiM2RcIixcbiAgICBcInRocmVlanNcIixcbiAgICBcInRocmVlXCIsXG4gICAgXCJwb3N0LXByb2Nlc3NpbmdcIixcbiAgICBcImVmZmVjdHNcIixcbiAgICBcImZ4XCJcbiAgXSxcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcImRldlwiOiBcInZpdGVcIixcbiAgICBcInBsYXlncm91bmRcIjogXCJjZCBwbGF5Z3JvdW5kICYmIG5wbSBydW4gZGV2XCIsXG4gICAgXCJidWlsZFwiOiBcInZpdGUgYnVpbGRcIixcbiAgICBcInByZXZpZXdcIjogXCJ2aXRlIHByZXZpZXdcIixcbiAgICBcInJlbGVhc2VcIjogXCJyZWxlYXNlLWl0XCIsXG4gICAgXCJsaW50XCI6IFwiZXNsaW50IC4gLS1leHQgLmpzLC5qc3gsLnRzLC50c3gsLnZ1ZVwiLFxuICAgIFwibGludDpmaXhcIjogXCJwbnBtIHJ1biBsaW50IC0tZml4XCIsXG4gICAgXCJkb2NzOmRldlwiOiBcInZpdGVwcmVzcyBkZXYgZG9jc1wiLFxuICAgIFwiZG9jczpidWlsZFwiOiBcInZpdGVwcmVzcyBidWlsZCBkb2NzXCIsXG4gICAgXCJkb2NzOnByZXZpZXdcIjogXCJ2aXRlcHJlc3MgcHJldmlldyBkb2NzXCJcbiAgfSxcbiAgXCJwZWVyRGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcInRocmVlXCI6IFwiPj0wLjEzM1wiLFxuICAgIFwidnVlXCI6IFwiPj0zLjNcIlxuICB9LFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAdHJlc2pzL2NvcmVcIjogXCJeMy4wLjFcIixcbiAgICBcIkB2dWV1c2UvY29yZVwiOiBcIl4xMC4yLjBcIixcbiAgICBcInBvc3Rwcm9jZXNzaW5nXCI6IFwiXjYuMzIuMVwiLFxuICAgIFwidGhyZWUtc3RkbGliXCI6IFwiXjIuMjMuMTBcIlxuICB9LFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAcmVsZWFzZS1pdC9jb252ZW50aW9uYWwtY2hhbmdlbG9nXCI6IFwiXjUuMS4xXCIsXG4gICAgXCJAdHJlc2pzL2VzbGludC1jb25maWctdnVlXCI6IFwiXjAuMi4wXCIsXG4gICAgXCJAdHlwZXMvdGhyZWVcIjogXCJeMC4xNTIuMVwiLFxuICAgIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI6IFwiXjQuMi4zXCIsXG4gICAgXCJnc2FwXCI6IFwiXjMuMTIuMVwiLFxuICAgIFwia29sb3Jpc3RcIjogXCJeMS44LjBcIixcbiAgICBcInBhdGhlXCI6IFwiXjEuMS4xXCIsXG4gICAgXCJwcmV0dGllclwiOiBcIl4yLjguOFwiLFxuICAgIFwicmVsZWFzZS1pdFwiOiBcIl4xNS4xMS4wXCIsXG4gICAgXCJyb2xsdXAtcGx1Z2luLWFuYWx5emVyXCI6IFwiXjQuMC4wXCIsXG4gICAgXCJyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXJcIjogXCJeNS45LjJcIixcbiAgICBcInRocmVlXCI6IFwiXjAuMTUzLjBcIixcbiAgICBcInR5cGVzY3JpcHRcIjogXCJeNS4xLjNcIixcbiAgICBcInVub2Nzc1wiOiBcIl4wLjUzLjNcIixcbiAgICBcInZpdGVcIjogXCJeNC4zLjlcIixcbiAgICBcInZpdGUtcGx1Z2luLWJhbm5lclwiOiBcIl4wLjcuMFwiLFxuICAgIFwidml0ZS1wbHVnaW4tZHRzXCI6IFwiMi4zLjBcIixcbiAgICBcInZpdGUtc3ZnLWxvYWRlclwiOiBcIl40LjAuMFwiLFxuICAgIFwidml0ZXByZXNzXCI6IFwiMS4wLjAtYmV0YS4zXCIsXG4gICAgXCJ2dWVcIjogXCJeMy4zLjRcIixcbiAgICBcInZ1ZS10c2NcIjogXCJeMS44LjFcIlxuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXVTLFNBQVMsb0JBQW9CO0FBQ3BVLE9BQU8sU0FBUztBQUVoQixPQUFPLFlBQVk7QUFDbkIsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sYUFBYTtBQUNwQixTQUFTLGtCQUFrQjtBQUMzQixTQUFTLGVBQWU7QUFFeEIsU0FBUyxZQUFZLFNBQVMsTUFBTSxZQUFZOzs7QUNUaEQ7QUFBQSxFQUNFLE1BQVE7QUFBQSxFQUNSLGFBQWU7QUFBQSxFQUNmLFNBQVc7QUFBQSxFQUNYLE1BQVE7QUFBQSxFQUNSLFFBQVU7QUFBQSxFQUNWLE9BQVM7QUFBQSxJQUNQO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVc7QUFBQSxFQUNYLE1BQVE7QUFBQSxFQUNSLFFBQVU7QUFBQSxFQUNWLFNBQVc7QUFBQSxJQUNULEtBQUs7QUFBQSxNQUNILE9BQVM7QUFBQSxNQUNULFFBQVU7QUFBQSxJQUNaO0FBQUEsSUFDQSxPQUFPO0FBQUEsRUFDVDtBQUFBLEVBQ0EsZUFBaUI7QUFBQSxJQUNmLFFBQVU7QUFBQSxFQUNaO0FBQUEsRUFDQSxVQUFZO0FBQUEsSUFDVjtBQUFBLElBQ0E7QUFBQSxJQUNB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
