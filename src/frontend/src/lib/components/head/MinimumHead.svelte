<script lang="ts">
  import { PUBLIC_HOST } from "$env/static/public";
  import z from "zod";
  import WebPageSchema from "./WebPageSchema.svelte";
  import { DefaultAuthor } from "$lib/head/schemas/Author";

  const propertyValidation = z.object({
    title: z.string().max(70),
    description: z.string().max(160),
    pathname: z.string(),
    imagePath: z.string().optional(),
  });

  type Props = z.infer<typeof propertyValidation>;

  let { title, description, pathname, imagePath }: Props = $props();

  const canonicalURL = new URL(pathname, PUBLIC_HOST).toString();
  // const imageURL = imagePath && new URL(imagePath, PUBLIC_HOST).toString();
</script>

<WebPageSchema
  data={{
    name: title,
    description: description,
    "@type": "WebPage",
    author: DefaultAuthor,
  }}
/>

<svelte:head>
  <link rel="sitemap" href="/sitemap.xml" />

  <link rel="canonical" href={canonicalURL} />

  <title>{title}</title>
  <meta name="title" content={title} />
  <meta name="description" content={description} />

  <meta property="og:type" content="website" />
  <meta property="og:url" content={canonicalURL} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <!-- <meta property="og:image" content={imageURL} /> -->
  <meta property="og:site_name" content="LukasKarelAT" />

  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content={canonicalURL} />
  <meta property="twitter:title" content={title} />
  <meta property="twitter:description" content={description} />
  <!-- <meta property="twitter:image" content={imageURL} /> -->
</svelte:head>
