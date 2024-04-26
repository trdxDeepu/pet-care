"use client";

import { addPet, deletePet, editPet } from "@/actions/action";
import { Pet } from "@/lib/type";
import { useState, createContext, useOptimistic } from "react";
import { act } from "react-dom/test-utils";
import { toast } from "sonner";

type TPetContext = {
  pets: Pet[];
  selectedPetID: string | null;
  selectedPet: Pet | undefined;
  totalPets: number;
  handleSelectedPetID: (id: string) => void;
  handleCheckOutPet: (id: string) => void;
  handleAddPet: (newPet: Omit<Pet, "id">) => Promise<void>;
  handleEditPet: (
    petId: string,
    updateNewPet: Omit<Pet, "id">
  ) => Promise<void>;
};

export const PetContext = createContext<TPetContext | null>(null);

type PetContextProps = {
  data: Pet[];
  children: React.ReactNode;
};

export default function PetContextProvider({
  data,
  children,
}: PetContextProps) {
  // const [pets, setPets] = useState(data);

  // using optimistic UI as  for realtime update and wokrking and using i as useReducer

  const [optimiticPets, setOptimisticPets] = useOptimistic(
    data,
    (state, { action, payload }) => {
      switch (action) {
        case "add":
          return [...state, { id: Math.random().toString(), ...payload }];

        case "edit":
          return state.map((pet) => {
            if (pet.id === payload.petId) {
              return { ...pet, ...payload.updateNewPet };
            }
            return pet;
          });
        case "delete":
          return state.filter((pet) => pet.id !== payload);

        default:
          return state;
      }
    }
  );

  const [selectedPetID, setSelectedPetID] = useState<string | null>(null);

  const selectedPet = optimiticPets.find((pet) => pet.id === selectedPetID);

  const totalPets = optimiticPets.length;

  const handleSelectedPetID = (id: string) => {
    setSelectedPetID(id);
  };

  const handleAddPet = async (newPet: Omit<Pet, "id">) => {
    setOptimisticPets({ action: "add", payload: newPet });
    const error = await addPet(newPet);
    if (error) {
      toast.warning(error.message);
      return;
    }

    // await addPet(newPet);
  };

  const handleEditPet = async (
    petId: string,
    updateNewPet: Omit<Pet, "id">
  ) => {
    setOptimisticPets({ action: "edit", payload: { petId, updateNewPet } });
    const error = await editPet(petId, updateNewPet);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  // checkout

  const handleCheckOutPet = async (petId: string) => {
    setOptimisticPets({ action: "delete", payload: petId });
    await deletePet(petId);
    toast.success("Pet deleted successfully");
  };

  return (
    <PetContext.Provider
      value={{
        pets: optimiticPets,
        selectedPetID,
        handleSelectedPetID,
        selectedPet,
        totalPets,
        handleAddPet,
        handleCheckOutPet,
        handleEditPet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
