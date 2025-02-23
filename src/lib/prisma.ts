// lib/prisma.ts
import { PrismaClient, Prisma } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prisma = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

// Error handling with proper event type
prisma.$on("error" as never, (e: Prisma.PrismaClientKnownRequestError) => {
  console.error("Prisma Client Error:", e);
});

// Logging with proper event type
prisma.$on("query" as never, (e: Prisma.QueryEvent) => {
  console.log("Query: " + e.query);
});

export default prisma;
