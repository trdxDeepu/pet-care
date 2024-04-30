"use client";

import React from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";

type AuthFormButtonProps = {
  type: string;
};

export default function AuthFormButton({ type }: AuthFormButtonProps) {

  const { pending } = useFormStatus();
  return (
    <Button className="mb-2 " disabled={pending}>
      {type}
    </Button>
  );
}
