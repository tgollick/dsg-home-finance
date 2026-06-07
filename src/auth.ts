import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const getRequestOrigin = (req?: Request) => {
  if (!req) return undefined;

  const forwardedProto = req.headers.get("x-forwarded-proto") ?? "https";
  const forwardedHost = req.headers.get("x-forwarded-host");
  const host = forwardedHost ?? req.headers.get("host");

  return host ? `${forwardedProto}://${host}` : new URL(req.url).origin;
};

const isKnownAppHost = (origin: string) => {
  try {
    const hostname = new URL(origin).hostname;

    return (
      hostname === "localhost" ||
      hostname.endsWith(".localhost") ||
      hostname.endsWith(".vercel.app") ||
      hostname.endsWith("dsgmortgages.com") ||
      hostname.endsWith("dsgmortgage.com")
    );
  } catch {
    return false;
  }
};

export const { handlers, signIn, signOut, auth } = NextAuth((req) => {
  const requestOrigin = getRequestOrigin(req);

  return {
    providers: [Google],
    trustHost: true,
    callbacks: {
      redirect({ url, baseUrl }) {
        const origin = requestOrigin ?? baseUrl;

        if (url.startsWith("/")) {
          return `${origin}${url}`;
        }

        try {
          const redirectUrl = new URL(url);

          if (redirectUrl.origin === baseUrl || isKnownAppHost(redirectUrl.origin)) {
            return `${origin}${redirectUrl.pathname}${redirectUrl.search}${redirectUrl.hash}`;
          }
        } catch {
          return origin;
        }

        return baseUrl;
      },
    },
  };
});
