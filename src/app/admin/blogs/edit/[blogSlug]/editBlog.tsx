"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { trpc } from "../../../../../../utils/providers/TrpcProviders";
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
  image: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  content: z.string().min(1, "Content is required"),
});

type FormValues = z.infer<typeof formSchema>;

const EditBlog = ({ blogSlug }: { blogSlug: string }) => {
  const router = useRouter();

  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const utils = trpc.useUtils();

  const { data, isLoading, error } = trpc.blogRouter.getBlog.useQuery({
    slug: blogSlug,
  });

  const editBlog = trpc.blogRouter.editBlog.useMutation({
    onSuccess: () => {
      utils.blogRouter.getAllBlogs.invalidate();
      utils.blogRouter.getBlog.invalidate({ slug: blogSlug });

      router.push(`/admin/blogs`);
      toast({
        title: "Blog Updated",
        description: "Your blog has been updated successfully.",
      });
    },
    onError: (error: unknown) => {
      console.error(error);
      toast({
        title: "Blog Update Error!",
        description: "Your blog was not updated successfully.",
        variant: "destructive",
      });
    },
  });

  const deleteBlog = trpc.blogRouter.deleteBlog.useMutation({
    onSuccess: () => {
      utils.blogRouter.getAllBlogs.invalidate();

      router.push(`/admin/blogs`);

      toast({
        title: "Blog Deleted",
        description: "Your blog has been deleted successfully.",
      });
    },
    onError: (error: unknown) => {
      console.error(error);
      toast({
        title: "Blog Deletion Error!",
        description: "Your blog was not deleted successfully:" + error,
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

  useEffect(() => {
    if (data) {
      form.reset({
        title: data.title,
        author: data.author,
        image: data.image || "",
        metaTitle: data.metaTitle || "",
        metaDescription: data.metaDescription || "",
        content: data.content || "",
      });
    }
  }, [data, form]);

  const onSubmit = (values: FormValues) => {
    setEditLoading(true);
    editBlog.mutate({
      slug: blogSlug,
      ...values,
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
          <h2 className="text-lg font-semibold mb-4">Error Loading Blog</h2>
          <p className="mb-4">Please contact you system administrator</p>
          <p>{error?.message || "Failed to load blog information"}</p>
        </div>
      </div>
    );
  }

  return (
    <Card className="p-6 flex flex-col items-start gap-2 w-full max-w-[900px]">
      <h1 className="text-4xl font-bold mb-6">Edit Blog</h1>
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
          <FormField
            control={form.control}
            name="metaTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Title (optional)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="metaDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Description (optional)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cover Image</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
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
                  <TiptapEditor value={field.value} onChange={field.onChange} />
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
                deleteBlog.mutate({
                  slug: blogSlug,
                });
              }}
              disabled={deleteLoading}
            >
              {deleteLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Deleting blog...
                </>
              ) : (
                <>
                  <LucideTrash2 className="h-4 w-4" />
                  Delete Blog
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default EditBlog;
