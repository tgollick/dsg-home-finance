"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { CalendarDays, Loader2, MoreVertical, Pencil, Search, Trash2, UserRound } from "lucide-react";

import { trpc } from "../../../../utils/providers/TrpcProviders";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

export type BlogPost = {
  id: string;
  title: string;
  author: string;
  slug: string;
  image: string | null;
  metaDescription: string | null;
  createdAt: string | Date;
};

export function BlogsManager({ initialData }: { initialData: BlogPost[] }) {
  const router = useRouter();
  const [posts, setPosts] = React.useState<BlogPost[]>(initialData);
  const [search, setSearch] = React.useState("");
  const [deletingSlug, setDeletingSlug] = React.useState<string | null>(null);

  React.useEffect(() => setPosts(initialData), [initialData]);

  const deleteBlog = trpc.blogRouter.deleteBlog.useMutation({
    onSuccess: (_res, variables) => {
      setPosts((prev) => prev.filter((p) => p.slug !== variables.slug));
      setDeletingSlug(null);
      toast({ title: "Blog deleted", description: "The post has been removed." });
      router.refresh();
    },
    onError: () => {
      setDeletingSlug(null);
      toast({
        title: "Deletion failed",
        description: "Could not delete the post. Please try again.",
        variant: "destructive",
      });
    },
  });

  const filtered = React.useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return posts;
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(term) || p.author.toLowerCase().includes(term),
    );
  }, [posts, search]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by title or author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 rounded-full pl-9"
          />
        </div>
        <p className="hidden shrink-0 text-sm text-muted-foreground sm:block">
          {filtered.length} {filtered.length === 1 ? "post" : "posts"}
        </p>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((post) => (
            <article
              key={post.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-all hover:shadow-md"
            >
              <Link
                href={`/admin/blogs/edit/${post.slug}`}
                className="relative block aspect-[16/10] w-full overflow-hidden bg-muted"
              >
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </Link>

              <div className="flex flex-1 flex-col p-4">
                <div className="flex items-start justify-between gap-2">
                  <Link href={`/admin/blogs/edit/${post.slug}`} className="min-w-0">
                    <h3 className="line-clamp-2 font-semibold leading-snug hover:text-primary">
                      {post.title}
                    </h3>
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="-mr-1 -mt-1 h-8 w-8 shrink-0">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">Blog actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-background">
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => router.push(`/admin/blogs/edit/${post.slug}`)}
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="cursor-pointer text-destructive focus:text-destructive"
                        onSelect={(e) => {
                          e.preventDefault();
                          setDeletingSlug(post.slug);
                          deleteBlog.mutate({ slug: post.slug });
                        }}
                      >
                        {deletingSlug === post.slug && deleteBlog.isPending ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="mr-2 h-4 w-4" />
                        )}
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {post.metaDescription ? (
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                    {post.metaDescription}
                  </p>
                ) : null}

                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border/60 pt-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <UserRound className="h-3.5 w-3.5" />
                    {post.author}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {format(new Date(post.createdAt), "dd MMM yyyy")}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border/70 bg-card px-4 py-16 text-center">
          <p className="font-medium">No blog posts found</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try another search term or create a new post.
          </p>
        </div>
      )}
    </div>
  );
}
