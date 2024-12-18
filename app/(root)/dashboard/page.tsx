import { getFiles, getUsedSpace } from "@/actions/file.actions";
import OptionsMenu from "@/components/common/OptionsMenu";
import Thumbnail from "@/components/common/Thumbnail";
import { StorageChart } from "@/components/dashboard/StorageChart";
import { convertFileSize, formatDateTime } from "@/lib/utils";
import React from "react";

const Dashboard = async () => {
  const result = await getFiles({ types: [], limit: 8 });
  const files = result?.documents;
  const totalSpace = await getUsedSpace();
  return (
    <div className="flex flex-col xl:flex-row gap-8 h-full">
      {/* Stats */}
      <div className="flex flex-col gap-16 min-w-[40%]">
        {/* Available Storage */}
        <div className="flex flex-row items-center p-8 bg-brand-red-1 text-white rounded-2xl gap-4">
          {/* Chart */}
          <div className="flex-1">
            <StorageChart usage={totalSpace.used} total={totalSpace.all} />
          </div>
          {/* storage used */}
          <div className="flex flex-col gap-4 items-start">
            <span className="text-xl font-semibold">Available Storage</span>
            <span>
              {convertFileSize(totalSpace.used, 2)} /{" "}
              {convertFileSize(totalSpace.all, 2)}
            </span>
          </div>
        </div>
        {/* Files Stats */}
        <div></div>
      </div>
      {/* Recent Uploads */}
      <div className="flex flex-col gap-12 bg-background p-4 rounded-2xl h-full flex-1">
        {/* Header */}
        <h2 className="font-bold text-xl">Recent files uploaded</h2>
        {/* Files list */}
        <div className="flex flex-col gap-8">
          {/* TODO: Add files list */}
          {files &&
            files.map((file) => (
              <div
                className="flex flex-row justify-between items-center"
                key={file.$id}
              >
                {/* Name and Image */}
                <div className="flex flex-row gap-2 items-center">
                  {/* Thumbnail */}
                  <div
                    className={`rounded-full p-2 ${
                      file.type === "document"
                        ? "bg-brand-red-1"
                        : file.type === "image"
                        ? "bg-accent-light-blue"
                        : file.type === "video" || file.type === "audio"
                        ? "bg-accent-green"
                        : "bg-accent-pink"
                    }`}
                  >
                    <Thumbnail type={file.type} className="z-10" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-lg">{file.name}</span>
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
