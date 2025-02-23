import Image from "next/image";
import Link from "next/link";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-[#1e1e1e] flex flex-col items-center justify-center p-4 font-sans relative">
      <NavBar />
      <div className="absolute w-full h-full bg-[url(https://images.unsplash.com/photo-1672088095186-c6c6ecd0fa21?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-center bg-cover opacity-10 blur-sm" />
      <div className="w-full max-w-md mx-auto flex flex-col items-center gap-8 z-50">
        {/* Logo */}
        <Image
          src="/DSGGreyLogo.png"
          alt="DSG Home Finance"
          width={120}
          height={60}
          priority
          className="-mb-14"
        />

        {/* 404 Text */}
        <div className="text-center space-y-4">
          <h1 className="text-[10rem] font-serif bg-gradient-to-r from-[#F49FB7] to-[#f36e93] text-transparent bg-clip-text">
            404
          </h1>
          <h2 className="text-4xl text-white font-serif">Page Not Found</h2>
          <p className="text-zinc-400 max-w-sm mx-auto">
            The page you're looking for doesn't exist or has been moved. Let's
            get you back on track.
          </p>
        </div>

        {/* Return Home Button */}
        <Button
          asChild
          className="bg-[#F49FB7] hover:bg-[#f3628b] text-white mt-4"
        >
          <Link href="/" className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            Return Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
