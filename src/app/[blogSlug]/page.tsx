import { ssrTrpc } from "@/backend/trpc/ssr-caller";
import NavBar from "@/components/NavBar";
import Image from "next/image";
import davidAuthorImage from "../../../public/david-author-image.png";
import CTA from "../mortgages/_sections/CTA";
import { Footer } from "../_sections/components/Footer";
import { Card } from "@/components/ui/card";
import { notFound } from "next/navigation";
import { JSX } from "react";
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ blogSlug: string }>;  // Updated to Promise
}

export async function generateStaticParams() {
  const posts = await ssrTrpc.blogRouter.getAllBlogs();
  return posts.map((post) => ({
    blogSlug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;  // Await here
  const { blogSlug } = resolvedParams;
  const blogPost = await ssrTrpc.blogRouter.getBlog({ slug: blogSlug });
  if (!blogPost) {
    return {
      title: 'Blog Post Not Found',
    };
  }
  return {
    title: blogPost.metaTitle || blogPost.title,
    description: blogPost.metaDescription,
    openGraph: {
      title: blogPost.metaTitle || blogPost.title,
      description: blogPost.metaDescription || '',
      images: [blogPost.image || '/default-og-image.png'],
    },
  };
}

export default async function Page({ params }: PageProps): Promise<JSX.Element> {
  const resolvedParams = await params;  // Await here
  const { blogSlug } = resolvedParams;
  const blogPost = await ssrTrpc.blogRouter.getBlog({ slug: blogSlug });
 
  if (!blogPost) {
    notFound();
  }
  return (
    <main className="relative w-full flex flex-col items-center border-none bg-[#1e1e1e] text-white ">
      <NavBar />

       <div className="absolute w-full h-full bg-gradient-to-t from-[#F49FB7]/10 to-[#1e1e1e]/60" />     <div
        className="absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage: `
            radial-gradient(125% 125% at 50% 10%, #1e1e1e 40%, #ec4899 100%)
          `,
          backgroundSize: "100% 100%",
        }}
      />

      <div className="absolute w-full h-full grid-background opacity-10" />
      <section className="w-full h-fit max-w-[1400px] pt-32 md:pt-52 pb-20 px-4 z-50">
        <Card className="w-full p-4 md:p-10 bg-[#272727] border-[#3f3f3f] text-white bg-opacity-60 font-sans">
          <div className="flex flex-col-reverse md:flex-row md:justify-between items-center gap-8 mb-8 w-full">
            <div className="flex-1">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 font-serif">
                {blogPost.title}
              </h1>
              <div className="flex items-center gap-2">
                <Image
                  src={davidAuthorImage}
                  alt="Image of Author David Gollick"
                  width={300}
                  height={300}
                  className="rounded-full aspect-square w-14"
                  priority
                />
                <div className="flex flex-col justify-evenly">
                  <p className="text-base sm:text-lg md:text-xl">
                    {blogPost.author}
                  </p>
                  <p className="text-gray-500">
                    {blogPost.createdAt.toDateString()}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full max-w-[500px] h-[300px]">
              <Image
                src={blogPost.image ?? "/placeholder.jpg"}
                width="500"
                height="500"
                alt={blogPost.title} // Use the blog title for a better alt tag
                className="rounded-md object-cover w-full h-full"
              />
            </div>
          </div>
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: blogPost.content }}
          />
        </Card>
      </section>
      <CTA />
      <Footer />
    </main>
  );
}
