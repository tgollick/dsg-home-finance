"use client";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { trpc } from "../../../utils/providers/TrpcProviders";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import DeleteButton from "./applications/deletebutton";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import ContactedButton from "./applications/contactedbutton";

const formSchema = z.object({
  fullname: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(1, "Phone number is required"),
  situation: z.string().min(1, "Situation is required"),
  other: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const EditForm = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const utils = trpc.useUtils();
  const { data, isLoading, error } = trpc.contactRouter.getContact.useQuery({
    id: userId,
  });

  const mutation = trpc.contactRouter.editContact.useMutation({
    onSuccess: () => {
      console.log("Success!");
      utils.contactRouter.getContacts.invalidate();

      router.push("/admin/applications/");

      toast({
        title: "Contact Updated",
        description: "Your contact has been updated successfully.",
      });
    },
    onError: (error) => {
      console.log(error);
      toast({
        title: "Contact Update Error!",
        description: "Your contact has not updated successfully.",
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

  // Update form when data is loaded
  useEffect(() => {
    if (data) {
      form.reset({
        fullname: data.fullname,
        email: data.email,
        phone: data.phone,
        situation: data.situation,
        other: data.other,
      });
    }
  }, [data, form]);

  const onSubmit = (values: FormValues) => {
    setLoading(true);
    const now = new Date().toISOString();

    mutation.mutate({
      contactId: userId,
      ...values,
      other: values.other || "", // Ensure other is never undefined
      updatedAt: now,
    });

    setLoading(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center w-full h-64">
        <div className="text-center text-destructive">
          <h2 className="text-lg font-semibold">Error Loading Contact</h2>
          <p>{error?.message || "Failed to load contact information"}</p>
        </div>
      </div>
    );
  }

  return (
    <Card className="p-6 flex flex-col items-start gap-2 max-w-[500px]">
      <h1 className="text-4xl font-bold mb-6">{data?.fullname}&apos;s File</h1>
      <Form {...form}>
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
      </Form>

      <ContactedButton id={data?.id} currentState={data?.contacted} />
      <DeleteButton id={data?.id} />
    </Card>
  );
};

export default EditForm;
