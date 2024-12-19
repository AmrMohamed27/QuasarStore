"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { options } from "@/constants";
import { EllipsisVertical } from "lucide-react";
import { Models } from "node-appwrite";
import { useEffect, useState } from "react";
import { OptionDialog } from "./OptionDialog";
import RenameForm from "../forms/RenameForm";
import DetailsForm from "../forms/DetailsForm";
import ShareForm from "../forms/ShareForm";
import DownloadForm from "../forms/DownloadForm";
import DeleteForm from "../forms/DeleteForm";

const OptionsMenu = ({ file }: { file: Models.Document }) => {
  const [currentOption, setCurrentOption] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  useEffect(() => {
    if (currentOption !== null) {
      setIsDialogOpen(true);
    }
  }, [currentOption]);
  return (
    <>
      <OptionDialog
        isOpen={isDialogOpen && !isDropdownOpen}
        setIsOpen={(open) => {
          setIsDialogOpen(open);
          setTimeout(() => {
            if (!open) {
              document.body.style.pointerEvents = "";
            }
          }, 100);
        }}
        title={
          currentOption !== null ? options[currentOption!].title : file.name
        }
      >
        {currentOption === 0 ? (
          <RenameForm file={file} setIsOpen={setIsDialogOpen} />
        ) : currentOption === 1 ? (
          <DetailsForm file={file} />
        ) : currentOption === 2 ? (
          <ShareForm file={file} setIsOpen={setIsDialogOpen} />
        ) : currentOption === 3 ? (
          <DownloadForm file={file} setIsOpen={setIsDialogOpen} />
        ) : (
          <DeleteForm file={file} setIsOpen={setIsDialogOpen} />
        )}
      </OptionDialog>
      <DropdownMenu onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger>
          <EllipsisVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-4 w-fit">
          <DropdownMenuLabel className="font-bold text-xl p-2 break-words max-w-[250px] whitespace-normal">
            {file.name}
          </DropdownMenuLabel>
          {options.map((option, index) => (
            <div key={option.id}>
              <DropdownMenuItem
                className="flex flex-row items-center gap-2 focus:bg-inherit cursor-pointer"
                onClick={() => {
                  setCurrentOption(index);
                  setIsDialogOpen(true);
                  console.log(index);
                }}
              >
                {/* Icon */}
                <div
                  className={`rounded-full p-2 ${
                    index === 0
                      ? "bg-accent-green"
                      : index === 1
                      ? "bg-accent-pink"
                      : index === 2
                      ? "bg-accent-orange"
                      : index === 3
                      ? "bg-accent-light-blue"
                      : "bg-brand-red-1"
                  } bg-opacity-20`}
                >
                  <option.icon
                    className="w-4 h-4"
                    color={option.backgroundColor}
                  />
                </div>
                <span>{option.title}</span>
              </DropdownMenuItem>
              {index !== options.length - 1 && <DropdownMenuSeparator />}
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default OptionsMenu;
