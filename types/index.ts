/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction } from "react";

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
