import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { EntryGenerator } from './$types';
import { getPostsMetadata } from '$lib/server/posts';

export const entries: EntryGenerator = async () => {
  const posts = await getPostsMetadata();
  return posts.map(p => ({
    slug: p.id
  }));
};

export const load: PageServerLoad = async ({ params }) => {
  const posts = await getPostsMetadata();
  const post = posts.find(data => data.id === params.slug)

  if (!post) {
    return error(404);
  }

  return {
    post,
  }

};
