import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { appwriteConfig } from "./appwrite/config";
import { Models } from "node-appwrite";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseStringify(value: unknown) {
  return JSON.parse(JSON.stringify(value));
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const convertFileSize = (sizeInBytes: number, digits?: number) => {
  if (sizeInBytes < 1024) {
    return sizeInBytes + " B"; // Less than 1 KB, show in Bytes
  } else if (sizeInBytes < 1024 * 1024) {
    const sizeInKB = sizeInBytes / 1024;
    return sizeInKB.toFixed(digits || 1) + " KB"; // Less than 1 MB, show in KB
  } else if (sizeInBytes < 1024 * 1024 * 1024) {
    const sizeInMB = sizeInBytes / (1024 * 1024);
    return sizeInMB.toFixed(digits || 1) + " MB"; // Less than 1 GB, show in MB
  } else {
    const sizeInGB = sizeInBytes / (1024 * 1024 * 1024);
    return sizeInGB.toFixed(digits || 1) + " GB"; // 1 GB or more, show in GB
  }
};

export const calculatePercentage = (sizeInBytes: number) => {
  const totalSizeInBytes = 2 * 1024 * 1024 * 1024; // 2GB in bytes
  const percentage = (sizeInBytes / totalSizeInBytes) * 100;
  return Number(percentage.toFixed(2));
};

export const getFileType = (fileName: string) => {
  const extension = fileName.split(".").pop()?.toLowerCase();

  if (!extension) return { type: "other", extension: "" };

  const documentExtensions = [
    "pdf",
    "doc",
    "docx",
    "txt",
    "xls",
    "xlsx",
    "csv",
    "rtf",
    "ods",
    "ppt",
    "odp",
    "md",
    "html",
    "htm",
    "epub",
    "pages",
    "fig",
    "psd",
    "ai",
    "indd",
    "xd",
    "sketch",
    "afdesign",
    "afphoto",
    "afphoto",
  ];
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp"];
  const videoExtensions = [
    "mp4",
    "avi",
    "mov",
    "mkv",
    "webm",
    "3gp",
    "wmv",
    "flv",
    "m4v",
  ];
  const audioExtensions = [
    "mp3",
    "wav",
    "ogg",
    "flac",
    "acc",
    "mpeg",
    "wma",
    "m4a",
    "aiff",
    "alac",
  ];

  if (documentExtensions.includes(extension))
    return { type: "document", extension };
  if (imageExtensions.includes(extension)) return { type: "image", extension };
  if (videoExtensions.includes(extension)) return { type: "video", extension };
  if (audioExtensions.includes(extension)) return { type: "audio", extension };

  return { type: "other", extension };
};

export const formatDateTime = (isoString: string | null | undefined) => {
  if (!isoString) return "—";

  const date = new Date(isoString);

  // Get hours and adjust for 12-hour format
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? "pm" : "am";

  // Convert hours to 12-hour format
  hours = hours % 12 || 12;

  // Format the time and date parts
  const time = `${hours}:${minutes.toString().padStart(2, "0")}${period}`;
  const day = date.getDate();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];

  return `${time}, ${day} ${month}`;
};

export const getFileIcon = (
  extension: string | undefined,
  type: File | string
) => {
  switch (extension) {
    // Document
    case "pdf":
      return "/assets/icons/file-pdf.svg";
    case "doc":
      return "/assets/icons/file-doc.svg";
    case "docx":
      return "/assets/icons/file-docx.svg";
    case "csv":
      return "/assets/icons/file-csv.svg";
    case "txt":
      return "/assets/icons/file-txt.svg";
    case "xls":
    case "xlsx":
      return "/assets/icons/file-document.svg";
    // Image
    case "svg":
      return "/assets/icons/file-image.svg";
    // Video
    case "mkv":
    case "mov":
    case "avi":
    case "wmv":
    case "mp4":
    case "flv":
    case "webm":
    case "m4v":
    case "3gp":
      return "/assets/icons/file-video.svg";
    // Audio
    case "mp3":
    case "mpeg":
    case "wav":
    case "aac":
    case "flac":
    case "ogg":
    case "wma":
    case "m4a":
    case "aiff":
    case "alac":
      return "/assets/icons/file-audio.svg";

    default:
      switch (type) {
        case "image":
          return "/assets/icons/file-image.svg";
        case "document":
          return "/assets/icons/file-document.svg";
        case "video":
          return "/assets/icons/file-video.svg";
        case "audio":
          return "/assets/icons/file-audio.svg";
        default:
          return "/assets/icons/file-other.svg";
      }
  }
};

