import AuthForm from "@/components/auth-form";
import H1 from "@/components/h1";
import Link from "next/link";
import React from "react";

export default function SignUp() {
  return (
    <main>
      <H1 className="text-center mb-5">Sign Up</H1>

      <AuthForm  type="SignUp"/>

      <p className="mt-6 text-zinc-500">
        Have an account ?{" "}
        <Link
          href={"/login"}
          className="mt-6 font-medium text-sm text-zinc-500 "
        >
          Login
        </Link>
      </p>
    </main>
  );
}
