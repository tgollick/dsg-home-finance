"use client";

import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { trpc } from "../../../../utils/providers/TrpcProviders";
import type { BlogPost } from "./columns";

interface BlogTableProps {
  initialData: BlogPost[];
}

const BlogTable = ({ initialData }: BlogTableProps) => {
  const { data } = trpc.blogRouter.getBlogs.useQuery(undefined, {
    initialData: initialData.map((post) => ({
      ...post,
      createdAt: new Date(post.createdAt),
      updatedAt: new Date(post.updatedAt),
    })),
  });

  return <DataTable data={data || []} columns={columns} />;
};

export default BlogTable;
