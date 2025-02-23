"use client";

import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { trpc } from "../../../../utils/providers/TrpcProviders";

interface BlogTableProps {
  initialData: {
    id: string;
    title: string;
    content: string;
    author: string;
    createdAt: Date;
    updatedAt: Date;
    slug: string;
    image: string | null;
    metaTitle: string | null;
    metaDescription: string | null;
  }[];
}

const BlogTable = ({ initialData }: BlogTableProps) => {
  const { data } = trpc.blogRouter.getAllBlogs.useQuery(undefined, {
    initialData: initialData.map((post) => ({
      ...post,
      createdAt: new Date(post.createdAt),
      updatedAt: new Date(post.updatedAt),
    })),
  });

  const formattedData = data.map((post) => {
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      author: post.author,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      slug: post.slug,
    };
  });

  return <DataTable data={formattedData || []} columns={columns} />;
};

export default BlogTable;
