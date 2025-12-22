
import { DefaultOGImageName, type CardProps } from "$lib/og";
import { error } from "@sveltejs/kit";
import { getPostsMetadata } from "./posts";

async function loadProps(slugs: string[]): Promise<CardProps> {
  const posts = await getPostsMetadata();
  let props: CardProps = {
    variant: "main",
  };
  if (slugs[0] === 'blog') {
    props.variant = "blog";
    if (slugs.length === 2) {

      const post = posts.find(p => p.id === slugs[1]);
      if (!post) {
        throw error(404, 'Not found');
      }
      props.title = post.ogImageTitle ?? post.title;
      props.subtitle = post.ogImageSubtitle;
      props.tags = post.ogImageTags;
    }
  }
  return props
}

async function loadAvailableSlugs(): Promise<string[]> {

  let slugs: string[] = [DefaultOGImageName];
  const posts = await getPostsMetadata();
  slugs = [...slugs, ...posts.map(p => `blog/${p.id}`)]

  return slugs;
}

export {
  loadProps,
  loadAvailableSlugs,
}
