"use client";

import { onValue, ref, remove } from "firebase/database";
import { Session } from "next-auth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { database } from "../firebase/firebase";

type Props = {
  id: string;
  session: Session | null;
};

type MessageData = {
  text: string;
  createdAt: number;
  user: {
    name: string;
    email: string;
    avatar: string;
  };
};

function ChatRow({ id, session }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [active, setActive] = useState(false);
  const [lastMessage, setLastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!pathname) return;
    setActive(pathname.includes(id));
  }, [pathname, id]);

  useEffect(() => {
    if (!session?.user?.email) return;
    const userKey = session.user.email.replace(/\./g, "_");
    const messagesRef = ref(database, `users/${userKey}/chats/${id}/messages`);

    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const messagesData = snapshot.val();
      if (messagesData) {
        const entries = Object.entries(messagesData) as [string, MessageData][];
        const sorted = entries.sort((a, b) => a[1].createdAt - b[1].createdAt);
        const last = sorted[sorted.length - 1]?.[1]?.text || "New Chat";
        setLastMessage(last);
      } else {
        setLastMessage("New Chat");
      }
    });

    return () => unsubscribe();
  }, [session, id]);

  const removeChat = async () => {
    const userKey = session?.user?.email?.replace(/\./g, "_");
    if (!userKey) return;

    await remove(ref(database, `users/${userKey}/chats/${id}`));
    router.replace("/");
  };

  return (
    <Link
      href={`/chat/${id}`}
      className={`chatRow justify-center ${active && "bg-[#51545bb0]"}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5 mr-1"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
        />
      </svg>
      <p className="flex-1 truncate">{lastMessage}</p>
      {active && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 ml-3 text-gray-400 hover:text-gray-100"
          onClick={removeChat}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      )}
    </Link>
  );
}

export default ChatRow;
