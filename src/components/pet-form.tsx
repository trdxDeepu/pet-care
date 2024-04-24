"use client";

import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import usePetContext from "@/hooks/use-context";
import { addPet, editPet } from "@/actions/action";
import PetFormBtn from "./pet-form-btn";
import { toast } from "sonner";

type PetFormProps = {
  actionType: "add" | "edit";
  onFormSubmission: () => void;
};

export default function PetForm({
  actionType,
  onFormSubmission,
}: PetFormProps) {
  const { selectedPet } = usePetContext();

  return (
    <form
      action={async (formData) => {
        if (actionType === "add") {
          const error = await addPet(formData);
          if (error) {
            toast.error(error.message);
            return;
          }
        } else if (actionType === "edit") {
          const error = await editPet(formData, selectedPet?.id);
          if (error) {
            toast.error(error.message);
            return;
          }
        }
        onFormSubmission();
      }}
      className="flex flex-col"
    >
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
      <PetFormBtn actionType={actionType} />
    </form>
  );
}
