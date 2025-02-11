"use client";
import { useEffect, useState } from "react";
import { z } from "zod";
import { trpc } from "../../../utils/providers/TrpcProviders";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Save, Plus, Trash2 } from "lucide-react";
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
import { Card, CardHeader } from "@/components/ui/card";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  sections: z.array(
    z.object({
      id: z.string().optional(),
      title: z.string().min(1, "Section title is required"),
      content: z.string().min(1, "Section content is required"),
      order: z.number(),
    })
  ),
  featuredImages: z.array(
    z.object({
      id: z.string().optional(),
      url: z.string().url("Invalid URL"),
      altText: z.string().optional(),
    })
  ),
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
      utils.blogRouter.getBlogs.invalidate();
      router.push(`/admin/blogs`);
      toast({
        title: "Blog Updated",
        description: "Your Blog has been updated successfully.",
      });
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: "Blog Update Error!",
        description: "Your blog has not updated successfully.",
        variant: "destructive",
      });
    },
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      metaTitle: "",
      metaDescription: "",
      sections: [],
      featuredImages: [],
    },
  });

  const {
    fields: sectionFields,
    append: appendSection,
    remove: removeSection,
  } = useFieldArray({
    control: form.control,
    name: "sections",
  });

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control: form.control,
    name: "featuredImages",
  });

  useEffect(() => {
    if (data) {
      form.reset({
        title: data.title,
        author: data.author,
        metaTitle: data.metaTitle || "",
        metaDescription: data.metaDescription || "",
        sections: data.sections.map((section) => ({
          id: section.id,
          title: section.title,
          content: section.content,
          order: section.order,
        })),
        featuredImages: data.featuredImage.map((image) => ({
          id: image.id,
          url: image.url,
          altText: image.altText || "",
        })),
      });
    }
  }, [data, form]);

  const onSubmit = (values: FormValues) => {
    setLoading(true);
    mutation.mutate({
      id: blogId,
      ...values,
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
          <h2 className="text-lg font-semibold">Error Loading Blog</h2>
          <p>{error?.message || "Failed to load blog information"}</p>
        </div>
      </div>
    );
  }

  return (
    <Card className="p-6 flex flex-col items-start gap-2 max-w-[800px]">
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
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Sections</h2>
            {sectionFields.map((field, index) => (
              <div key={field.id} className="space-y-4 p-4 border rounded">
                <FormField
                  control={form.control}
                  name={`sections.${index}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Section Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`sections.${index}.content`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Section Content</FormLabel>
                      <FormControl>
                        <Textarea {...field} className="h-[200px]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeSection(index)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remove Section
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                appendSection({
                  title: "",
                  content: "",
                  order: sectionFields.length,
                })
              }
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Section
            </Button>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Featured Images</h2>
            {imageFields.map((field, index) => (
              <div key={field.id} className="space-y-4 p-4 border rounded">
                <FormField
                  control={form.control}
                  name={`featuredImages.${index}.url`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`featuredImages.${index}.altText`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alt Text (optional)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeImage(index)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remove Image
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendImage({ url: "", altText: "" })}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Image
            </Button>
          </div>

          <div className="flex md:flex-row flex-col w-full items-center gap-4">
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
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
