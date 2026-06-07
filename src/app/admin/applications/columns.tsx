"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, CheckCircle2, Mail, MoreHorizontal, Pencil, Phone, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteContactColumn from "./deleteContactColumn";

export type Contact = {
  id: string;
  fullname: string;
  email: string;
  phone: string;
  situation: string;
  other: string;
  date: string;
  time: string;
  contacted: boolean;
  createdAt: string;
  updatedAt: Date;
};

export const columns: ColumnDef<Contact>[] = [
  {
    accessorKey: "fullname",
    header: "Applicant",
    cell: ({ row }) => {
      const contact = row.original;

      return (
        <div className="min-w-[180px] space-y-1">
          <p className="font-medium text-foreground">{contact.fullname}</p>
          <div className="flex flex-col gap-1 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 md:hidden">
              <Mail className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{contact.email}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 lg:hidden">
              <Phone className="h-3.5 w-3.5 shrink-0" />
              {contact.phone}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <span className="text-muted-foreground">{row.original.email}</span>,
    meta: { className: "hidden md:table-cell" },
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => <span className="whitespace-nowrap text-muted-foreground">{row.original.phone}</span>,
    meta: { className: "hidden lg:table-cell" },
  },
  {
    accessorKey: "createdAt",
    header: "Submitted",
    cell: ({ row }) => <span className="whitespace-nowrap text-muted-foreground">{row.original.createdAt}</span>,
    meta: { className: "hidden md:table-cell" },
  },
  {
    accessorKey: "contacted",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        <ArrowUpDown className="ml-1 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const contacted = row.original.contacted;

      return contacted ? (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Contacted
        </span>
      ) : (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
          <XCircle className="h-3.5 w-3.5" />
          Pending
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <ApplicationActions contact={row.original} />,
  },
];

function ApplicationActions({ contact }: { contact: Contact }) {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <span className="sr-only">Open application actions</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52 bg-background">
        <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">
          Application actions
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => router.push(`/admin/applications/edit/${contact.id}`)}
        >
          <Pencil className="mr-2 h-4 w-4" />
          View / edit application
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <DeleteContactColumn id={contact.id} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
