"use client";

import { House, Inbox, LucideBookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logout from "../Logout";
import dsgGrey from "../../../public/dsg-logo-grey.png";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: House,
  },
  {
    title: "Applications",
    url: "/admin/applications",
    icon: Inbox,
  },
  {
    title: "Blogs",
    url: "/admin/blogs",
    icon: LucideBookOpen,
  },
];

type Props = {
  fullname: string;
  email: string;
  photo: string;
};

export function AppSidebar(props: Props) {
  const pathname = usePathname();

  const initials = props.fullname
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border/60 p-4">
        <div className="flex items-center gap-3">
          <Image src={dsgGrey} alt="DSG Home Finance logo" width={36} priority />
          <div className="flex flex-col">
            <span className="text-sm font-semibold leading-tight">DSG Home Finance</span>
            <span className="text-xs text-muted-foreground">Admin Panel</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive =
                  pathname === item.url || pathname?.startsWith(`${item.url}/`);

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="gap-3 border-t border-sidebar-border/60 p-3">
        <div className="flex items-center gap-3 rounded-lg px-1 py-1">
          <Avatar className="h-9 w-9 rounded-lg border">
            <AvatarImage
              src={props.photo}
              alt={props.fullname}
              className="object-cover"
            />
            <AvatarFallback className="rounded-lg bg-primary/10 text-xs font-medium text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium leading-none">{props.fullname}</p>
            <p className="mt-1 truncate text-xs text-muted-foreground">{props.email}</p>
          </div>
        </div>

        <Logout />

        <p className="px-1 text-[11px] leading-tight text-muted-foreground">
          © {new Date().getFullYear()} DSG Home Finance. All rights reserved.
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}
