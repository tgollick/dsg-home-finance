import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "What is a mortgage, and how does it work?",
    answer:
      "A mortgage is a loan specifically designed to help you buy a property. When you take out a mortgage, a lender (like a bank or building society) agrees to lend you money to purchase a home, and in return, the property itself acts as security for the loan. This means if you can't repay the mortgage, the lender could take back the property (though this is rare and always a last resort).",
  },
  {
    question: "How much deposit do I need to buy a home?",
    answer:
      "The minimum deposit required typically ranges from 5% to 20% of the property's value. The exact amount depends on factors like the mortgage type, your credit history, and the lender's requirements. A larger deposit often secures better interest rates.",
  },
  {
    question: "What is a Mortgage Agreement in Principle?",
    answer:
      "A Mortgage Agreement in Principle (AIP) is a statement from a lender indicating how much they might be willing to lend you based on initial information. It's not a guarantee but can show estate agents and sellers that you're a serious buyer.",
  },
  {
    question: "How long does it take to get a mortgage?",
    answer:
      "The mortgage application process typically takes 2-6 weeks from application to offer, though this can vary depending on your circumstances and the lender. The full process, including property purchase, usually takes 2-3 months.",
  },
  {
    question: "What documents do I need for a mortgage application?",
    answer:
      "You'll typically need proof of identity, address history, income (payslips/tax returns), bank statements, details of any debts, and information about the property you want to buy.",
  },
  {
    question: "How is my mortgage eligibility assessed?",
    answer:
      "Lenders assess your eligibility based on factors including your income, credit history, existing debts, employment status, deposit size, and the property value. They'll also conduct affordability checks to ensure you can manage the repayments.",
  },
];

export default function FAQ() {
  return (
    <div className="w-full bg-[#1e1e1e] relative z-0">
      <div className="absolute inset-0 bg-gradient-to-t from-[#F49FB7]/10 to-[#1e1e1e]/60 z-[-5]"></div>
      <div className="grid-background absolute w-full h-full opacity-5 z-[-10]" />
      <section className="max-w-[1400px] mx-auto pt-14 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif mb-4 text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base font-sans mb-4 max-w-3xl mx-auto text-white">
            Got questions about the mortgage process? Our FAQ section covers the
            most common queries to help you feel informed and confident. Whether
            you're a first-time buyer or looking to re-mortgage, find
            straightforward answers to guide you every step of the way.
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
}
