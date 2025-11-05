<script lang="ts">
  const { data } = $props();
</script>

<ul>
  {#each data.posts as post}
    <il>
      <a href={`/blog/${post.id}`}>{post.title}</a>
    </il>
  {/each}
</ul>
