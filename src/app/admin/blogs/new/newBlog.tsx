// src/app/admin/blogs/new/newBlog.tsx
"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { trpc } from "../../../../../utils/providers/TrpcProviders";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Loader2, LucideTrash2, LucideSave } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import TiptapEditor from "@/components/TiptapEditor";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  image: z.string().min(1, "Image is required"),
  metaTitle: z.string().min(1, "Meta Title is required"),
  metaDescription: z.string().min(1, "Meta Description is required"),
  content: z.string().min(1, "Content is required"),
});

type FormValues = z.infer<typeof formSchema>;

export default function NewBlog() {
  const router = useRouter();
  const [editLoading, setEditLoading] = useState(false);
  const utils = trpc.useUtils();

  const addBlog = trpc.blogRouter.addBlog.useMutation({
    onSuccess: () => {
      utils.blogRouter.getAllBlogs.invalidate();
      toast({
        title: "Blog Added",
        description: "Your blog has been added successfully.",
      });
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: "Error!",
        description: "Failed to add the blog.",
        variant: "destructive",
      });
    },
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      image: "",
      metaTitle: "",
      metaDescription: "",
      content: "",
    },
  });

  const watchedTitle = form.watch("title");
  const watchedContent = form.watch("content");

  useEffect(() => {
    if (!watchedTitle && !watchedContent) return;

    const plainText = watchedContent.replace(/<[^>]*>/g, " ").trim();
    const truncated = plainText.length > 155 ? plainText.slice(0, 155) + "..." : plainText;

    const currentMetaTitle = form.getValues("metaTitle");
    const currentMetaDesc = form.getValues("metaDescription");

    if (!currentMetaTitle && watchedTitle) {
      form.setValue("metaTitle", watchedTitle, { shouldValidate: true });
    }
    if (!currentMetaDesc && plainText) {
      form.setValue("metaDescription", truncated, { shouldValidate: true });
    }
  }, [watchedTitle, watchedContent, form]);

    const onSubmit = (values: FormValues) => {
      setEditLoading(true);
      addBlog.mutate({
        title: values.title,
        author: values.author,
        image: values.image,
        metaTitle: values.metaTitle,
        metaDescription: values.metaDescription,
        content: values.content, // ← sanitized HTML from Tiptap
      });
      setEditLoading(false);
      router.push("/admin/blogs");
    };

  return (
    <Card className="p-6 flex flex-col items-start gap-2 w-full max-w-[900px]">
      <h1 className="text-4xl font-bold mb-6">Create New Blog</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
          {/* Title */}
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

          {/* Author */}
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

          {/* Meta Title */}
          <FormField
            control={form.control}
            name="metaTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Meta Description */}
          <FormField
            control={form.control}
            name="metaDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Description</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Cover Image */}
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cover Image URL</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="https://..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Tiptap Editor */}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <TiptapEditor value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Buttons */}
          <div className="flex flex-col gap-2">
            <Button type="submit" disabled={editLoading} className="w-full">
              {editLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <LucideSave className="h-4 w-4 mr-2" />
                  Save Blog
                </>
              )}
            </Button>

            <Button
              type="button"
              variant="destructive"
              className="w-full"
              onClick={() => router.push("/admin/blogs")}
            >
              <LucideTrash2 className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
}
