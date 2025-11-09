<script lang="ts">
  const { title, summary, href, publicationDate } = $props();

  const formattedDate = $derived(
    publicationDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
  );
</script>

<div class="card shadow-lg w-full bg-neutral">
  <p class="absolute right-4 top-2">{formattedDate}</p>
  <div class="card-body justify-between pt-8">
    <div class="flex flex-col justify-between grow gap-2">
      <h2 class="card-title hover:text-secondary"><a {href}>{title}</a></h2>

      <p class="grow-0">
        {summary}
      </p>
    </div>
    <div class="card-actions justify-end">
      <a {href} class="btn btn-soft btn-primary">Read More</a>
    </div>
  </div>
</div>
