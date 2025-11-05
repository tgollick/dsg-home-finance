"use client";

import React from "react";
import { DataTable } from "./data-table";
import { columns, Contact } from "./columns";

interface ApplicationsTableProps {
  initialData: Contact[];
}

const ApplicationsTable = ({ initialData }: ApplicationsTableProps) => {
  return <DataTable data={initialData || []} columns={columns} />;
};

export default ApplicationsTable;
