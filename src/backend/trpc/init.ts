import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { Resend } from "resend";

export const createContext = async (opts: CreateNextContextOptions) => {
  const resend = new Resend(process.env.RESEND_API);
  const session = await auth();

  return {
    ...opts,
    session,
    prisma,
    resend,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
const t = initTRPC.context<Context>().create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  transformer: superjson,
  errorFormatter(opts) {
    const { shape, error } = opts;
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.code === "BAD_REQUEST" && error.cause instanceof ZodError
            ? error.cause.flatten()
            : null,
      },
    };
  },
});

// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;

export const isAuthed = t.middleware(({ ctx, next }) => {
  const allowedEmails = ["thomasgollick@gmail.com", "davidgollick@gmail.com"];

  if (
    !ctx.session?.user?.email ||
    !allowedEmails.includes(ctx.session.user.email)
  ) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message:
        "You must be logged in with an authorized email to access this resource",
    });
  }

  return next({
    ctx: {
      session: { user: ctx.session.user },
    },
  });
});

export const publicProcedure = t.procedure.use((opts) => {
  return opts.next();
});

export const protectedProcedure = t.procedure.use(isAuthed);
