
import { type Author } from "./Author"

export type WebPage = {
  "@type": "WebPage",
  name: string,
  description: string,
  author: Author
}

