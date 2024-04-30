import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

import InputPassword from "./ui/input-password";
import { Button } from "./ui/button";
import Image from "next/image";
import { login, signUp } from "@/actions/action";

type AuthFormProps = {
  type: string;
};

export default function AuthForm({ type }: AuthFormProps) {

 
  
  return (
    <form action={type === "LogIn" ? login : signUp}>
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" name="email" />
      </div>
      <div className="space-y-1 mb-4 mt-2">
        <Label htmlFor="password">Password</Label>
        <InputPassword />
      </div>
      <div className="space-x-2">
        <Button className="mb-2 ">{type}</Button>
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
      </div>
    </form>
  );
}
