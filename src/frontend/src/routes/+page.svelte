<script lang="ts">
  import MinimumHead from "$lib/components/head/MinimumHead.svelte";
  import { DefaultWebSite } from "$lib/head/schemas/WebSite";
  import WebSiteSchema from "$lib/components/head/WebSiteSchema.svelte";
  import ArticleOverview from "$lib/components/blog/ArticleOverview.svelte";
  import Heading from "$lib/components/Heading.svelte";

  const { data } = $props();
</script>

<MinimumHead
  title={DefaultWebSite.name}
  description="Personal website of Lukas Karel. A place to learn, build and grow together."
  pathname=""
  imagePath={""}
/>

<WebSiteSchema data={DefaultWebSite} />

<div class="flex w-full flex-col lg:flex-row min-h-[calc(100vh-5rem)]">
  <div
    class="hero-content bg-base-300 text-center min-w-1/2 min-h-1/2 lg:min-h-min"
  >
    <div class="max-w-md">
      <h1 class="text-5xl font-bold">HEY! I'm Lukas</h1>
      <p class="py-6 font-bold">
        curious mind with a passion for open-source and learning
      </p>
    </div>
  </div>
  <div class="grow mx-4 mt-4">
    <Heading level={1}>Latest Articles:</Heading>
    <div class="flex flex-col items-center lg:items-start gap-4">
      {#each data.posts as post}
        <div class="max-w-lg w-full">
          <ArticleOverview
            title={post.title}
            href={post.route}
            publicationDate={post.publicationDate}
            summary={post.description}
          />
        </div>
      {/each}
    </div>
  </div>
</div>
