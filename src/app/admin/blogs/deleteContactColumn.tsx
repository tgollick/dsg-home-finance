import { LucideTrash2 } from "lucide-react";
import { trpc } from "../../../../utils/providers/TrpcProviders";
import { toast } from "@/hooks/use-toast";

const DeleteContactColumn = ({ blogSlug }: { blogSlug: string }) => {
  const utils = trpc.useUtils();

  const deleteContact = trpc.blogRouter.deleteBlog.useMutation({
    onSuccess: () => {
      utils.blogRouter.getAllBlogs.invalidate();

      toast({
        title: "Blog Deleted Successfully",
        description: "You have successfully deleted the blog.",
      });
    },
    onError: () => {
      toast({
        title: "Blog Deletion Error",
        description:
          "There has been an error deleting the blog. Please contact your system administrator",
        variant: "destructive",
      });
    },
  });

  return (
    <div
      className="flex items-center gap-2 text-red-500 hover:cursor-pointer"
      onClick={async () => {
        await deleteContact.mutate({
          slug: blogSlug,
        });
      }}
    >
      <LucideTrash2 className="h-4 w-4" />
      <span>Delete Blog</span>
    </div>
  );
};

export default DeleteContactColumn;
