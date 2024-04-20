"use client";

import usePetContext from "@/hooks/use-context";
import { Pet } from "@/lib/type";
import Image from "next/image";
import React from "react";

type PetDetailsProps = {
  pet: Pet | undefined;
};

export default function PetDetails() {
  const { selectedPet } = usePetContext();

  return (
    <section className="flex flex-col w-full h-full">
      {!selectedPet ? (
        <EmptyView />
      ) : (
        <>
          <TobBar pet={selectedPet} />
          <OtherInfo pet={selectedPet} />
          <Notes pet={selectedPet} />
        </>
      )}
    </section>
  );
}

function TobBar({ pet }: PetDetailsProps) {
  return (
    <div className="flex items-center bg-white px-8 py-5 border-b border-light">
      <Image
        src={pet?.imageUrl || "/public/logo.svg"}
        alt="selected pet image "
        height={75}
        width={75}
        className="h-[75px] w-[75px] rounded-full object-cover"
      />
      <h2 className="text-3xl font-semibold leading-7 ml-5">{pet?.name}</h2>
    </div>
  );
}

function OtherInfo({ pet }: PetDetailsProps) {
  return (
    <div className="flex justify-around py-10 px-5 ">
      <div>
        <h3 className="text-[14px] font-medium uppercase text-zinc-700">
          Owner Name
        </h3>
        <p className="mt-1 text-lg text-zinc-800 ">{pet?.ownerName}</p>
      </div>
      <div>
        <h3 className="text-[14px] font-medium uppercase text-zinc-700">Age</h3>
        <p className="mt-1 text-lg text-zinc-800 ">{pet?.age}</p>
      </div>
    </div>
  );
}

function Notes({ pet }: PetDetailsProps) {
  return (
    <section className="bg-white px-7 py-5 rounded-md mb-9 mx-8 flex-1 border border-light ">
      {pet?.notes}
    </section>
  );
}

function EmptyView() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-pulse">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
          <div className="flex-1 py-1 space-y-4">
            <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="w-5/6 h-4 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-2xl text-zinc-800">Please select a pet</p>
    </div>
  );
}
