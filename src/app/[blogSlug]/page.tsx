import { ssrTrpc } from "@/backend/trpc/ssr-caller";
import NavBar from "@/components/NavBar";
import Image from "next/image";
import davidAuthorImage from "../../../public/david-author-image.png";
import CTA from "../mortgages/_sections/CTA";
import { Footer } from "../_sections/components/Footer";
import { Card } from "@/components/ui/card";
import { redirect } from "next/navigation";

const page = async ({ params }: { params: { blogSlug: string } }) => {
  const blogSlug = await params.blogSlug;
  const blogPost = await ssrTrpc.blogRouter.getBlog({ slug: blogSlug });

  if (blogPost == null) {
    redirect("/");
    return;
  }

  return (
    <main className="relative w-full flex flex-col items-center border-none bg-[#1e1e1e] text-white ">
      <NavBar />
      <div className="absolute w-full h-full bg-gradient-to-t from-[#F49FB7]/10 to-[#1e1e1e]/60" />
      <div className="absolute w-full h-full grid-background opacity-10" />
      <section className=" w-full h-fit max-w-[1400px] pt-32 md:pt-52 pb-20 px-4 z-50">
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
                  width="300"
                  height="300"
                  className="rounded-full aspect-square w-14"
                />
                <div className="flex flex-col justify-evenly">
                  <p className="text-base sm:text-lg md:text-xl">
                    {blogPost.author}{" "}
                  </p>
                  <p className="text-gray-500">
                    {blogPost.createdAt.toDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full max-w-[500px] h-[300px]">
              <Image
                src={blogPost.image ? blogPost.image : "/placeholder.jpg"}
                width="500"
                height="500"
                alt="Blog Post Image"
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
};

export default page;
