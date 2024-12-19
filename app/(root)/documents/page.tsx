import { getFiles } from "@/actions/file.actions";
import FileTypePage from "@/components/common/FileTypePage";
import { parseParams } from "@/lib/utils";
import React from "react";

const Documents = async ({
  searchParams,
}: {
  searchParams: { page?: string; sort?: string };
}) => {
  const { page: paramsPage, sort: sortBy } = await searchParams;
  const { page, limit, sort, offset } = parseParams({ paramsPage, sortBy });

  const result = await getFiles({ types: ["document"], limit, offset, sort });
  const files = result?.documents;
  const totalPages =
    result?.total !== undefined ? Math.ceil(result.total / limit) : 1;
  return (
    <FileTypePage
      type="document"
      files={files}
      title="Documents"
      currentPage={page}
      totalPages={totalPages}
    />
  );
};

export default Documents;
