import { optionsMenuType, SidebarItem } from "@/types";
import {
  LayoutDashboard,
  FileText,
  Image,
  Video,
  Folder,
  Edit,
  Info,
  Download,
  Trash2,
  Share2,
} from "lucide-react";

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB

export const MAX_BUCKET_SIZE = 2 * 1024 * 1024 * 1024; // 2 GB

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

export const options: optionsMenuType[] = [
  {
    id: 1,
    title: "Rename",
    url: "/rename",
    icon: Edit,
    backgroundColor: "#3DD9B3",
  },
  {
    id: 2,
    title: "Details",
    url: "/details",
    icon: Info,
    backgroundColor: "#EEA8FD",
  },
  {
    id: 3,
    title: "Share",
    url: "/share",
    icon: Share2,
    backgroundColor: "#F9AB72",
  },
  {
    id: 4,
    title: "Download",
    url: "/download",
    icon: Download,
    backgroundColor: "#56B8FF",
  },
  {
    id: 5,
    title: "Move to trash",
    url: "/remove",
    icon: Trash2,
    backgroundColor: "#FA7275",
  },
];
