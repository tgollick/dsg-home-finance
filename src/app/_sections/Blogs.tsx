import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { enGB } from "date-fns/locale";
import Image from "next/image";
import { ssrTrpc } from "@/backend/trpc/ssr-caller";
import Link from "next/link";

export async function BlogSection() {
  const blogs = await ssrTrpc.blogRouter.getAllBlogs();
  const top3Blogs = blogs.slice(0, 3);

  return (
    <div className="w-full h-fit flex flex-col items-center bg-white text-black border-none">
      <section className="w-full max-w-[1400px] px-6 pt-14 pb-20">
        <div className="space-y-6">
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight mb-4">
              Our Blog Posts
            </h2>
            <p className="text-sm sm:text-base font-sans mb-2">
              We always like to keep you up to date, thats why DSG Home Finance
              is committed to producing blog posts relating to the current
              events.
            </p>
          </div>
          <div className="grid gap-6">
            {top3Blogs.map((post) => (
              <Card
                key={post.title}
                className="overflow-hidden transition-shadow hover:shadow-md"
              >
                <Link href={"/" + post.slug} className="flex flex-col md:flex-row">
                  <div className="relative w-full md:w-[240px] h-48 shrink-0">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.metaTitle || post.title}
                      className="object-cover h-full"
                      width="500"
                      height="500"
                    />
                  </div>
                  <div className="flex flex-col justify-between p-6">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-serif leading-tight">
                        &quot;{post.title}&quot;
                      </h3>
                      <p className="text-sm text-muted-foreground font-sans line-clamp-3">
                        {post.metaDescription}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4 font-sans">
                      <time dateTime={String(post.createdAt)}>
                        {format(new Date(post.createdAt), "dd MMMM yyyy", {
                          locale: enGB,
                        })}
                      </time>
                      <span>·</span>
                      <span>4 minute read</span>
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
