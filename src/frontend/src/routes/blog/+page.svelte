<script lang="ts">
  import ArticleOverview from "$lib/components/blog/ArticleOverview.svelte";
  import Heading from "$lib/components/Heading.svelte";
  import MinimumHead from "$lib/components/head/MinimumHead.svelte";

  const { data } = $props();

  const posts = $derived(
    data.posts.sort(
      (p1, p2) =>
        p2.publicationDate.getUTCDate() - p1.publicationDate.getUTCDate(),
    ),
  );
</script>

<MinimumHead
  title="All Posts - Lukas Karel"
  description="An overview over all posts I wrote"
  pathname="/blog"
  imagePath={undefined}
/>

<main class="my-8 mx-4 sm:mx-auto sm:min-w-[95%] lg:min-w-[75%]">
  <Heading level={1}>Posts</Heading>
  <div
    class="grid [grid-template-columns:repeat(auto-fill,_320px)] justify-center gap-4"
  >
    {#each posts as post}
      <ArticleOverview
        title={post.title}
        summary={post.description}
        href={post.route}
        publicationDate={post.publicationDate}
      />
    {/each}
  </div>
</main>
