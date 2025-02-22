import { ssrTrpc } from "@/backend/trpc/ssr-caller";
import { MarqueeDemo } from "../_components/Marquee";

type ReviewType = {
  fullname: string;
  photo: string;
  content: string;
  rating: number;
  date: string;
};

export const revalidate = 86400; // revalidates every 86400 seconds (1 day)

const Reviews = async () => {
  const reviews: ReviewType[] = await ssrTrpc.analyticsRouter.getReviews();

  return (
    <div className="border-none w-full flex items-center justify-center bg-[#1e1e1e] relative">
      <div className="grid-background absolute w-full h-full opacity-5" />
      <section className="relative w-full max-w-[1400px] p-6 flex flex-col items-center gap-8">
        <MarqueeDemo
          reviews={reviews}
          googleReviewsUrl="https://www.google.com/search?sca_esv=47cd9fb8f57accb3&biw=1528&bih=834&si=APYL9btvhO6SAb8jF9HqTZMMa7vs_teLnZaEVrJZwRKFIIKjoTIiwRFYjnV_BQgHwzcwYTZqIlee2Wo5RKBDt2XsOU0bCVzxLM7aAMwymDJdeuiv10hLrFPUct6ezpgTVgb_MMrdEPRY&q=DSG+Home+Finance+Reviews&sa=X&ved=2ahUKEwiyubj3_7SLAxUoQ0EAHQOMHUwQ0bkNegQILRAE"
        />
      </section>
    </div>
  );
};

export default Reviews;
