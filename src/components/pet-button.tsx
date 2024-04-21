import React from "react";
import { Button } from "./ui/button";
import { PlusIcon } from "@radix-ui/react-icons";

type PetButtonProps = {
  actionType: "add" | "edit" | "checkouts";
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export default function PetButton({
  actionType,
  children,
  onClick,
}: PetButtonProps) {
  if (actionType === "add") {
    return (
      <Button size={"icon"}>
        <PlusIcon />
      </Button>
    );
  }
  if (actionType === "edit") {
    return <Button variant={"secondary"}>{children}</Button>;
  }

  return (
    <Button variant={"secondary"} onClick={onClick}>
      {children}
    </Button>
  );
}
