"use server";

import { createAdminClient } from "@/lib/appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import {
  FileType,
  GetFilesProps,
  GetUsedSpaceReturn,
  UploadFileProps,
} from "@/types";
import { ID, Models, Query } from "node-appwrite";
import { revalidatePath } from "next/cache";
import { getFileType, handleError, parseStringify } from "@/lib/utils";
import { constructFileUrl } from "../lib/utils";
import { getCurrentUser } from "./user.actions";
import { MAX_BUCKET_SIZE } from "@/constants";

export const uploadFile = async ({
  file,
  ownerId,
  accountId,
  path,
}: UploadFileProps) => {
  const { storage, databases } = await createAdminClient();

  try {
    const bucketFile = await storage.createFile(
      appwriteConfig.bucketId,
      ID.unique(),
      file
    );

    const fileDocument = {
      type: getFileType(bucketFile.name).type,
      name: bucketFile.name,
      size: bucketFile.sizeOriginal,
      url: `${constructFileUrl(bucketFile.$id)}&mode=admin`,
      extension: getFileType(bucketFile.name).extension,
      owner: ownerId,
      accountId,
      users: [],
      bucketField: bucketFile.$id,
    };

    const newFile = await databases
      .createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.filesCollectionId,
        ID.unique(),
        fileDocument
      )
      .catch(async (error) => {
        await storage.deleteFile(appwriteConfig.bucketId, bucketFile.$id);
        handleError(error, "Failed to create file document");
      });
    revalidatePath(path);
    console.log(newFile);
    return parseStringify(newFile);
  } catch (error) {
    handleError(error, "Failed to upload file");
  }
};

const createQueries = (
  currentUser: Models.Document,
  types: string[],
  searchText: string,
  sort: string,
  limit?: number,
  offset?: number
) => {
  const queries = [
    Query.or([
      Query.equal("owner", [currentUser.$id]),
      Query.contains("users", [currentUser.email]),
    ]),
  ];

  if (types.length > 0) queries.push(Query.equal("type", types));
  if (searchText) queries.push(Query.contains("name", searchText));
  if (limit) queries.push(Query.limit(limit));
  if (offset) queries.push(Query.offset(offset));

  if (sort) {
    const [sortBy, orderBy] = sort.split("-");

    queries.push(
      orderBy === "asc" ? Query.orderAsc(sortBy) : Query.orderDesc(sortBy)
    );
  }

  return queries;
};

export const getFiles = async ({
  types = [],
  searchTerm = "",
  sort = "$createdAt-desc",
  limit,
  offset = 0,
}: GetFilesProps) => {
  // Create admin client to access the database.
  const { databases } = await createAdminClient();

  try {
    // Get current user.
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error("User not found");

    // Create queries.
    const queries = createQueries(
      currentUser,
      types,
      searchTerm,
      sort,
      limit,
      offset
    );

    // Get files from database
    const files = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      queries
    );

    // Parse files to a DocumentList
    const parsedFiles: Models.DocumentList<Models.Document> =
      parseStringify(files);

    return parsedFiles;
  } catch (error) {
    handleError(error, "Failed to get files");
  }
};

export const getUsedSpace: () => Promise<GetUsedSpaceReturn> = async () => {
  const { databases } = await createAdminClient();
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error("User not found");
    const files = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      [Query.equal("owner", [currentUser.$id])]
    );

    const totalSpace: GetUsedSpaceReturn = {
      image: { size: 0, latestDate: "" },
      document: { size: 0, latestDate: "" },
      video: { size: 0, latestDate: "" },
      audio: { size: 0, latestDate: "" },
      other: { size: 0, latestDate: "" },
      used: 0,
      all: MAX_BUCKET_SIZE,
    };

    files.documents.forEach((file) => {
      const fileType = file.type as FileType;
      totalSpace[fileType].size += file.size;
      totalSpace.used += file.size;
      if (
        new Date(file.$createdAt) > new Date(totalSpace[fileType].latestDate) ||
        !totalSpace[fileType].latestDate
      ) {
        totalSpace[fileType].latestDate = file.$updatedAt;
      }
    });

    return parseStringify(totalSpace);
  } catch (error) {
    handleError(error, "Failed to get used space");
  }
};

export const renameFile = async ({
  file,
  name,
  path,
}: {
  file: Models.Document;
  name: string;
  path: string;
}) => {
  const { databases } = await createAdminClient();
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error("User not found");
    if (currentUser.$id !== file.owner.$id) {
      throw new Error("You are not the owner of this file");
    }
    const newFile = await databases
      .updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.filesCollectionId,
        file.$id,
        {
          name,
        }
      )
      .catch(async (error) => {
        handleError(error, "Failed to rename file");
      });
    revalidatePath(path);
    return parseStringify(newFile);
  } catch (error) {
    handleError(error, "Failed to rename file");
  }
};

export const shareFile = async ({
  file,
  email,
  path,
}: {
  file: Models.Document;
  email: string;
  path: string;
}) => {
  const { databases } = await createAdminClient();
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error("User not found");
    if (email === file.owner.email) {
      throw new Error("User is already the owner of the file");
    }
    if (file.users.includes(email)) {
      throw new Error("User already has access to this file");
    }
    const newFile = await databases
      .updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.filesCollectionId,
        file.$id,
        {
          users: [...file.users, email],
        }
      )
      .catch(async (error) => {
        handleError(error, "Failed to share file");
      });
    revalidatePath(path);
    return parseStringify(newFile);
  } catch (error) {
    handleError(error, "Failed to share file");
  }
};

export const deleteFile = async ({
  file,
  path,
}: {
  file: Models.Document;
  path: string;
}) => {
  const { databases, storage } = await createAdminClient();
  const currentUser = await getCurrentUser();
  if (!currentUser) throw new Error("User not found");
  if (currentUser.email !== file.owner.email)
    throw new Error("You are not the owner of this file");
  try {
    const bucketResult = await storage.deleteFile(
      appwriteConfig.bucketId,
      file.bucketField
    );
    const databaseResult = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      file.$id
    );
    revalidatePath(path);
    return {
      bucketResult: parseStringify(bucketResult),
      databaseResult: parseStringify(databaseResult),
    };
  } catch (error) {
    handleError(error, "Failed to delete file");
  }
};
