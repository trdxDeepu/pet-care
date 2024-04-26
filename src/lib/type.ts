import { Pet } from "@prisma/client";

export type PetEssential = Omit<Pet, "id" | "updatedAt" | "createdAt">;
