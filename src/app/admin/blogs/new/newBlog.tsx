"use client";

import { useState } from "react";
import { z } from "zod";
import { trpc } from "../../../../../utils/providers/TrpcProviders";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { Loader2, LucideCog, Plus, Trash2 } from "lucide-react";
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
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  sections: z.array(
    z.object({
      title: z.string().min(1, "Section title is required"),
      content: z.string().min(1, "Section content is required"),
      order: z.number(),
    })
  ),
  featuredImages: z.array(
    z.object({
      url: z.string().url("Invalid URL"),
      altText: z.string().optional(),
    })
  ),
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
      author: "",
      metaTitle: "",
      metaDescription: "",
      sections: [{ title: "", content: "", order: 0 }],
      featuredImages: [{ url: "", altText: "" }],
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

  const onSubmit = (values: FormValues) => {
    setLoading(true);

    mutation.mutate({
      title: values.title,
      author: values.author,
      metaTitle: values.metaTitle,
      metaDescription: values.metaDescription,
      sections: values.sections.map((section, index) => ({
        ...section,
        order: index,
      })),
      featuredImages: values.featuredImages,
    });

    setLoading(false);
  };

  return (
    <Card className="p-6 flex flex-col items-start gap-2 w-full max-w-3xl">
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

          <div>
            <h2 className="text-lg font-semibold mb-2">Sections</h2>
            {sectionFields.map((field, index) => (
              <div key={field.id} className="space-y-4 mb-4 p-4 border rounded">
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
                        <Textarea {...field} />
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

          <div>
            <h2 className="text-lg font-semibold mb-2">Featured Images</h2>
            {imageFields.map((field, index) => (
              <div key={field.id} className="space-y-4 mb-4 p-4 border rounded">
                <FormField
                  control={form.control}
                  name={`featuredImages.${index}.url`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="https://example.com/image.jpg"
                        />
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

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <LucideCog className="mr-2 h-4 w-4" />
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
