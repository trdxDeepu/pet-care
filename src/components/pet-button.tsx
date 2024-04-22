import React from "react";
import { Button } from "./ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";

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
  if (actionType === "checkouts") {
    return (
      <Button variant={"secondary"} onClick={onClick}>
        {children}
      </Button>
    );
  }

  if (actionType === "add" || "edit") {
    return (
      <Dialog>
        <DialogTrigger>
          {actionType === "add" ? (
            <Button size={"icon"}>
              <PlusIcon />
            </Button>
          ) : (
            <Button variant={"secondary"}>{children}</Button>
          )}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === "add" ? "Add Pet" : "Edit Pet"}
            </DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }
}
