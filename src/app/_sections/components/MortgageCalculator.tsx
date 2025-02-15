"use client";

import * as React from "react";
import { Calculator, LucideMessageCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";

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

// Create a motion-enabled version of the Button component.
const MotionButton = motion(Button);

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
      maxBorrowing = Math.min(
        (income - expenses) * 4.5,
        (income - expenses) * 4.5 + deposit
      );
    } else {
      const rentalIncome = income * 0.75;
      maxBorrowing = Math.min(
        deposit / 0.25,
        (rentalIncome * 12) / 1.25 / 0.05
      );
    }

    setCalculatedAmount(maxBorrowing);
    setIsDialogOpen(true);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute shadow-lg right-50 lg:bottom-[-50px] md:bottom-[-75px] sm:bottom-[-100px] bottom-[-150px] z-[100] w-full max-w-[90%] lg:max-w-4xl mx-auto bg-white rounded-lg border p-4 font-sans"
    >
      <div className="flex gap-4 mb-4">
        <motion.button
          onClick={() => setActiveTab("residential")}
          className={cn(
            "px-4 py-2 text-sm md:text-base font-medium rounded-md transition-colors",
            activeTab === "residential"
              ? "bg-[#F49FB7] text-white"
              : "bg-gray-100 hover:bg-gray-200"
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Residential Mortgage
        </motion.button>
        <motion.button
          onClick={() => setActiveTab("buy-to-let")}
          className={cn(
            "px-4 py-2 text-sm md:text-base font-medium rounded-md transition-colors",
            activeTab === "buy-to-let"
              ? "bg-[#F49FB7] text-white"
              : "bg-gray-100 hover:bg-gray-200"
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Buy-To-Let Mortgage
        </motion.button>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(calculateBorrowingAmount)}
          className="space-y-4"
        >
          <motion.div
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 items-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <FormField
                control={form.control}
                name="monthlyIncome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm md:text-base">
                      Monthly Income <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-2.5 top-2 md:top-1.5 text-sm md:text-base text-gray-500">
                          £
                        </span>
                        <Input
                          type="number"
                          className="pl-6 text-sm md:text-base"
                          placeholder="0.00"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <FormField
                control={form.control}
                name="monthlyExpenses"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm md:text-base">
                      Credit Expenses{" "}
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-2.5 top-2 md:top-1.5 text-sm md:text-base text-gray-500">
                          £
                        </span>
                        <Input
                          type="number"
                          className="pl-6 text-sm md:text-base"
                          placeholder="0.00"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <FormField
                control={form.control}
                name="depositAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm md:text-base">
                      Deposit Amount <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-2.5 top-2 md:top-1.5 text-sm md:text-base text-gray-500">
                          £
                        </span>
                        <Input
                          type="number"
                          className="pl-6 text-sm md:text-base"
                          placeholder="0.00"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <MotionButton
                type="submit"
                className="w-full h-full bg-[#F49FB7] text-white hover:bg-[#f281a4] transition text-sm md:text-base font-sans"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Calculator className="h-4 w-4" />
                Calculate
              </MotionButton>
            </motion.div>
          </motion.div>
        </form>
      </Form>

      <AnimatePresence>
        {isDialogOpen && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[425px] w-[95vw] max-h-[90vh] z-[500] rounded-lg overflow-hidden p-0 bg-[#1e1e1e] text-white border border-[#F49FB7] flex flex-col">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-r from-[#F49FB7] to-[#F49FB7]/70 p-4 pt-10 sm:p-6"
              >
                <DialogHeader>
                  <DialogTitle className="font-serif text-2xl sm:text-3xl text-[#1e1e1e]">
                    Estimated Borrowing Amount
                  </DialogTitle>
                  <DialogDescription className="text-[#1e1e1e]/80 text-sm sm:text-base">
                    Based on the information provided, here's an estimate of
                    what you might be able to borrow:
                  </DialogDescription>
                </DialogHeader>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="mt-4"
                >
                  <p className="text-3xl sm:text-4xl font-bold text-[#1e1e1e] font-serif">
                    £{calculatedAmount?.toLocaleString()}
                  </p>
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="p-4 sm:p-6 overflow-y-auto flex-grow"
              >
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
                  calculation is not a guarantee of a mortgage offer and does
                  not constitute financial advice. Please consult with a
                  qualified mortgage advisor for personalized recommendations.
                </p>
              </motion.div>
              <DialogFooter className="bg-[#1e1e1e] px-4 sm:px-6 py-3 sm:py-4 border-t border-[#F49FB7]/20 mt-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                >
                  <MotionButton
                    variant="default"
                    onClick={() => router.push("/contact")}
                    className="bg-[#F49FB7] text-white hover:bg-[#fff] hover:text-[#1e1e1e] w-full mb-2 sm:mb-0"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Chat with David
                    <LucideMessageCircle />
                  </MotionButton>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                >
                  <MotionButton
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    className="border-[#F49FB7] text-[#F49FB7] hover:bg-[#1e1e1e] hover:text-[#F49FB7] hover:border-2 hover:border-[#F49FB7] w-full sm:w-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Close
                  </MotionButton>
                </motion.div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
