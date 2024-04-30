"use client";
import { createCheckoutSession } from "@/actions/action";
import H1 from "@/components/h1";
import { Button } from "@/components/ui/button";

import React, { useTransition } from "react";

type SearchParamsProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function Payment({ searchParams }: SearchParamsProps) {
  const [isPending, startTransition] = useTransition();
  return (
    <main className="flex flex-col space-y-10 items-center">
      <H1>Pet access required payment</H1>
      {!searchParams.success && (
        <Button
        onClick={async () => {
          startTransition(async () => {
            await createCheckoutSession();
          });
        }}
          disabled={isPending}
        >
          Buy life time access for $299
        </Button>
      )}
      {searchParams.success && (
        <p className="text-sm text-green-500">
          Payment successfull you may have access to the pet care.
        </p>
      )}
      {searchParams.cancelled && (
        <p className="text-sm text-red-500">
          Payment cancless you may try again.
        </p>
      )}
    </main>
  );
}
