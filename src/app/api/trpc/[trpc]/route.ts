import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@/backend/routers/index";
import { createContext } from "@/backend/trpc/init";
function handler(req: Request) {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: createContext,
    onError: (opts) => {
      console.error("Error happened at --->" + opts.path);
    },
  });
}
export { handler as GET, handler as POST };
