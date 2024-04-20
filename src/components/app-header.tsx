"use client";

import React from "react";
import Logo from "./logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function AppHeader() {
  const activePathName = usePathname();

  const routes = [
    {
      label: "Dashboard",
      path: "/app/dashboard",
    },
    {
      label: "Accounts",
      path: "/app/account",
    },
  ];

  return (
    <header className="flex justify-between items-center border-b border-white/10 py-2">
      <Logo />

      <nav>
        <ul className="flex items-center gap-2 text-xs ">
          {routes.map((route) => (
            <li key={route.label}>
              <Link
                href={route.path}
                className={cn(
                  "text-white/75  rounded-sm px-2 py-1 hover:text-white focus:text-white",
                  {
                    "bg-black/10 text-white": activePathName === route.path,
                  }
                )}
              >
                {route.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
