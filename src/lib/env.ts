// lib/env.ts
import { z } from "zod";

// PostgreSQL connection string validation
const postgresqlUrlRegex =
  /^postgresql:\/\/([^:]+):([^@]+)@([^/]+)\/([^?]+)(\?.*)?$/;

export const envSchema = z.object({
  // Database configuration
  DATABASE_URL: z
    .string()
    .min(1, "Database URL is required")
    .regex(postgresqlUrlRegex, "Invalid PostgreSQL connection string format")
    .refine((url) => url.includes("sslmode=require"), {
      message: "SSL mode must be required for database connections",
    }),

  // Google OAuth credentials
  AUTH_GOOGLE_ID: z.string(),
  AUTH_GOOGLE_SECRET: z.string(),

  // Application security
  AUTH_SECRET: z.string(),

  // Resend email service
  RESEND_API: z
    .string()
    .min(32, "Resend API key must be at least 32 characters")
    .regex(/^re_/, "Resend API key must start with 're_'"),

  // Add these optional but recommended variables
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  VERCEL_URL: z.string(),
  ALLOWED_EMAILS: z.string(),
});

// Export validated environment variables
export const env = envSchema.parse(process.env);
