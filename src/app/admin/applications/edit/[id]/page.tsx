import React from "react";
import EditForm from "../../../editform";

const page = async ({ params }: { params: { id: string } }) => {
  const applicationId = await params.id;

  return (
    <div className="w-full flex items-center md:justify-center justify-start md:p-0 pt-20 p-6">
      <EditForm userId={applicationId} />
    </div>
  );
};

export default page;
