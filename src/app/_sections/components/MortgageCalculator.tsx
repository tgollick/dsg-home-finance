"use client";
import * as React from "react";
import { Calculator, LucideMessageCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";

const MotionButton = motion.create(Button);

const formSchema = z.object({
  yearlyIncome: z.string().min(1, "Required"),
  monthlyExpenses: z.string().min(1, "Required"),
  dependents: z.string().min(1, "Required"),
  depositAmount: z.string().min(1, "Required"),
});

export default function MortgageCalculator() {
  const router = useRouter();
  const [isJoint, setIsJoint] = React.useState(false);
  const [calculationResults, setCalculationResults] = React.useState({
    maxBorrowingAmount: 0,
    totalPropertyValue: 0,
    estimatedMonthlyPayment: 0,
    loanToValue: 0,
  });
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      yearlyIncome: "",
      monthlyExpenses: "",
      dependents: "",
      depositAmount: "",
    },
  });

  function calculateBorrowingAmount(values: z.infer<typeof formSchema>) {
    const yearlyIncome = Number.parseFloat(values.yearlyIncome);
    const monthlyExpenses = Number.parseFloat(values.monthlyExpenses);
    const dependents = Number.parseInt(values.dependents);
    const deposit = Number.parseFloat(values.depositAmount);

    let maxBorrowingAmount = 0;
    const interestRate = 0.035;
    const loanTermYears = 25;
    const monthlyInterestRate = interestRate / 12;
    const numberOfPayments = loanTermYears * 12;

    if (isJoint) {
      const incomePerPerson = yearlyIncome / 2;
      const baseMultiplier = 4.75;
      let multiplier1 = baseMultiplier;
      let multiplier2 = baseMultiplier;

      multiplier1 -= dependents > 0 ? 0.1 : 0;
      multiplier2 -= dependents > 1 ? 0.1 : 0;

      const annualExpenses = monthlyExpenses * 12;
      const stressRate = 0.065;
      const stressedMonthlyRate = stressRate / 12;

      const stressedPayment1 =
        (incomePerPerson * multiplier1 * stressedMonthlyRate * Math.pow(1 + stressedMonthlyRate, numberOfPayments)) /
        (Math.pow(1 + stressedMonthlyRate, numberOfPayments) - 1);
      const stressedPayment2 =
        (incomePerPerson * multiplier2 * stressedMonthlyRate * Math.pow(1 + stressedMonthlyRate, numberOfPayments)) /
        (Math.pow(1 + stressedMonthlyRate, numberOfPayments) - 1);

      const totalStressedPayment = stressedPayment1 + stressedPayment2;
      const affordableMonthlyUnderStress = (yearlyIncome * 0.38) / 12 - monthlyExpenses * 0.75;

      if (totalStressedPayment > affordableMonthlyUnderStress * 12 * loanTermYears) {
        const adjustedTotalBorrow = (affordableMonthlyUnderStress * 12 * loanTermYears * stressedMonthlyRate * Math.pow(1 + stressedMonthlyRate, numberOfPayments)) /
          (Math.pow(1 + stressedMonthlyRate, numberOfPayments) - 1);
        maxBorrowingAmount = adjustedTotalBorrow;
      } else {
        maxBorrowingAmount = incomePerPerson * (multiplier1 + multiplier2);
      }
      maxBorrowingAmount = Math.min(maxBorrowingAmount, yearlyIncome * 5.5);
      maxBorrowingAmount = Math.max(maxBorrowingAmount, yearlyIncome * 3.5);
    } else {
      let incomeMultiplier = 5.0;
      incomeMultiplier -= dependents * 0.08;
      incomeMultiplier = Math.max(incomeMultiplier, 4.0);

      const annualExpensesImpact = monthlyExpenses * 12;
      const affordabilityReduction = annualExpensesImpact * 0.75;

      maxBorrowingAmount = yearlyIncome * incomeMultiplier - affordabilityReduction;
      maxBorrowingAmount *= 0.97;

      const stressRate = 0.065;
      const stressedMonthlyRate = stressRate / 12;
      const stressedPayment =
        (maxBorrowingAmount * stressedMonthlyRate * Math.pow(1 + stressedMonthlyRate, numberOfPayments)) /
        (Math.pow(1 + stressedMonthlyRate, numberOfPayments) - 1);

      const disposableIncome = yearlyIncome * 0.36 / 12 - monthlyExpenses;
      if (stressedPayment > disposableIncome) {
        maxBorrowingAmount = (disposableIncome * (Math.pow(1 + stressedMonthlyRate, numberOfPayments) - 1)) /
          (stressedMonthlyRate * Math.pow(1 + stressedMonthlyRate, numberOfPayments));
      }

      maxBorrowingAmount = Math.max(maxBorrowingAmount, yearlyIncome * 3.5);
    }

    const totalPropertyValue = maxBorrowingAmount + deposit;

    const estimatedMonthlyPayment =
      maxBorrowingAmount > 0
        ? (maxBorrowingAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
          (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1)
        : 0;

    const loanToValue = totalPropertyValue > 0 ? (maxBorrowingAmount / totalPropertyValue) * 100 : 0;

    setCalculationResults({
      maxBorrowingAmount,
      totalPropertyValue,
      estimatedMonthlyPayment,
      loanToValue,
    });
    setIsDialogOpen(true);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute shadow-lg right-50 lg:bottom-[-50px] md:bottom-[-75px] sm:bottom-[-100px] bottom-[-175px] z-[100] w-full max-w-[90%] lg:max-w-4xl mx-auto bg-white rounded-lg border p-4 font-sans"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <div className="mb-4 sm:mb-2">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Residential Mortgage Calculator
          </h3>
          <p className="text-xs text-gray-500">
            Enter your <span className="font-bold">yearly income</span> alongside your <span className="font-bold">credit commitments (monthly, e.g. £50 for a credit card payment)</span>, the <span className="font-bold">number of dependants</span> and <span className="font-bold">total deposit</span> to get an estimated amount you could borrow!
          </p>
        </div>
        <MotionButton
          type="submit"
          form="mortgage-form"
          className="bg-[#F49FB7] text-white hover:bg-[#f281a4] transition text-sm sm:text-base font-sans px-4 py-2 w-full sm:w-fit flex-grow h-8 sm:h-12"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Calculator className="h-5 w-5" />
          Calculate
        </MotionButton>
      </div>
      <Form {...form}>
        <form
          id="mortgage-form"
          onSubmit={form.handleSubmit(calculateBorrowingAmount)}
          className="space-y-4"
        >
          <div className="flex items-center justify-between mb-3 w-fit mx-auto sm:mx-0 gap-3">
            <span className="text-sm font-bold">Individual</span>
            <Switch
              checked={isJoint}
              onCheckedChange={setIsJoint}
              className="data-[state=checked]:bg-[#F49FB7]"
            />
            <span className="text-sm font-bold">Joint</span>
          </div>
          <motion.div
            className="grid gap-x-4 gap-y-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-4"
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
                name="yearlyIncome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">
                      {isJoint ? "Joint Income" : "Yearly Income"} <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-2.5 top-2 text-sm text-gray-500">
                          £
                        </span>
                        <Input
                          type="number"
                          className="pl-6 text-sm"
                          placeholder="0"
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
                    <FormLabel className="text-sm">
                      Credit Commitments<span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-2.5 top-2 text-sm text-gray-500">
                          £
                        </span>
                        <Input
                          type="number"
                          className="pl-6 text-sm"
                          placeholder="0"
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
                name="dependents"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">
                      Dependents <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        className="text-sm"
                        placeholder="0"
                        {...field}
                      />
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
                    <FormLabel className="text-sm">
                      Deposit <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-2.5 top-2 text-sm text-gray-500">
                          £
                        </span>
                        <Input
                          type="number"
                          className="pl-6 text-sm"
                          placeholder="0"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </motion.div>
          </motion.div>
        </form>
      </Form>
      <AnimatePresence>
        {isDialogOpen && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[480px] w-[95vw] max-h-[90vh] z-[500] rounded-lg overflow-hidden p-0 bg-[#1e1e1e] text-white border border-[#F49FB7] flex flex-col font-sans">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-r from-[#F49FB7] to-[#F49FB7]/70 p-4 pt-8 sm:p-6"
              >
                <DialogHeader className="mb-2">
                  <DialogTitle className="font-serif text-2xl text-[#1e1e1e]">
                    Your Mortgage Estimate
                  </DialogTitle>
                </DialogHeader>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  <p className="text-3xl font-bold text-[#1e1e1e] font-serif">
                    £
                    {calculationResults.maxBorrowingAmount?.toLocaleString(
                      undefined,
                      { maximumFractionDigits: 0 }
                    )}
                  </p>
                  <p className="text-sm text-[#1e1e1e]/80">
                    Maximum borrowing amount
                  </p>
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="p-4 sm:p-5 overflow-y-auto flex-grow"
              >
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="bg-[#F49FB7]/10 border border-[#F49FB7]/30 rounded-lg p-3">
                    <h4 className="font-serif text-sm text-[#F49FB7] mb-1">
                      Property Value
                    </h4>
                    <p className="text-white text-sm">
                      £
                      {calculationResults.totalPropertyValue?.toLocaleString(
                        undefined,
                        { maximumFractionDigits: 0 }
                      )}
                    </p>
                  </div>
                  <div className="bg-[#F49FB7]/10 border border-[#F49FB7]/30 rounded-lg p-3">
                    <h4 className="font-serif text-sm text-[#F49FB7] mb-1">
                      Monthly Payment
                    </h4>
                    <p className="text-white text-sm">
                      £
                      {calculationResults.estimatedMonthlyPayment?.toLocaleString(
                        undefined,
                        { maximumFractionDigits: 0 }
                      )}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-gray-300 mb-3">
                  This calculation is based on a 25-year mortgage term with an
                  estimated interest rate of 3.5%.
                </p>
                <p className="text-xs text-gray-300">
                  <strong className="text-[#F49FB7]">Important:</strong> This
                  calculation is not a guarantee of a mortgage offer and does
                  not constitute financial advice.
                </p>
              </motion.div>
              <DialogFooter className="bg-[#1e1e1e] px-4 sm:px-5 py-3 border-t border-[#F49FB7]/20 mt-auto flex flex-col sm:flex-row gap-2">
                <MotionButton
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="border-[#F49FB7] text-[#F49FB7] hover:bg-[#1e1e1e] hover:text-[#F49FB7] hover:border-2 hover:border-[#F49FB7] w-full order-1 sm:order-none"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close
                </MotionButton>
                <MotionButton
                  variant="default"
                  onClick={() => router.push("/contact")}
                  className="bg-[#F49FB7] text-white hover:bg-[#fff] hover:text-[#1e1e1e] w-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <LucideMessageCircle className="h-4 w-4 mr-2" />
                  Chat with David
                </MotionButton>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
