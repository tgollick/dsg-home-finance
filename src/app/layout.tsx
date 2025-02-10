import type { Metadata } from "next";
import "./globals.css";
import { TRPCProvider } from "../../utils/providers/TrpcProviders";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import AuthProvider from "./sessionProvider";
import dsgGrey from "../../public/dsg-logo-white.png";
import { DM_Sans, DM_Serif_Display } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "700"],
  display: "swap",
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-dm-serif-display",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DSG Home Finance | Expert Mortgage Solutions & Home Loan Services",
  description:
    "Discover competitive mortgage rates and personalized home loan solutions. Fast approvals, expert guidance, and secure online management. Start your application today!",
  icons: {
    icon: dsgGrey.src,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`h-full w-full ${dmSans.variable} ${dmSerifDisplay.variable}`}
      >
        <TRPCProvider>
          <AuthProvider>
            <main className="flex-1 overflow-auto">{children}</main>
          </AuthProvider>
        </TRPCProvider>
        <Toaster />
      </body>
    </html>
  );
}
