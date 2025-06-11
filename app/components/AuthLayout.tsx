"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import Sidebar from "./Sidebar";
import Login from "./Login";
import ClientProvider from "./ClientProvider";
import { auth } from "../firebase/firebase";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const [user, loading] = useAuthState(auth);

  if (loading) return null;
  if (!user) return <Login />;

  return (
    <div className="flex overflow-hidden">
      <Sidebar />
      <ClientProvider />
      <div className="flex-1">{children}</div>
    </div>
  );
}
