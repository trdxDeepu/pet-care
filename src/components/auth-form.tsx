"use client";

import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

import InputPassword from "./ui/input-password";
import { Button } from "./ui/button";
import Image from "next/image";
import { login, signUp } from "@/actions/action";

import AuthFormButton from "./auth-form-btn";
import { useFormState } from "react-dom";

type AuthFormProps = {
  type: string;
};

export default function AuthForm({ type }: AuthFormProps) {
  const [signupError, dispatchSignUp] = useFormState(signUp, undefined);
  const [loginError , dispatchLogin] = useFormState(login,undefined)

  return (
    <form action={type === "LogIn" ? dispatchLogin : dispatchSignUp}>
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" name="email" required maxLength={100} />
      </div>
      <div className="space-y-1 mb-4 mt-2">
        <Label htmlFor="password">Password</Label>
        <InputPassword />
      </div>
      <div className="space-x-2">
        <AuthFormButton type={type} />
        <Button className="bg-white text-zinc-500 hover:bg-white hover:text-zinc-500">
          <Image
            src={"/google.png"}
            height={11}
            width={11}
            alt="google logo"
            className="mr-2"
          />
          Google {type}
        </Button>
        {signupError && <p className="text-red-500 text-sm mt-2">{signupError.message}</p>}
        {loginError && <p className="text-red-500 text-sm mt-2">{loginError.message}</p>}
      </div>
    </form>
  );
}
