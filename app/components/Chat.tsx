"use client";

import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { onValue, ref } from "firebase/database";

import Message from "./Message";
import { database } from "../firebase/firebase";
import HomeContent from "./HomeContent";

type Props = {
  chatId: string;
};

type MessageType = {
  text: string;
  createdAt: number;
  user: {
    id: string;
    name: string;
    avatar: string;
    email: string;
  };
};

function Chat({ chatId }: Props) {
  const { data: session } = useSession();
  const messageEndRef = useRef<null | HTMLDivElement>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);

  useEffect(() => {
    if (!session?.user?.email) return;

    const userKey = session.user.email.replace(/\./g, "_");
    const messagesRef = ref(database, `users/${userKey}/chats/${chatId}/messages`);

    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const sortedMessages = Object.values(data).sort(
          (a: any, b: any) => a.createdAt - b.createdAt
        );
        setMessages(sortedMessages as MessageType[]);
      } else {
        setMessages([]);
      }
    });

    return () => unsubscribe();
  }, [session, chatId]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden">
      {messages.length === 0 && <HomeContent />}
      {messages.map((message, index) => (
        <Message key={index} message={message} />
      ))}
      <div ref={messageEndRef} />
    </div>
  );
}

export default Chat;
