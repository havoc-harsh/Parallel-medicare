import NextAuth from "next-auth";
import { authOptions } from "./auth-options";

// Export the Next.js API route handler
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };