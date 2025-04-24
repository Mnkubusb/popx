"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="mx-auto border border-gray-300 flex flex-col justify-end h-full font-sans">
      <div className="h-fit ml-5 w-fit mb-8">
        <h1 className="text-3xl font-bold">Welcome to PopX</h1>
        <p className="w-64 text-muted-foreground text-lg m-1 font-normal">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
      </div>
      <Button className="mx-5 h-10 mb-3"  onClick={()=>{router.push("/register")}}>
          Create Account
      </Button>
      <Button className="mx-5 h-10 mb-14 font-semibold" variant={"secondary"}  onClick={()=>{router.push("/login")}}>
          Already Registered? Login
      </Button>
    </main>
  );
}
