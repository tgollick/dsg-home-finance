import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { LogoCarousel } from "@/components/ui/logo-carousel";
import { LucidePackageSearch } from "lucide-react";

const faqData = [
  {
    question: "What types of mortgage protection insurance are available?",
    answer:
      "There are several types of protection available: Life Insurance (pays out if you die), Critical Illness Cover (pays out if you're diagnosed with a specified serious illness), Income Protection (provides regular payments if you can't work due to illness or injury), and Buildings & Contents Insurance (protects your property and belongings). You can choose one or combine multiple types of coverage based on your needs.",
  },
  {
    question: "Do I legally need mortgage protection insurance?",
    answer:
      "While buildings insurance is typically required by mortgage lenders, other types of protection insurance aren't legally mandatory. However, having protection in place is strongly recommended to ensure your mortgage can be paid if something happens to you or your income.",
  },
  {
    question: "How much does mortgage protection insurance cost?",
    answer:
      "The cost varies depending on factors like your age, health, occupation, the type and amount of coverage, and the term length. Monthly premiums can start from as little as £10 but will increase based on your circumstances and the level of protection you choose.",
  },
  {
    question: "What's the difference between single and joint policies?",
    answer:
      "A single policy covers one person, while a joint policy covers two people (typically couples). Joint policies usually pay out once, upon the first claim. Single policies can be more flexible and ensure both parties have independent coverage, though they may cost more than a joint policy.",
  },
  {
    question: "When should I take out mortgage protection insurance?",
    answer:
      "It's best to arrange protection insurance when you take out your mortgage or even before completion. This ensures you're covered from day one of your mortgage and may get better rates while you're younger and healthier.",
  },
  {
    question: "Will my protection policy pay out if I lose my job?",
    answer:
      "Standard life or critical illness cover won't pay out for job loss. However, Income Protection can cover you if you can't work due to illness or injury, and some providers offer unemployment cover as an additional option. Always check the specific terms of your policy.",
  },
];

const CompaniesAndFAQ = () => {
  return (
    <div className="w-full bg-[#1e1e1e] relative z-0">
      <div className="absolute inset-0 bg-gradient-to-t from-[#F49FB7]/10 to-[#1e1e1e]/60 z-[-5]"></div>
      <div className="grid-background absolute w-full h-full opacity-5 z-[-10]" />
      <section className="mx-auto w-full max-w-[1400px] pb-14 pt-20 px-6 flex flex-col items-center text-center md:gap-10 gap-8">
        <div className="w-full max-w-[800px] text-white">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif leading-tight mb-6">
            Backed by Industry Leaders
          </h2>
          <p className="text-sm sm:text-base font-sans">
            David partners exclusively with award-winning, FCA-regulated
            industry leaders—including equity release, life insurance, and home
            protection specialists—to ensure you receive tailored, reliable
            solutions. Every provider is vetted for exceptional service,
            flexible products, and proven claims support, so your mortgage
            journey stays secure at every step.
          </p>
        </div>
        <div className="hidden sm:block">
          <LogoCarousel columns={3} />
        </div>
        <div className="block sm:hidden">
          <LogoCarousel columns={2} />
        </div>
        {/* New component to show off products  */}
        <Button className="w-full md:w-auto bg-[#F49FB7] text-white hover:bg-[#f281a4] transition text-sm md:text-base font-sans">
          Find your perfect product
          <LucidePackageSearch />
        </Button>{" "}
      </section>
      <section className="max-w-[1400px] mx-auto pt-14 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif mb-4 text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base font-sans mb-4 max-w-3xl mx-auto text-white">
            Got questions about protection insurance? Our FAQ section covers the
            most common queries about life insurance, critical illness cover,
            and income protection. Find clear answers about how to protect
            yourself, your family, and your home with the right coverage for
            your needs.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-2">
            {faqData.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-zinc-900/50 rounded-lg border border-zinc-800"
              >
                <AccordionTrigger className="px-4 hover:no-underline hover:bg-zinc-900 rounded-lg text-white font-sans text-sm md:text-base">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="p-4 text-white font-sans text-sm md:text-base">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
};

export default CompaniesAndFAQ;
