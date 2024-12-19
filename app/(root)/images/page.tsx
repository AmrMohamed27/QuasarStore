import { getFiles } from "@/actions/file.actions";
import FileTypePage from "@/components/common/FileTypePage";
import React from "react";

const ImagesPage = async ({
  searchParams,
}: {
  searchParams: { page?: string; sort?: string };
}) => {
  const { page: paramsPage, sort: sortBy } = await searchParams;
  const page = parseInt(paramsPage || "1", 10);
  const limit = 12;
  const offset = (page - 1) * limit; // Calculate the offset for pagination
  const sort =
    sortBy !== undefined
      ? sortBy === "newest"
        ? "$createdAt-desc"
        : sortBy === "oldest"
        ? "$createdAt-asc"
        : sortBy === "name"
        ? "name-asc"
        : sortBy === "largest"
        ? "size-desc"
        : sortBy === "smallest"
        ? "size-asc"
        : undefined
      : undefined;

  const result = await getFiles({ types: ["image"], limit, offset, sort });
  const files = result?.documents;
  const totalPages =
    result?.total !== undefined ? Math.ceil(result.total / limit) : 1;
  return (
    <FileTypePage
      type="image"
      files={files}
      title="Images"
      currentPage={page}
      totalPages={totalPages}
    />
  );
};

export default ImagesPage;
