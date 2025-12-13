import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { preprocessMeltUI, sequence } from '@melt-ui/pp';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://svelte.dev/docs/kit/integrations
  // for more information about preprocessors
  preprocess: [
    sequence([vitePreprocess(), mdsvex(), preprocessMeltUI()]),
    mdsvex()
  ],

  kit: { adapter: adapter() },
  extensions: ['.svelte', '.svx']
};

export default config;
