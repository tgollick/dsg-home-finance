import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  trustHost: true,
  callbacks: {
    redirect({ url, baseUrl }) {
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }

      try {
        const redirectUrl = new URL(url);
        const isAllowedHost =
          redirectUrl.origin === baseUrl ||
          redirectUrl.hostname === "localhost" ||
          redirectUrl.hostname.endsWith(".vercel.app") ||
          redirectUrl.hostname.endsWith("dsgmortgages.com") ||
          redirectUrl.hostname.endsWith("dsgmortgage.com");

        if (isAllowedHost) {
          return `${baseUrl}${redirectUrl.pathname}${redirectUrl.search}${redirectUrl.hash}`;
        }
      } catch {
        return baseUrl;
      }

      return baseUrl;
    },
  },
});
