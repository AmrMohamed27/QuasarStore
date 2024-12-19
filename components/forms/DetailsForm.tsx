import { Models } from "node-appwrite";
import { convertFileSize, formatDateTime } from "@/lib/utils";
import { fileDetails } from "@/constants";

import FileinfoCard from "../common/FileInfoCard";

const DetailsForm = ({ file }: { file: Models.Document }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {/* File Name, Thumbnail, and Size */}
      <FileinfoCard file={file} />
      {/* File Details */}
      <div className="flex flex-col gap-8">
        {fileDetails.map((item, index) => (
          <div key={index} className="grid grid-cols-2">
            <span className="text-brand-blueish-gray capitalize">{item}:</span>
            <span>
              {index === 0
                ? file.type
                : index === 1
                ? convertFileSize(file.size, 2)
                : index === 2
                ? file.owner.fullName
                : formatDateTime(file.$updatedAt)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailsForm;
