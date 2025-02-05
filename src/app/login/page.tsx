"use client";
import React from "react";
import { useSession, signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogIn, Shield, Lock, BarChart } from "lucide-react";
import Image from "next/image";
import dsgGrey from "../../../public/dsg-logo-grey.png";
import { ModeToggle } from "@/components/theme-toggle";

const Login = () => {
  const { data: session } = useSession();

  if (session) {
    redirect("/admin/dashboard");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4 relative">
      <ModeToggle />
      <div className="w-full max-w-2xl">
        <Card className="shadow-xl rounded-xl overflow-hidden">
          <div className="relative flex flex-col md:flex-row">
            {/* Left Panel */}
            <div className="bg-primary/90 p-8 md:w-1/2 flex flex-col items-center justify-center space-y-6 text-center">
              <Image
                src={dsgGrey}
                alt="DSG Logo"
                width={140}
                className="filter brightness-0 invert"
              />
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-background">
                  DSG Home Finance Portal
                </h2>
                <p className="text-sm text-background/80">
                  Secure, modern financial management
                </p>
              </div>
            </div>

            {/* Right Panel */}
            <div className="p-8 md:w-1/2">
              <CardContent className="space-y-6">
                <div className="text-center space-y-3">
                  <CardTitle className="text-3xl font-bold tracking-tight">
                    Welcome Back
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Sign in to continue to your dashboard
                  </CardDescription>
                </div>

                <Button
                  onClick={() =>
                    signIn("google", { callbackUrl: "/admin/dashboard" })
                  }
                  className="w-full h-12 text-base font-semibold gap-3"
                  variant="outline"
                >
                  <LogIn className="h-5 w-5" />
                  Continue with Google
                </Button>

                {/* Improved Feature Cards */}
                <div className="grid grid-cols-3 gap-6 pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-2 p-2 rounded-full bg-primary/10">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium mb-1">Secure</span>
                    <p className="text-xs text-muted-foreground leading-tight">
                      256-bit SSL
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-2 p-2 rounded-full bg-primary/10">
                      <Lock className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium mb-1">Protected</span>
                    <p className="text-xs text-muted-foreground leading-tight">
                      2FA Ready
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-2 p-2 rounded-full bg-primary/10">
                      <BarChart className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium mb-1">Analytics</span>
                    <p className="text-xs text-muted-foreground leading-tight">
                      Real-time
                    </p>
                  </div>
                </div>
              </CardContent>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
