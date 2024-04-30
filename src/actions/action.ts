"use server";

import prisma from "@/lib/db";

import { sleep } from "@/lib/utils";
import { revalidatePath } from "next/cache";

import { Pet } from "@prisma/client";
import { petFormSchema, petIdSchema } from "@/lib/validation";
import {  signIn, signOut } from "@/lib/auth";
import bcrypt from "bcrypt";
import { redirect } from 'next/navigation'

/* User login and signup  */

export async function login(formData: FormData) {
  const authData = Object.fromEntries(formData.entries());
  await signIn("credentials", authData);
  redirect('/app/dashboard')
  console.log("Logged in");
   
}

export async function signUp(formData: FormData) {

  const hashedPassword = await bcrypt.hash(
    formData.get("password") as string,
    10
  );

  await prisma.user.create({
    data: {
      email: formData.get("email") as string,
      hashedPassword,
    },
  });

  await signIn("credentials", formData);
  redirect('/app/dashboard')
}

// Logout  function

export async function logout() {
  await signOut({ redirectTo: "/" });
}

/* Server actions for pets  */

export async function addPet(petData: unknown) {
  await sleep(1000);

  const validatedPet = petFormSchema.safeParse(petData);
  if (!validatedPet.success) {
    return {
      message: "Invalid Pet Data",
    };
  }

  try {
    await prisma.pet.create({
      data: validatedPet.data,
    });
  } catch (error) {
    return {
      message: "Error while adding pet",
    };
  }
  revalidatePath("/app", "layout");
}

export async function editPet(petId: unknown, updateNewPet: unknown) {
  await sleep(1000);

  const editValidPet = petFormSchema.safeParse(updateNewPet);
  const validatedPetId = petIdSchema.safeParse(petId);

  if (!editValidPet.success || !validatedPetId.success) {
    return {
      message: "Invalid Pet Data",
    };
  }

  try {
    await prisma.pet.update({
      where: {
        id: validatedPetId.data,
      },
      data: editValidPet.data,
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

  const validatedPetId = petIdSchema.safeParse(petId);
  if (!validatedPetId.success) {
    return {
      message: "Cant delete pet with invalid id",
    };
  }

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
