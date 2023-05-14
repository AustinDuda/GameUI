import admin from "firebase-admin";
import type { ServiceAccount } from "firebase-admin";

if (!admin.apps.length) {
  try {
    if (!process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
      throw new Error("FIREBASE_SERVICE_ACCOUNT_JSON is not set");
    }
    admin.initializeApp({
      credential: admin.credential.cert(
        JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON) as ServiceAccount
      ),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET_NAME,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Firebase admin initialization error", error.stack);
    }
    console.log("Firebase admin initialization error (unknown type)", error);
  }
}

export default admin;