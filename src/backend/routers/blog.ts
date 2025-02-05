import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/backend/trpc/init";
import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const blogRouter = createTRPCRouter({
  getBlogs: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.blogPost.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),
  addBlog: protectedProcedure
    .input(
      z.object({ title: z.string(), content: z.string(), author: z.string() })
    )
    .mutation(({ input, ctx }) => {
      const { title, content, author } = input;

      const newBlog = ctx.prisma.blogPost.create({
        data: {
          title,
          content,
          author,
        },
      });

      return newBlog;
    }),
  deleteBlog: protectedProcedure
    .input(z.object({ blogId: z.string() })) // Add UUID validation
    .mutation(async ({ ctx, input }) => {
      try {
        // Validate ownership before deletion
        const existingBlog = await ctx.prisma.blogPost.findUnique({
          where: { id: input.blogId },
        });

        if (!existingBlog) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Blog post not found", // Corrected message
          });
        }

        // Perform deletion
        const deletedBlog = await ctx.prisma.blogPost.delete({
          where: { id: input.blogId },
        });

        return {
          success: true,
          deletedId: deletedBlog.id,
          timestamp: new Date().toISOString(),
        };
      } catch (error) {
        console.error("Deletion error:", error);

        // Handle Prisma errors specifically
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          // Handle not found error (P2025) specifically
          if (error.code === "P2025") {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "Blog post does not exist",
            });
          }

          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Database operation failed",
            cause: error,
          });
        }

        // Forward TRPC errors
        if (error instanceof TRPCError) throw error;

        // Catch-all for other errors
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete blog post",
        });
      }
    }),
  editBlog: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        content: z.string(),
        author: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.blogPost.update({
        where: { id: input.id },
        data: {
          title: input.title,
          content: input.content,
          author: input.author,
          updatedAt: new Date(),
        },
      });
    }),
  getBlog: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.blogPost.findUnique({
        where: { id: input.id },
      });
    }),
});
