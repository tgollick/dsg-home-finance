import React, { Suspense } from "react";
import Link from "next/link";
import { FileText, PlusCircle } from "lucide-react";

import { ssrTrpc } from "@/backend/trpc/ssr-caller";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AdminPageHeader } from "../_components/admin-page-header";
import { LoadingFallback } from "../Fallback";
import BlogsTable from "./BlogTable";

const Blog = async () => {
  const initialData = await ssrTrpc.blogRouter.getAllBlogs();
  const blogs = initialData.map((app) => ({
    ...app,
    createdAtFormatted: new Date(app.createdAt).toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
  }));

  return (
    <div className="w-full space-y-8 p-4 pt-20 md:p-8">
      <AdminPageHeader
        title="Blog Posts"
        description="Create and manage the articles that are published on the DSG Home Finance website."
        action={
          <Button asChild className="w-full md:w-auto">
            <Link href="/admin/blogs/new">
              <PlusCircle className="h-4 w-4" />
              New blog post
            </Link>
          </Button>
        }
      />

      <Card className="border-border/70 bg-card shadow-sm">
        <CardHeader className="flex flex-row items-start gap-3 p-5 pb-3">
          <div className="rounded-xl bg-primary/10 p-2 text-primary">
            <FileText className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold">Published content</CardTitle>
            <CardDescription>Search, edit or remove existing blog posts.</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-5 pt-2">
          <Suspense fallback={<LoadingFallback />}>
            <BlogsTable initialData={blogs} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
};

export default Blog;
