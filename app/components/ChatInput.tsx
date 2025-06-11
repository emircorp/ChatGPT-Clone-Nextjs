"use client";

import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-hot-toast";
import useSWR from "swr";
import { ref, push, serverTimestamp } from "firebase/database";

import { auth, database } from "../firebase/firebase";

type Props = {
  chatId: string;
};

function ChatInput({ chatId }: Props) {
  const [user] = useAuthState(auth);
  const [prompt, setPrompt] = useState("");
  const [loading, setIsLoading] = useState(true);

  const { data: model } = useSWR("model", {
    fallbackData: "text-davinci-003",
  });

  const generateResponse = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!prompt || !user) return;

    const input = prompt.trim();
    setPrompt("");
    setIsLoading(false);

    const message = {
      text: input,
      createdAt: Date.now(),
      user: {
        name: user?.displayName || "User",
        email: user?.email || "no@email.com",
        avatar:
          user?.photoURL ||
          `https://ui-avatars.com/api/?name=${user?.displayName}`,
      },
    };

    const userKey = user?.email?.replace(/\./g, "_");
    const messageRef = ref(
      database,
      `users/${userKey}/chats/${chatId}/messages`
    );

    await push(messageRef, message);

    const notification = toast.loading("brAIn is thinking...");

    await fetch("/api/askQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
        chatId,
        model,
        userEmail: user?.email,
      }),
    });

    toast.success("brAIn responded!", { id: notification });
    setIsLoading(true);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-[#40414F] text-gray-200 rounded-lg text-base w-[95%] md:max-w-[70%] mb-4">
        <form onSubmit={generateResponse} className="px-4 py-3 space-x-5 flex">
          <input
            type="text"
            placeholder="Type your message here..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={!user}
            className={`bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300 ${
              !loading && "animate-pulse"
            }`}
          />

          <button
            type="submit"
            disabled={!prompt || !user}
            className="bg-[#11A37F] hover:opacity-70 text-white font-bold px-3 py-2 rounded-lg disabled:bg-[#40414F] disabled:cursor-not-allowed"
          >
            {loading ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 -rotate-45"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 animate-spin"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatInput;
