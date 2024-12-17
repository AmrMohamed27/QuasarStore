import { SidebarItem } from "@/types";
import { LayoutDashboard, FileText, Image, Video, Folder } from "lucide-react";

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB

export const sidebarItems: SidebarItem[] = [
  {
    id: "1",
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "2",
    title: "Documents",
    url: "/documents",
    icon: FileText,
  },
  {
    id: "3",
    title: "Images",
    url: "/images",
    icon: Image,
  },
  {
    id: "4",
    title: "Media",
    url: "/media",
    icon: Video,
  },
  {
    id: "5",
    title: "Others",
    url: "/others",
    icon: Folder,
  },
];
