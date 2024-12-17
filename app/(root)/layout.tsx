import { getCurrentUser } from "@/actions/user.actions";
import { redirect } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/common/AppSidebar";
import { cookies } from "next/headers";
import Navbar from "@/components/common/Navbar";

export default async function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return redirect("/signin");

  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar currentUser={currentUser} />
      <div className="flex lg:flex-row min-h-screen w-full">
        <SidebarTrigger />
        <div className="flex flex-col w-full">
          <Navbar currentUser={currentUser} />
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
}
