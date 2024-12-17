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
import { sidebarItems } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppSidebar(currentUser: any) {
  const { fullName, avatar, email } = currentUser.currentUser;
  const pathname = usePathname();
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex flex-row gap-4 items-center justify-center py-8">
          <Image
            src="/assets/images/logo-red.png"
            alt="QuasarStore Logo"
            width={80}
            height={80}
          />
          <span className="font-medium text-2xl select-none text-brand-red-1">
            QuasarStore
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {sidebarItems.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.includes(item.url)}
                  className={`rounded-full p-8 flex flex-row gap-8 data-[active=true]:bg-brand-red-1 data-[active=true]:text-white group`}
                >
                  <div>
                    <item.icon
                      style={{ width: "1.5rem", height: "1.5rem" }}
                      className="group-data-[active=true]:text-white text-brand-gray w-6 h-6"
                    />
                    <Link href={item.url}>
                      <span className="font-semibold text-xl">
                        {item.title}
                      </span>
                    </Link>
                  </div>
                </SidebarMenuButton>
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
            <SidebarMenuButton asChild size={"lg"}>
              <div>
                <Image
                  src={avatar}
                  alt="Avatar"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span className="font-semibold text-lg">{fullName}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
