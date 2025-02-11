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
      select: {
        id: true,
        title: true,
        slug: true,
        metaDescription: true,
        featuredImage: {
          take: 1, // Get only the first image
          select: {
            url: true,
            altText: true,
          },
        },
        createdAt: true,
      },
    });
  }),
  addBlog: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        author: z.string().min(1),
        metaTitle: z.string().optional(),
        metaDescription: z.string().optional(),
        sections: z.array(
          z.object({
            title: z.string(),
            content: z.string(),
            order: z.number(),
          })
        ),
        featuredImages: z.array(
          z.object({
            url: z.string(),
            altText: z.string().optional(),
          })
        ),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const slug = input.title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");

      return ctx.prisma.blogPost.create({
        data: {
          title: input.title,
          slug,
          author: input.author,
          metaTitle: input.metaTitle,
          metaDescription: input.metaDescription,
          // Create nested sections
          sections: {
            create: input.sections.map((section) => ({
              title: section.title,
              content: section.content,
              order: section.order,
            })),
          },
          // Create nested images with alt text
          featuredImage: {
            create: input.featuredImages.map((image) => ({
              url: image.url,
              altText: image.altText,
            })),
          },
        },
        include: {
          sections: true,
          featuredImage: true,
        },
      });
    }),
  deleteBlog: protectedProcedure
    .input(z.object({ blogId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        // Use transaction to ensure atomic deletion
        const result = await ctx.prisma.$transaction([
          // Delete related sections first
          ctx.prisma.section.deleteMany({
            where: { blogPostId: input.blogId },
          }),
          // Delete related images
          ctx.prisma.image.deleteMany({
            where: { blogPostId: input.blogId },
          }),
          // Finally delete the blog post
          ctx.prisma.blogPost.delete({
            where: { id: input.blogId },
          }),
        ]);

        const deletedBlog = result[2]; // Third item in transaction result

        return {
          success: true,
          deletedId: deletedBlog.id,
          sectionsDeleted: result[0].count,
          imagesDeleted: result[1].count,
          timestamp: new Date().toISOString(),
        };
      } catch (error) {
        console.error("Deletion error:", error);

        // Handle Prisma errors
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
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
          message: "Failed to delete blog post and related content",
        });
      }
    }),
  editBlog: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().min(1),
        author: z.string().min(1),
        metaTitle: z.string().optional(),
        metaDescription: z.string().optional(),
        sections: z.array(
          z.object({
            id: z.string().optional(),
            title: z.string(),
            content: z.string(),
            order: z.number(),
          })
        ),
        featuredImages: z.array(
          z.object({
            id: z.string().optional(),
            url: z.string(),
            altText: z.string().optional(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const existingPost = await ctx.prisma.blogPost.findUnique({
        where: { id: input.id },
        select: { title: true },
      });

      let slug = existingPost?.title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");

      if (input.title !== existingPost?.title) {
        slug = input.title
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "")
          .replace(/[\s_-]+/g, "-")
          .replace(/^-+|-+$/g, "");
      }

      return ctx.prisma.blogPost.update({
        where: { id: input.id },
        data: {
          title: input.title,
          slug,
          author: input.author,
          metaTitle: input.metaTitle,
          metaDescription: input.metaDescription,
          updatedAt: new Date(),
          sections: {
            deleteMany: {
              NOT: {
                id: {
                  in: input.sections
                    .map((s) => s.id)
                    .filter((id): id is string => !!id),
                },
              },
            },
            upsert: input.sections.map((section) => ({
              where: {
                id: section.id || "00000000-0000-0000-0000-000000000000",
              },
              update: {
                title: section.title,
                content: section.content,
                order: section.order,
              },
              create: {
                title: section.title,
                content: section.content,
                order: section.order,
              },
            })),
          },
          featuredImage: {
            deleteMany: {
              NOT: {
                id: {
                  in: input.featuredImages
                    .map((i) => i.id)
                    .filter((id): id is string => !!id),
                },
              },
            },
            upsert: input.featuredImages.map((image) => ({
              where: {
                id: image.id || "00000000-0000-0000-0000-000000000000",
              },
              update: {
                url: image.url,
                altText: image.altText,
              },
              create: {
                url: image.url,
                altText: image.altText,
              },
            })),
          },
        },
        include: {
          sections: true,
          featuredImage: true,
        },
      });
    }),
  getBlog: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.blogPost.findUnique({
        where: { id: input.id },
        include: {
          sections: {
            orderBy: {
              order: "asc", // Maintain section ordering
            },
          },
          featuredImage: true,
        },
      });
    }),
});
