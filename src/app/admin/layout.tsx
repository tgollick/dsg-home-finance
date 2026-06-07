import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { auth } from "@/auth";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { buildMetadata } from "@/lib/metadata";
import { Metadata } from "next";
import { AdminTopbar } from "./_components/admin-topbar";

export const metadata:Metadata = buildMetadata({
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
      <SidebarProvider>
        <AppSidebar
          fullname={session?.user?.name}
          email={session?.user?.email}
          photo={session?.user?.image}
        />
        <div className="flex min-h-screen w-full flex-col bg-muted/30">
          <AdminTopbar />
          <SessionProvider>
            <main className="flex-1">{children}</main>
          </SessionProvider>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}
