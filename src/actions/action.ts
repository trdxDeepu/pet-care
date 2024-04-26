"use server";

import prisma from "@/lib/db";

import { sleep } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { PetEssential } from "@/lib/type";
import { Pet } from "@prisma/client";

export async function addPet(petData: PetEssential) {
  await sleep(1000);

  try {
    await prisma.pet.create({
      data: petData,
    });
  } catch (error) {
    return {
      message: "Error while adding pet",
    };
  }
  revalidatePath("/app", "layout");
}

export async function editPet(petId: Pet["id"], updateNewPet: PetEssential) {
  await sleep(1000);

  try {
    await prisma.pet.update({
      where: {
        id: petId,
      },
      data: updateNewPet,
    });
  } catch (error) {
    return {
      message: "Error while adding pet",
    };
  }
  revalidatePath("/app", "layout");
}

export async function deletePet(petId: Pet["id"]) {
  await sleep(1000);

  try {
    await prisma?.pet.delete({
      where: {
        id: petId,
      },
    });
  } catch (error) {
    return {
      message: "Error while deleting pet",
    };
  }
  revalidatePath("/app", "layout");
}
