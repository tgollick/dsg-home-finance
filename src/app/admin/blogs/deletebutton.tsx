"use client";

import React from "react";
import { trpc } from "../../../../utils/providers/TrpcProviders";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

const DeleteButton = ({ id }: { id: string }) => {
  const utils = trpc.useUtils();
  const router = useRouter();

  const { mutate, isPending } = trpc.blogRouter.deleteBlog.useMutation({
    onSuccess: () => {
      utils.blogRouter.getBlogs.invalidate();
      if (window.location.pathname.startsWith("/admin/blogs/edit")) {
        router.push("/admin/blogs");
      }
      toast({
        title: "Blog deleted",
        description: "Your contact has been deleted successfully.",
      });
    },
    onError: (error) => {
      console.log(error);
      toast({
        title: "Blog deletion failed",
        description: error.toString(),
      });
    },
  });

  return (
    <Button
      onClick={() => mutate({ blogId: id })}
      variant="ghost"
      className="w-full px-2 py-1.5 h-auto justify-start text-destructive hover:text-destructive hover:bg-destructive/10 focus:text-destructive"
      disabled={isPending}
      aria-label="Delete blog post"
    >
      <div className="flex items-center gap-2">
        <Trash2 className="h-4 w-4" />
        <span>{isPending ? "Deleting..." : "Delete"}</span>
      </div>
    </Button>
  );
};

export default DeleteButton;
