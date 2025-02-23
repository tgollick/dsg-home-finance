"use client";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { trpc } from "../../../../../../utils/providers/TrpcProviders";
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
import { Loader2, LucideTrash2, LucideSave } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";

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

  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const utils = trpc.useUtils();

  const { data, isLoading, error } = trpc.contactRouter.getContact.useQuery({
    id: userId,
  });

  const editContact = trpc.contactRouter.editContact.useMutation({
    onSuccess: () => {
      utils.contactRouter.getContacts.invalidate();

      toast({
        title: "Contact Updated",
        description: "Your contact has been updated successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Contact Update Error!",
        description: "Your contact has not updated successfully.",
        variant: "destructive",
      });
    },
  });

  const deleteContact = trpc.contactRouter.deleteContact.useMutation({
    onSuccess: () => {
      utils.contactRouter.getContacts.invalidate();

      toast({
        title: "Contact Deleted Successfully",
        description: "You have successfully deleted the contact.",
      });
    },
    onError: () => {
      toast({
        title: "Contact Deletion Error",
        description:
          "There has been an error deleting the contact. Please contact your system administrator",
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
    setEditLoading(true);

    router.push("/admin/applications");

    const now = new Date().toISOString();

    editContact.mutate({
      contactId: userId,
      ...values,
      other: values.other || "",
      updatedAt: now,
    });

    setEditLoading(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center w-full full">
        <div className="text-center text-destructive">
          <h2 className="text-lg font-semibold mb-4">Error Loading Contact</h2>
          <p className="mb-4">Please contact you system administrator</p>
          <p>{error?.message || "Failed to load contact information"}</p>
        </div>
      </div>
    );
  }

  return (
    <Card className="p-6 flex flex-col items-start gap-2 max-w-[600px]">
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

          <div>
            <Button
              type="submit"
              disabled={editLoading}
              className="w-full mb-2"
            >
              {editLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving contact...
                </>
              ) : (
                <>
                  <LucideSave className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>

            <Button
              className="text-destructive w-full"
              onClick={() => {
                setDeleteLoading(true);
                router.push("/admin/applications");
                deleteContact.mutate({
                  contactId: data.id,
                });
              }}
              disabled={deleteLoading}
            >
              {deleteLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Deleting contact...
                </>
              ) : (
                <>
                  <LucideTrash2 className="h-4 w-4" />
                  Delete Contact
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default EditForm;
