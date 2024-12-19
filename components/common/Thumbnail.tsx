import React from "react";
import Image from "next/image";
import { cn, getFileIcon } from "@/lib/utils";

interface Props {
  type: string;
  extension?: string;
  url?: string;
  imageClassName?: string;
  className?: string;
}

export const Thumbnail = ({
  type,
  extension,
  url,
  imageClassName,
  className,
}: Props) => {
  const isImage = type === "image" && extension !== "svg";
  const size: string = isImage ? "size-16" : "size-12";

  return (
    <figure className={cn("rounded-full", className)}>
      <Image
        unoptimized
        src={isImage && url ? url : getFileIcon(extension, type)}
        alt="thumbnail"
        width={100}
        height={100}
        className={cn(
          "rounded-full object-cover",
          size,
          imageClassName,
          isImage && "thumbnail-image"
        )}
      />
    </figure>
  );
};
export default Thumbnail;
