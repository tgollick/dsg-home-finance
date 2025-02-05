import React from "react";
import NewBlog from "./newBlog";

const page = () => {
  return (
    <div className="w-full md:h-screen h-full flex items-center md:justify-center justify-start md:p-0 pt-20 p-6">
      <NewBlog />
    </div>
  );
};

export default page;
