import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://svelte.dev/docs/kit/integrations
  // for more information about preprocessors
  preprocess: [vitePreprocess(), mdsvex({
    extensions: ['.mdx'],
    rehypePlugins: [rehypeSlug,
      [rehypeAutolinkHeadings, {
        behavior: 'append',
        content: {
          type: 'element',
          tagName: 'svg',
          properties: {
            xmlns: 'http://www.w3.org/2000/svg',
            width: 64,
            height: 64,
            viewBox: '0 0 432 384',
            'aria-hidden': 'true',
            className: ['anchor-icon'],
          },
          children: [
            {
              type: 'element',
              tagName: 'path',
              properties: {
                d: 'M41 192q0 27 19 46.5t47 19.5h85v41h-85q-44 0-75.5-31.5T0 192t31.5-75.5T107 85h85v41h-85q-28 0-47 19.5T41 192zm87 21v-42h171v42H128zM320 85q44 0 75.5 31.5T427 192t-31.5 75.5T320 299h-85v-41h85q27 0 46.5-19.5T386 192t-19.5-46.5T320 126h-85V85h85z',
                fill: 'currentColor'
              },
            },
          ],
        },
      }]
    ]
  })],
  kit: {
    // adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
    // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
    // See https://svelte.dev/docs/kit/adapters for more information about adapters.
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: "404.html",
      precompress: false,
      strict: true
    })
  },
  extensions: ['.svelte', '.mdx']
};

export default config;
