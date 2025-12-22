
import { dev } from '$app/environment';
import { loadProps } from '$lib/server/og';
import { error } from '@sveltejs/kit';

export const prerender = false;

export async function load({ params }) {
  if (!dev) {
    throw error(404, 'Not found');
  }

  const slugs = params.slug.split('/');
  const props = await loadProps(slugs);

  return {
    props
  }
}
