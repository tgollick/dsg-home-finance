import "server-only"; // Ensure this file cannot be imported from the client
import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { cache } from "react";
import { createCallerFactory } from "./init";
import { makeQueryClient } from "./query-client";
import { appRouter } from "../routers";
import { createContext } from "../trpc/init"; // Adjust the import as needed

// Create a stable getter for the query client that
// will return the same client during the same request.
export const getQueryClient = cache(makeQueryClient);

// Create the caller using the wrapper function
const caller = createCallerFactory(appRouter)(createContext);

export const { trpc: ssrTrpc, HydrateClient } = createHydrationHelpers<
  typeof appRouter
>(caller, getQueryClient);
