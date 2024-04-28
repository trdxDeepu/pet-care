import AuthForm from "@/components/auth-form";
import H1 from "@/components/h1";
import Link from "next/link";
import React from "react";

export default function Login() {
  return (
    <main>
      <H1 className="text-center mb-5">Log In</H1>

      <AuthForm type="Log in" />

      <p className="mt-6 text-zinc-500">
        No account yet ?{" "}
        <Link
          href={"/signup"}
          className="mt-6 font-medium text-sm text-zinc-500 "
        >
          Sign up
        </Link>
      </p>
    </main>
  );
}
 