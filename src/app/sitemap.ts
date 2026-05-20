import type { MetadataRoute } from "next";
import { ssrTrpc } from "@/backend/trpc/ssr-caller";
import { SITE } from "@/lib/metadata";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE.url}/`,          priority: 1.0, changeFrequency: "weekly",  lastModified: now },
    { url: `${SITE.url}/mortgages`, priority: 0.9, changeFrequency: "weekly",  lastModified: now },
    { url: `${SITE.url}/protection`,priority: 0.9, changeFrequency: "weekly",  lastModified: now },
    { url: `${SITE.url}/contact`,   priority: 0.8, changeFrequency: "monthly", lastModified: now },
    { url: `${SITE.url}/about`,     priority: 0.7, changeFrequency: "monthly", lastModified: now },
    { url: `${SITE.url}/privacy`,   priority: 0.3, changeFrequency: "yearly",  lastModified: now },
  ];

  const blogs = await ssrTrpc.blogRouter.getAllBlogs();
  const blogPages: MetadataRoute.Sitemap = blogs.map((post) => ({
    url: `${SITE.url}/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages];
}