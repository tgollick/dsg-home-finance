"use client";

import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { trpc } from "../../../../utils/providers/TrpcProviders";
import { Contact } from "./columns";

interface ApplicationsTableProps {
  initialData: Contact[];
}

const ApplicationsTable = ({ initialData }: ApplicationsTableProps) => {
  const { data } = trpc.contactRouter.getContacts.useQuery(undefined, {
    initialData: initialData.map((contact) => ({
      ...contact,
      createdAt: new Date(contact.createdAt),
      updatedAt: new Date(contact.updatedAt),
    })),
  });

  return <DataTable data={data || []} columns={columns} />;
};

export default ApplicationsTable;
