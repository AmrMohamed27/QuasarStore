import { getFiles } from "@/actions/file.actions";
import FileTypePage from "@/components/common/FileTypePage";
import React from "react";

const MediaPage = async () => {
  const result = await getFiles({ types: ["video", "audio"], limit: 12 });
  const files = result?.documents;
  return <FileTypePage type="video, audio" files={files} title="Media" />;
};

export default MediaPage;
