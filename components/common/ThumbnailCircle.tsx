import { cn } from "@/lib/utils";
import Thumbnail from "./Thumbnail";

const ThumbnailCircle = ({
  type,
  extension,
  url,
  className,
  imageClassName,
}: {
  type: string;
  className?: string;
  imageClassName?: string;
  extension?: string;
  url?: string;
}) => {
  const isImage = type === "image" && extension !== "svg";
  const padding: string = isImage ? "p-0" : "p-2";
  return (
    <div
      className={cn(
        `rounded-full  ${
          type === "document"
            ? "bg-brand-red-1"
            : type === "image"
            ? "bg-accent-light-blue"
            : type === "video" || type === "audio"
            ? "bg-accent-green"
            : "bg-accent-pink"
        }`,
        padding,
        className
      )}
    >
      <Thumbnail
        type={type}
        extension={extension}
        url={url}
        className="z-10"
        imageClassName={imageClassName}
      />
    </div>
  );
};

export default ThumbnailCircle;
