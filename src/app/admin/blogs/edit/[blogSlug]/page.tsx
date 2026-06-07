import EditBlog from "./editBlog";
import React, { JSX } from "react";

interface PageProps {
  params: Promise<{ blogSlug: string }>;
}

export default async function Page({
  params,
}: PageProps): Promise<JSX.Element> {
  const { blogSlug } = await params;
  return <EditBlog blogSlug={blogSlug} />;
}
