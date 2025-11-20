import matter from "gray-matter";
import z from "zod";
import git from 'isomorphic-git';
import fs from 'fs'
import fsAsync from 'fs/promises'
import { join } from "path";
import fg from 'fast-glob';

const POSTS_BASEBATH = 'src/lib/blog/posts/';

async function loadFiles() {
  // Get all matching file paths
  const files = await fg(`${POSTS_BASEBATH}/*.mdx`);

  // Read the file content
  const modules: {
    [key: string]: string;
  } = {};
  for (const file of files) {
    const content = await fsAsync.readFile(file, { encoding: "utf-8" });
    modules[file] = content;
  }

  return modules;
}


const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const dateSchema = z.preprocess((val) => {
  if (val instanceof Date) return val;          // already a Date
  if (typeof val === "string" || typeof val === "number") {
    const d = new Date(val);
    if (!isNaN(d.getTime())) return d;         // valid date
  }
  return undefined;                             // invalid -> will fail
}, z.date());

const entryMetadataSchema = z.object({
  id: z.string().regex(SLUG_REGEX, { error: 'Invalid slug (lowercase letters, numbers and single dashes only)' }),
  title: z.string(),
  description: z.string().max(160),
  publicationDate: dateSchema,
  lastEditTime: dateSchema,
  tags: z.array(z.string()).optional(),
  tools: z.array(z.string()).optional(),
  project: z.string().optional()
})

const lastEditTime = async (filePath: string) => {
  const cwd = process.cwd();

  const root = await git.findRoot({ fs, filepath: join(cwd, filePath) })

  // remove absolute part of working directory because we need relative path in git repo
  const filePathInGit = join(cwd.substring(root.length + 1), filePath)

  try {
    const result = await git.log({ fs, gitdir: join(root, '.git'), filepath: filePathInGit, depth: 1, })
    const commitAuthor = result[0].commit.author;
    const date = new Date(commitAuthor.timestamp! * 1000)
    return date;
  }
  catch (err) {
    return Date.now()
  }
}

async function getPostsMetadata() {
  const blogEntries = await loadFiles();
  return Promise.all(Object.entries(blogEntries)
    .map(async ([filePath, rawContent]) => {
      const { data } = matter(rawContent);
      const typedData = data as {
        title: string,
        description: string,
        createdAt: Date,
        lastEditTime: Date,
        tags?: string[],
        tools?: string[],
        project?: string
      };

      const id = filePath
        .split('/')
        .pop()
        ?.replace(/\.mdx$/, '') as string;
      const editTime = await lastEditTime(filePath);

      const result = entryMetadataSchema.safeParse({
        id: id.toLowerCase(),
        title: typedData.title,
        description: typedData.description,
        publicationDate: typedData.createdAt,
        lastEditTime: editTime,
        tags: typedData.tags?.map(t => t.toLowerCase()),
        tools: typedData.tools?.map(t => t.toLowerCase()),
        project: typedData.project?.toLowerCase()
      });

      if (result.success) {
        return {
          ...result.data,
          route: `/blog/${result.data.id}/`
        }
      }
      throw Error(`Invalid data stored for blog post ${id}`)
    }))
}

export type PostMetaData = z.infer<typeof entryMetadataSchema>

export {
  getPostsMetadata
};
