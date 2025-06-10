import type { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      projectId: process.env.FIREBASE_PROJECT_ID,
    }),
  });
}

const db = admin.firestore();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === "POST") {
    const { data } = req.body;
    try {
      const docRef = db.collection("yourCollection").doc();
      await docRef.set(data);

      res.status(200).json({ success: true, id: docRef.id });
    } catch (error) {
      res.status(500).json({ error: "Failed to write data" });
    }
  } else if (req.method === "GET") {
    try {
      const snapshot = await db.collection("yourCollection").get();
      const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      res.status(200).json({ data: docs });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch data" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
