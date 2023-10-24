import { AuthUser } from "@/app/api/auth/[...nextauth]/auth";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: AuthUser;
  }
}
