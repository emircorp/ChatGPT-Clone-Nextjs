"use client";

import { useList } from "react-firebase-hooks/database";
import { ref } from "firebase/database";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { motion } from "framer-motion";
import React, { useState } from "react";

import ChatRow from "./ChatRow";
import NewChat from "./NewChat";
import { auth, database } from "../firebase/firebase";

function Sidebar() {
  const [user] = useAuthState(auth);
  const [open, setOpen] = useState(true);

  const userKey = user?.email?.replace(/\./g, "_") || null;
  const chatsRef = userKey ? ref(database, `users/${userKey}/chats`) : null;
  const [snapshots, loading, error] = useList(chatsRef);

  const toggleSidebar = () => setOpen(!open);

  return (
    <>
      {!open ? (
        <div
          onClick={toggleSidebar}
          className="flex fixed max-w-[50px] sm:min-w-[50px] sm:ml-2 p-2 bg-[#434654] sm:justify-center items-center hover:bg-[#434654] border-gray-500 border rounded-lg cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </div>
      ) : (
        <div className="p-2 flex flex-col h-screen bg-[#202123] w-72">
          <div className="flex-1 overflow-y-scroll">
            {/* ✅ Her zaman erişilebilir */}
            <NewChat toggleSidebar={toggleSidebar} />

            <p className="text-gray-400 mt-4 ml-4 pb-0 text-sm">Previous Chats</p>

            <div className="flex flex-col space-y-2 my-2">
              {loading && (
                <div className="animate-pulse text-center text-white">
                  <p>Loading Chats...</p>
                </div>
              )}

              {!loading && snapshots?.length === 0 && (
                <p className="text-gray-500 text-center">No chats yet</p>
              )}

              {snapshots?.map((chatSnap) => (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  key={chatSnap.key}
                >
                  <ChatRow id={chatSnap.key!} />
                </motion.div>
              ))}
            </div>
          </div>

          {user && (
            <div className="border-t border-gray-400 py-3">
              <div className="chatRow items-center justify-start gap-5">
                <img
                  src={user.photoURL || ""}
                  alt={user.displayName || ""}
                  className="h-8 w-8 rounded-sm cursor-pointer hover:opacity-50"
                />
                <p>{user.displayName}</p>
              </div>

              <div
                className="chatRow items-center justify-start gap-5"
                onClick={() => signOut(auth)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                </svg>
                <p>Log out</p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Sidebar;
