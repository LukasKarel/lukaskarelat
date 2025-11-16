<script lang="ts">
  const {
    src,
    caption,
    alt,
    verticalView,
  }: { src: string; caption?: string; alt: string; verticalView?: boolean } =
    $props();
</script>

<figure
  class={`flex ${verticalView ? "gap-2 flex-col md:flex-row-reverse justify-start" : "flex-col"} items-center text-center`}
>
  <img {src} {alt} class="max-h-[400px]" />
  {#if caption}
    <figcaption class="max-w-2xs">{caption}</figcaption>
  {/if}
</figure>
