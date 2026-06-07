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
import { ArrowLeft, Loader2, LucideSave, LucideTrash2, Mail, Phone, UserRound } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
      utils.contactRouter.getContact.invalidate({ id: userId });

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

    const now = new Date().toISOString();

    editContact.mutate({
      contactId: userId,
      ...values,
      other: values.other || "",
      updatedAt: now,
    });

    setEditLoading(false);
    router.push("/admin/applications");
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-[60vh] w-full items-center justify-center p-6">
        <Card className="max-w-md border-destructive/30">
          <CardHeader>
            <CardTitle className="text-destructive">Error loading contact</CardTitle>
            <CardDescription>
              {error?.message || "Failed to load contact information"}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-4 md:p-8">
      <div>
        <Button variant="ghost" size="sm" className="mb-3 -ml-3" onClick={() => router.push("/admin/applications")}>
          <ArrowLeft className="h-4 w-4" />
          Back to applications
        </Button>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{data.fullname}</h1>
        <p className="mt-1.5 max-w-2xl text-sm leading-6 text-muted-foreground">
          Review and update the contact details submitted through the website.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
          <Card className="border-border/70 bg-card shadow-sm">
            <CardHeader>
              <CardTitle>Contact details</CardTitle>
              <CardDescription>Core information for this applicant.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="fullname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full name</FormLabel>
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
                      <FormLabel>Phone number</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
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
                    <FormLabel>Other information</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-border/70 bg-card shadow-sm">
              <CardHeader>
                <CardTitle>Applicant summary</CardTitle>
                <CardDescription>Quick reference details.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex gap-3 rounded-xl border bg-background p-3">
                  <UserRound className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{data.fullname}</p>
                    <p className="text-muted-foreground">{data.situation}</p>
                  </div>
                </div>
                <div className="flex gap-3 rounded-xl border bg-background p-3">
                  <Mail className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <p className="break-all text-muted-foreground">{data.email}</p>
                </div>
                <div className="flex gap-3 rounded-xl border bg-background p-3">
                  <Phone className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <p className="text-muted-foreground">{data.phone}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/70 bg-card shadow-sm">
              <CardHeader>
                <CardTitle>Actions</CardTitle>
                <CardDescription>Save updates or remove this contact.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button type="submit" disabled={editLoading} className="w-full">
                  {editLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Saving contact...
                    </>
                  ) : (
                    <>
                      <LucideSave className="h-4 w-4" />
                      Save changes
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-destructive/30 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  onClick={() => {
                    setDeleteLoading(true);
                    deleteContact.mutate({
                      contactId: data.id,
                    });
                    router.push("/admin/applications");
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
                      Delete contact
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditForm;
