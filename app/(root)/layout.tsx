import { getCurrentUser } from "@/actions/user.actions";
import { redirect } from "next/navigation";

export default async function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return redirect("/signin");
  return (
    <div className="flex lg:flex-row min-h-screen">
      <div className="hidden lg:flex bg-brand-red-1 text-white min-h-screen py-8 px-4 flex-col gap-16 min-w-[40%]"></div>
      {children}
    </div>
  );
}
