import { authConfig } from "@/app/api/auth/[...nextauth]/auth";
import NextAuth from "next-auth";

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
