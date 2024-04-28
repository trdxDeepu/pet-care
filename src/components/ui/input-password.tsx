"use client";

import React from "react";
import { Input } from "./input";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
export default function InputPassword() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <Input type={showPassword ? "text" : "password"} id="password" name="password"/>
      <div
        className="absolute inset-y-0 right-0 pr-3 flex items-center"
        onClick={handleTogglePassword}
      >
        {showPassword ? (
          <EyeOpenIcon className="cursor-pointer" />
        ) : (
          <EyeClosedIcon className="cursor-pointer" />
        )}
      </div>
    </div>
  );
}
