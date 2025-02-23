import EditBlog from "./editBlog";
import React, { JSX } from "react";

interface PageProps {
  params: Promise<{ blogSlug: string }>;
}

export default async function Page({
  params,
}: PageProps): Promise<JSX.Element> {
  const { blogSlug } = await params;
  return (
    <div className="w-full min-h-screen py-20 px-6 flex items-center justify-center">
      <EditBlog blogSlug={blogSlug} />
    </div>
  );
}
