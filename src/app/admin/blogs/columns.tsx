"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { CalendarDays, MoreHorizontal, Pencil, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import DeleteContactColumn from "./deleteContactColumn";

export type BlogPost = {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAtFormatted: string;
  updatedAt: Date;
  slug: string;
  image?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
};

export const columns: ColumnDef<BlogPost>[] = [
  {
    accessorKey: "title",
    header: "Blog post",
    cell: ({ row }) => {
      const post = row.original;

      return (
        <div className="min-w-[220px] space-y-1">
          <p className="font-medium text-foreground">{post.title}</p>
          <p className="max-w-xl truncate text-sm text-muted-foreground">/{post.slug}</p>
          <div className="flex flex-col gap-1 pt-1 text-sm text-muted-foreground md:hidden">
            <span className="inline-flex items-center gap-1.5">
              <UserRound className="h-3.5 w-3.5 shrink-0" />
              {post.author}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5 shrink-0" />
              {post.createdAtFormatted}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "author",
    header: "Author",
    cell: ({ row }) => (
      <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-muted-foreground">
        <UserRound className="h-4 w-4" />
        {row.original.author}
      </span>
    ),
    meta: { className: "hidden md:table-cell" },
  },
  {
    accessorKey: "createdAtFormatted",
    header: "Created",
    cell: ({ row }) => (
      <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-muted-foreground">
        <CalendarDays className="h-4 w-4" />
        {row.original.createdAtFormatted}
      </span>
    ),
    meta: { className: "hidden md:table-cell" },
  },
  {
    id: "actions",
    cell: ({ row }) => <BlogActions post={row.original} />,
  },
];

function BlogActions({ post }: { post: BlogPost }) {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <span className="sr-only">Open blog actions</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-background">
        <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">
          Blog actions
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => router.push(`/admin/blogs/edit/${post.slug}`)}
        >
          <Pencil className="mr-2 h-4 w-4" />
          Edit blog
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <DeleteContactColumn blogSlug={post.slug} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
