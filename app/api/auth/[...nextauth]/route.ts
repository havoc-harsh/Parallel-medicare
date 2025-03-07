import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        licenseNumber: { label: "License Number", type: "text" },
        name:{label:"Name",type:"text"},
      },
      async authorize(credentials) {
        console.log("🔹 Received credentials:", credentials);

        if (!credentials?.email || !credentials?.password || !credentials?.licenseNumber||credentials?.name) {
          console.log("❌ Missing credentials");
          throw new Error("Missing credentials");
        }

        const user = await prisma.hospital.findFirst({
          where: {
            email: credentials.email,
            licenseNumber: credentials.licenseNumber,
            name:credentials.name,
          },
        });

        console.log("🔹 Fetched user from DB:", user);

        if (!user) {
          console.log("❌ User not found in database");
          throw new Error("User not found");
        }

        const passwordMatch = await bcrypt.compare(credentials.password, user.password);
        console.log("🔹 Password match:", passwordMatch);

        if (!passwordMatch) {
          console.log("❌ Invalid password");
          throw new Error("Invalid password");
        }

        console.log("✅ Authentication successful for:", user.email);

        return {
          id: user.id.toString(),
          email: user.email,
          licenseNumber: user.licenseNumber,
          name:user.name,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/hospital/login",
  },
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: { token: any, user?: any }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.licenseNumber = user.licenseNumber;
        token.name=user.name;
      }
      return token;
    },
    async session({ session, token }: { session: any, token: any }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.licenseNumber = token.licenseNumber;
        session.user.name=token.name;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
