import { getFiles } from "@/actions/file.actions";
import FileTypePage from "@/components/common/FileTypePage";
import React from "react";

const OthersPage = async () => {
  const result = await getFiles({ types: ["other"], limit: 12 });
  const files = result?.documents;
  return <FileTypePage type="others" files={files} title="Others" />;
};

export default OthersPage;
