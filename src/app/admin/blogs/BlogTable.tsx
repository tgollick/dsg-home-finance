"use client";

import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";

interface BlogTableProps {
  initialData: {
    id: string;
    title: string;
    content: string;
    author: string;
    createdAtFormatted: string;
    updatedAt: Date;
    slug: string;
    image: string | null;
    metaTitle: string | null;
    metaDescription: string | null;
  }[];
}

const BlogTable = ({ initialData }: BlogTableProps) => {
  return <DataTable data={initialData} columns={columns} />;
};

export default BlogTable;
