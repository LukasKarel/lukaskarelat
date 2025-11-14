import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getPostsMetadata } from '$lib/server/posts';

const MAX_POSTS = 5;

export const load: PageServerLoad = async ({ params }) => {
  const posts = await getPostsMetadata();

  const orderedPosts = posts.sort(
    (p1, p2) =>
      p2.publicationDate.getUTCDate() - p1.publicationDate.getUTCDate(),
  ).slice(0, MAX_POSTS - 1);

  return {
    posts: orderedPosts,
  }

  error(404, 'Not found');
};
