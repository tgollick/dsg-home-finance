"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { trpc } from "../../../../../utils/providers/TrpcProviders";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, LucideSave, XCircle } from "lucide-react";
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
    const truncated = plainText.length > 155 ? `${plainText.slice(0, 155)}...` : plainText;

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
      content: values.content,
    });
    setEditLoading(false);
    router.push("/admin/blogs");
  };

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
        <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Create new blog</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
          Write the blog content, set the publishing details and add SEO information before saving.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
          <Card className="border-border/70 bg-card shadow-sm">
            <CardHeader>
              <CardTitle>Blog content</CardTitle>
              <CardDescription>The main title and article body shown on the website.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g. First-time buyer mortgage tips" />
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
                        <Input {...field} placeholder="David Gollick" />
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
                        <Input {...field} placeholder="https://..." />
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
                <CardDescription>Helps the blog display properly in search results.</CardDescription>
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
                <CardDescription>Save the new blog or return to the blog list.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button type="submit" disabled={editLoading} className="w-full">
                  {editLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <LucideSave className="h-4 w-4" />
                      Save blog
                    </>
                  )}
                </Button>

                <Button type="button" variant="outline" className="w-full" onClick={() => router.push("/admin/blogs")}>
                  <XCircle className="h-4 w-4" />
                  Cancel
                </Button>
              </CardContent>
            </Card>
          </div>
        </form>
      </Form>
    </div>
  );
}
