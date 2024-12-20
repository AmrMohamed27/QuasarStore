"use client";
import { Models } from "node-appwrite";
import ThumbnailCircle from "./ThumbnailCircle";
import { formatDateTime } from "@/lib/utils";
import Link from "next/link";

const SearchFileCard = ({ file }: { file: Models.Document }) => {
  const { type, extension } = file;
  const isImage = type === "image" && extension !== "svg";
  const size: string = isImage ? "size-10" : "size-6";
  const pageType = type === "video" || type === "audio" ? "media" : `${type}s`;
  return (
    <Link
      href={`/${pageType}?query=${file.name}`}
      onMouseDown={(e) => e.stopPropagation()}
      className="p-2 flex flex-row w-full justify-between items-center hover:bg-brand-gray hover:dark:bg-brand-light-kohly rounded-xl cursor-pointer group"
    >
      {/* Thumbnail and Name */}
      <div className="flex flex-row gap-2 items-center">
        <ThumbnailCircle
          type={file.type}
          extension={file.extension}
          url={file.url}
          imageClassName={size}
        />
        <span className="font-semibold">{file.name}</span>
      </div>
      {/* Last update */}
      <span className="text-sm text-brand-blueish-gray group-hover:text-foreground hidden lg:block">
        {formatDateTime(file.$updatedAt)}
      </span>
    </Link>
  );
};

export default SearchFileCard;
