import React from "react";
import EditForm from "./editContact";

const page = async ({ params }: { params: { id: string } }) => {
  const data = await params;
  const applicationId = data.id;

  return (
    <div className="w-full min-h-screen py-20 px-6 flex items-center justify-center">
      <EditForm userId={applicationId} />
    </div>
  );
};

export default page;
