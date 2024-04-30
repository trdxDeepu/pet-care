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
    authorized: ({ auth, request }) => {

      const isLoggedIn = Boolean(auth?.user);

      const isTryingToAccessApp = request.nextUrl.pathname.includes("/app");

      if (!isLoggedIn && isTryingToAccessApp) {
        return false;
      }

      if (isLoggedIn && isTryingToAccessApp) {
        return true;
      }

      if (isLoggedIn && !isTryingToAccessApp) {
        return Response.redirect(new URL("/app/dashboard", request.nextUrl));
      }

      if (!isLoggedIn && !isTryingToAccessApp) {
        return true;
      }

      return true;
    },
    jwt: ({ token, user }) => {
      if (user) {
        //  on Sign in
        token.userId= user.id;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (session.user) {
        session.user.id = token.userId;
      }

      return session;
    },
  },
} satisfies NextAuthConfig;

export const { auth, signIn, signOut } = NextAuth(config);
