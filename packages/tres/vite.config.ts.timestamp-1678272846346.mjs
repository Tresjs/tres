// vite.config.ts
import { defineConfig } from "file:///Users/alvarosabu/Projects/tres/node_modules/.pnpm/vite@4.1.4/node_modules/vite/dist/node/index.js";
import vue from "file:///Users/alvarosabu/Projects/tres/node_modules/.pnpm/@vitejs+plugin-vue@4.0.0_vite@4.1.4/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import banner from "file:///Users/alvarosabu/Projects/tres/node_modules/.pnpm/vite-plugin-banner@0.7.0/node_modules/vite-plugin-banner/dist/index.mjs";
import Inspect from "file:///Users/alvarosabu/Projects/tres/node_modules/.pnpm/vite-plugin-inspect@0.7.15_vite@4.1.4/node_modules/vite-plugin-inspect/dist/index.mjs";
import dts from "file:///Users/alvarosabu/Projects/tres/node_modules/.pnpm/vite-plugin-dts@2.0.0-beta.1_vite@4.1.4/node_modules/vite-plugin-dts/dist/index.mjs";

// plugins/vite-plugin-tres.ts
import { createUnplugin } from "file:///Users/alvarosabu/Projects/tres/node_modules/.pnpm/unplugin@1.1.0/node_modules/unplugin/dist/index.mjs";
import * as THREE from "file:///Users/alvarosabu/Projects/tres/node_modules/.pnpm/three@0.150.1/node_modules/three/build/three.module.js";
import fs from "fs";
import { join } from "file:///Users/alvarosabu/Projects/tres/node_modules/.pnpm/pathe@1.1.0/node_modules/pathe/dist/index.mjs";
var unplugin = createUnplugin(() => {
  return {
    name: "unplugin-tres",
    buildStart() {
      console.log("\u2728 Magically generating components...");
      const outputDir = join(".tres", "components");
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      let indexTemplate = "";
      for (const key in THREE) {
        const value = THREE[key];
        if (key === "Scene")
          continue;
        if (typeof value === "function" && /^\s*class\s+/.test(value.toString())) {
          const outputFilePath = join(outputDir, `${key}.ts`);
          const template = `
      import { defineComponent } from 'vue';
      import { ${key}, Color, Vector3 } from 'three';

      export type SizeFlexibleParams =
        | number[]
        | {
            width: number
            height: number
          }

      export interface Vector2PropInterface {
        x?: number
        y?: number
        width?: number
        height?: number
      }

      export interface Vector3PropInterface extends Vector2PropInterface {
        z?: number
      }

      export type VectorFlexibleParams = THREE.Vector3 | number[] | Vector3PropInterface | number


      let ${key}Instance: ${key};
      let instanceProps: string[] = [];

      export function normalizeVectorFlexibleParam(value: VectorFlexibleParams): Array<number> {
        if (typeof value === 'number') {
          return [value, value, value]
        }
        if (value instanceof Vector3) {
          return [value.x, value.y, value.z]
        }
        return value as Array<number>
      }
      
      export function normalizeColor(value: Color | Array<number> | string | number) {
        if (value instanceof Color) {
          return value
        }
        if (Array.isArray(value)) {
          return new Color(...value)
        }
        return new Color(value)
      }
      

      /**
       * Tres${key}Props
       * @type {Partial<${key}> & {parentInstance?: ${key}}}
       * @memberof Tres${key}
       * @description This is a partial of the ${key} class, with the parentInstance property added.
       * 
       **/
      export type Tres${key}Props = Partial<${key}> & {
        parentInstance?: ${key},
        /** 
         * 
         * Array of arguments to pass to the ${key} constructor
         *  
         * @type {Array<any>}
         * @memberof Tres${key}Props
         * @see https://threejs.org/docs/?q=${key}
         *  
         **/
        args?: Array<any>,
        /**
         *
         * Object's local position
         * 
         * @type {VectorFlexibleParams}
         * @memberof Tres${key}Props
        **/
        position?: VectorFlexibleParams
      }

      try {
        ${key}Instance = new ${key}();
        instanceProps = [...Object.keys(${key}Instance)]
      } catch (e) {
      }

      export const Tres${key} = /* #__PURE__ */ defineComponent<Tres${key}Props>({
        name: 'Tres${key}',
        props: ['parentInstance', 'args', ...instanceProps] as unknown as undefined,
        setup(props, { slots, expose, ...rest }) {
         
        /*   const cleanedProps = Object.keys(props).reduce((acc, key) => {
            if (props[key] !== undefined && key !== 'parentInstance') {
              if( ${key}Instance[key] instanceof Color) {
                acc[key] = normalizeColor(props[key])
              } else if ( ${key}Instance[key] instanceof Vector3) {
                acc[key] = normalizeVectorFlexibleParam(props[key])
              } else {
                acc[key] = props[key]
              }
            }
            return acc
          }, {}) */

          if(props.args) {
            ${key}Instance = new ${key}(...props.args);
          } else {
            ${key}Instance = new ${key}();
          }

          console.log('instance', {${key}Instance, props, slots: slots.default ? slots.default() : null, rest, type: ${key}.name})
          expose({${key}Instance})

          function append(parent, child) {
            const regex = /[A-Z][a-z]+/g
            const propName = child.type.match(regex).pop().toLowerCase()
            if (parent[propName]) {
              parent[propName] = child
            }
          }
      
          if (props.parentInstance) {
            append(props.parentInstance, ${key}Instance)
          }

          const preparedSlots = slots.default 
            // eslint-disable-next-line max-len
            ? slots.default().map((slot) => { slot.props = { 
              ...slot.props, 
              parentInstance: ${key}Instance }; 
              return slot; 
            })
            : null
          return () => {
            return preparedSlots;
          };
        },
      });

      export default Tres${key};
    `;
          indexTemplate += `export { default as Tres${key} } from './${key}'
`;
          fs.writeFileSync(outputFilePath, template);
        }
        fs.writeFileSync(join(outputDir, `index.ts`), indexTemplate);
      }
    }
  };
});
var ViteTresPlugin = unplugin.vite;

