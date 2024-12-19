import { getFiles, getUsedSpace } from "@/actions/file.actions";
import RecentFilesList from "@/components/dashboard/RecentFilesList";
import StatCard from "@/components/dashboard/StatCard";
import { StorageChart } from "@/components/dashboard/StorageChart";
import {
  convertFileSize,
  getFileTypeLastUpdates,
  getFileTypeSizes,
} from "@/lib/utils";
import React from "react";

const Dashboard = async () => {
  const result = await getFiles({ types: [] });
  const files = result?.documents;
  console.log(files?.length);
  const totalSpace = await getUsedSpace();
  const fileTypes = ["document", "image", "video, audio", "others"];
  const fileTypeSizes: { [key: string]: number } = getFileTypeSizes(files);
  const fileTypeLastUpdates: { [key: string]: string } =
    getFileTypeLastUpdates(files);
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
        <StatCard
          fileTypeSizes={fileTypeSizes}
          fileTypes={fileTypes}
          fileTypeLastUpdates={fileTypeLastUpdates}
        />
      </div>
      {/* Recent Uploads */}
      <RecentFilesList files={files?.slice(0, 8)} />
    </div>
  );
};

export default Dashboard;
