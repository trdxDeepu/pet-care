"use client";

import React from "react";
import { Button } from "./button";
import { logout } from "@/actions/action";

export default function SignOutBtn() {
  const [isPending, startTransition] = React.useTransition();

  return (
    <Button
    disabled={isPending}
      onClick={async () => {
        startTransition(async () => {
          await logout();
        });
      }}
    >
      Sign out
    </Button>
  );
}
