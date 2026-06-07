import React, { JSX } from "react";
import EditForm from "./editContact";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({
  params,
}: PageProps): Promise<JSX.Element> {
  const { id } = await params;

  return <EditForm userId={id} />;
}
