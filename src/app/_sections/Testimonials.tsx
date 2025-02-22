import { ssrTrpc } from "@/backend/trpc/ssr-caller";
import { Button } from "@/components/ui/button";
import { LucideMessageCircleQuestion } from "lucide-react";
import { MarqueeDemo } from "./components/Marquee";

type ReviewType = {
  fullname: string;
  photo: string;
  content: string;
  rating: number;
  date: string;
};

export const revalidate = 86400; // revalidates every 86400 seconds (1 day)

const Testimonials = async () => {
  const reviews: ReviewType[] = await ssrTrpc.analyticsRouter.getReviews();

  return (
    <div className="border-none w-full flex items-center justify-center bg-white">
      <section className="relative w-full max-w-[1400px] pt-20 pb-14  px-6 flex flex-col items-center gap-8">
        <div className="text-black text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif leading-tight mb-4">
            Testimonials
          </h2>
          <p className="text-sm sm:text-base font-sans">
            We believe our results should speak for themselves. Check out
            hundreds of reviews from happy customers.
          </p>
        </div>

        <MarqueeDemo
          reviews={reviews}
          googleReviewsUrl="https://www.google.com/search?sca_esv=47cd9fb8f57accb3&biw=1528&bih=834&si=APYL9btvhO6SAb8jF9HqTZMMa7vs_teLnZaEVrJZwRKFIIKjoTIiwRFYjnV_BQgHwzcwYTZqIlee2Wo5RKBDt2XsOU0bCVzxLM7aAMwymDJdeuiv10hLrFPUct6ezpgTVgb_MMrdEPRY&q=DSG+Home+Finance+Reviews&sa=X&ved=2ahUKEwiyubj3_7SLAxUoQ0EAHQOMHUwQ0bkNegQILRAE"
        />

        <Button className="font-sans w-full sm:w-auto bg-[#F49FB7] text-white hover:bg-[#f281a4] transition text-sm md:text-base">
          Could you be the next one
          <LucideMessageCircleQuestion />
        </Button>
      </section>
    </div>
  );
};

export default Testimonials;
