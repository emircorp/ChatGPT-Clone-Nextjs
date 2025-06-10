import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.WEB_CLIENT_ID!,
      clientSecret: process.env.WEB_CLIENT_KEY!,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.username = session.user.name
        ?.split(" ")
        .join("")
        .toLowerCase();
      session.user.uid = token.sub;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET!,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
