"use client";
import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Logout = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <Button
      className="flex items-center p-2 gap-2 hover:cursor-pointer w-full"
      onClick={handleSignOut}
    >
      <LogOut size={15} />
      <p className="text-sm">Sign Out</p>
    </Button>
  );
};

export default Logout;
