import { ImageResponse } from '@ethercorps/sveltekit-og';
import type { EntryGenerator, RequestHandler } from './$types';
import Card from '$lib/components/og/Card.svelte';
import type { CardProps } from '$lib/og';
import { error } from '@sveltejs/kit';
import { loadAvailableSlugs, loadProps } from '$lib/server/og';
import { GoogleFont, resolveFonts } from '@ethercorps/sveltekit-og/fonts';
import { dev } from '$app/environment';

// 1. Define the GoogleFont instances
const interRegular = new GoogleFont('Inter', {
  weight: 400,
  name: 'Inter'
});

const interBold = new GoogleFont('Inter', {
  weight: 700,
  name: 'Inter'
});


const bbhBogleRegular = new GoogleFont('BBH Bogle', {
  weight: 400,
  name: 'BBH Sans Bogle',
});

export const prerender = true;


// The function that tells SvelteKit which URLs to pre-render
export const entries: EntryGenerator = async () => {

  const slugs = await loadAvailableSlugs();
  return slugs.map(s => ({
    slug: s
  }))
}

export const GET: RequestHandler = async ({ params }) => {

  const resolvedFontOptions = await resolveFonts([interRegular, interBold, bbhBogleRegular]);
  const slugs = params.slug.split('/');
  const props = await loadProps(slugs);

  return new ImageResponse(
    Card,
    {
      width: 1200,
      height: 630,
      debug: false,
      headers: {
        'Cache-Control': 'public, max-age=86400'
      },
      fonts: resolvedFontOptions,
    },
    props,
  );
};
