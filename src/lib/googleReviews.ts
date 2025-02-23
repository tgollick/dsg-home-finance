import axios from "axios";

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

export const fetchGoogleReviews = async (): Promise<Review[]> => {
  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/place/details/json",
      {
        params: {
          placeid: "ChIJn01FqKNT2UcRiIYNZ3VBAbI",
          fields: "reviews",
          key: "AIzaSyD8vtfaPueXUU6ucbaHxXvKtM0j-znd3jI",
        },
      }
    );

    const reviews = response.data?.result?.reviews;

    if (!reviews) {
      throw new Error("No reviews found in the API response");
    }

    return reviews;
  } catch (err: unknown) {
    console.error(err);
    return [];
  }
};
