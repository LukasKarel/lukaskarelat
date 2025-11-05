import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import posts from '$lib/blog/posts';
import type { EntryGenerator } from './$types';

export const entries: EntryGenerator = () => {
  return posts.map(p => ({
    slug: p.id
  }));
};

export const load: PageServerLoad = async ({ params }) => {
  const post = posts.find(data => data.id === params.slug)

  if (!post) {
    return error(404);
  }

  return {
    post,
  }

};
