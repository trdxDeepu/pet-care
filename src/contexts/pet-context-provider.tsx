"use client";

import { addPet } from "@/actions/action";
import { Pet } from "@/lib/type";
import { useState, createContext } from "react";

type TPetContext = {
  pets: Pet[];
  selectedPetID: string | null;
  selectedPet: Pet | undefined;
  totalPets: number;
  handleSelectedPetID: (id: string) => void;
  handleCheckOutPet: (id: string) => void;
  handleAddPet: (newPet: Omit<Pet, "id">) => void;
  handleEditPet: (petId: string, updateNewPet: Omit<Pet, "id">) => void;
};

export const PetContext = createContext<TPetContext | null>(null);

type PetContextProps = {
  data: Pet[];
  children: React.ReactNode;
};

export default function PetContextProvider({
  data:pets,
  children,
}: PetContextProps) {
  // const [pets, setPets] = useState(data);



  const [selectedPetID, setSelectedPetID] = useState<string | null>(null);

  const selectedPet = pets.find((pet) => pet.id === selectedPetID);

  const totalPets = pets.length;

  const handleSelectedPetID = (id: string) => {
    setSelectedPetID(id);
  };
  
  const handleAddPet = async (newPet: Omit<Pet, "id">) => {
    // setPets((prev) => [...prev, { ...newPet, id: Date.now().toString() }]);
    await addPet(newPet);
  };

  // const handleEditPet = (petId: string, updateNewPet: Omit<Pet, "id">) => {
  //   setPets((prev) =>
  //     prev.map((pet) => {
  //       if (pet.id === petId) {
  //         return { id: petId, ...updateNewPet };
  //       }
  //       return pet;
  //     })
  //   );
  // };


  // checkout

  // const handleCheckOutPet = (id: string) => {
  //   setPets((prev) => prev.filter((pet) => pet.id !== id));
  // };

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetID,
        handleSelectedPetID,
        selectedPet,
        totalPets,
        handleAddPet,
        // handleCheckOutPet,
        // handleEditPet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
