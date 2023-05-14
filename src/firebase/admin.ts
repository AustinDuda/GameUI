import admin from "firebase-admin";

if (!admin.apps.length) {
  try {
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
      throw new Error("FIREBASE_SERVICE_ACCOUNT_JSON is not set");
    }
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY ? process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : undefined,
        clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
      }),
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Firebase admin initialization error", error.stack);
    }
    console.log("Firebase admin initialization error (unknown type)", error);
  }
}

export default admin;