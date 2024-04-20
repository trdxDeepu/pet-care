"use client";

import usePetContext from "@/hooks/use-context";
import React from "react";

export default function Stats() {
  const { totalPets } = usePetContext();

  return (
    <section className="text-center">
      <p className="text-2xl font-bold leading-6">{totalPets}</p>
      <p className="opacity-80">current guests</p>
    </section>
  );
}
