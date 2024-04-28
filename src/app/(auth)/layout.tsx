import Logo from "@/components/logo";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-5 items-center justify-center min-h-screen">
      <Logo />
      {children}
    </div>
  );
}
