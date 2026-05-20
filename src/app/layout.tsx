import type { Metadata } from "next";
import "./globals.css";
import { TRPCProvider } from "../../utils/providers/TrpcProviders";
import { Toaster } from "@/components/ui/toaster";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { buildMetadata } from "@/lib/metadata";

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

export const metadata: Metadata = buildMetadata({
  title: "Mortgage Broker in Margate, Kent | DSG Home Finance",
  description:
    "Independent mortgage broker in Margate serving Thanet and Kent. Whole-of-market access, 5-star rated, 20+ years experience. Book a free chat with David.",
  image: "/og-home.jpg",
  path: "/",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="no-scrollbar" suppressHydrationWarning>
      <body
        className={`no-scrollbar h-full w-full ${dmSans.variable} ${dmSerifDisplay.variable}`}
      >
        <TRPCProvider>
          <main className="flex-1 overflow-auto">
            {children}
            <SpeedInsights />
            <Analytics />
          </main>
        </TRPCProvider>
        <Toaster />
      </body>
    </html>
  );
}
