import { getFiles, getUsedSpace } from "@/actions/file.actions";
import OptionsMenu from "@/components/common/OptionsMenu";
import ThumbnailCircle from "@/components/common/ThumbnailCircle";
import { StorageChart } from "@/components/dashboard/StorageChart";
import {
  convertFileSize,
  formatDateTime,
  getFileTypeLastUpdates,
  getFileTypeSizes,
} from "@/lib/utils";
import Image from "next/image";
import React from "react";

const Dashboard = async () => {
  const result = await getFiles({ types: [], limit: 8 });
  const files = result?.documents;
  const totalSpace = await getUsedSpace();
  const fileTypes = ["document", "image", "video, audio", "others"];
  const fileTypeSizes: { [key: string]: number } = getFileTypeSizes(files);
  const fileTypeLastUpdates: { [key: string]: string } =
    getFileTypeLastUpdates(files);
  console.log(fileTypeLastUpdates);
  return (
    <div className="flex flex-col xl:flex-row gap-8 h-full">
      {/* Stats */}
      <div className="flex flex-col gap-16 flex-1">
        {/* Available Storage */}
        <div className="flex flex-col sm:flex-row items-center justify-center p-8 bg-brand-red-1 text-white rounded-2xl">
          {/* Chart */}
          <div className="">
            <StorageChart usage={totalSpace.used} total={totalSpace.all} />
          </div>
          {/* storage used */}
          <div className="flex flex-col gap-4 items-start sm:mr-4">
            <span className="text-xl font-semibold">Available Storage</span>
            <span>
              {convertFileSize(totalSpace.used, 2)} /{" "}
              {convertFileSize(totalSpace.all, 2)}
            </span>
          </div>
        </div>
        {/* Files Stats */}
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
                  src={`/assets/images/card.svg`}
                  alt="File Card"
                  width={226}
                  height={86}
                  className="w-full"
                />
              </div>
              {/* Total Type Size */}
              <div className="absolute top-8 right-4">
                <span className="font-semibold text-lg">
                  {convertFileSize(fileTypeSizes[type], 2)}
                </span>
              </div>
              <div className="bg-background flex flex-col items-center justify-center gap-8 pb-8">
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
      </div>
      {/* Recent Uploads */}
      <div className="flex flex-col gap-12 bg-background p-4 rounded-2xl h-full flex-1">
        {/* Header */}
        <h2 className="font-bold text-xl">Recent files uploaded</h2>
        {/* Files list */}
        <div className="flex flex-col gap-10">
          {files &&
            files.map((file) => (
              <div
                className="flex flex-row justify-between items-center"
                key={file.$id}
              >
                {/* Name and Image */}
                <div className="flex flex-row gap-2 items-center">
                  {/* Thumbnail */}
                  <ThumbnailCircle type={file.type} />
                  <div className="flex flex-col">
                    <div className="flex flex-row">
                      <span className="font-semibold md:text-lg truncate max-xs:max-w-24 max-sm:max-w-32">
                        {file.name.split(".")[0]}
                      </span>
                      <span className="font-semibold md:text-lg max-w-12">
                        .{file.name.split(".")[1]}
                      </span>
                    </div>
                    <span className="text-brand-blueish-gray text-sm">
                      {formatDateTime(file.$updatedAt)}
                    </span>
                  </div>
                </div>
                {/* Three Dots */}
                <OptionsMenu file={file} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
