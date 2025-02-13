import React, { Suspense } from "react";
import { LoadingFallback } from "../Fallback";
import { ssrTrpc } from "@/backend/trpc/ssr-caller";
import BlogsTable from "./BlogTable";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const Blog = async () => {
  const initialData = await ssrTrpc.blogRouter.getAllBlogs();

  return (
    <div className="w-full min-h-screen pt-20 p-6 flex flex-col gap-10">
      <Card className="shadow-xl rounded-xl p-6 flex flex-col items-start gap-6 w-full">
        <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <CardTitle className="text-5xl font-extrabold">
              Blog Posts
            </CardTitle>
            <CardDescription className="mt-4 max-w-3xl text-lg">
              Browse and manage all the blogs displayed on your website.
            </CardDescription>
          </div>
        </CardHeader>

        <Suspense fallback={<LoadingFallback />}>
          <BlogsTable initialData={initialData} />{" "}
        </Suspense>
      </Card>
    </div>
  );
};

export default Blog;
