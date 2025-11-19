<script lang="ts">
  import type { WebPage } from "$lib/head/schemas/WebPage";
  import JsonLdSchema from "./JsonLDSchema.svelte";
  const { data }: { data: WebPage } = $props();
</script>

<JsonLdSchema {data} />
