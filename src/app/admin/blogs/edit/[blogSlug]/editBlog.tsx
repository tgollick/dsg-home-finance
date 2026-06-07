"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { trpc } from "../../../../../../utils/providers/TrpcProviders";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, LucideSave, LucideTrash2 } from "lucide-react";
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
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
            <CardTitle className="text-destructive">Error loading blog</CardTitle>
            <CardDescription>{error?.message || "Failed to load blog information"}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 p-4 pt-20 md:p-8">
      <div>
        <Button variant="ghost" className="mb-3 -ml-3" onClick={() => router.push("/admin/blogs")}>
          <ArrowLeft className="h-4 w-4" />
          Back to blogs
        </Button>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          Content editor
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Edit blog</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
          Update the article content, publishing details and search metadata.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
          <Card className="border-border/70 bg-card shadow-sm">
            <CardHeader>
              <CardTitle>Blog content</CardTitle>
              <CardDescription>The title and article body shown on the public website.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
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
                      <TiptapEditor value={field.value} onChange={field.onChange} />
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
                <CardTitle>Publishing details</CardTitle>
                <CardDescription>Basic information attached to the post.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
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
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cover image URL</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>Used as the card image on the public website.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card className="border-border/70 bg-card shadow-sm">
              <CardHeader>
                <CardTitle>SEO</CardTitle>
                <CardDescription>Optional search metadata for the article.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <FormField
                  control={form.control}
                  name="metaTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta title</FormLabel>
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
                      <FormLabel>Meta description</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card className="border-border/70 bg-card shadow-sm">
              <CardHeader>
                <CardTitle>Actions</CardTitle>
                <CardDescription>Save changes or delete this blog post.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button type="submit" disabled={editLoading} className="w-full">
                  {editLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Saving blog...
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
                      Delete blog
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

export default EditBlog;
