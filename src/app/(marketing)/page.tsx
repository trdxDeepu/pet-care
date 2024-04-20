import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-[#5dc9a8] min-h-screen flex flex-col lg:flex-row items-center justify-center gap-12">
      <Image
        src={
          "https://bytegrad.com/course-assets/react-nextjs/petsoft-preview.png"
        }
        alt="Petsoft Preview"
        height={519}
        width={472}
      />

      <div className="">
        <Logo />
        <h1 className="text-5xl font-semibold my-6 max-w-[500px]">
          Manage your <span className="font-extrabold"> pet daycare </span> with
          ease.
        </h1>
        <p className="text-2xl max-w-[600px] font-medium ">
          Use PetCare to easily keep track of pets under your pet care. Get
          lifetime access for 2000&#8377;{" "}
        </p>
        <div className="mt-10 space-x-4">
          <Button asChild>
            <Link href={"/signup"}>Get Started</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href={"/login"}>Login</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
