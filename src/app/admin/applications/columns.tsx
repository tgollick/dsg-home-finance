"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  LucideCheck,
  LucideTrash,
  LucideX,
  Pencil,
} from "lucide-react";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { redirect } from "next/navigation";
import { deleteContact } from "@/lib/deleteContact";
import DeleteContactColumn from "./deleteContactColumn";

export type Contact = {
  id: string;
  fullname: string;
  email: string;
  phone: string;
  situation: string;
  other: string;
  contacted: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<Contact>[] = [
  {
    accessorKey: "fullname",
    header: "Full Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Contact Number",
  },
  {
    accessorKey: "createdAt",
    header: "Date Contacted",
    cell: ({ row }) => {
      const createdAt = new Date(row.original.createdAt);
      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      };
      const formattedDate = createdAt.toLocaleDateString("en-GB", options);
      return formattedDate;
    },
  },
  {
    accessorKey: "contacted",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Contacted
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const contact = row.original;
      return contact.contacted ? (
        <LucideCheck size={"30"} className="w-full [--primary]" />
      ) : (
        <LucideX color={"#942222"} size={"30"} className="w-full" />
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-muted">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-background">
            <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">
              Actions
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => redirect(`/admin/applications/edit/${payment.id}`)}
            >
              <div className="flex items-center gap-2">
                <Pencil className="h-4 w-4" />
                <span>Edit Application</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <DeleteContactColumn id={payment.id} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
