import { House, Inbox, LucideBookOpen } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Logout from "../Logout";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Image from "next/image";
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
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-bold">
            DSG Admin Panel
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex flex-col items-start justify-center h-fit w-full gap-4  p-3">
          <Image src={dsgGrey} alt={"DSG Grey Logo"} width="50" priority />
          <p className="text-xs text-muted-foreground text-left">
            © 2023 DSG Home Finance. All rights reserved.
          </p>
        </div>

        <div className="p-3 space-y-3 border-t">
          <div className="flex items-center gap-3 group data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
            <Avatar className="h-9 w-9 rounded-lg border">
              <AvatarImage
                src={props.photo}
                alt={props.fullname}
                className="object-cover rounded-lg"
              />
              <AvatarFallback className="rounded-lg bg-primary/10 text-primary flex items-center justify-center h-full">
                {props.fullname
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium leading-none truncate">
                {props.fullname}
              </p>
              <p className="text-xs text-muted-foreground mt-1 truncate">
                {props.email}
              </p>
            </div>
          </div>

          <Logout />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
