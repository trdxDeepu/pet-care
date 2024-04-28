import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import prisma from "./db";
import bcrypt from "bcryptjs";

import Google from "next-auth/providers/google";

const config = {
  pages: {
    signIn: "/login",
  },
  session: {},
  providers: [
    Credentials({
      async authorize(credentials) {
        //  ruun on login
        const { email, password } = credentials;

        const user = await prisma.user.findUnique({
          where: {
            email: email as string,
          },
        });

        if (!user) {
          console.log("No user found");
          return null;
        }

        const passwordMatched = await bcrypt.compare(
          password,
          user.hashedPassword
        );

        if (!passwordMatched) {
          console.log("Invalid credentials");
          return null;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    authorized: ({ request }) => {
      const isAuthAccessApp = request.nextUrl.pathname.includes("/app");
      if (isAuthAccessApp) {
        return false;
      } else {
        return true;
      }
    },
  },
} satisfies NextAuthConfig;

export const { auth, signIn } = NextAuth(config);
