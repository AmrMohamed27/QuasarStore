import { getFiles } from "@/actions/file.actions";
import FileTypePage from "@/components/common/FileTypePage";
import React from "react";

const Documents = async () => {
  const result = await getFiles({ types: ["document"], limit: 12 });
  const files = result?.documents;
  return <FileTypePage type="document" files={files} title="Documents" />;
};

export default Documents;
