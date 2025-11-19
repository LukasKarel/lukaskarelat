import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getPostsMetadata } from '$lib/server/posts';

export const load: PageServerLoad = async ({ params }) => {
  const posts = await getPostsMetadata();

  return {
    posts,
  }

  error(404, 'Not found');
};
