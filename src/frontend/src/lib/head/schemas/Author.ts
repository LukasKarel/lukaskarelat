
export type Author = {
  "@type": 'Person',
  name: string,
  url?: string,
}

const DefaultAuthor: Author = {
  "@type": "Person",
  name: "Lukas Karel",
  url: "https://lukaskarel.at"
}

export {
  DefaultAuthor
}
