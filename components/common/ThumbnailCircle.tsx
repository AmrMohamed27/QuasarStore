import { cn } from "@/lib/utils";
import Thumbnail from "./Thumbnail";

const ThumbnailCircle = ({
  type,
  className,
  imageClassName,
}: {
  type: string;
  className?: string;
  imageClassName?: string;
}) => {
  return (
    <div
      className={cn(
        `rounded-full p-2 ${
          type === "document"
            ? "bg-brand-red-1"
            : type === "image"
            ? "bg-accent-light-blue"
            : type === "video" || type === "audio"
            ? "bg-accent-green"
            : "bg-accent-pink"
        }`,
        className
      )}
    >
      <Thumbnail type={type} className="z-10" imageClassName={imageClassName} />
    </div>
  );
};

export default ThumbnailCircle;
