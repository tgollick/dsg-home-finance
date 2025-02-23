import axios from "axios";

export const fetchGoogleReviews = async (): Promise<object> => {
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
  } catch (error: unknown) {
    return {
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to fetch reviews",
      cause: error,
    };
  }
};
