"use client";
import { useEffect, useState } from "react";
import { z } from "zod";
import { trpc } from "../../../utils/providers/TrpcProviders";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Save, Loader2 } from "lucide-react";
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
import DeleteButton from "../admin/blogs/deletebutton";
import { useRouter } from "next/navigation";
import { Editor } from "@tinymce/tinymce-react";

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
  const [loading, setLoading] = useState(false);
  const utils = trpc.useUtils();
  const { data, isLoading, error } = trpc.blogRouter.getBlog.useQuery({
    slug: blogSlug,
  });

  const mutation = trpc.blogRouter.editBlog.useMutation({
    onSuccess: () => {
      utils.blogRouter.getAllBlogs.invalidate();
      router.push(`/admin/blogs`);
      toast({
        title: "Blog Updated",
        description: "Your blog has been updated successfully.",
      });
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: "Blog Update Error!",
        description: "Your blog was not updated successfully.",
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
    <div className="max-w-3xl mx-auto">
      <div className="p-6 border rounded">
        <h1 className="text-4xl font-bold mb-6">Edit Blog Post</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
            {/* TinyMCE editor for the content field */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Editor
                      apiKey="ogz7ibugntev82h3llyfowfwltz0i4foxeilyak5zyum5i3c"
                      init={{
                        plugins: [
                          // Core editing features
                          "anchor",
                          "autolink",
                          "charmap",
                          "codesample",
                          "emoticons",
                          "image",
                          "link",
                          "lists",
                          "media",
                          "searchreplace",
                          "table",
                          "visualblocks",
                          "wordcount",
                          // Your account includes a free trial of TinyMCE premium features
                          // Try the most popular premium features until Feb 27, 2025:
                          "checklist",
                          "mediaembed",
                          "casechange",
                          "export",
                          "formatpainter",
                          "pageembed",
                          "a11ychecker",
                          "tinymcespellchecker",
                          "permanentpen",
                          "powerpaste",
                          "advtable",
                          "advcode",
                          "editimage",
                          "advtemplate",
                          "mentions",
                          "tinycomments",
                          "tableofcontents",
                          "footnotes",
                          "mergetags",
                          "autocorrect",
                          "typography",
                          "inlinecss",
                          "markdown",
                          "importword",
                          "exportword",
                          "exportpdf",
                        ],
                        toolbar:
                          "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                        tinycomments_mode: "embedded",
                        tinycomments_author: "Author name",
                        mergetags_list: [
                          { value: "First.Name", title: "First Name" },
                          { value: "Email", title: "Email" },
                        ],
                      }}
                      initialValue={field.value}
                      onEditorChange={(value, editor) => field.onChange(value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
          </form>
        </Form>
        <DeleteButton id={data.id} />
      </div>
    </div>
  );
};

export default EditBlog;
