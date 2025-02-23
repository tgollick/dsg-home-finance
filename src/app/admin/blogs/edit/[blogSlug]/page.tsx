import EditBlog from "./editBlog";
import React from "react";

const page = async ({ params }: { params: { blogSlug: string } }) => {
  const data = await params;
  const { blogSlug } = data;
  return (
    <div className="w-full min-h-screen py-20 px-6 flex items-center justify-center">
      <EditBlog blogSlug={blogSlug} />
    </div>
  );
};

export default page;
