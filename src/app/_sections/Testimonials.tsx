import { ssrTrpc } from "@/backend/trpc/ssr-caller";
import Review from "./components/Review";
import { Button } from "@/components/ui/button";
import { LucidePhoneCall } from "lucide-react";

type ReviewType = {
  author_name: string;
  profile_photo_url: string;
  rating: number;
  text: string;
  relative_time_description: string;
};

const Testimonials = async () => {
  const reviews: ReviewType[] = await ssrTrpc.analyticsRouter.getReviews();

  return (
    <div className="w-full flex items-center justify-center bg-white">
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
        <div className="flex lg:flex-row flex-col gap-6 items-center">
          {reviews.slice(0, 2).map((review, index) => (
            <Review
              key={index}
              name={review.author_name}
              review_text={review.text}
              profile_photo={review.profile_photo_url}
              rating={review.rating}
              date={review.relative_time_description}
            />
          ))}
        </div>

        <Button className="font-sans w-full md:w-auto bg-[#F49FB7] text-black hover:bg-[#f281a4] transition text-sm md:text-base">
          Book a call with David
          <LucidePhoneCall />
        </Button>
      </section>
    </div>
  );
};

export default Testimonials;
