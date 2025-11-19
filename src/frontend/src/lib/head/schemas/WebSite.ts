import { DefaultAuthor, type Author } from "./Author"

export type WebSite = {
  "@type": "WebSite",
  name: string,
  url: string,
  author: Author
}

const DefaultWebSite: WebSite = {
  "@type": "WebSite",
  name: "Learning, Building & Growth - Lukas Karel",
  url: "https://lukaskarel.at",
  author: DefaultAuthor,
}

export {
  DefaultWebSite
}
