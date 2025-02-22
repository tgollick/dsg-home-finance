import prisma from "./prisma";

type Review = {
  author_name: string;
  author_url: string;
  language: string;
  original_language: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
  translated: boolean;
};

export const updateReviews = async (reviews: Review[]) => {
  try {
    await prisma.review.deleteMany({});

    await prisma.review.createMany({
      data: reviews.map((review) => ({
        fullname: review.author_name,
        photo: review.profile_photo_url,
        content: review.text,
        rating: review.rating,
        date: review.relative_time_description,
      })),
    });

    console.log("Reviews updated successfully.");
  } catch (e) {
    return {
      code: "INTERNAL_SERVER_ERROR",
      error: "Failed to update reviews.",
      message: e.message,
    };
  }
};
