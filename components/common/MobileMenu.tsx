"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { MobileMenuProps } from "@/types";
import DarkModeToggle from "./DarkModeToggle";

const MobileMenu = ({ handleSignOut, handleUploadClick }: MobileMenuProps) => {
  return (
    <div className="flex lg:hidden flex-row gap-2 sm:gap-4 items-center">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant={"outline"} size={"icon"} className="rounded-full">
            <Menu />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={handleUploadClick}
            className="cursor-pointer"
          >
            Upload
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={async () => await handleSignOut()}
            className="cursor-pointer"
          >
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DarkModeToggle />
    </div>
  );
};

export default MobileMenu;
