"use server";

import prisma from "@/lib/db";

import { sleep } from "@/lib/utils";
import { revalidatePath } from "next/cache";

import { Pet, Prisma } from "@prisma/client";
import { authFormSchema, petFormSchema, petIdSchema } from "@/lib/validation";
import { signIn, signOut } from "@/lib/auth";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { checkAuth, getPetById } from "@/lib/server-utils";
import { AuthError } from "next-auth";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/* User login and signup  */

export async function login(prevstate: unknown, formData: unknown) {
  await sleep(1000);
  // check if formData is instance of FormData
  if (!(formData instanceof FormData)) {
    return {
      message: "Invalid form data",
    };
  }
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": {
          return {
            message: "Invalid credentials",
          };
        }
        default:
          return {
            message: "Error while signing in",
          };
      }
    }
    throw error;
  }

  // redirect("/app/dashboard");
}

export async function signUp(prevState: unknown, formData: unknown) {
  // check if formData is instance of FormData
  await sleep(1000);

  if (!(formData instanceof FormData)) {
    return {
      message: "Invalid form data",
    };
  }

  const formDataEnteries = Object.fromEntries(formData.entries());

  // validating the form data

  const validatedFormData = authFormSchema.safeParse(formDataEnteries);

  if (!validatedFormData.success) {
    return {
      message: "Invalid form data",
    };
  }

  const { email, password } = validatedFormData.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        email,
        hashedPassword,
      },
    });

    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          message: "User with this email already exists",
        };
      }
    }
    return {
      message: "could not create user",
    };
  }

  // redirect("/app/dashboard");
}

// Logout  function

export async function logout() {
  await sleep(1000);
  await signOut({ redirectTo: "/" });
}

/* Server actions for pets  */

export async function addPet(petData: unknown) {
  const session = await checkAuth();

  await sleep(1000);

  const validatedPet = petFormSchema.safeParse(petData);
  if (!validatedPet.success) {
    return {
      message: "Invalid Pet Data",
    };
  }

  try {
    await prisma.pet.create({
      data: {
        ...validatedPet.data,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });
  } catch (error) {
    return {
      message: "Error while adding pet",
    };
  }
  revalidatePath("/app", "layout");
}

export async function editPet(petId: unknown, updateNewPet: unknown) {
  const session = await checkAuth();

  await sleep(1000);

  const editValidPet = petFormSchema.safeParse(updateNewPet);
  const validatedPetId = petIdSchema.safeParse(petId);

  if (!editValidPet.success || !validatedPetId.success) {
    return {
      message: "Invalid Pet Data",
    };
  }

  // authorizatio check for valid pet in edit

  const pet = await getPetById(validatedPetId.data);

  if (!pet) {
    return {
      message: "Pet not found",
    };
  }

  if (pet.userId !== session.user.id) {
    return {
      message: "You are not authorized to edit the pet",
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
  // AUTHENTICATING THE USER

  const session = await checkAuth();

  await sleep(1000);

  // VALIDATING THE PET ID

  const validatedPetId = petIdSchema.safeParse(petId);

  if (!validatedPetId.success) {
    return {
      message: "Cant delete pet with invalid id",
    };
  }

  // authorizing the user to delete the pet

  const pet = await getPetById(validatedPetId.data);

  if (!pet) {
    return {
      message: "Pet not found",
    };
  }

  if (pet.userId !== session.user.id) {
    return {
      message: "You are not authorized to delete this pet",
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

// Payment function to checkout session

export async function createCheckoutSession() {
  // authentication check
  const session = await checkAuth();


  // create checkout session
  const checkoutSession = await stripe.checkout.sessions.create({
    customer_email: session.user.email,
    line_items: [
      {
        price: "price_1PBLImSI8uIfEVFxJvLu1aVh",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.PUBLIC_URL}/payment?success=true`,
    cancel_url: `${process.env.PUBLIC_URL}/payment?cancelled=true`,
  });

  // redirect user
  redirect(checkoutSession.url);
}