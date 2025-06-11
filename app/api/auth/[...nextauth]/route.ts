import NextAuth from "next-auth";
import { authOptions } from "@/app/lib/authOptions";

// Reuse the shared authOptions from the lib folder to avoid
// re-declaring the configuration in this route.
// NextAuth will handle GET and POST requests using this config.
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
