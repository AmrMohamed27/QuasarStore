"use client";
import { convertFileSize, getTypeSize, sortFiles } from "@/lib/utils";
import { FileTypePageProps } from "@/types";
import { useState } from "react";
import Sorter from "./Sorter";
import FileCard from "./FileCard";
import { useSearchParams } from "next/navigation";
import PaginationComponent from "./Pagination";

const FileTypePage = ({
  type,
  title,
  files,
  currentPage,
  totalPages,
}: FileTypePageProps) => {
  const totalSize = getTypeSize({ type, files });
  const searchParams = useSearchParams();
  const [sortBy, setSortBy] = useState<string>(
    searchParams?.get("sort") ?? "newest"
  );
  const sortedFiles = sortFiles({ files, sortBy });
  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <h1 className="text-3xl md:text-5xl font-bold">
        <span className="capitalize">{title}</span>
      </h1>
      {/* total and sort */}
      <div className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-center max-lg:gap-4">
        {/* Total */}
        <span>
          Total:{" "}
          <span className="font-semibold">{convertFileSize(totalSize, 2)}</span>
        </span>
        {/* Sort */}
        <div className="flex flex-row gap-2 md:gap-4 items-center">
          <span className="max-xs:hidden">Sort by:</span>
          <Sorter setSortBy={setSortBy} />
        </div>
      </div>
      {/* Files list */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {sortedFiles &&
          sortedFiles.map((file) => <FileCard key={file.$id} file={file} />)}
      </div>
      {/* Pagination */}
      <PaginationComponent currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
};

export default FileTypePage;
