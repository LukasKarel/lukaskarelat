<script lang="ts">
  const { data }: { data: any } = $props();

  const insert = $derived({
    "@context": "http://schema.org",
    ...data,
  });

  const jsonld = $derived(JSON.stringify(insert));
</script>

<svelte:head>
  {@html `<script type="application/ld+json">${jsonld}</script>`}
</svelte:head>
