<script lang="ts">
  import type { WebSite } from "$lib/head/schemas/WebSite";
  import JsonLdSchema from "./JsonLDSchema.svelte";
  const { data }: { data: WebSite } = $props();
</script>

<JsonLdSchema {data} />
