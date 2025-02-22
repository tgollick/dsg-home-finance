"use client";

import * as React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { CalendarIcon, LucideMoveRight } from "lucide-react";
import { trpc } from "../../../../utils/providers/TrpcProviders";
import confetti from "canvas-confetti";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// 1. Define a Zod schema for form validation
const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  emailAddress: z
    .string()
    .email({ message: "Please enter a valid email address" }),
  phoneNumber: z
    .string()
    .min(1, { message: "Please enter a valid phone number" }),
  currentSituation: z
    .string()
    .min(1, { message: "Please enter your current situation" }),
  specificQuestions: z.string(),
  date: z.date({
    required_error: "A date of birth is required.",
  }),
  time: z.string().min(1, { message: "Please enter a time" }),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must give consent to be contacted",
  }),
});

export function ContactForm() {
  const [loading, setLoading] = useState(false);

  const addContact = trpc.contactRouter.addContact.useMutation({
    onSuccess: () => {
      toast({
        title: "Contact Message Sent",
        description: "Your message has been sent to David!",
      });

      shootConfetti();
      setLoading(false);
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Contact Message Error",
        description:
          "Your contact has not been sent. Please contact David at enquires@dsghomefinance.co.uk",
        variant: "destructive",
      });
    },
  });

  // 2. Set up React Hook Form with Zod resolver
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      emailAddress: "",
      phoneNumber: "",
      currentSituation: "",
      specificQuestions: "",
      date: getNextBusinessDay(),
      time: "",
      consent: false,
    },
  });

  const shootConfetti = () => {
    const end = Date.now() + 3 * 1000; // 3 seconds
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };

  // 3. Handle form submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    addContact.mutate({
      fullname: values.firstName,
      email: values.emailAddress,
      phone: values.phoneNumber,
      situation: values.currentSituation,
      other: values.specificQuestions,
      date: values.date,
      time: values.time,
    });
  }

  // Function to get the next business day
  function getNextBusinessDay() {
    const today = new Date();
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + 1);

    // Check if the next day is Saturday or Sunday
    while (nextDay.getDay() === 0 || nextDay.getDay() === 6) {
      nextDay.setDate(nextDay.getDate() + 1);
    }

    return nextDay;
  }

  return (
    <div
      className="
        absolute 
        xl:top-60
        top-[32rem]
        md:top-[38rem]
        lg:top-[40rem]
        right-0
        w-full 
        max-w-[1200px]
        xl:max-w-lg
        p-6 
        bg-white 
        shadow-md 
        rounded-md
        z-50
        font-sans
      "
    >
      <h2 className="text-3xl md:text-4xl font-serif mb-4">Get in Contact</h2>

      {/* 4. Wrap your form in ShadCN's <Form> component */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* First Name */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Fullname</FormLabel>
                <FormControl>
                  <Input
                    className="py-6 bg-gray-200"
                    placeholder="First Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email Address */}
          <FormField
            control={form.control}
            name="emailAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Email Address</FormLabel>
                <FormControl>
                  <Input
                    className="py-6 bg-gray-200"
                    placeholder="Email Address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone Number */}
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Phone Number</FormLabel>
                <FormControl>
                  <Input
                    className="py-6 bg-gray-200"
                    placeholder="Phone Number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Current Situation */}
          <FormField
            control={form.control}
            name="currentSituation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Current Situation</FormLabel>
                <FormControl>
                  <Input
                    className="bg-gray-200 py-6"
                    placeholder="Current Situation"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  For example, First Time Buyer, Selling House, Remortaging
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Any Specific Questions */}
          <FormField
            control={form.control}
            name="specificQuestions"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">
                  Any Specific Questions?
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="bg-gray-200 h-[200px]"
                    placeholder="Any Specific Questions?"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Any questions you might want answered in the first chat.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-base">Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full bg-gray-200 py-6 pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date: Date) => {
                        const today = new Date();
                        const tomorrow = new Date(today);
                        tomorrow.setDate(today.getDate() + 1);
                        const day = date.getDay(); // 0 = Sunday, 6 = Saturday
                        return date < tomorrow || day === 0 || day === 6;
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  The date that works best for David to give you a call.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Time</FormLabel>
                <FormControl>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="bg-gray-200 py-6 text-sm w-full text-black hover:bg-white">
                        {field.value || "Select a time"}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {Array.from({ length: 17 }, (_, i) => {
                        const hour = Math.floor(i / 2) + 9; // 9 AM to 5 PM
                        const minute = i % 2 === 0 ? "00" : "30"; // 00 or 30 minutes
                        const timeString = `${hour}:${minute.padStart(2, "0")}`;
                        return (
                          <DropdownMenuItem
                            key={timeString}
                            onClick={() => field.onChange(timeString)}
                          >
                            {timeString}
                          </DropdownMenuItem>
                        );
                      })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </FormControl>
                <FormDescription>
                  The time that works best for you!
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Consent Checkbox */}
          <FormField
            control={form.control}
            name="consent"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-4 pb-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(!!checked)}
                    className="bg-gray-200 w-4 h-4"
                  />
                </FormControl>
                <FormLabel className="text-base leading-tight">
                  I give consent to be Contacted by DSG Home Finance regarding
                  my Mortgage and Protection
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full text-lg h-full py-4 bg-[#F49FB7] hover:bg-[#ee7195]"
          >
            {!loading ? (
              <span className="flex items-center gap-2">
                Send Message to David
                <LucideMoveRight />
              </span>
            ) : (
              <span className="flex items-center gap-4">
                Sending message...
                <span className="loader"></span>
              </span>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
