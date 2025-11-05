import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { ModeToggle } from "@/components/theme-toggle";
import { auth } from "@/auth";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { buildMetadata } from "@/lib/metadata";
import { Metadata } from "next";

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
        <main className="relative w-full h-full">
          <SidebarTrigger />
          <ModeToggle />
          <SessionProvider>
            <div className="min-h-screen">{children}</div>
          </SessionProvider>
        </main>
      </SidebarProvider>
    </ThemeProvider>
  );
}
