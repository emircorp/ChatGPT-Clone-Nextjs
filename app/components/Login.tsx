"use client";

import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

type Props = {};

function Login({}: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const handleEmailLogin = async () => {
    if (!email || !password) return;
    await signInWithEmailAndPassword(auth, email, password);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#343541] text-white">
      <div className="bg-[#202123] p-8 rounded-lg w-[95%] max-w-md">
        <h3 className="text-2xl font-semibold text-center mb-6">Welcome to brAIn</h3>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded bg-[#343541] focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded bg-[#343541] focus:outline-none"
          />
          <button
            onClick={handleEmailLogin}
            className="w-full bg-[#11A37F] hover:opacity-80 text-white py-2 rounded"
          >
            Sign In
          </button>
          <div className="text-center text-gray-400">or</div>
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-white text-black py-2 rounded hover:bg-gray-200"
          >
            Continue with Google
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-6 text-center">
          created by Muhammed Emir Baysal &amp; Jean Haddad
        </p>
      </div>
    </div>
  );
}

export default Login;
