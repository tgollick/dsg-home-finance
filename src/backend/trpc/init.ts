import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import prisma from "@/lib/prisma";
import { Resend } from "resend";
import { auth } from "@/auth";
import { env } from "@/lib/env";

export const createContext = async () => {
  // Your existing context creation logic
  const resend = new Resend(process.env.RESEND_API);

  return {
    resend,
    prisma,
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

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;

export const isAuthed = t.middleware(async ({ next }) => {
  const session = await auth();
  const allowedEmails =
    env.ALLOWED_EMAILS?.split(",")
      .map((email) => email.trim().replace(/['";]/g, ""))
      .filter(Boolean) || [];

  if (!session?.user?.email || !allowedEmails.includes(session.user.email)) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message:
        "You must be logged in with an authorized email to access this resource",
    });
  }

  return next({
    ctx: {
      session: { user: session.user },
    },
  });
});

export const publicProcedure = t.procedure.use((opts) => {
  return opts.next();
});

export const protectedProcedure = t.procedure.use(isAuthed);
