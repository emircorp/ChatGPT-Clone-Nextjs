"use client";

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Sidebar from './components/Sidebar'

import Login from './components/Login'
import ClientProvider from './components/ClientProvider'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'brAIn',
  description: 'brAIn',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, loading] = useAuthState(auth);

  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#343541]`}>
        {loading ? null : !user ? (
          <Login />
        ) : (
          <div className='flex overflow-hidden'>
            <Sidebar />
            <ClientProvider />
            <div className='flex-1'>
              {children}
            </div>
          </div>
        )}
      </body>
    </html>
  )
}
