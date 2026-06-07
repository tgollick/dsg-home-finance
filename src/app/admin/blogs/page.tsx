import Link from "next/link";
import { PlusCircle } from "lucide-react";

import { ssrTrpc } from "@/backend/trpc/ssr-caller";
import { Button } from "@/components/ui/button";
import { PageHero } from "../_components/page-hero";
import { BlogsManager, type BlogPost } from "./blogs-manager";

const Blog = async () => {
  const data = await ssrTrpc.blogRouter.getAllBlogs();
  const posts = data as unknown as BlogPost[];

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-4 md:space-y-8 md:p-8">
      <PageHero
        title="Blog Posts"
        description="Create and manage the articles published on the DSG Home Finance website."
        action={
          <Button asChild className="bg-white text-primary hover:bg-white/90">
            <Link href="/admin/blogs/new">
              <PlusCircle className="h-4 w-4" />
              New blog post
            </Link>
          </Button>
        }
      />

      <BlogsManager initialData={posts} />
    </div>
  );
};

export default Blog;
