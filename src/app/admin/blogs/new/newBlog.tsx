"use client";
import { useState } from "react";
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
import { Editor } from "@tinymce/tinymce-react";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  image: z.string(),
  metaTitle: z.string(),
  metaDescription: z.string(),
  content: z.string().min(1, "Content is required"),
});

type FormValues = z.infer<typeof formSchema>;

const NewBlog = () => {
  const router = useRouter();
  const utils = trpc.useUtils();
  const [loading, setLoading] = useState(false);

  const mutation = trpc.blogRouter.addBlog.useMutation({
    onSuccess: () => {
      utils.blogRouter.getAllBlogs.invalidate();
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
          "An error occurred while processing your request. Please verify the details and try again. " +
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
      image: "",
      metaTitle: "",
      metaDescription: "",
      content: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    setLoading(true);
    mutation.mutate({
      title: values.title,
      author: values.author,
      image: values.image,
      metaTitle: values.metaTitle,
      metaDescription: values.metaDescription,
      content: values.content,
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
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cover Image</FormLabel>
              </FormItem>
            )}
          />
          {/* TinyMCE editor integrated for the content field */}
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
