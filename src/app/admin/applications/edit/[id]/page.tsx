import React from "react";
import EditForm from "../../../editform";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="w-full flex items-center md:justify-center justify-start md:p-0 pt-20 p-6">
      <EditForm userId={params.id} />
    </div>
  );
};

export default page;
