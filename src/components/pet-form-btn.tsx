import React from "react";
import { Button } from "./ui/button";

type PetFormBtnProps = {
  actionType: string;
};

export default function PetFormBtn({ actionType }: PetFormBtnProps) {
  return (
    <Button type="submit" className="mt-5 self-end">
      {actionType === "add" ? "Add a new  Pet" : "Edit Pet"}
    </Button>
  );
}
