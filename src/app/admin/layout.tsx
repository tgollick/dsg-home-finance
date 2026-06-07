import { auth } from "@/auth";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { buildMetadata } from "@/lib/metadata";
import { Metadata } from "next";
import { AdminNav } from "./_components/admin-nav";

export const metadata: Metadata = buildMetadata({
  title: "Admin Dashboard | DSG Home Finance",
  noIndex: true,
});

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user?.name || !session?.user.email || !session.user.image) {
    return <></>;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <SessionProvider>
        <div className="min-h-screen bg-muted/30">
          <AdminNav
            fullname={session.user.name}
            email={session.user.email}
            photo={session.user.image}
          />
          {/* pb leaves room for the mobile bottom tab bar */}
          <main className="pb-24 md:pb-0">{children}</main>
        </div>
      </SessionProvider>
    </ThemeProvider>
  );
}
