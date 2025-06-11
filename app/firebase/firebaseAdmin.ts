import admin from "firebase-admin";
import { getApps } from "firebase-admin/app";

// Base64 olarak saklanan service account'u decode et
const decodedServiceAccount = Buffer.from(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY_BASE64 as string,
  "base64"
).toString("utf-8");

const serviceAccount = JSON.parse(decodedServiceAccount);

if (!getApps().length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}

const adminDb = admin.database();
export { adminDb };
