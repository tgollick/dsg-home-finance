import EditBlog from "@/app/admin/editblog";
import React from "react";

const page = async ({ params }: { params: { blogSlug: string } }) => {
  const data = await params;
  const { blogSlug } = data;
  return (
    <div className="w-full flex items-center md:justify-center justify-start md:p-0 pt-20 p-6">
      <EditBlog blogSlug={blogSlug} />
    </div>
  );
};

export default page;
