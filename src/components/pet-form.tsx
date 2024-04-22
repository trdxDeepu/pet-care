"use client";

import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import usePetContext from "@/hooks/use-context";

type PetFormProps = {
  actionType: "add" | "edit";
  onFormSubmission: () => void;
};

export default function PetForm({
  actionType,
  onFormSubmission,
}: PetFormProps) {
  const { handleAddPet, selectedPet, handleEditPet } = usePetContext();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const Pet = {
      //   id: Math.random().toString(36).substr(2, 9),
      name: formData.get("name") as string,
      ownerName: formData.get("ownerName") as string,
      imageUrl:
        (formData.get("imageUrl") as string) ||
        "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
      age: +(formData.get("age") as string),
      notes: formData.get("notes") as string,
    };

    // console.log(newPet)

    if (actionType === "add") {
      handleAddPet(Pet);
    }
    else if (actionType==="edit"){
        handleEditPet(selectedPet!.id,Pet)
    }

    onFormSubmission();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            name="name"
            required
            defaultValue={actionType === "edit" ? `${selectedPet?.name}` : ""}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input
            id="ownerName"
            type="text"
            name="ownerName"
            required
            defaultValue={
              actionType === "edit" ? `${selectedPet?.ownerName}` : ""
            }
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="imgUrl">Image url</Label>
          <Input
            id="ownerName"
            type="text"
            name="imageUrl"
            defaultValue={
              actionType === "edit" ? `${selectedPet?.imageUrl}` : ""
            }
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            name="age"
            required
            defaultValue={actionType === "edit" ? `${selectedPet?.age}` : ""}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            rows={3}
            name="notes"
            required
            defaultValue={actionType === "edit" ? `${selectedPet?.notes}` : ""}
          />
        </div>
      </div>
      <Button type="submit" className="mt-5 self-end">
        {actionType === "add" ? "Add a new  Pet" : "Edit Pet"}
      </Button>
    </form>
  );
}
