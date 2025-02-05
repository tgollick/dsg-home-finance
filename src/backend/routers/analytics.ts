import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../trpc/init";
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

export const analyticsRouter = createTRPCRouter({
  getUserSignUpStats: protectedProcedure.query(async ({ ctx }) => {
    // Get the current date and time
    const now = new Date();

    // Calculate the start of today (00:00:00)
    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    // Calculate the start of the current year (January 1st, 00:00:00)
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    // Users signed up today
    const usersSignedUpToday = await ctx.prisma.userContact.count({
      where: {
        createdAt: {
          gte: startOfToday,
          lt: new Date(startOfToday.getTime() + 24 * 60 * 60 * 1000), // Start of tomorrow
        },
      },
    });

    // Users signed up this year
    const usersSignedUpThisYear = await ctx.prisma.userContact.count({
      where: {
        createdAt: {
          gte: startOfYear,
          lt: new Date(startOfYear.getFullYear() + 1, 0, 1), // Start of next year
        },
      },
    });

    // Total users
    const totalUsers = await ctx.prisma.userContact.count();

    // Users signed up in the last 7 days
    const sevenDaysAgo = new Date(
      startOfToday.getTime() - 7 * 24 * 60 * 60 * 1000
    );
    const usersSignedUpLast7Days = await ctx.prisma.userContact.count({
      where: {
        createdAt: {
          gte: sevenDaysAgo,
          lt: startOfToday, // Up to the start of today
        },
      },
    });

    return {
      usersSignedUpToday,
      usersSignedUpThisYear,
      totalUsers,
      usersSignedUpLast7Days,
    };
  }),
  getReviews: publicProcedure.query(async () => {
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

      return response.data.result.reviews;
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  }),
});
