import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import Link from "next/link";
import Image from "next/image";

const MAX_BODY_LENGTH = 200; // Adjust this value as needed

const ReviewCard = ({
  img,
  name,
  date,
  body,
  googleReviewsUrl,
}: {
  img: string;
  name: string;
  date: string;
  body: string;
  googleReviewsUrl: string;
}) => {
  const truncatedBody =
    body.length > MAX_BODY_LENGTH
      ? body.slice(0, MAX_BODY_LENGTH) + "..."
      : body;

  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]"
      )}
    >
      <div className="flex flex-row items-center font-sans gap-2 text-black">
        <Image
          className="rounded-full"
          width="32"
          height="32"
          alt={`Image of ${name}`}
          src={img || "/placeholder.svg"}
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-serif">{name}</figcaption>
          <p className="text-xs font-medium">{date}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm h-[4.5em] overflow-hidden font-sans text-black">
        {truncatedBody}
      </blockquote>
      {body.length > MAX_BODY_LENGTH && (
        <Link
          href={googleReviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-600 hover:underline"
        >
          Read more
        </Link>
      )}
    </figure>
  );
};

type ReviewType = {
  fullname: string;
  photo: string;
  content: string;
  rating: number;
  date: string;
};

type Props = {
  reviews: ReviewType[];
  googleReviewsUrl: string;
};

export function MarqueeDemo({ reviews, googleReviewsUrl }: Props) {
  const firstRow = reviews.slice(0, reviews.length / 2);
  const secondRow = reviews.slice(reviews.length / 2);

  return (
    <div className="relative flex h-fit w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard
            key={review.fullname}
            name={review.fullname}
            img={review.photo}
            date={review.date}
            body={review.content}
            googleReviewsUrl={googleReviewsUrl}
          />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard
            key={review.fullname}
            name={review.fullname}
            img={review.photo}
            date={review.date}
            body={review.content}
            googleReviewsUrl={googleReviewsUrl}
          />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white"></div>
    </div>
  );
}
