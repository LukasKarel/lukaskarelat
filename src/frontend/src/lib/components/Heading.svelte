<script lang="ts">
  type Level = 1 | 2 | 3 | 4 | 5 | 6;
  import type { Snippet } from "svelte";

  let {
    level,
    className,
    children,
  }: {
    level: Level;
    className?: string;
    children?: Snippet;
  } = $props();

  const tag = `h${level}` as keyof HTMLElementTagNameMap;
</script>

<svelte:element this={tag} class={`${className ?? ""}`}>
  {@render children?.()}
</svelte:element>

<style>
  h1 {
    margin-block-end: 2rem;
    font-size: 2rem;
    font-weight: 700;
  }

  h2 {
    margin-block-end: 2rem;
    font-size: 1.8rem;
    font-weight: 700;
  }
</style>
