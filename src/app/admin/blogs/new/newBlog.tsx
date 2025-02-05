"use client";

import React, { useState } from "react";
import { z } from "zod";
import { trpc } from "../../../../../utils/providers/TrpcProviders";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { Loader2, LucideCog } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  title: z.string(),
  content: z.string(),
  author: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

const NewBlog = () => {
  const router = useRouter();
  const utils = trpc.useUtils();
  const [loading, setLoading] = useState(false);

  const mutation = trpc.blogRouter.addBlog.useMutation({
    onSuccess: () => {
      utils.blogRouter.getBlogs.invalidate();
      router.push("/admin/blogs/");
      toast({
        title: "New Blog Successfully Added",
        description: "The new blog has been integrated into your system.",
        variant: "default",
        duration: 3000,
      });
    },
    onError: (error) => {
      toast({
        title: "Blog Creation Failed",
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
      title: "",
      content: "",
      author: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    setLoading(true);

    mutation.mutate({
      title: values.title,
      content: values.content,
      author: values.author,
    });

    setLoading(false);
  };

  return (
    <Card className="p-6 flex flex-col items-start gap-2 w-full md:max-w-[500px]">
      <h1 className="text-4xl font-bold mb-6">Create a New Blog</h1>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blog Title</FormLabel>
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
                <FormLabel>Blog Content</FormLabel>
                <FormControl>
                  <Textarea {...field} className="border-solid" />
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
                <FormLabel>Blog Author</FormLabel>
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
                Creating...
              </>
            ) : (
              <>
                <LucideCog />
                Create Blog
              </>
            )}
          </Button>
        </form>
      </FormProvider>
    </Card>
  );
};

export default NewBlog;
