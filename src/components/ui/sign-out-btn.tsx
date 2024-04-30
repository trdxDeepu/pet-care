"use client";

import React from "react";
import { Button } from "./button";
import { logout } from "@/actions/action";

export default function SignOutBtn() {
  return (
    <Button
      onClick={async () => {
        await logout();
      }}
    >
      Sign out
    </Button>
  );
}
