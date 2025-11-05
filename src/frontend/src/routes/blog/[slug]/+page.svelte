<script lang="ts">
  const { data } = $props();
</script>

{#snippet post()}
  {@const SvelteComponent = data.component}
  <SvelteComponent />
{/snippet}
<article class="prose">
  {@render post()}
</article>
