import { DefaultAuthor, type Author } from "./Author"

export type WebSite = {
  "@type": "WebSite",
  name: string,
  url: string,
  author: Author
}

const DefaultWebSite: WebSite = {
  "@type": "WebSite",
  name: "Lukas Karel - Learning, Building & Growth",
  url: "https://lukaskarel.at",
  author: DefaultAuthor,
}

export {
  DefaultWebSite
}
