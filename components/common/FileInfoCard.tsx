import React from "react";
import ThumbnailCircle from "./ThumbnailCircle";
import { Models } from "node-appwrite";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { convertFileSize, formatDateTime } from "@/lib/utils";

const FileinfoCard = ({ file }: { file: Models.Document }) => {
  return (
    <div className="flex p-4 flex-row gap-4 w-full rounded-xl border-[1px] border-brand-gray/40 items-center">
      {/* Thumbnail */}
      <ThumbnailCircle
        type={file.type}
        url={file.url}
        extension={file.extension}
      />
      {/* Text Block */}
      <div className="flex flex-col items-start">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <p className="font-semibold text-lg truncate max-w-[200px]">
                {file.name}
              </p>
            </TooltipTrigger>
            <TooltipContent>{file.name}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <span className="text-brand-blueish-gray text-sm">
          {convertFileSize(file.size, 2)}
          {" - "}
          {formatDateTime(file.$updatedAt)}
        </span>
      </div>
    </div>
  );
};

export default FileinfoCard;
