import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/backend/trpc/init";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import sanitizeHtml from "sanitize-html";

export const blogRouter = createTRPCRouter({
  addBlog: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        author: z.string(),
        image: z.string(),
        metaTitle: z.string(),
        metaDescription: z.string(),
        content: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const sanatizedContent = sanitizeHtml(input.content);
      const slug = input.title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      try {
        const newBlogPost = await ctx.prisma.blogPost.create({
          data: {
            title: input.title,
            image: input.image,
            author: input.author,
            metaTitle: input.metaTitle,
            metaDescription: input.metaDescription,
            content: sanatizedContent,
            slug,
          },
        });

        return newBlogPost;
      } catch (err) {
        console.log("Error creating new blog post");
        throw new TRPCError({
          message: `Error creating new blog: ${err}`,
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
  editBlog: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        author: z.string(),
        image: z.string().optional(),
        slug: z.string(),
        metaTitle: z.string().optional(),
        metaDescription: z.string().optional(),
        content: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // Sanitize the content to prevent XSS attacks
      const sanitizedContent = sanitizeHtml(input.content);

      // Generate a slug from the title
      const slug = input.title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      try {
        // Update the blog post in the database
        const updatedBlogPost = await ctx.prisma.blogPost.update({
          where: { slug: input.slug }, // Use the slug to find the specific blog post
          data: {
            title: input.title,
            author: input.author,
            image: input.image,
            metaTitle: input.metaTitle,
            metaDescription: input.metaDescription,
            content: sanitizedContent,
            slug: slug,
          },
        });

        return updatedBlogPost;
      } catch (err) {
        console.error("Error updating blog post:", err);
        throw new TRPCError({
          message: `Error updating blog post: ${err}`,
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
  getBlog: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      try {
        const blogPost = await ctx.prisma.blogPost.findUnique({
          where: { slug: input.slug },
        });

        return blogPost;
      } catch (err) {
        console.log(`Error retreiving blog post: ${err}`);
        throw new TRPCError({
          message: `Error retreiving blog post: ${err}`,
          code: "NOT_FOUND",
        });
      }
    }),
  getAllBlogs: publicProcedure.query(async ({ ctx }) => {
    try {
      const allBlogs = ctx.prisma.blogPost.findMany();

      return allBlogs;
    } catch (err) {
      console.log(`Error retreiving all blog posts: ${err}`);
      throw new TRPCError({
        message: `Error retreiving all the blog posts: ${err}`,
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  }),
  deleteBlog: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.prisma.blogPost.delete({
          where: {
            slug: input.slug,
          },
        });
      } catch (err) {
        console.log(`Error deleting blog post: ${err}`);
        throw new TRPCError({
          message: `Error deleting blog post: ${err}`,
          code: "NOT_FOUND",
        });
      }
    }),
});
