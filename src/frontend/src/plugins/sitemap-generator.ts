import type { Plugin, ResolvedConfig } from "vite";
import fs from "fs";
import path from "path";
import { getPostsMetadata } from "../lib/server/posts";
import fg from "fast-glob";


type UserOptions = {
  output?: string;
  filter?: string[];
}

type ResolvedUserOptions = {
  output: string;
  filter: string[];
}

const userOptionsDefaults: ResolvedUserOptions = {
  output: 'build',
  filter: [],
}

type SitemapData = {
  loc: string;
  lastmod: Date;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  // between 0 and 1 (how important is the page on your website)
  priority: number;
}

async function mapBlogPosts(site: SitemapData[]): Promise<SitemapData[]> {
  const posts = await getPostsMetadata();
  return site.map(data => {
    const postData = posts.find(p => data.loc.endsWith(p.route));
    if (!postData) {
      return data;
    }
    return {
      ...data,
      priority: 0.8,
      lastmod: postData.lastEditTime,
      changefreq: 'weekly'
    }
  })
}

function mapRootSite(site: SitemapData[], root: string): SitemapData[] {
  return site.map(data => {
    if (data.loc === root) {
      return {
        ...data,
        priority: 1.0,
      }
    }
    return data;
  })
}

function writeSitemapFile(userOptions: ResolvedUserOptions, urls: SitemapData[]) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
      .map(
        (u) =>
          `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod.toISOString()}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`)
      .join("\n")}
</urlset>`;

  fs.writeFileSync(path.join(userOptions.output, "sitemap.xml"), xml)
}

function writeRobots(config: ResolvedConfig, userOptions: ResolvedUserOptions) {

  const content =
    `User-agent: *
Allow: /
 
Sitemap: ${config.env.VITE_PUBLIC_HOST}/sitemap.xml
`;

  fs.writeFileSync(path.join(userOptions.output, "robots.txt"), content)

}

async function generateSitemap(config: ResolvedConfig, userOptions: ResolvedUserOptions) {
  const outputFolder = path.join(config.root, userOptions.output);
  const staticPaths = await fg(`${outputFolder}/**/*.html`)

  const routes = staticPaths.map(path => {
    const extension = ".html"
    path = path.substring(0, path.length - extension.length);

    if (path.endsWith('index')) {
      path = path.slice(0, path.length - 5)
    }
    return path.substring(outputFolder.length)
  })


  let sitemapData: SitemapData[] = routes
    .filter(data => userOptions.filter.find(filter => filter === data) === undefined)
    .map(route => {
      return {
        loc: new URL(route, config.env.VITE_PUBLIC_HOST).toString(),
        lastmod: new Date(),
        changefreq: 'daily',
        priority: 0.5
      }
    })


  sitemapData = await mapBlogPosts(sitemapData);
  sitemapData = mapRootSite(sitemapData, `${config.env.VITE_PUBLIC_HOST}/`);
  writeSitemapFile(userOptions, sitemapData)
  writeRobots(config, userOptions)
}

function sitemapGenerator(options: UserOptions = userOptionsDefaults): Plugin {
  let config: ResolvedConfig;
  let resolvedOptions: ResolvedUserOptions = {
    ...userOptionsDefaults,
    ...options
  }

  const pluginObj: Plugin = {

    name: "vite-plugin-sveltekit-sitemapgenerator",
    configResolved: (resolvedConfig: ResolvedConfig) => {
      config = resolvedConfig
    },

    applyToEnvironment: (env) => {
      // at the moment are two environments ssr and client
      if (env.name === 'ssr') {
        return true;
      }
      return false;
    },

    closeBundle: () => {
      generateSitemap(config, resolvedOptions);
    },
  }

  return pluginObj;
}

export default sitemapGenerator;
