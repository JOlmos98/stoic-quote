// svelte.config.js
import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { preprocessMeltUI, sequence } from '@melt-ui/pp';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.svx'], // .svelte y .svx son páginas válidas

  preprocess: sequence([
    vitePreprocess(),
    mdsvex({
      extensions: ['.svx'] // opcional pero recomendable
    }),
    preprocessMeltUI()
  ]),

  kit: {
    adapter: adapter()
  }
};

export default config;
