"use client";

import * as React from "react";
import { Calculator, LucideMessageCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  monthlyIncome: z.string().min(1, "Required"),
  monthlyExpenses: z.string().min(1, "Required"),
  depositAmount: z.string().min(1, "Required"),
});

export default function MortgageCalculator() {
  const router = useRouter();
  const [calculatedAmount, setCalculatedAmount] = React.useState<number | null>(
    null
  );
  const [activeTab, setActiveTab] = React.useState("residential");
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      monthlyIncome: "",
      monthlyExpenses: "",
      depositAmount: "",
    },
  });

  function calculateBorrowingAmount(values: z.infer<typeof formSchema>) {
    const income = Number.parseFloat(values.monthlyIncome) * 12;
    const expenses = Number.parseFloat(values.monthlyExpenses) * 12;
    const deposit = Number.parseFloat(values.depositAmount);

    let maxBorrowing = 0;

    if (activeTab === "residential") {
      // For 2025, assuming a more conservative 4.5x income multiple for residential
      maxBorrowing = Math.min(
        (income - expenses) * 4.5,
        (income - expenses) * 4.5 + deposit
      );
    } else {
      // For buy-to-let in 2025, using a typical 75% LTV and 125% rental coverage
      const rentalIncome = income * 0.75; // Assuming 75% of income is rental for BTL
      maxBorrowing = Math.min(
        deposit / 0.25,
        (rentalIncome * 12) / 1.25 / 0.05
      ); // 5% interest rate assumption
    }

    setCalculatedAmount(maxBorrowing);
    setIsDialogOpen(true);
  }

  return (
    <div className="absolute right-50 lg:bottom-[-50px] md:bottom-[-75px] sm:bottom-[-100px] bottom-[-150px] z-[100] w-full max-w-[90%] lg:max-w-4xl mx-auto bg-white rounded-lg shadow-sm border p-4 font-sans">
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setActiveTab("residential")}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-md transition-colors",
            activeTab === "residential"
              ? "bg-[#F49FB7] text-white"
              : "bg-gray-100 hover:bg-gray-200"
          )}
        >
          Residential Mortgage
        </button>
        <button
          onClick={() => setActiveTab("buy-to-let")}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-md transition-colors",
            activeTab === "buy-to-let"
              ? "bg-[#F49FB7] text-white"
              : "bg-gray-100 hover:bg-gray-200"
          )}
        >
          Buy-To-Let Mortgage
        </button>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(calculateBorrowingAmount)}
          className="space-y-4"
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 items-end">
            <FormField
              control={form.control}
              name="monthlyIncome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">
                    Monthly Income <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-2.5 top-2.5 text-sm text-gray-500">
                        £
                      </span>
                      <Input
                        type="number"
                        className="pl-6"
                        placeholder="0.00"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="monthlyExpenses"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">
                    Monthly Expenses <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-2.5 top-2.5 text-sm text-gray-500">
                        £
                      </span>
                      <Input
                        type="number"
                        className="pl-6"
                        placeholder="0.00"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="depositAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">
                    Deposit Amount <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-2.5 top-2.5 text-sm text-gray-500">
                        £
                      </span>
                      <Input
                        type="number"
                        className="pl-6"
                        placeholder="0.00"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="bg-[#F49FB7] hover:bg-[#ef7a9b] h-10"
            >
              <Calculator className="mr-2 h-4 w-4" />
              Calculate
            </Button>
          </div>
        </form>
      </Form>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px] w-[95vw] max-h-[90vh] z-[500] rounded-lg overflow-hidden p-0 bg-[#1e1e1e] text-white border border-[#F49FB7] flex flex-col">
          <div className="bg-gradient-to-r from-[#F49FB7] to-[#F49FB7]/70 p-4 pt-10 sm:p-6">
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl sm:text-3xl text-[#1e1e1e]">
                Estimated Borrowing Amount
              </DialogTitle>
              <DialogDescription className="text-[#1e1e1e]/80 text-sm sm:text-base">
                Based on the information provided, here&aptos;s an estimate of
                what you might be able to borrow:
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <p className="text-3xl sm:text-4xl font-bold text-[#1e1e1e] font-serif">
                £{calculatedAmount?.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="p-4 sm:p-6 overflow-y-auto flex-grow">
            <div className="bg-[#F49FB7]/10 border border-[#F49FB7]/30 rounded-lg p-3 sm:p-4 mb-4">
              <h4 className="font-serif text-base sm:text-lg text-[#F49FB7] mb-1 sm:mb-2">
                Mortgage Type
              </h4>
              <p className="text-white text-sm sm:text-base">
                {activeTab === "residential" ? "Residential" : "Buy-to-Let"}{" "}
                Mortgage
              </p>
            </div>
            <p className="text-xs sm:text-sm text-gray-300 mb-3">
              This is an estimate based on the information provided. Actual
              borrowing amounts may vary depending on additional factors and
              lender criteria.
            </p>
            <p className="text-xs sm:text-sm text-gray-300">
              <strong className="text-[#F49FB7]">Important:</strong> This
              calculation is not a guarantee of a mortgage offer and does not
              constitute financial advice. Please consult with a qualified
              mortgage advisor for personalized recommendations.
            </p>
          </div>
          <DialogFooter className="bg-[#1e1e1e] px-4 sm:px-6 py-3 sm:py-4 border-t border-[#F49FB7]/20 mt-auto">
            <Button
              variant="default"
              onClick={() => router.push("/contact")}
              className="bg-[#F49FB7] text-white hover:bg-[#fff] hover:text-[#1e1e1e] w-full sm:w-auto"
            >
              Chat with David
              <LucideMessageCircle />
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              className="border-[#F49FB7] text-[#F49FB7] hover:bg-[#1e1e1e] hover:text-[#F49FB7] hover:border-2 hover:border-[#F49FB7] w-full sm:w-auto"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
