// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { adminDb } from "@/app/firebase/firebaseAdmin";
import admin from "firebase-admin";
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
    res.status(400).json({ answer: "Please provide a prompt" });
    return;
  }

  if (!chatId) {
    res.status(400).json({ answer: "Please provide a valid chat Id" });
    return;
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
      createdAt: admin.firestore.Timestamp.now(),
      user: {
        name: "ChatGPT",
        email: "ChatGPT",
        avatar:
          "https://drive.google.com/uc?export=download&id=1ikaBBU-OsBSHkleHQmf15ww0vgX-A0Kz",
      },
    };

    await adminDb
      .collection("users")
      .doc(session?.user?.email)
      .collection("chats")
      .doc(chatId)
      .collection("messages")
      .add(message);

    res.status(200).json({ answer: message.text });
  } catch (error: any) {
    res.status(500).json({ answer: `Error: ${error.message}` });
  }
}
