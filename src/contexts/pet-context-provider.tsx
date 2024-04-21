"use client";

import { Pet } from "@/lib/type";
import { useState, createContext } from "react";

type TPetContext = {
  pets: Pet[];
  selectedPetID: string | null;
  handleSelectedPetID: (id: string) => void;
  selectedPet: Pet | undefined;
  totalPets: number;
  handleCheckOutPet: (id: string) => void;
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
  const [pets, setPets] = useState(data);
  const [selectedPetID, setSelectedPetID] = useState<string | null>(null);

  const selectedPet = pets.find((pet) => pet.id === selectedPetID);

  const totalPets = pets.length;

  const handleSelectedPetID = (id: string) => {
    setSelectedPetID(id);
  };

  // checkout

  const handleCheckOutPet = (id: string) => {
    setPets((prev) => prev.filter((pet) => pet.id !== id));
  };

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetID,
        handleSelectedPetID,
        selectedPet,
        totalPets,

        handleCheckOutPet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
