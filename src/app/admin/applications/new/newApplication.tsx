"use client";

import React, { useState } from "react";
import { z } from "zod";
import { trpc } from "../../../../../utils/providers/TrpcProviders";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import {
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  fullname: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(1, "Phone number is required"),
  situation: z.string().min(1, "Situation is required"),
  other: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

const NewApplication = () => {
  const router = useRouter();
  const utils = trpc.useUtils();
  const [loading, setLoading] = useState(false);

  const mutation = trpc.contactRouter.addContact.useMutation({
    onSuccess: () => {
      utils.contactRouter.getContacts.invalidate();
      router.push("/admin/applications/");
      toast({
        title: "Contact Successfully Added",
        description: "The new contact has been integrated into your system.",
        variant: "default",
        duration: 3000,
      });
    },
    onError: (error) => {
      toast({
        title: "Contact Creation Failed",
        description:
          "An error occurred while processing your request. Please verify the details and try again." +
          error.message,
        variant: "destructive",
      });
    },
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      phone: "",
      situation: "",
      other: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    setLoading(true);

    mutation.mutate({
      fullname: values.fullname,
      email: values.email,
      phone: values.phone,
      situation: values.situation,
      other: values.other || "",
    });

    setLoading(false);
  };

  return (
    <Card className="p-6 flex flex-col items-start gap-2 w-full md:max-w-[500px]">
      <h1 className="text-4xl font-bold mb-6">Add New File</h1>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full"
        >
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="situation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Situation</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="other"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Other Information</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </FormProvider>
    </Card>
  );
};

export default NewApplication;