// vite.config.ts
import { resolve } from "file:///Users/alvarosabu/Projects/tres/node_modules/.pnpm/pathe@1.1.0/node_modules/pathe/dist/index.mjs";
import { lightGreen, yellow, gray, bold } from "file:///Users/alvarosabu/Projects/tres/node_modules/.pnpm/kolorist@1.7.0/node_modules/kolorist/dist/esm/index.mjs";

// package.json
var package_default = {
  name: "@tresjs/core",
  description: "Declarative ThreeJS using Vue Components",
  version: "1.8.1",
  type: "module",
  author: "Alvaro Saburido <hola@alvarosaburido.dev> (https://github.com/alvarosabu/)",
  files: [
    "dist"
  ],
  license: "MIT",
  main: "./dist/tres.umd.cjs",
  module: "./dist/tres.js",
  types: "./dist/index.d.ts",
  exports: {
    ".": {
      import: "./dist/tres.js",
      require: "./dist/tres.umd.cjs"
    },
    "./types": {
      require: "./dist/index.d.ts",
      import: "./dist/index.d.ts"
    },
    "./styles": "./dist/style.css",
    "./*": "./dist/tres.js"
  },
  publishConfig: {
    access: "public"
  },
  keywords: [
    "vue",
    "3d",
    "threejs",
    "three",
    "threejs-vue"
  ],
  scripts: {
    dev: "vite",
    build: "vite build",
    preview: "vite preview",
    test: "vitest",
    "test:ci": "vitest run",
    "test:ui": "vitest --ui",
    coverage: "vitest run --coverage",
    lint: "eslint . --ext .js,.jsx,.ts,.tsx,.vue",
    changelog: "conventional-changelog -p angular -i CHANGELOG.md -s"
  },
  peerDependencies: {
    three: "latest",
    vue: "^3.2.47"
  },
  dependencies: {
    "@alvarosabu/utils": "^2.3.0",
    "@vueuse/core": "^9.13.0"
  },
  devDependencies: {
    "@tresjs/cientos": "workspace:^1.8.0",
    "@types/three": "latest",
    "@vitejs/plugin-vue": "^4.0.0",
    "@vitest/coverage-c8": "^0.28.5",
    "@vitest/ui": "^0.28.5",
    "@vue/test-utils": "^2.3.0",
    "happy-dom": "^8.7.1",
    jsdom: "^21.1.0",
    kolorist: "^1.7.0",
    pathe: "^1.1.0",
    "rollup-plugin-analyzer": "^4.0.0",
    "rollup-plugin-visualizer": "^5.9.0",
    three: "latest",
    "unplugin-vue-components": "^0.24.1",
    vite: "^4.1.4",
    "vite-plugin-banner": "^0.7.0",
    "vite-plugin-dts": "2.0.0-beta.1",
    "vite-plugin-glsl": "^1.1.2",
    "vite-plugin-inspect": "^0.7.15",
    "vite-plugin-require-transform": "^1.0.9",
    vitest: "^0.28.5",
    "vue-demi": "^0.13.11"
  }
};

