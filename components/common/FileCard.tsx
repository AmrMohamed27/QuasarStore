import { Models } from "node-appwrite";
import React from "react";
import ThumbnailCircle from "./ThumbnailCircle";
import OptionsMenu from "./OptionsMenu";
import { convertFileSize, formatDateTime } from "@/lib/utils";

const FileCard = ({ file }: { file: Models.Document }) => {
  return (
    <div className="bg-background dark:bg-brand-kohly/30 rounded-xl flex flex-col gap-4 p-4 min-w-[250px]">
      {/* Thumbnail and Options and Size */}
      <div className="flex flex-row justify-between">
        {/* thumbnail */}
        <ThumbnailCircle
          type={file.type}
          extension={file.extension}
          url={file.url}
        />
        {/* Options and Size */}
        <div className="flex flex-col h-full justify-between items-center">
          <OptionsMenu file={file} />
          <span>{convertFileSize(file.size, 1)}</span>
        </div>
      </div>
      {/* Name and Last update */}
      <div className="flex flex-col gap-2">
        <span className="font-semibold truncate">{file.name}</span>
        <span className="text-brand-gray">
          {formatDateTime(file.$updatedAt)}
        </span>
      </div>
    </div>
  );
};

export default FileCard;
