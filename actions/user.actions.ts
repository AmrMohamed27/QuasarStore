"use server";

import { createAdminClient, createSessionClient } from "@/lib/appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import { parseStringify } from "@/lib/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
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

export const sendEmailOTP = async (email: string) => {
  const { account } = await createAdminClient();
  try {
    const session = await account.createEmailToken(ID.unique(), email);
    return session.userId;
  } catch (error) {
    handleError(error, "Failed to send email OTP");
  }
};

export const verifySecret = async (accountId: string, password: string) => {
  try {
    const { account } = await createAdminClient();
    const session = await account.createSession(accountId, password);
    (await cookies()).set("appwrite-session", session.secret, {
      // path: "/",
      // httpOnly: true,
      // sameSite: "strict",
      // secure: true,
    });
    return parseStringify({ sessionId: session.$id });
  } catch (error) {
    handleError(error, "Failed to verify OTP");
  }
};

export const createAccount = async (fullName: string, email: string) => {
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { exists: true, userId: existingUser.$id };
  }
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

  return { exists: false, userId: accountId };
};

export const signInUser = async (email: string) => {
  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      await sendEmailOTP(email);
      return parseStringify({ accountId: existingUser.accountId });
    }
    return parseStringify({ accountId: null, error: "User not found" });
  } catch (error) {
    handleError(error, "Failed to sign in user");
  }
};

export const isSignedIn = async () => {
  const sessionCookie = (await cookies()).get("appwrite-session");
  return sessionCookie;
};

export const signOut = async () => {
  const { account } = await createSessionClient();

  try {
    try {
      // Delete the session only if it exists
      await account.deleteSession("current");
    } catch (sessionError) {
      console.warn(
        "No active session found, skipping deleteSession. Error: ",
        sessionError
      );
    }
    (await cookies()).delete("appwrite-session");
  } catch (error) {
    handleError(error, "Failed to sign out user");
  } finally {
    return redirect("/signin");
  }
};

export const getCurrentUser = async () => {
  try {
    const { databases, account } = await createSessionClient();

    const result = await account.get();

    const user = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("accountId", result.$id)]
    );

    if (user.total <= 0) return null;

    return parseStringify(user.documents[0]);
  } catch (error) {
    console.log(error);
  }
};