// vite.config.ts
var __vite_injected_original_dirname = "/Users/alvarosabu/Projects/tres/packages/tres";
console.log(`${lightGreen("\u25B2")} ${gray("\u25A0")} ${yellow("\u25CF")} ${bold("Tres")} v${package_default.version}`);
var vite_config_default = defineConfig({
  server: {
    port: 5174
  },
  resolve: {
    alias: {
      "/@": resolve(__vite_injected_original_dirname, "./src")
    },
    dedupe: ["@tresjs/cientos"]
  },
  plugins: [
    vue({
      isProduction: false
    }),
    ViteTresPlugin(),
    dts({
      insertTypesEntry: true
    }),
    banner({
      content: `/**
 * name: ${package_default.name}
 * version: v${package_default.version}
 * (c) ${new Date().getFullYear()}
 * description: ${package_default.description}
 * author: ${package_default.author}
 */`
    }),
    Inspect()
  ],
  test: {
    environment: "jsdom",
    globals: true,
    threads: false,
    alias: {
      "/@": resolve(__vite_injected_original_dirname, "./src")
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
        /* analyze(), */
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
          vue: "Vue",
          "@vueuse/core": "VueUseCore",
          three: "Three"
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGx1Z2lucy92aXRlLXBsdWdpbi10cmVzLnRzIiwgInBhY2thZ2UuanNvbiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9hbHZhcm9zYWJ1L1Byb2plY3RzL3RyZXMvcGFja2FnZXMvdHJlc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2FsdmFyb3NhYnUvUHJvamVjdHMvdHJlcy9wYWNrYWdlcy90cmVzL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9hbHZhcm9zYWJ1L1Byb2plY3RzL3RyZXMvcGFja2FnZXMvdHJlcy92aXRlLmNvbmZpZy50c1wiOy8vLyA8cmVmZXJlbmNlIHR5cGVzPVwidml0ZXN0XCIgLz5cblxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcblxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgYmFubmVyIGZyb20gJ3ZpdGUtcGx1Z2luLWJhbm5lcidcbmltcG9ydCBJbnNwZWN0IGZyb20gJ3ZpdGUtcGx1Z2luLWluc3BlY3QnXG5cbmltcG9ydCBkdHMgZnJvbSAndml0ZS1wbHVnaW4tZHRzJ1xuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcblxuaW1wb3J0IHsgVml0ZVRyZXNQbHVnaW4gfSBmcm9tICcuL3BsdWdpbnMvdml0ZS1wbHVnaW4tdHJlcydcbmltcG9ydCBhbmFseXplIGZyb20gJ3JvbGx1cC1wbHVnaW4tYW5hbHl6ZXInXG4vKiBpbXBvcnQgeyB2aXN1YWxpemVyIH0gZnJvbSAncm9sbHVwLXBsdWdpbi12aXN1YWxpemVyJyAqL1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGhlJ1xuXG5pbXBvcnQgeyBsaWdodEdyZWVuLCB5ZWxsb3csIGdyYXksIGJvbGQgfSBmcm9tICdrb2xvcmlzdCdcblxuaW1wb3J0IHBrZyBmcm9tICcuL3BhY2thZ2UuanNvbidcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbmNvbnNvbGUubG9nKGAke2xpZ2h0R3JlZW4oJ1x1MjVCMicpfSAke2dyYXkoJ1x1MjVBMCcpfSAke3llbGxvdygnXHUyNUNGJyl9ICR7Ym9sZCgnVHJlcycpfSB2JHtwa2cudmVyc2lvbn1gKVxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IDUxNzQsXG4gIH0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJy9AJzogcmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpLFxuICAgIH0sXG4gICAgZGVkdXBlOiBbJ0B0cmVzanMvY2llbnRvcyddLFxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAgdnVlKHtcbiAgICAgIGlzUHJvZHVjdGlvbjogZmFsc2UsXG4gICAgfSksXG4gICAgVml0ZVRyZXNQbHVnaW4oKSxcbiAgICBkdHMoe1xuICAgICAgaW5zZXJ0VHlwZXNFbnRyeTogdHJ1ZSxcbiAgICB9KSxcbiAgICBiYW5uZXIoe1xuICAgICAgY29udGVudDogYC8qKlxcbiAqIG5hbWU6ICR7cGtnLm5hbWV9XFxuICogdmVyc2lvbjogdiR7XG4gICAgICAgIHBrZy52ZXJzaW9uXG4gICAgICB9XFxuICogKGMpICR7bmV3IERhdGUoKS5nZXRGdWxsWWVhcigpfVxcbiAqIGRlc2NyaXB0aW9uOiAke3BrZy5kZXNjcmlwdGlvbn1cXG4gKiBhdXRob3I6ICR7cGtnLmF1dGhvcn1cXG4gKi9gLFxuICAgIH0pLFxuICAgIEluc3BlY3QoKSxcbiAgXSxcbiAgdGVzdDoge1xuICAgIGVudmlyb25tZW50OiAnanNkb20nLFxuICAgIGdsb2JhbHM6IHRydWUsXG4gICAgdGhyZWFkczogZmFsc2UsXG4gICAgYWxpYXM6IHtcbiAgICAgICcvQCc6IHJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMnKSxcbiAgICB9LFxuICB9LFxuICBidWlsZDoge1xuICAgIGxpYjoge1xuICAgICAgZW50cnk6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2luZGV4LnRzJyksXG4gICAgICBuYW1lOiAndHJlcycsXG4gICAgICBmaWxlTmFtZTogJ3RyZXMnLFxuICAgIH0sXG4gICAgd2F0Y2g6IHtcbiAgICAgIGluY2x1ZGU6IFtyZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpXSxcbiAgICB9LFxuICAgIGNvcHlQdWJsaWNEaXI6IGZhbHNlLFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgLyogYW5hbHl6ZSgpLCAqL1xuICAgICAgICAvKiAgICB2aXN1YWxpemVyKHtcbiAgICAgICAgICBvcGVuOiB0cnVlLFxuICAgICAgICAgIGd6aXBTaXplOiB0cnVlLFxuICAgICAgICAgIGJyb3RsaVNpemU6IHRydWUsXG4gICAgICAgIH0pLCAqL1xuICAgICAgXSxcblxuICAgICAgZXh0ZXJuYWw6IFsndnVlJywgJ0B2dWV1c2UvY29yZScsICd0aHJlZSddLFxuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIGV4cG9ydHM6ICduYW1lZCcsXG4gICAgICAgIC8vIFByb3ZpZGUgZ2xvYmFsIHZhcmlhYmxlcyB0byB1c2UgaW4gdGhlIFVNRCBidWlsZFxuICAgICAgICAvLyBmb3IgZXh0ZXJuYWxpemVkIGRlcHNcbiAgICAgICAgZ2xvYmFsczoge1xuICAgICAgICAgIHZ1ZTogJ1Z1ZScsXG4gICAgICAgICAgJ0B2dWV1c2UvY29yZSc6ICdWdWVVc2VDb3JlJyxcbiAgICAgICAgICB0aHJlZTogJ1RocmVlJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgb3B0aW1pemVEZXBzOiB7XG4gICAgZXhjbHVkZTogWyd2dWUnLCAndGhyZWUnXSxcbiAgfSxcbn0pXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9hbHZhcm9zYWJ1L1Byb2plY3RzL3RyZXMvcGFja2FnZXMvdHJlcy9wbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvYWx2YXJvc2FidS9Qcm9qZWN0cy90cmVzL3BhY2thZ2VzL3RyZXMvcGx1Z2lucy92aXRlLXBsdWdpbi10cmVzLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9hbHZhcm9zYWJ1L1Byb2plY3RzL3RyZXMvcGFja2FnZXMvdHJlcy9wbHVnaW5zL3ZpdGUtcGx1Z2luLXRyZXMudHNcIjtpbXBvcnQgeyBjcmVhdGVVbnBsdWdpbiB9IGZyb20gJ3VucGx1Z2luJ1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnXG5cbmltcG9ydCBmcyBmcm9tICdmcydcbmltcG9ydCB7IGpvaW4gfSBmcm9tICdwYXRoZSdcblxuZXhwb3J0IGNvbnN0IHVucGx1Z2luID0gY3JlYXRlVW5wbHVnaW4oKCkgPT4ge1xuICByZXR1cm4ge1xuICAgIG5hbWU6ICd1bnBsdWdpbi10cmVzJyxcbiAgICBidWlsZFN0YXJ0KCkge1xuICAgICAgY29uc29sZS5sb2coJ1x1MjcyOCBNYWdpY2FsbHkgZ2VuZXJhdGluZyBjb21wb25lbnRzLi4uJylcbiAgICAgIGNvbnN0IG91dHB1dERpciA9IGpvaW4oJy50cmVzJywgJ2NvbXBvbmVudHMnKVxuXG4gICAgICBpZiAoIWZzLmV4aXN0c1N5bmMob3V0cHV0RGlyKSkge1xuICAgICAgICBmcy5ta2RpclN5bmMob3V0cHV0RGlyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KVxuICAgICAgfVxuXG4gICAgICBsZXQgaW5kZXhUZW1wbGF0ZSA9ICcnXG5cbiAgICAgIGZvciAoY29uc3Qga2V5IGluIFRIUkVFKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gKFRIUkVFIGFzIGFueSlba2V5XVxuICAgICAgICBpZiAoa2V5ID09PSAnU2NlbmUnKSBjb250aW51ZVxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nICYmIC9eXFxzKmNsYXNzXFxzKy8udGVzdCh2YWx1ZS50b1N0cmluZygpKSkge1xuICAgICAgICAgIGNvbnN0IG91dHB1dEZpbGVQYXRoID0gam9pbihvdXRwdXREaXIsIGAke2tleX0udHNgKVxuXG4gICAgICAgICAgY29uc3QgdGVtcGxhdGUgPSBgXG4gICAgICBpbXBvcnQgeyBkZWZpbmVDb21wb25lbnQgfSBmcm9tICd2dWUnO1xuICAgICAgaW1wb3J0IHsgJHtrZXl9LCBDb2xvciwgVmVjdG9yMyB9IGZyb20gJ3RocmVlJztcblxuICAgICAgZXhwb3J0IHR5cGUgU2l6ZUZsZXhpYmxlUGFyYW1zID1cbiAgICAgICAgfCBudW1iZXJbXVxuICAgICAgICB8IHtcbiAgICAgICAgICAgIHdpZHRoOiBudW1iZXJcbiAgICAgICAgICAgIGhlaWdodDogbnVtYmVyXG4gICAgICAgICAgfVxuXG4gICAgICBleHBvcnQgaW50ZXJmYWNlIFZlY3RvcjJQcm9wSW50ZXJmYWNlIHtcbiAgICAgICAgeD86IG51bWJlclxuICAgICAgICB5PzogbnVtYmVyXG4gICAgICAgIHdpZHRoPzogbnVtYmVyXG4gICAgICAgIGhlaWdodD86IG51bWJlclxuICAgICAgfVxuXG4gICAgICBleHBvcnQgaW50ZXJmYWNlIFZlY3RvcjNQcm9wSW50ZXJmYWNlIGV4dGVuZHMgVmVjdG9yMlByb3BJbnRlcmZhY2Uge1xuICAgICAgICB6PzogbnVtYmVyXG4gICAgICB9XG5cbiAgICAgIGV4cG9ydCB0eXBlIFZlY3RvckZsZXhpYmxlUGFyYW1zID0gVEhSRUUuVmVjdG9yMyB8IG51bWJlcltdIHwgVmVjdG9yM1Byb3BJbnRlcmZhY2UgfCBudW1iZXJcblxuXG4gICAgICBsZXQgJHtrZXl9SW5zdGFuY2U6ICR7a2V5fTtcbiAgICAgIGxldCBpbnN0YW5jZVByb3BzOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgICBleHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplVmVjdG9yRmxleGlibGVQYXJhbSh2YWx1ZTogVmVjdG9yRmxleGlibGVQYXJhbXMpOiBBcnJheTxudW1iZXI+IHtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICByZXR1cm4gW3ZhbHVlLCB2YWx1ZSwgdmFsdWVdXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgVmVjdG9yMykge1xuICAgICAgICAgIHJldHVybiBbdmFsdWUueCwgdmFsdWUueSwgdmFsdWUuel1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWUgYXMgQXJyYXk8bnVtYmVyPlxuICAgICAgfVxuICAgICAgXG4gICAgICBleHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplQ29sb3IodmFsdWU6IENvbG9yIHwgQXJyYXk8bnVtYmVyPiB8IHN0cmluZyB8IG51bWJlcikge1xuICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBDb2xvcikge1xuICAgICAgICAgIHJldHVybiB2YWx1ZVxuICAgICAgICB9XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoLi4udmFsdWUpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBDb2xvcih2YWx1ZSlcbiAgICAgIH1cbiAgICAgIFxuXG4gICAgICAvKipcbiAgICAgICAqIFRyZXMke2tleX1Qcm9wc1xuICAgICAgICogQHR5cGUge1BhcnRpYWw8JHtrZXl9PiAmIHtwYXJlbnRJbnN0YW5jZT86ICR7a2V5fX19XG4gICAgICAgKiBAbWVtYmVyb2YgVHJlcyR7a2V5fVxuICAgICAgICogQGRlc2NyaXB0aW9uIFRoaXMgaXMgYSBwYXJ0aWFsIG9mIHRoZSAke2tleX0gY2xhc3MsIHdpdGggdGhlIHBhcmVudEluc3RhbmNlIHByb3BlcnR5IGFkZGVkLlxuICAgICAgICogXG4gICAgICAgKiovXG4gICAgICBleHBvcnQgdHlwZSBUcmVzJHtrZXl9UHJvcHMgPSBQYXJ0aWFsPCR7a2V5fT4gJiB7XG4gICAgICAgIHBhcmVudEluc3RhbmNlPzogJHtrZXl9LFxuICAgICAgICAvKiogXG4gICAgICAgICAqIFxuICAgICAgICAgKiBBcnJheSBvZiBhcmd1bWVudHMgdG8gcGFzcyB0byB0aGUgJHtrZXl9IGNvbnN0cnVjdG9yXG4gICAgICAgICAqICBcbiAgICAgICAgICogQHR5cGUge0FycmF5PGFueT59XG4gICAgICAgICAqIEBtZW1iZXJvZiBUcmVzJHtrZXl9UHJvcHNcbiAgICAgICAgICogQHNlZSBodHRwczovL3RocmVlanMub3JnL2RvY3MvP3E9JHtrZXl9XG4gICAgICAgICAqICBcbiAgICAgICAgICoqL1xuICAgICAgICBhcmdzPzogQXJyYXk8YW55PixcbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIE9iamVjdCdzIGxvY2FsIHBvc2l0aW9uXG4gICAgICAgICAqIFxuICAgICAgICAgKiBAdHlwZSB7VmVjdG9yRmxleGlibGVQYXJhbXN9XG4gICAgICAgICAqIEBtZW1iZXJvZiBUcmVzJHtrZXl9UHJvcHNcbiAgICAgICAgKiovXG4gICAgICAgIHBvc2l0aW9uPzogVmVjdG9yRmxleGlibGVQYXJhbXNcbiAgICAgIH1cblxuICAgICAgdHJ5IHtcbiAgICAgICAgJHtrZXl9SW5zdGFuY2UgPSBuZXcgJHtrZXl9KCk7XG4gICAgICAgIGluc3RhbmNlUHJvcHMgPSBbLi4uT2JqZWN0LmtleXMoJHtrZXl9SW5zdGFuY2UpXVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgfVxuXG4gICAgICBleHBvcnQgY29uc3QgVHJlcyR7a2V5fSA9IC8qICNfX1BVUkVfXyAqLyBkZWZpbmVDb21wb25lbnQ8VHJlcyR7a2V5fVByb3BzPih7XG4gICAgICAgIG5hbWU6ICdUcmVzJHtrZXl9JyxcbiAgICAgICAgcHJvcHM6IFsncGFyZW50SW5zdGFuY2UnLCAnYXJncycsIC4uLmluc3RhbmNlUHJvcHNdIGFzIHVua25vd24gYXMgdW5kZWZpbmVkLFxuICAgICAgICBzZXR1cChwcm9wcywgeyBzbG90cywgZXhwb3NlLCAuLi5yZXN0IH0pIHtcbiAgICAgICAgIFxuICAgICAgICAvKiAgIGNvbnN0IGNsZWFuZWRQcm9wcyA9IE9iamVjdC5rZXlzKHByb3BzKS5yZWR1Y2UoKGFjYywga2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAocHJvcHNba2V5XSAhPT0gdW5kZWZpbmVkICYmIGtleSAhPT0gJ3BhcmVudEluc3RhbmNlJykge1xuICAgICAgICAgICAgICBpZiggJHtrZXl9SW5zdGFuY2Vba2V5XSBpbnN0YW5jZW9mIENvbG9yKSB7XG4gICAgICAgICAgICAgICAgYWNjW2tleV0gPSBub3JtYWxpemVDb2xvcihwcm9wc1trZXldKVxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKCAke2tleX1JbnN0YW5jZVtrZXldIGluc3RhbmNlb2YgVmVjdG9yMykge1xuICAgICAgICAgICAgICAgIGFjY1trZXldID0gbm9ybWFsaXplVmVjdG9yRmxleGlibGVQYXJhbShwcm9wc1trZXldKVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFjY1trZXldID0gcHJvcHNba2V5XVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYWNjXG4gICAgICAgICAgfSwge30pICovXG5cbiAgICAgICAgICBpZihwcm9wcy5hcmdzKSB7XG4gICAgICAgICAgICAke2tleX1JbnN0YW5jZSA9IG5ldyAke2tleX0oLi4ucHJvcHMuYXJncyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICR7a2V5fUluc3RhbmNlID0gbmV3ICR7a2V5fSgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnNvbGUubG9nKCdpbnN0YW5jZScsIHske2tleX1JbnN0YW5jZSwgcHJvcHMsIHNsb3RzOiBzbG90cy5kZWZhdWx0ID8gc2xvdHMuZGVmYXVsdCgpIDogbnVsbCwgcmVzdCwgdHlwZTogJHtrZXl9Lm5hbWV9KVxuICAgICAgICAgIGV4cG9zZSh7JHtrZXl9SW5zdGFuY2V9KVxuXG4gICAgICAgICAgZnVuY3Rpb24gYXBwZW5kKHBhcmVudCwgY2hpbGQpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlZ2V4ID0gL1tBLVpdW2Etel0rL2dcbiAgICAgICAgICAgIGNvbnN0IHByb3BOYW1lID0gY2hpbGQudHlwZS5tYXRjaChyZWdleCkucG9wKCkudG9Mb3dlckNhc2UoKVxuICAgICAgICAgICAgaWYgKHBhcmVudFtwcm9wTmFtZV0pIHtcbiAgICAgICAgICAgICAgcGFyZW50W3Byb3BOYW1lXSA9IGNoaWxkXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgXG4gICAgICAgICAgaWYgKHByb3BzLnBhcmVudEluc3RhbmNlKSB7XG4gICAgICAgICAgICBhcHBlbmQocHJvcHMucGFyZW50SW5zdGFuY2UsICR7a2V5fUluc3RhbmNlKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHByZXBhcmVkU2xvdHMgPSBzbG90cy5kZWZhdWx0IFxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbiAgICAgICAgICAgID8gc2xvdHMuZGVmYXVsdCgpLm1hcCgoc2xvdCkgPT4geyBzbG90LnByb3BzID0geyBcbiAgICAgICAgICAgICAgLi4uc2xvdC5wcm9wcywgXG4gICAgICAgICAgICAgIHBhcmVudEluc3RhbmNlOiAke2tleX1JbnN0YW5jZSB9OyBcbiAgICAgICAgICAgICAgcmV0dXJuIHNsb3Q7IFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIDogbnVsbFxuICAgICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gcHJlcGFyZWRTbG90cztcbiAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgfSk7XG5cbiAgICAgIGV4cG9ydCBkZWZhdWx0IFRyZXMke2tleX07XG4gICAgYFxuICAgICAgICAgIGluZGV4VGVtcGxhdGUgKz0gYGV4cG9ydCB7IGRlZmF1bHQgYXMgVHJlcyR7a2V5fSB9IGZyb20gJy4vJHtrZXl9J1xcbmBcbiAgICAgICAgICBmcy53cml0ZUZpbGVTeW5jKG91dHB1dEZpbGVQYXRoLCB0ZW1wbGF0ZSlcbiAgICAgICAgfVxuXG4gICAgICAgIGZzLndyaXRlRmlsZVN5bmMoam9pbihvdXRwdXREaXIsIGBpbmRleC50c2ApLCBpbmRleFRlbXBsYXRlKVxuICAgICAgfVxuICAgIH0sXG4gIH1cbn0pXG5cbmV4cG9ydCBjb25zdCBWaXRlVHJlc1BsdWdpbiA9IHVucGx1Z2luLnZpdGVcbiIsICJ7XG4gIFwibmFtZVwiOiBcIkB0cmVzanMvY29yZVwiLFxuICBcImRlc2NyaXB0aW9uXCI6IFwiRGVjbGFyYXRpdmUgVGhyZWVKUyB1c2luZyBWdWUgQ29tcG9uZW50c1wiLFxuICBcInZlcnNpb25cIjogXCIxLjguMVwiLFxuICBcInR5cGVcIjogXCJtb2R1bGVcIixcbiAgXCJhdXRob3JcIjogXCJBbHZhcm8gU2FidXJpZG8gPGhvbGFAYWx2YXJvc2FidXJpZG8uZGV2PiAoaHR0cHM6Ly9naXRodWIuY29tL2FsdmFyb3NhYnUvKVwiLFxuICBcImZpbGVzXCI6IFtcbiAgICBcImRpc3RcIlxuICBdLFxuICBcImxpY2Vuc2VcIjogXCJNSVRcIixcbiAgXCJtYWluXCI6IFwiLi9kaXN0L3RyZXMudW1kLmNqc1wiLFxuICBcIm1vZHVsZVwiOiBcIi4vZGlzdC90cmVzLmpzXCIsXG4gIFwidHlwZXNcIjogXCIuL2Rpc3QvaW5kZXguZC50c1wiLFxuICBcImV4cG9ydHNcIjoge1xuICAgIFwiLlwiOiB7XG4gICAgICBcImltcG9ydFwiOiBcIi4vZGlzdC90cmVzLmpzXCIsXG4gICAgICBcInJlcXVpcmVcIjogXCIuL2Rpc3QvdHJlcy51bWQuY2pzXCJcbiAgICB9LFxuICAgIFwiLi90eXBlc1wiOiB7XG4gICAgICBcInJlcXVpcmVcIjogXCIuL2Rpc3QvaW5kZXguZC50c1wiLFxuICAgICAgXCJpbXBvcnRcIjogXCIuL2Rpc3QvaW5kZXguZC50c1wiXG4gICAgfSxcbiAgICBcIi4vc3R5bGVzXCI6IFwiLi9kaXN0L3N0eWxlLmNzc1wiLFxuICAgIFwiLi8qXCI6IFwiLi9kaXN0L3RyZXMuanNcIlxuICB9LFxuICBcInB1Ymxpc2hDb25maWdcIjoge1xuICAgIFwiYWNjZXNzXCI6IFwicHVibGljXCJcbiAgfSxcbiAgXCJrZXl3b3Jkc1wiOiBbXG4gICAgXCJ2dWVcIixcbiAgICBcIjNkXCIsXG4gICAgXCJ0aHJlZWpzXCIsXG4gICAgXCJ0aHJlZVwiLFxuICAgIFwidGhyZWVqcy12dWVcIlxuICBdLFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwiZGV2XCI6IFwidml0ZVwiLFxuICAgIFwiYnVpbGRcIjogXCJ2aXRlIGJ1aWxkXCIsXG4gICAgXCJwcmV2aWV3XCI6IFwidml0ZSBwcmV2aWV3XCIsXG4gICAgXCJ0ZXN0XCI6IFwidml0ZXN0XCIsXG4gICAgXCJ0ZXN0OmNpXCI6IFwidml0ZXN0IHJ1blwiLFxuICAgIFwidGVzdDp1aVwiOiBcInZpdGVzdCAtLXVpXCIsXG4gICAgXCJjb3ZlcmFnZVwiOiBcInZpdGVzdCBydW4gLS1jb3ZlcmFnZVwiLFxuICAgIFwibGludFwiOiBcImVzbGludCAuIC0tZXh0IC5qcywuanN4LC50cywudHN4LC52dWVcIixcbiAgICBcImNoYW5nZWxvZ1wiOiBcImNvbnZlbnRpb25hbC1jaGFuZ2Vsb2cgLXAgYW5ndWxhciAtaSBDSEFOR0VMT0cubWQgLXNcIlxuICB9LFxuICBcInBlZXJEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwidGhyZWVcIjogXCJsYXRlc3RcIixcbiAgICBcInZ1ZVwiOiBcIl4zLjIuNDdcIlxuICB9LFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAYWx2YXJvc2FidS91dGlsc1wiOiBcIl4yLjMuMFwiLFxuICAgIFwiQHZ1ZXVzZS9jb3JlXCI6IFwiXjkuMTMuMFwiXG4gIH0sXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkB0cmVzanMvY2llbnRvc1wiOiBcIndvcmtzcGFjZTpeMS44LjBcIixcbiAgICBcIkB0eXBlcy90aHJlZVwiOiBcImxhdGVzdFwiLFxuICAgIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI6IFwiXjQuMC4wXCIsXG4gICAgXCJAdml0ZXN0L2NvdmVyYWdlLWM4XCI6IFwiXjAuMjguNVwiLFxuICAgIFwiQHZpdGVzdC91aVwiOiBcIl4wLjI4LjVcIixcbiAgICBcIkB2dWUvdGVzdC11dGlsc1wiOiBcIl4yLjMuMFwiLFxuICAgIFwiaGFwcHktZG9tXCI6IFwiXjguNy4xXCIsXG4gICAgXCJqc2RvbVwiOiBcIl4yMS4xLjBcIixcbiAgICBcImtvbG9yaXN0XCI6IFwiXjEuNy4wXCIsXG4gICAgXCJwYXRoZVwiOiBcIl4xLjEuMFwiLFxuICAgIFwicm9sbHVwLXBsdWdpbi1hbmFseXplclwiOiBcIl40LjAuMFwiLFxuICAgIFwicm9sbHVwLXBsdWdpbi12aXN1YWxpemVyXCI6IFwiXjUuOS4wXCIsXG4gICAgXCJ0aHJlZVwiOiBcImxhdGVzdFwiLFxuICAgIFwidW5wbHVnaW4tdnVlLWNvbXBvbmVudHNcIjogXCJeMC4yNC4xXCIsXG4gICAgXCJ2aXRlXCI6IFwiXjQuMS40XCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1iYW5uZXJcIjogXCJeMC43LjBcIixcbiAgICBcInZpdGUtcGx1Z2luLWR0c1wiOiBcIjIuMC4wLWJldGEuMVwiLFxuICAgIFwidml0ZS1wbHVnaW4tZ2xzbFwiOiBcIl4xLjEuMlwiLFxuICAgIFwidml0ZS1wbHVnaW4taW5zcGVjdFwiOiBcIl4wLjcuMTVcIixcbiAgICBcInZpdGUtcGx1Z2luLXJlcXVpcmUtdHJhbnNmb3JtXCI6IFwiXjEuMC45XCIsXG4gICAgXCJ2aXRlc3RcIjogXCJeMC4yOC41XCIsXG4gICAgXCJ2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
