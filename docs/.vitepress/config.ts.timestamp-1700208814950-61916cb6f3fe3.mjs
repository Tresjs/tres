// .vitepress/config.ts
import { defineConfig } from "file:///Users/alvarosabu/Projects/tres/post-processing/node_modules/.pnpm/vitepress@1.0.0-rc.25_@algolia+client-search@4.20.0_postcss@8.4.31_search-insights@2.10.0_typescript@5.2.2/node_modules/vitepress/dist/node/index.js";
import { resolve } from "file:///Users/alvarosabu/Projects/tres/post-processing/node_modules/.pnpm/pathe@1.1.1/node_modules/pathe/dist/index.mjs";
import { templateCompilerOptions } from "file:///Users/alvarosabu/Projects/tres/post-processing/node_modules/.pnpm/@tresjs+core@3.5.0_three@0.158.0_vue@3.3.8/node_modules/@tresjs/core/dist/tres.js";
var __vite_injected_original_dirname = "/Users/alvarosabu/Projects/tres/post-processing/docs/.vitepress";
var config_default = defineConfig({
  title: "Post-processing",
  description: "Post-processing effects for ViteJS",
  head: [["link", { rel: "icon", type: "image/svg", href: "/favicon.svg" }]],
  themeConfig: {
    logo: "/logo.svg",
    search: {
      provider: "local"
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Guide", link: "/guide/" },
      { text: "Examples", link: "/examples" }
    ],
    sidebar: [
      {
        text: "Guide",
        items: [{ text: "Introduction", link: "/guide/" }]
      },
      {
        text: "Effects",
        items: [
          { text: "Bloom", link: "/guide/effects/bloom" },
          { text: "Depth of Field", link: "/guide/effects/depth-of-field" },
          { text: "Glitch", link: "/guide/effects/glitch" },
          { text: "Noise", link: "/guide/effects/noise" },
          { text: "Outline", link: "/guide/effects/outline" },
          { text: "Pixelation", link: "/guide/effects/pixelation" },
          { text: "Vignette", link: "/guide/effects/vignette" }
        ]
      }
    ],
    socialLinks: [
      { icon: "twitter", link: "https://twitter.com/tresjs_dev" },
      { icon: "discord", link: "https://discord.gg/UCr96AQmWn" }
    ]
  },
  vite: {
    optimizeDeps: {
      exclude: ["vitepress"],
      include: ["three"]
    },
    server: {
      hmr: {
        overlay: false
      }
    },
    resolve: {
      alias: {
        "@tresjs/post-processing": resolve(__vite_injected_original_dirname, "../../dist/tres-postprocessing.js")
      },
      dedupe: ["three"]
    }
  },
  vue: {
    ...templateCompilerOptions
  }
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLnZpdGVwcmVzcy9jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYWx2YXJvc2FidS9Qcm9qZWN0cy90cmVzL3Bvc3QtcHJvY2Vzc2luZy9kb2NzLy52aXRlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9hbHZhcm9zYWJ1L1Byb2plY3RzL3RyZXMvcG9zdC1wcm9jZXNzaW5nL2RvY3MvLnZpdGVwcmVzcy9jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2FsdmFyb3NhYnUvUHJvamVjdHMvdHJlcy9wb3N0LXByb2Nlc3NpbmcvZG9jcy8udml0ZXByZXNzL2NvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGVwcmVzcydcbmltcG9ydCBVbm9jc3MgZnJvbSAndW5vY3NzL3ZpdGUnXG5pbXBvcnQgc3ZnTG9hZGVyIGZyb20gJ3ZpdGUtc3ZnLWxvYWRlcidcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoZSdcbmltcG9ydCB7IHRlbXBsYXRlQ29tcGlsZXJPcHRpb25zIH0gZnJvbSAnQHRyZXNqcy9jb3JlJ1xuXG4vLyBodHRwczovL3ZpdGVwcmVzcy5kZXYvcmVmZXJlbmNlL3NpdGUtY29uZmlnXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICB0aXRsZTogJ1Bvc3QtcHJvY2Vzc2luZycsXG4gIGRlc2NyaXB0aW9uOiAnUG9zdC1wcm9jZXNzaW5nIGVmZmVjdHMgZm9yIFZpdGVKUycsXG4gIGhlYWQ6IFtbJ2xpbmsnLCB7IHJlbDogJ2ljb24nLCB0eXBlOiAnaW1hZ2Uvc3ZnJywgaHJlZjogJy9mYXZpY29uLnN2ZycgfV1dLFxuICB0aGVtZUNvbmZpZzoge1xuICAgIGxvZ286ICcvbG9nby5zdmcnLFxuICAgIHNlYXJjaDoge1xuICAgICAgcHJvdmlkZXI6ICdsb2NhbCcsXG4gICAgfSxcbiAgICAvLyBodHRwczovL3ZpdGVwcmVzcy5kZXYvcmVmZXJlbmNlL2RlZmF1bHQtdGhlbWUtY29uZmlnXG4gICAgbmF2OiBbXG4gICAgICB7IHRleHQ6ICdHdWlkZScsIGxpbms6ICcvZ3VpZGUvJyB9LFxuICAgICAgeyB0ZXh0OiAnRXhhbXBsZXMnLCBsaW5rOiAnL2V4YW1wbGVzJyB9LFxuICAgIF0sXG5cbiAgICBzaWRlYmFyOiBbXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdHdWlkZScsXG4gICAgICAgIGl0ZW1zOiBbeyB0ZXh0OiAnSW50cm9kdWN0aW9uJywgbGluazogJy9ndWlkZS8nIH1dLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ0VmZmVjdHMnLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIHsgdGV4dDogJ0Jsb29tJywgbGluazogJy9ndWlkZS9lZmZlY3RzL2Jsb29tJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ0RlcHRoIG9mIEZpZWxkJywgbGluazogJy9ndWlkZS9lZmZlY3RzL2RlcHRoLW9mLWZpZWxkJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ0dsaXRjaCcsIGxpbms6ICcvZ3VpZGUvZWZmZWN0cy9nbGl0Y2gnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnTm9pc2UnLCBsaW5rOiAnL2d1aWRlL2VmZmVjdHMvbm9pc2UnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnT3V0bGluZScsIGxpbms6ICcvZ3VpZGUvZWZmZWN0cy9vdXRsaW5lJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ1BpeGVsYXRpb24nLCBsaW5rOiAnL2d1aWRlL2VmZmVjdHMvcGl4ZWxhdGlvbicgfSxcbiAgICAgICAgICB7IHRleHQ6ICdWaWduZXR0ZScsIGxpbms6ICcvZ3VpZGUvZWZmZWN0cy92aWduZXR0ZScgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgXSxcblxuICAgIHNvY2lhbExpbmtzOiBbXG4gICAgICB7IGljb246ICd0d2l0dGVyJywgbGluazogJ2h0dHBzOi8vdHdpdHRlci5jb20vdHJlc2pzX2RldicgfSxcbiAgICAgIHsgaWNvbjogJ2Rpc2NvcmQnLCBsaW5rOiAnaHR0cHM6Ly9kaXNjb3JkLmdnL1VDcjk2QVFtV24nIH0sXG4gICAgXSxcbiAgfSxcbiAgdml0ZToge1xuICAgIG9wdGltaXplRGVwczoge1xuICAgICAgZXhjbHVkZTogWyd2aXRlcHJlc3MnXSxcbiAgICAgIGluY2x1ZGU6IFsndGhyZWUnXSxcbiAgICB9LFxuICAgIHNlcnZlcjoge1xuICAgICAgaG1yOiB7XG4gICAgICAgIG92ZXJsYXk6IGZhbHNlLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiB7XG4gICAgICAgICdAdHJlc2pzL3Bvc3QtcHJvY2Vzc2luZyc6IHJlc29sdmUoX19kaXJuYW1lLCAnLi4vLi4vZGlzdC90cmVzLXBvc3Rwcm9jZXNzaW5nLmpzJyksXG4gICAgICB9LFxuICAgICAgZGVkdXBlOiBbJ3RocmVlJ10sXG4gICAgfSxcbiAgfSxcbiAgdnVlOiB7XG4gICAgLi4udGVtcGxhdGVDb21waWxlck9wdGlvbnMsXG4gIH0sXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFxVyxTQUFTLG9CQUFvQjtBQUdsWSxTQUFTLGVBQWU7QUFDeEIsU0FBUywrQkFBK0I7QUFKeEMsSUFBTSxtQ0FBbUM7QUFPekMsSUFBTyxpQkFBUSxhQUFhO0FBQUEsRUFDMUIsT0FBTztBQUFBLEVBQ1AsYUFBYTtBQUFBLEVBQ2IsTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFLEtBQUssUUFBUSxNQUFNLGFBQWEsTUFBTSxlQUFlLENBQUMsQ0FBQztBQUFBLEVBQ3pFLGFBQWE7QUFBQSxJQUNYLE1BQU07QUFBQSxJQUNOLFFBQVE7QUFBQSxNQUNOLFVBQVU7QUFBQSxJQUNaO0FBQUE7QUFBQSxJQUVBLEtBQUs7QUFBQSxNQUNILEVBQUUsTUFBTSxTQUFTLE1BQU0sVUFBVTtBQUFBLE1BQ2pDLEVBQUUsTUFBTSxZQUFZLE1BQU0sWUFBWTtBQUFBLElBQ3hDO0FBQUEsSUFFQSxTQUFTO0FBQUEsTUFDUDtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sT0FBTyxDQUFDLEVBQUUsTUFBTSxnQkFBZ0IsTUFBTSxVQUFVLENBQUM7QUFBQSxNQUNuRDtBQUFBLE1BQ0E7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxVQUNMLEVBQUUsTUFBTSxTQUFTLE1BQU0sdUJBQXVCO0FBQUEsVUFDOUMsRUFBRSxNQUFNLGtCQUFrQixNQUFNLGdDQUFnQztBQUFBLFVBQ2hFLEVBQUUsTUFBTSxVQUFVLE1BQU0sd0JBQXdCO0FBQUEsVUFDaEQsRUFBRSxNQUFNLFNBQVMsTUFBTSx1QkFBdUI7QUFBQSxVQUM5QyxFQUFFLE1BQU0sV0FBVyxNQUFNLHlCQUF5QjtBQUFBLFVBQ2xELEVBQUUsTUFBTSxjQUFjLE1BQU0sNEJBQTRCO0FBQUEsVUFDeEQsRUFBRSxNQUFNLFlBQVksTUFBTSwwQkFBMEI7QUFBQSxRQUN0RDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFFQSxhQUFhO0FBQUEsTUFDWCxFQUFFLE1BQU0sV0FBVyxNQUFNLGlDQUFpQztBQUFBLE1BQzFELEVBQUUsTUFBTSxXQUFXLE1BQU0sZ0NBQWdDO0FBQUEsSUFDM0Q7QUFBQSxFQUNGO0FBQUEsRUFDQSxNQUFNO0FBQUEsSUFDSixjQUFjO0FBQUEsTUFDWixTQUFTLENBQUMsV0FBVztBQUFBLE1BQ3JCLFNBQVMsQ0FBQyxPQUFPO0FBQUEsSUFDbkI7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLEtBQUs7QUFBQSxRQUNILFNBQVM7QUFBQSxNQUNYO0FBQUEsSUFDRjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0wsMkJBQTJCLFFBQVEsa0NBQVcsbUNBQW1DO0FBQUEsTUFDbkY7QUFBQSxNQUNBLFFBQVEsQ0FBQyxPQUFPO0FBQUEsSUFDbEI7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSCxHQUFHO0FBQUEsRUFDTDtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
