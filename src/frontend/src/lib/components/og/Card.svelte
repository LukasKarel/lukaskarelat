<svelte:options css="injected" />

<script lang="ts">
  import type { CardProps } from "$lib/og";
  const { title, subtitle, tags, variant }: CardProps = $props();

  // If redesign think about changing the path with v2 (vX) to prevent that social media sites use cached versions
</script>

<div
  class="w-full h-full bg-violet-700 text-white relative flex flex-col items-center font-inter"
>
  <div
    style:font-family="BBH Sans Bogle"
    style:text-shadow={"0px 1px 0px rgb(0 0 0), 0px 1px 1px rgb(0 0 0), 0px 2px 2px rgb(0 0 0)"}
    class="absolute bottom-4 flex right-8 text-9xl font-normal tracking-wide"
  >
    LUKAS KAREL
  </div>
  {#if variant === "blog"}
    <p
      style:width="1000px"
      style:text-shadow={"0px 1px 0px rgb(0 0 0), 0px 1px 1px rgb(0 0 0), 0px 2px 2px rgb(0 0 0)"}
      class="text-7xl font-bold uppercase tracking-wide mb-0 mt-16"
    >
      {title}
    </p>
    {#if subtitle}
      <p
        style:width="1000px"
        class="text-3xl font-bold uppercase tracking-wide mt-16"
      >
        {subtitle}
      </p>
    {/if}
    {#if tags}
      <div class="flex mt-auto mb-16 mr-auto ml-12">
        {#each tags as tag}
          <span
            class="px-4 py-1 rounded-xl mx-2 text-2xl bg-teal-300 text-black font-bold tracking-wide lowercase"
            ><p class="m-0">{tag}</p></span
          >
        {/each}
      </div>
    {/if}
  {:else}
    <div
      style:width="700px"
      style:text-shadow={"0px 1px 0px rgb(0 0 0), 0px 1px 1px rgb(0 0 0), 0px 2px 2px rgb(0 0 0)"}
      class="flex text-7xl font-bold uppercase tracking-wide mb-0 mt-0 flex-col pt-16"
    >
      <span class="flex mb-8 items-center justify-between">
        <p class="m-0 mb-0 inline-block">LEARN</p>
        <p class="m-0 text-3xl ms-8 inline">Computer Science</p>
      </span>

      <span class="flex mb-8 items-center justify-between">
        <p class="m-0 mb-0 inline-block">BUILD</p>
        <p class="m-0 text-3xl ms-8 inline">PROTOTYPES</p>
      </span>
      <span class="flex mb-8 mt-0 items-center justify-between">
        <p class="m-0 mb-0 inline-block">DEVELOP</p>
        <p class="m-0 text-3xl ms-8 inline">SOLUTIONS</p>
      </span>
      <div class="flex mb-8 mt-8 items-center justify-center">
        <p class="m-0 text-3xl text-center">in the Austrian Alps</p>
      </div>
    </div>
  {/if}
</div>
