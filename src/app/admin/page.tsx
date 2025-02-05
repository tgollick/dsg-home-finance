import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

// type Props = {}

const Admin = async () => {
  const session = await auth();

  if (session) {
    redirect("admin/dashboard");
  }

  return <></>;
};

export default Admin;
