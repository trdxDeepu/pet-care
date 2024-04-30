import ContentBlock from "@/components/content-block";
import H1 from "@/components/h1";

import SignOutBtn from "@/components/ui/sign-out-btn";
import { auth, signOut } from "@/lib/auth";

import { redirect } from "next/navigation";

export default async function Account() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <main>
      <H1 className="my-8 text-white">Your Account</H1>
      <ContentBlock className="h-[450px] flex flex-col gap-4 justify-center items-center">
        <p>Logged in as {session?.user?.email}</p>
        <SignOutBtn />
      </ContentBlock>
    </main>
  );
}
