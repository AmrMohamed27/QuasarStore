/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { sidebarItems } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppSidebar({ currentUser }: { currentUser: any }) {
  const { fullName, avatar, email } = currentUser;
  const pathname = usePathname();
  return (
    <Sidebar variant="sidebar">
      <SidebarHeader>
        <div className="flex flex-row gap-4 items-center justify-center py-4">
          <Image
            src="/assets/images/logo-red.png"
            alt="QuasarStore Logo"
            width={80}
            height={80}
          />
          <span className="font-medium text-3xl select-none text-brand-red-1">
            QuasarStore
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {sidebarItems.map((item) => (
              <SidebarMenuItem key={item.id} className="">
                <Link href={item.url}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.includes(item.url)}
                    className={`rounded-full p-8 mb-2 flex flex-row gap-8 data-[active=true]:bg-brand-red-1 data-[active=true]:text-white group`}
                  >
                    <div>
                      <item.icon
                        style={{ width: "1.5rem", height: "1.5rem" }}
                        className="group-data-[active=true]:text-white text-brand-gray w-6 h-6"
                      />
                      <span className="font-semibold text-xl">
                        {item.title}
                      </span>
                    </div>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <div className="w-full flex flex-col items-center justify-center relative mt-32">
            <Image
              src="/assets/images/Illustration.svg"
              alt="Illustration"
              width={200}
              height={200}
            />
            <Image
              src={"/assets/images/illustration-bg.png"}
              alt="illustration background"
              width={270}
              height={270}
              className="absolute bottom-[-50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
            />
          </div>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              size={"lg"}
              className="px-4 py-8 rounded-2xl"
            >
              <Link href="/profile">
                <Image
                  src={avatar}
                  alt="Avatar"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="flex flex-col gap-1 items-start justify-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        {" "}
                        <span className="font-semibold text-lg truncate">
                          {fullName}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>{fullName}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <span className="text-xs text-brand-gray">{email}</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
