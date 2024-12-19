import ThumbnailCircle from "../common/ThumbnailCircle";
import { formatDateTime } from "@/lib/utils";
import OptionsMenu from "../common/OptionsMenu";
import { Models } from "node-appwrite";

const RecentFilesList = ({ files }: { files?: Models.Document[] }) => {
  return (
    <div className="flex flex-col gap-12 bg-background dark:bg-brand-dark-kohly p-4 rounded-2xl h-full flex-1">
      {/* Header */}
      <h2 className="font-bold text-xl">Recent files uploaded</h2>
      {/* Files list */}
      <div className="flex flex-col gap-10">
        {files &&
          files.map((file) => (
            <div
              className="flex flex-row justify-between items-center"
              key={file.$id}
            >
              {/* Name and Image */}
              <div className="flex flex-row gap-2 items-center">
                {/* Thumbnail */}
                <ThumbnailCircle
                  type={file.type}
                  url={file.url}
                  extension={file.extension}
                />
                <div className="flex flex-col">
                  <div className="flex flex-row">
                    <span className="font-semibold md:text-lg truncate max-xs:max-w-24 max-sm:max-w-32">
                      {file.name}
                    </span>
                  </div>
                  <span className="text-brand-blueish-gray text-sm">
                    {formatDateTime(file.$updatedAt)}
                  </span>
                </div>
              </div>
              {/* Three Dots */}
              <OptionsMenu file={file} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default RecentFilesList;
