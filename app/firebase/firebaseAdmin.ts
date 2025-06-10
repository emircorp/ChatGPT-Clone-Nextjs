// app/firebase/firebaseAdmin.ts

import admin from "firebase-admin";
import { getApps } from "firebase-admin/app";

// .env'den gelen service account key'i parse et
const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
);

// Firebase admin uygulamasını başlat
if (!getApps().length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://brain-ai-online-official.firebaseio.com", // Realtime DB URL
  });
}

// Realtime Database instance'ı dışa aktar
const adminDb = admin.database();
export { adminDb };
