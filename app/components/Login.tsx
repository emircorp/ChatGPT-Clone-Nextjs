"use client";

import { signIn } from "next-auth/react";

type Props = {};

function Login({}: Props) {
  return (
    <div className="bg-white h-screen flex flex-col items-center justify-center text-center">
      <div className="mb-28">
        <h3 className="text-[#2D333A] text-xl sm:text-3xl font-semibold">Welcome to brAIn</h3>
        <p className="flex text-sm font-medium text-gray-600 -mt-1 justify-end">created by Muhammed Emir Baysal & Jean Haddad<a className="underline hover:text-black" href="https://brain-ai.online" target="_blank" rel="noopener noreferrer">www.developercc.com</a></p>
      </div>
      <button
        onClick={() => signIn("google")}
        className="text-black hover:bg-gray-300 text-lg py-3 rounded-sm px-6 border border-gray-800 transform transition-colors duration-500"
      >
        Continue with Google
      </button>
    </div>
  );
}

export default Login;
