import matter from "gray-matter";
import z from "zod";

const blogEntries = import.meta.glob('/src/lib/blog/posts/*.mdx', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const entryMetadataSchema = z.object({
  id: z.string().regex(SLUG_REGEX, { error: 'Invalid slug (lowercase letters, numbers and single dashes only)' }),
  title: z.string(),
  description: z.string().max(256),
  publicationDate: z.date(),
})

const posts = Object.entries(blogEntries)
  .map(([filePath, rawContent]) => {
    const { data } = matter(rawContent);
    const id = filePath
      .split('/')
      .pop()
      ?.replace(/\.mdx$/, '') as string;

    const result = entryMetadataSchema.safeParse({
      id,
      title: data.title,
      description: data.description,
      publicationDate: data.createdAt,
    });
    if (result.success) {
      return result.data;
    }
    throw Error(`Invalid slug for blog post ${id}`)
  })

export type PostMetaData = z.infer<typeof entryMetadataSchema>

export default posts;

