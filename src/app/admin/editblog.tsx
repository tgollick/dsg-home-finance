"use client";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { trpc } from "../../../utils/providers/TrpcProviders";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
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
import DeleteButton from "../admin/blogs/deletebutton";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { CardHeader } from "@/components/ui/card";

const formSchema = z.object({
  title: z.string(),
  content: z.string(),
  author: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

const EditBlog = ({ blogId }: { blogId: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const utils = trpc.useUtils();
  const { data, isLoading, error } = trpc.blogRouter.getBlog.useQuery({
    id: blogId,
  });

  const mutation = trpc.blogRouter.editBlog.useMutation({
    onSuccess: () => {
      console.log("Success!");
      utils.blogRouter.getBlogs.invalidate();

      router.push(`/admin/blogs`);

      toast({
        title: "Blog Updated",
        description: "Your Blog has been updated successfully.",
      });
    },
    onError: (error) => {
      console.log(error);
      toast({
        title: "Blog Update Error!",
        description: "Your blog has not updated successfully.",
      });
    },
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      author: "",
    },
  });

  // Update form when data is loaded
  useEffect(() => {
    if (data) {
      form.reset({
        title: data.title,
        content: data.content,
        author: data.author,
      });
    }
  }, [data, form]);

  const onSubmit = (values: FormValues) => {
    setLoading(true);

    mutation.mutate({
      id: blogId,
      ...values, // Ensure other is never undefined
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
    <Card className="p-6 flex flex-col items-start gap-2 max-w-[600px]">
      <CardHeader>
        <div>
          <h1 className="text-5xl font-extrabold">Edit Blog Post</h1>
          <p className="mt-4 max-w-3xl text-lg">
            Update and manage your blog posts efficiently.
          </p>
        </div>
      </CardHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea {...field} className="h-[300px]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex md:flex-row flex-col w-full items-center gap-4">
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save />
                  Save Changes
                </>
              )}
            </Button>
            <DeleteButton id={data?.id ? data?.id : ""} />
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default EditBlog;
