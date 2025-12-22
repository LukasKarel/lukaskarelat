<script lang="ts">
  import Card from "$lib/components/og/Card.svelte";

  const { data } = $props();
</script>

<div>
  <Card {...data.props} />
</div>

<style>
  div {
    width: 1200px;
    height: 630px;
    background-color: white;
  }
</style>
