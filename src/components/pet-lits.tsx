"use client";

import usePetContext from "@/hooks/use-context";
import { useSearchQuery } from "@/hooks/use-search-context";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { use } from "react";

export default function PetList() {
  const { pets, handleSelectedPetID, selectedPetID } = usePetContext();
  const { searchQuery } = useSearchQuery();

  const filtredPets = pets.filter((pet) =>
    pet.name.toLowerCase().includes(searchQuery)
  );

  return (
    <ul className="bg-white border-b border-light">
      {filtredPets.map((pet) => (
        <li key={pet.id}>
          <button
            onClick={() => handleSelectedPetID(pet.id)}
            className={cn(
              "h-[70px] flex  items-center w-full cursor-pointer px-5 text-base gap-3 hover:bg-[#EFF1F2] focus:[#EFF1F2] transition",
              {
                "bg-[#EFF1F2]": selectedPetID === pet.id,
              }
            )}
          >
            <Image
              src={pet.imageUrl}
              alt="pet image"
              width={45}
              height={45}
              className="rounded-full object-cover h-12 w-12 "
            />
            <p className="font-semibold">{pet.name}</p>
          </button>
        </li>
      ))}
    </ul>
  );
}
