/* eslint-disable @typescript-eslint/no-explicit-any */
import { LucideIcon } from "lucide-react";
import { Models } from "node-appwrite";
import { Dispatch, SetStateAction } from "react";

export type FileType = "document" | "image" | "video" | "audio" | "other";

export type DialogProps = {
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
  email: string;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  accountId: string | null;
};

export type SidebarItem = {
  id: string;
  title: string;
  url: string;
  icon: React.ComponentType<{ size?: number; className?: string; style: any }>;
};

export type AppSidebarProps = {
  fullName: string;
  avatar: string;
  email: string;
};

export type MobileMenuProps = {
  handleUploadClick: () => void;
  handleSignOut: () => Promise<void>;
};

export type UploadFileProps = {
  file: File;
  ownerId: string;
  accountId: string;
  path: string;
};

export type GetFilesProps = {
  types: FileType[];
  searchTerm?: string;
  sort?: string;
  limit?: number;
  offset?: number;
};

export type GetUsedSpaceReturn = {
  image: { size: number; latestDate: string };
  document: { size: number; latestDate: string };
  video: { size: number; latestDate: string };
  audio: { size: number; latestDate: string };
  other: { size: number; latestDate: string };
  used: number;
  all: number;
};

export type optionsMenuType = {
  id: number;
  title: string;
  icon: LucideIcon;
  backgroundColor: string;
};

export type FileTypePageProps = {
  type: string;
  title: string;
  files?: Models.Document[];
  currentPage: number;
  totalPages: number;
};
