import NavBar from "@/components/NavBar";
import React from "react";
import CTA from "../mortgages/_sections/CTA";
import { Footer } from "../_sections/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// type Props = {}

const Privacy = () => {
  return (
    <div className="relative w-full h-full bg-[#1e1e1e] text-white font-sans">
      <NavBar />
      <div className="absolute w-full h-full bg-gradient-to-t from-[#F49FB7]/10 to-[#1e1e1e]/60" />
      <div className="absolute w-full h-full grid-background opacity-10" />
      <section className="relative mx-auto w-full h-fit max-w-[1400px] pt-32 md:pt-52 pb-20 px-4 z-10">
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif">
            Privacy & Cookies Policy
          </h1>
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <Card className="mt-8 p-4 bg-[#272727] border-[#3f3f3f] text-white bg-opacity-60">
          <CardHeader className="font-serif text-xl sm:text-2xl md:text-3xl">
            <CardTitle className="font-normal">Introduction</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 px-4 pt-0 pb-4">
            <p>
              DSG Home Finance (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;)
              is committed to protecting your privacy. This policy explains how
              we collect, use, and protect your personal information when you
              use our website and services.
            </p>
            <p>
              We are regulated by the Financial Conduct Authority (FCA Number:
              804140) and comply with the UK General Data Protection Regulation
              (GDPR) and the Data Protection Act 2018.
            </p>
          </CardContent>
        </Card>

        <Card className="mt-8 p-4 bg-[#272727] border-[#3f3f3f] text-white bg-opacity-60">
          <CardHeader className="font-serif text-xl sm:text-2xl md:text-3xl">
            <CardTitle className="font-normal">
              Information We Collect
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 px-4 pt-0 pb-4">
            <p>We collect the following information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Name and contact details (email, phone, address)</li>
              <li>Financial information for mortgage assessments</li>
              <li>Employment details</li>
              <li>Property information</li>
              <li>Website usage data through analytics</li>
              <li>Google review data (when you leave a review)</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mt-8 p-4 bg-[#272727] border-[#3f3f3f] text-white bg-opacity-60">
          <CardHeader className="font-serif text-xl sm:text-2xl md:text-3xl">
            <CardTitle className="font-normal">
              How We Use Your Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 px-4 pt-0 pb-4">
            <p>We use your information to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Process mortgage and protection applications</li>
              <li>Send appointment confirmations and updates</li>
              <li>Provide customer support</li>
              <li>Analyze website performance</li>
              <li>Meet regulatory requirements</li>
              <li>Send marketing communications (with consent)</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mt-8 p-4 bg-[#272727] border-[#3f3f3f] text-white bg-opacity-60">
          <CardHeader className="font-serif text-xl sm:text-2xl md:text-3xl">
            <CardTitle className="font-normal">Cookies Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 px-4 pt-0 pb-4">
            <p>We use the following types of cookies:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Essential cookies for website functionality</li>
              <li>Analytics cookies (Google Analytics)</li>
              <li>Preference cookies (theme settings)</li>
              <li>Authentication cookies (for secure login)</li>
            </ul>
            <p>
              You can control cookies through your browser settings. Disabling
              certain cookies may affect website functionality.
            </p>
          </CardContent>
        </Card>

        <Card className="mt-8 p-4 bg-[#272727] border-[#3f3f3f] text-white bg-opacity-60">
          <CardHeader className="font-serif text-xl sm:text-2xl md:text-3xl">
            <CardTitle className="font-normal">Third Party Services</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 px-4 pt-0 pb-4">
            <p>We use the following third-party services:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Google Authentication for secure login</li>
              <li>Google Places API for reviews</li>
              <li>Resend for email communications</li>
              <li>Analytics services for website performance</li>
            </ul>
          </CardContent>
        </Card>

        <Accordion type="single" collapsible className="w-full mt-8 space-y-2">
          <AccordionItem
            value="item-1"
            className="bg-[#272727] border-[#3f3f3f] bg-opacity-60 rounded-lg border"
          >
            <AccordionTrigger className="px-4 hover:no-underline hover:bg-[#272727]/80 rounded-lg text-white font-sans text-sm md:text-base">
              Your Rights Under GDPR
            </AccordionTrigger>
            <AccordionContent className="p-4 text-white font-sans text-sm md:text-base">
              <ul className="list-disc pl-6 space-y-2">
                <li>Right to access your data</li>
                <li>Right to rectification</li>
                <li>Right to erasure</li>
                <li>Right to restrict processing</li>
                <li>Right to data portability</li>
                <li>Right to object to processing</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-2"
            className="bg-[#272727] border-[#3f3f3f] bg-opacity-60 rounded-lg border"
          >
            <AccordionTrigger className="px-4 hover:no-underline hover:bg-[#272727]/80 rounded-lg text-white font-sans text-sm md:text-base">
              Data Retention
            </AccordionTrigger>
            <AccordionContent className="p-4 text-white font-sans text-sm md:text-base">
              <p>
                We retain your personal data for up to 6 years after our
                business relationship ends, in accordance with FCA requirements.
                After this period, your data will be securely deleted unless we
                are required to keep it longer for legal reasons.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-3"
            className="bg-[#272727] border-[#3f3f3f] bg-opacity-60 rounded-lg border"
          >
            <AccordionTrigger className="px-4 hover:no-underline hover:bg-[#272727]/80 rounded-lg text-white font-sans text-sm md:text-base">
              Data Security
            </AccordionTrigger>
            <AccordionContent className="p-4 text-white font-sans text-sm md:text-base">
              <p>
                We implement appropriate technical and organizational measures
                to ensure a level of security appropriate to the risk, including
                SSL encryption, secure data storage, and regular security
                assessments.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Card className="mt-8 p-4 bg-[#272727] border-[#3f3f3f] text-white bg-opacity-60">
          <CardHeader className="font-serif text-xl sm:text-2xl md:text-3xl">
            <CardTitle className="font-normal">Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 px-4 pt-0 pb-4">
            <p>
              For any privacy-related queries or to exercise your rights,
              contact us at:
            </p>
            <p className="font-bold">Email: enquires@dsghomefinance.co.uk</p>
            <p className="font-bold">
              Address: 139 Westbrook Avenue, Margate, Kent, CT9 5HH
            </p>
          </CardContent>
        </Card>
      </section>
      <CTA />
      <Footer />
    </div>
  );
};

export default Privacy;
