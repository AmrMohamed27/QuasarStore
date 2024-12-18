/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { signOut } from "@/actions/user.actions";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Search, Upload, X } from "lucide-react";
import { Button } from "../ui/button";
import DarkModeToggle from "./DarkModeToggle";
import { Input } from "../ui/input";
import MobileMenu from "./MobileMenu";
import { useRef, useState } from "react";
import { uploadFile } from "@/actions/file.actions";
import { MAX_FILE_SIZE } from "@/constants";
import { usePathname } from "next/navigation";
import { convertFileToUrl, getFileType } from "@/lib/utils";
import Thumbnail from "./Thumbnail";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Navbar = (currentUser: any) => {
  // User data
  const { accountId, $id: ownerId } = currentUser.currentUser;
  // Toast
  const { toast } = useToast();
  //   Current path
  const path = usePathname();
  // Ref for the file input
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  //   Files state
  const [files, setFiles] = useState<File[]>([]);
  //   Handle sign out function
  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed Out",
      description: "You have been signed out",
    });
  };

  // Handle file upload button click
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Programmatically trigger the file input
    }
  };
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files; // Access selected files
    if (!files || files.length === 0) return;
    // Convert FileList to an array
    const fileArray = Array.from(files);
    setFiles(fileArray);
    const uploadPromises = fileArray.map(async (file) => {
      if (file.size > MAX_FILE_SIZE) {
        setFiles((prevFiles) => prevFiles.filter((f) => f.name !== file.name));
        return toast({
          title: `${file.name} Upload Failed`,
          description: "File size is larger than 50 MB",
        });
      }
      return uploadFile({ file, ownerId, accountId, path }).then(
        (uploadedFile) => {
          if (uploadedFile) {
            setFiles((prevFiles) =>
              prevFiles.filter((f) => f.name !== file.name)
            );
          }
        }
      );
    });
    await Promise.all(uploadPromises);
    toast({
      title: "files uploaded successfully",
    });
  };

  const handleRemoveFile = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    fileName: string
  ) => {
    e.stopPropagation();
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };
  return (
    <header className="flex flex-row gap-4 sm:gap-8 md:gap-12 w-full px-8 py-4 items-center">
      {/* Search */}
      <div className="w-full relative">
        <Input placeholder="Search" className="px-10 rounded-full" />
        <Search
          className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
          size={18}
        />
      </div>
      {/* Desktop Buttons */}
      <div className="hidden lg:flex flex-row items-center gap-4">
        {/* Upload Button */}
        <Button
          className="flex flex-row gap-2 rounded-full bg-brand-red-1 text-white hover:bg-brand-red-1"
          onClick={handleUploadClick}
        >
          <Upload />
          <span>Upload</span>
        </Button>

        {/* Dark Mode Toggle */}
        <DarkModeToggle />
        {/* Sign Out Button */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <LogOut
                onClick={async () => await handleSignOut()}
                color={"#fa7275"}
                className="cursor-pointer"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Log out</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {/* Hidden Upload Input */}
      <Input
        type="file"
        id="upload"
        className="hidden"
        multiple
        ref={fileInputRef}
        onChange={handleUpload}
      />
      {/* Mobile Menu */}
      <MobileMenu
        handleUploadClick={handleUploadClick}
        handleSignOut={handleSignOut}
      />
      {files.length > 0 && (
        <ul className="absolute bottom-16 right-4 z-10">
          <h4 className="text-lg font-semibold">In Progress</h4>

          {files.map((file, index) => {
            const { type, extension } = getFileType(file.name);

            return (
              <li
                key={`${file.name}-${index}`}
                className="flex items-center gap-4 px-4 py-2 transition-colors duration-200 ease-in-out shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <Thumbnail
                    type={type}
                    extension={extension}
                    url={convertFileToUrl(file)}
                  />

                  <div className="flex flex-col gap-2">
                    {file.name}
                    <Image
                      src="/assets/icons/file-loader.gif"
                      width={80}
                      height={26}
                      alt="Loader"
                    />
                  </div>
                </div>

                <Button
                  onClick={(e) => handleRemoveFile(e, file.name)}
                  variant={"outline"}
                  size={"icon"}
                  className="border-none p-0  h-6 w-6"
                >
                  <X />
                </Button>
              </li>
            );
          })}
        </ul>
      )}
    </header>
  );
};

export default Navbar;
