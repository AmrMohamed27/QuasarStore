import { Models } from "node-appwrite";
import { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { constructDownloadUrl } from "../../lib/utils";

const DownloadForm = ({
  file,
  setIsOpen,
}: {
  file: Models.Document;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex flex-col gap-8 items-center text-center">
      {/* Header */}
      <h2 className="text-xl font-bold">
        Are you sure you want to download {file.name}?
      </h2>
      {/* Buttons */}
      <div className="flex flex-col gap-2 *:w-full w-full">
        {/* Download Button */}
        <Link
          href={constructDownloadUrl(file.bucketField)}
          download={file.name}
          className="w-full"
          target="_blank"
        >
          <Button
            className="rounded-full p-6 bg-brand-red-1 hover:bg-brand-red-1 text-white w-full"
            onClick={() => setIsOpen(false)}
          >
            Download
          </Button>
        </Link>
        {/* Cancel Button */}
        <Button className="rounded-full p-6" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default DownloadForm;
