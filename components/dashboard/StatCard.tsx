import Image from "next/image";
import ThumbnailCircle from "../common/ThumbnailCircle";
import { convertFileSize, formatDateTime } from "@/lib/utils";

const StatCard = ({
  fileTypes,
  fileTypeSizes,
  fileTypeLastUpdates,
}: {
  fileTypes: string[];
  fileTypeSizes: { [key: string]: number };
  fileTypeLastUpdates: { [key: string]: string };
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
      {fileTypes.map((type, index) => (
        <div key={index} className="relative basis-1/3 flex flex-col gap-0">
          <div className="w-full mt-2 relative">
            <ThumbnailCircle
              type={type === "video, audio" ? "video" : type}
              className="absolute -top-0 left-4 p-3"
              imageClassName="size-8"
            />
            <Image
              src={"/assets/images/card.svg"}
              alt="File Card"
              width={226}
              height={86}
              className="w-full dark:hidden"
            />
            <Image
              src={"/assets/images/card-dark.svg"}
              alt="File Card"
              width={226}
              height={86}
              className="w-full hidden dark:block"
            />
          </div>
          {/* Total Type Size */}
          <div className="absolute top-8 right-4">
            <span className="font-semibold text-lg">
              {convertFileSize(fileTypeSizes[type], 2)}
            </span>
          </div>
          <div className="bg-background dark:bg-brand-dark-kohly rounded-b-2xl flex flex-col items-center justify-center gap-8 pb-8">
            <span className="capitalize font-bold text-lg">{type}</span>
            <div className="w-[75%] h-[0.5px] bg-brand-blueish-gray/20 rounded-xl"></div>
            <div className="flex flex-col gap-2 items-center justify-center w-full">
              <span className="text-brand-blueish-gray">Last update</span>
              <span className="">
                {formatDateTime(fileTypeLastUpdates[type])}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatCard;
