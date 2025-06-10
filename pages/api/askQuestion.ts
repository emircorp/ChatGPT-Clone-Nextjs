// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { adminDb } from "@/app/firebase/firebaseAdmin";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  answer: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt, chatId, model, session } = req.body;

  if (!prompt) {
    return res.status(400).json({ answer: "Please provide a prompt." });
  }

  if (!chatId) {
    return res.status(400).json({ answer: "Please provide a valid chat ID." });
  }

  try {
    const apiResponse = await fetch(process.env.NEXT_PUBLIC_API_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, chatId, model }),
    });

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      throw new Error(`API error: ${errorText}`);
    }

    const responseData = await apiResponse.json();

    const answer = responseData.answer || "Unable to get an answer from API";

    const message = {
      text: answer,
      createdAt: Date.now(), // ✅ Firestore timestamp değil!
      user: {
        name: "brAIn",
        email: "brAIn",
        avatar:
          "https://drive.google.com/uc?export=download&id=1ikaBBU-OsBSHkleHQmf15ww0vgX-A0Kz",
      },
    };

    // ✅ E-posta adresi "." karakterinden arındırılıyor (RealtimeDB için)
    const userKey = session?.user?.email.replace(/\./g, "_");

    // ✅ Realtime Database'e veri yazılıyor
    await adminDb
      .ref(`users/${userKey}/chats/${chatId}/messages`)
      .push(message);

    return res.status(200).json({ answer: message.text });
  } catch (error: any) {
    return res.status(500).json({ answer: `Error: ${error.message}` });
  }
}
