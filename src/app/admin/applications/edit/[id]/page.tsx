import React, { JSX } from "react";
import EditForm from "./editContact";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({
  params,
}: PageProps): Promise<JSX.Element> {
  const { id } = await params;

  return (
    <div className="w-full min-h-screen py-20 px-6 flex items-center justify-center">
      <EditForm userId={id} />
    </div>
  );
}
