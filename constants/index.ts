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
    icon: Edit,
    backgroundColor: "#3DD9B3",
  },
  {
    id: 2,
    title: "Details",
    icon: Info,
    backgroundColor: "#EEA8FD",
  },
  {
    id: 3,
    title: "Share",
    icon: Share2,
    backgroundColor: "#F9AB72",
  },
  {
    id: 4,
    title: "Download",
    icon: Download,
    backgroundColor: "#56B8FF",
  },
  {
    id: 5,
    title: "Delete",
    icon: Trash2,
    backgroundColor: "#FA7275",
  },
];

export const sortOptions = [
  { id: 1, title: "Date Created (newest)", value: "newest" },
  { id: 2, title: "Date Created (oldest)", value: "oldest" },
  { id: 3, title: "Name", value: "name" },
  { id: 4, title: "Size (largest)", value: "largest" },
  { id: 5, title: "Size (smallest)", value: "smallest" },
];

export const fileDetails = ["format", "size", "owner", "last edit"];
