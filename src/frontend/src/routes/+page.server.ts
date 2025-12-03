import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getPostsMetadata } from '$lib/server/posts';

const MAX_POSTS = 3;

export const load: PageServerLoad = async ({ params }) => {
  const posts = await getPostsMetadata();

  const orderedPosts = posts.sort(
    (p1, p2) =>
      p2.publicationDate.getTime() - p1.publicationDate.getTime(),
  ).slice(0, MAX_POSTS);

  return {
    posts: orderedPosts,
  }

  error(404, 'Not found');
};
