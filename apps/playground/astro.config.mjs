import { defineConfig } from 'astro/config';
import UnoCSS from 'unocss/astro';

// https://astro.build/config
import vue from '@astrojs/vue';

// https://astro.build/config
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [vue({
    appEntrypoint: '/src/pages/_app'
  }), UnoCSS({
    /* options */
  }), mdx()]
});