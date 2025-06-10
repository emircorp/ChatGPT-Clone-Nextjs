"use client";

import { motion } from "framer-motion";
import React from "react";

type MessageType = {
  text: string;
  createdAt: number;
  user: {
    name: string;
    email: string;
    avatar: string;
  };
};

type Props = {
  message: MessageType;
};

function Message({ message }: Props) {
  const isChatGPT = message.user.name === "brAIn";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className={`py-5 text-white ${isChatGPT && "bg-[#434654]"}`}
    >
      <div className="flex items-center space-x-5 px-10 max-w-4xl mx-auto">
        <img
          src={message.user.avatar}
          alt=""
          className="h-6 w-6 sm:h-10 sm:w-10 rounded-sm"
        />
        <p className="pt-1 text-sm sm:text-base">{message.text}</p>
      </div>
    </motion.div>
  );
}

export default Message;
