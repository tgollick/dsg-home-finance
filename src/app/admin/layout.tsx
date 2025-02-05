import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { ModeToggle } from "@/components/theme-toggle";
import { auth } from "@/auth";

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
    <SidebarProvider>
      <AppSidebar
        fullname={session?.user?.name}
        email={session?.user?.email}
        photo={session?.user?.image}
      />
      <main className="relative w-full h-full">
        <SidebarTrigger />
        <ModeToggle />
        {children}
      </main>
    </SidebarProvider>
  );
}
