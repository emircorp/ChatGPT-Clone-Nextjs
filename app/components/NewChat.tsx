"use client";

import { push, ref } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import React from "react";
import { auth, database } from "../firebase/firebase";

type Props = {
  toggleSidebar: () => void;
};

function NewChat({ toggleSidebar }: Props) {
  const router = useRouter();
  const [user] = useAuthState(auth);

  const createNewChat = async () => {
    if (!user?.email) return;

    const userKey = user.email.replace(/\./g, "_");
    const chatsRef = ref(database, `users/${userKey}/chats`);
    const newChatRef = await push(chatsRef, {
      userId: user.email,
      userEmail: user.email,
      createdAt: Date.now(),
    });

    if (!newChatRef.key) return;
    router.push(`/chat/${newChatRef.key}`);
  };

  return (
    <div className="flex">
      <div
        onClick={createNewChat}
        className="chatRow border-gray-500 hover:bg-[#202123] border flex-1 justify-start rounded-lg cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4 text-white"
        >
          <path
            fillRule="evenodd"
            d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
            clipRule="evenodd"
          />
        </svg>
        <p>New Chat</p>
      </div>
      <div
        onClick={toggleSidebar}
        className="flex min-w-[50px] ml-2 justify-center items-center border-gray-500 border rounded-lg cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </div>
    </div>
  );
}

export default NewChat;
