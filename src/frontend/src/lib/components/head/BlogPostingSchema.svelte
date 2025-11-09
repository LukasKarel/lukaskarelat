<script lang="ts">
  import type { BlogPosting } from "$lib/head/schemas/BlogPosting";
  import JsonLdSchema from "./JsonLDSchema.svelte";
  const { data }: { data: BlogPosting } = $props();
</script>

<JsonLdSchema {data} />
