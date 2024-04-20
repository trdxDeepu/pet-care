"use client";

import { Pet } from "@/lib/type";
import { useState, createContext } from "react";

type TPetContext = {
  pets: Pet[];
  selectedPetID: string | null;
  handleSelectedPetID: (id: string) => void;
  selectedPet: Pet | undefined;
  totalPets: number;  
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

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetID,
        handleSelectedPetID,
        selectedPet,
        totalPets
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
