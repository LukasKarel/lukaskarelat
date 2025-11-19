import type { PageLoad } from './$types.js';

export async function load({ data }) {
  const component = (await import(`$lib/blog/posts/${data.post.id}.mdx`)).default;

  return {
    post: data.post,
    component,
  };
}

