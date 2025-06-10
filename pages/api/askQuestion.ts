import { adminDb } from "@/app/firebase/firebaseAdmin";
import query from "@/app/utils/queryApi";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  answer: string;
};

type Message = {
  text: string;
  createdAt: number;
  user: {
    name: string;
    email: string;
    avatar: string;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt, chatId, model, session } = req.body;

  if (!prompt) {
    return res.status(400).json({ answer: "Please Provide a prompt" });
  }

  if (!chatId) {
    return res.status(400).json({ answer: "Please provide a valid chat Id" });
  }

  const response = await query(prompt, chatId, model);

  const message: Message = {
    text: response || "ChatGPT unable to answer that!",
    createdAt: Date.now(), 
    user: {
      name: "ChatGPT",
      email: "ChatGPT",
      avatar:
        "https://drive.google.com/uc?export=download&id=1ikaBBU-OsBSHkleHQmf15ww0vgX-A0Kz",
    },
  };

  const userKey = session?.user?.email.replace(/\./g, "_"); 
  await adminDb
    .ref(`users/${userKey}/chats/${chatId}/messages`)
    .push(message);

  res.status(200).json({ answer: message.text });
}
