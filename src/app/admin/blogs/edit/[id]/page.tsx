import EditBlog from "@/app/admin/editblog";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="w-full flex items-center md:justify-center justify-start md:p-0 pt-20 p-6">
      <EditBlog blogId={params.id} />
    </div>
  );
};

export default page;