export const handleError = (error: unknown, message: string) => {
  console.log(error, message);
  throw error;
};

// APPWRITE URL UTILS
// Construct appwrite file URL - https://appwrite.io/docs/apis/rest#images
export const constructFileUrl = (bucketFileId: string) => {
  return `${appwriteConfig.endpointUrl}/storage/buckets/${appwriteConfig.bucketId}/files/${bucketFileId}/view?project=${appwriteConfig.projectId}`;
};

export const constructDownloadUrl = (bucketFileId: string) => {
  return `${appwriteConfig.endpointUrl}/storage/buckets/${appwriteConfig.bucketId}/files/${bucketFileId}/download?project=${appwriteConfig.projectId}`;
};

export const getFileTypeSizes = (files?: Models.Document[]) => {
  const FileTypeSizes = { document: 0, image: 0, "video, audio": 0, others: 0 };
  files?.forEach((file) => {
    const type = file.type as string;
    switch (type) {
      case "document":
        FileTypeSizes.document += file.size;
        break;
      case "image":
        FileTypeSizes.image += file.size;
        break;
      case "video":
      case "audio":
        FileTypeSizes["video, audio"] += file.size;
        break;
      default:
        FileTypeSizes.others += file.size;
        break;
    }
  });
  return FileTypeSizes;
};

export const getTypeSize = ({
  type,
  files,
}: {
  type: string;
  files?: Models.Document[];
}) => {
  const fileTypeSizes: { [key: string]: number } = getFileTypeSizes(files);
  return fileTypeSizes[type];
};

export const getFileTypeLastUpdates = (files?: Models.Document[]) => {
  const FileTypeLastUpdates: { [key: string]: string } = {
    document: "",
    image: "",
    "video, audio": "",
    others: "",
  };
  files?.forEach((file) => {
    const type = file.type as string;
    switch (type) {
      case "document":
        if (
          new Date(file.$updatedAt) > new Date(FileTypeLastUpdates.document) ||
          FileTypeLastUpdates.document === ""
        ) {
          FileTypeLastUpdates.document = file.$updatedAt;
        }
        break;
      case "image":
        if (
          new Date(file.$updatedAt) > new Date(FileTypeLastUpdates.image) ||
          FileTypeLastUpdates.image === ""
        ) {
          FileTypeLastUpdates.image = file.$updatedAt;
        }
        break;
      case "video":
      case "audio":
        if (
          new Date(file.$updatedAt) >
            new Date(FileTypeLastUpdates["video, audio"]) ||
          FileTypeLastUpdates["video, audio"] === ""
        ) {
          FileTypeLastUpdates["video, audio"] = file.$updatedAt;
        }
        break;
      default:
        if (
          new Date(file.$updatedAt) > new Date(FileTypeLastUpdates.others) ||
          FileTypeLastUpdates.others === ""
        ) {
          FileTypeLastUpdates.others = file.$updatedAt;
        }
        break;
    }
  });
  return FileTypeLastUpdates;
};

export const sortFiles = ({
  files,
  sortBy,
}: {
  files?: Models.Document[];
  sortBy: string | null;
}) => {
  switch (sortBy) {
    case "newest":
      return files?.sort(
        (a, b) =>
          new Date(b.$createdAt).getTime() - new Date(a.$createdAt).getTime()
      );
    case "oldest":
      return files?.sort(
        (a, b) =>
          new Date(a.$createdAt).getTime() - new Date(b.$createdAt).getTime()
      );
    case "name":
      return files?.sort((a, b) => a.name.localeCompare(b.name));
    case "largest":
      return files?.sort((a, b) => b.size - a.size);
    case "smallest":
      return files?.sort((a, b) => a.size - b.size);
    default:
      return files;
  }
};
