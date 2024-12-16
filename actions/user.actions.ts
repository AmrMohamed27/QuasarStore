"use server";

import { createAdminClient } from "@/lib/appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import { parseStringify } from "@/lib/utils";
import { ID, Query } from "node-appwrite";

const getUserByEmail = async (email: string) => {
  const { databases } = await createAdminClient();
  const result = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.usersCollectionId,
    [Query.equal("email", [email])]
  );

  return result.total > 0 ? result.documents[0] : null;
};

const handleError = (error: unknown, message: string) => {
  console.log(error, message);
  throw error;
};

const sendEmailOTP = async (email: string) => {
  const { account } = await createAdminClient();
  try {
    const session = await account.createEmailToken(ID.unique(), email);
    return session.userId;
  } catch (error) {
    handleError(error, "Failed to send email OTP");
  }
};

export const createAccount = async (fullName: string, email: string) => {
  const existingUser = await getUserByEmail(email);
  const accountId = await sendEmailOTP(email);
  if (!accountId) {
    throw new Error("Failed to create account");
  }

  if (!existingUser) {
    const { databases } = await createAdminClient();
    const [firstName, lastName] = fullName.split(" ");
    await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      {
        fullName,
        email,
        avatar: `https://avatar.iran.liara.run/username?username=${firstName}+${lastName}`,
        accountId,
      }
    );
  }

  return parseStringify({ accountId });
};

export const signInUser = async (email: string) => {
  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      await sendEmailOTP(email);
      return parseStringify({ accountId: existingUser.$id });
    }
    return parseStringify({ accountId: null, error: "User not found" });
  } catch (error) {
    handleError(error, "Failed to sign in user");
  }
};

export const getCurrentUser = async () => {
  const { account } = await createAdminClient();
  try {
    const session = await account.get();
    return parseStringify({ accountId: session.$id });
  } catch {
    return undefined;
  }
};
