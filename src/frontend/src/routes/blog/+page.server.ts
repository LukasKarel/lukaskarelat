import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import posts from '$lib/blog/posts';

export const load: PageServerLoad = async ({ params }) => {

  return {
    posts,
  }

  error(404, 'Not found');
};
