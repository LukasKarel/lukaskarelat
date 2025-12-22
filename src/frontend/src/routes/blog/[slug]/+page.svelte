<script lang="ts">
  import BlogPostingSchema from "$lib/components/head/BlogPostingSchema.svelte";
  import MinimumHead from "$lib/components/head/MinimumHead.svelte";
  import { DefaultAuthor } from "$lib/head/schemas/Author.js";
  import type { BlogPosting } from "$lib/head/schemas/BlogPosting";

  const { data } = $props();

  const blogPostingSchema: BlogPosting = $derived({
    "@type": "BlogPosting",
    author: DefaultAuthor,
    dateModified: data.post.lastEditTime,
    datePublished: data.post.publicationDate,
    headline: data.post.title,
    description: data.post.description,
  });
</script>

{#snippet post()}
  {@const SvelteComponent = data.component}
  <SvelteComponent />
{/snippet}

<MinimumHead
  title={`${data.post.title} - Lukas Karel`}
  description={data.post.description}
  pathname={data.post.route}
  imagePath={`/api/og/image/blog/${data.post.id}.png`}
/>
<BlogPostingSchema data={blogPostingSchema} />

<article
  class="prose mx-auto mb-16 min-w-[90%] max-w-[95%] sm:min-w-[80%] sm:max-w-[90%] md:min-w-[60%] md:max-w-[80%] lg:min-w-[50%] lg:max-w-[55%] mt-2"
>
  {@render post()}
</article>
