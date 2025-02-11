import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { enGB } from "date-fns/locale";
import FirstTimeBuyer from "../../../public/FirstTimeBuyer.jpg";
import BuyToLet from "../../../public/BuyToLet.jpg";
import Remortgage from "../../../public/Remortgage.jpg";
import Image from "next/image";
import { ssrTrpc } from "@/backend/trpc/ssr-caller";

interface BlogPost {
  title: string;
  description: string;
  date: string;
  readTime: number;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    title: "How Much Do I Really Need to Earn to Buy a Home in 2023?",
    description:
      "You've seen the headlines about soaring rates, but what does it mean for your paycheck? This blog breaks down the math: Why a £30k salary might get you a £150k home in Newcastle but barely a studio in London. Discover tricks to stretch your borrowing power (hint: that side hustle can count), which lenders are friendliest to single buyers, and how a broker can spot \"hidden\" affordability rules. Download our free 'Salary vs. Mortgage Calculator' to test your numbers.",
    date: "2024-10-24",
    readTime: 5,
    image: BuyToLet.src,
  },
  {
    title: "The 5% Deposit Trap: Are Low Down Payments Too Good to Be True?",
    description:
      'Low deposits sound perfect for first-timers—until you see the catch. We compare 5% mortgages with higher-rate deals, revealing why a 10% deposit could save you £15k in interest. Learn how to dodge "mortgage prison" if prices dip. And why brokers matter. They\'ll fight lenders to waive strict affordability tests. Book a free "Deposit Strategy Session" to avoid costly mistakes.',
    date: "2024-10-24",
    readTime: 5,
    image: FirstTimeBuyer.src,
  },
  {
    title: "Bad Credit? How to Fix Your Score Fast (Without Waiting 6 Years)",
    description:
      'That student loan default or missed phone bill doesn\'t have to kill your mortgage hopes. Learn how lenders weigh credit history (spoiler: recent behavior matters most), and how brokers match you with "second-chance" lenders. Real example: Jess, 28, boosted her score 120 points in 3 months using a broker\'s "credit rehab" plan. Start your free credit health check today.',
    date: "2024-10-24",
    readTime: 5,
    image: Remortgage.src,
  },
];

export async function BlogSection() {
  const blogs = await ssrTrpc.blogRouter.getBlogs();
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
              We always like to keep you up to date, that's why DSG Home Finance
              is committed to producing blog posts relating to the current
              events.
            </p>
          </div>
          <div className="grid gap-6">
            {blogPosts.map((post) => (
              <Card
                key={post.title}
                className="overflow-hidden transition-shadow hover:shadow-md"
              >
                <a href="#" className="flex flex-col md:flex-row">
                  <div className="relative w-full md:w-[240px] h-48 shrink-0">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt=""
                      className="object-cover w-full h-full"
                      width="500"
                      height="500"
                    />
                  </div>
                  <div className="flex flex-col justify-between p-6">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-serif leading-tight">
                        "{post.title}"
                      </h3>
                      <p className="text-sm text-muted-foreground font-sans line-clamp-3">
                        {post.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4 font-sans">
                      <time dateTime={post.date}>
                        {format(new Date(post.date), "dd MMMM yyyy", {
                          locale: enGB,
                        })}
                      </time>
                      <span>·</span>
                      <span>{post.readTime} minute read</span>
                    </div>
                  </div>
                </a>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
