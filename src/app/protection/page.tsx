import { buildMetadata } from "@/lib/metadata";
import NavBar from "@/components/NavBar";
import Hero from "./_sections/Hero";
import ProtectionExplained from "./_sections/ProtectionExplained";
import ProtectionProducts from "./_sections/ProtectionProducts";
import ProtectionSteps from "./_sections/ProtectionSteps";
import CompaniesAndFAQ from "./_sections/CompaniesAndFAQ";
import CTA from "../mortgages/_sections/CTA";
import { Footer } from "../_sections/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Mortgage Protection Insurance in Kent | Life Cover, Critical Illness, Income Protection",
  description:
    "Protect your mortgage and your family with tailored life insurance, critical illness cover and income protection. Independent advice from DSG Home Finance in Margate, serving Thanet and Kent.",
  image: "/og-protection.jpg",
  path: "/protection",
});

export default function Protection() {
  return (
    <main className="w-full flex flex-col items-center border-none">
      <NavBar />
      <Hero />
      <ProtectionExplained />
      <ProtectionProducts />
      <ProtectionSteps />
      <CompaniesAndFAQ />
      <CTA />
      <Footer />
    </main>
  );
}

