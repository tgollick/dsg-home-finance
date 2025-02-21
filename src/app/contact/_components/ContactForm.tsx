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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { LucideMoveRight } from "lucide-react";
import { trpc } from "../../../../utils/providers/TrpcProviders";
import confetti from "canvas-confetti";

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
    });
  }

  return (
    <div
      className="
        absolute 
        top-60
        left-[70%]
        -translate-x-1/2
        w-full 
        max-w-lg 
        p-6 
        bg-white 
        shadow-md 
        rounded-md
        z-50
        font-sans
      "
    >
      <h2 className="text-3xl md:text-4xl font-serif mb-4">Get in Contact</h2>

      {/* 4. Wrap your form in ShadCN’s <Form> component */}
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
                <FormLabel className="text-base  leading-tight">
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
