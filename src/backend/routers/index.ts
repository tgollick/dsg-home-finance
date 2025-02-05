import { createTRPCRouter } from "../trpc/init";
import { contactRouter } from "./contact";
import { blogRouter } from "./blog";
import { analyticsRouter } from "./analytics";

export const appRouter = createTRPCRouter({
  contactRouter,
  blogRouter,
  analyticsRouter,
});

export type AppRouter = typeof appRouter;
