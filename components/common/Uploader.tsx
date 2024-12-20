"use client";
import { Upload } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { RefObject } from "react";

const Uploader = ({
  handleUploadClick,
  fileInputRef,
  handleUpload,
}: {
  handleUploadClick: () => void;
  fileInputRef: RefObject<HTMLInputElement | null>;
  handleUpload: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}) => {
  return (
    <>
      {/* Upload Button */}
      <Button
        className="flex flex-row gap-2 rounded-full bg-brand-red-1 text-white hover:bg-brand-red-1"
        onClick={handleUploadClick}
      >
        <Upload />
        <span>Upload</span>
      </Button>
      {/* Hidden Upload Input */}
      <Input
        type="file"
        id="upload"
        className="hidden"
        multiple
        ref={fileInputRef}
        onChange={handleUpload}
      />
    </>
  );
};

export default Uploader;
