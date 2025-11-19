import type { Author } from "./Author";

export type BlogPosting = {
  "@type": "BlogPosting",
  headline: string;
  description?: string;
  keywords?: string[];
  image?: string;
  datePublished: Date;
  dateModified: Date;
  author?: Author | Author[]
}
