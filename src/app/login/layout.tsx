import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <SessionProvider>
        <main className="relative w-full h-full">{children}</main>
      </SessionProvider>
    </ThemeProvider>
  );
}
