"use client";

import * as React from "react";
import { format } from "date-fns";
import {
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  Clock,
  Loader2,
  Mail,
  Pencil,
  Phone,
  Search,
  Trash2,
  XCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { trpc } from "../../../../utils/providers/TrpcProviders";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

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
  createdAt: string | Date;
};

type Filter = "all" | "pending" | "contacted";

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function ApplicationsManager({ initialData }: { initialData: Contact[] }) {
  const router = useRouter();
  const [contacts, setContacts] = React.useState<Contact[]>(initialData);
  const [search, setSearch] = React.useState("");
  const [filter, setFilter] = React.useState<Filter>("all");
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  React.useEffect(() => setContacts(initialData), [initialData]);

  const setContacted = trpc.contactRouter.setContacted.useMutation({
    onSuccess: (updated) => {
      setContacts((prev) =>
        prev.map((c) => (c.id === updated.id ? { ...c, contacted: updated.contacted } : c)),
      );
      toast({
        title: updated.contacted ? "Marked as contacted" : "Marked as pending",
        description: `${updated.fullname} has been updated.`,
      });
      router.refresh();
    },
    onError: () =>
      toast({
        title: "Update failed",
        description: "Could not update the status. Please try again.",
        variant: "destructive",
      }),
  });

  const deleteContact = trpc.contactRouter.deleteContact.useMutation({
    onSuccess: (_res, variables) => {
      setContacts((prev) => prev.filter((c) => c.id !== variables.contactId));
      setSelectedId(null);
      toast({ title: "Application deleted", description: "The enquiry has been removed." });
      router.refresh();
    },
    onError: () =>
      toast({
        title: "Deletion failed",
        description: "Could not delete the enquiry. Please try again.",
        variant: "destructive",
      }),
  });

  const counts = React.useMemo(
    () => ({
      all: contacts.length,
      pending: contacts.filter((c) => !c.contacted).length,
      contacted: contacts.filter((c) => c.contacted).length,
    }),
    [contacts],
  );

  const filtered = React.useMemo(() => {
    const term = search.trim().toLowerCase();
    return contacts.filter((c) => {
      const matchesFilter =
        filter === "all" ||
        (filter === "pending" && !c.contacted) ||
        (filter === "contacted" && c.contacted);
      const matchesSearch =
        !term ||
        c.fullname.toLowerCase().includes(term) ||
        c.email.toLowerCase().includes(term) ||
        c.phone.toLowerCase().includes(term);
      return matchesFilter && matchesSearch;
    });
  }, [contacts, filter, search]);

  const selected = contacts.find((c) => c.id === selectedId) ?? null;

  const filterTabs: { key: Filter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "pending", label: "Pending" },
    { key: "contacted", label: "Contacted" },
  ];

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="inline-flex rounded-full border border-border/60 bg-card p-1">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                filter === tab.key
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {tab.label}
              <span className="ml-1.5 tabular-nums opacity-70">{counts[tab.key]}</span>
            </button>
          ))}
        </div>

        <div className="relative w-full lg:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search name, email or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 rounded-full pl-9"
          />
        </div>
      </div>

      {/* List */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((contact) => (
            <button
              key={contact.id}
              onClick={() => setSelectedId(contact.id)}
              className="group flex items-center gap-3 rounded-2xl border border-border/60 bg-card p-4 text-left shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                {initials(contact.fullname)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{contact.fullname}</p>
                <p className="truncate text-sm text-muted-foreground">{contact.situation}</p>
                <div className="mt-2">
                  <Badge variant={contact.contacted ? "success" : "warning"}>
                    {contact.contacted ? (
                      <CheckCircle2 className="h-3 w-3" />
                    ) : (
                      <XCircle className="h-3 w-3" />
                    )}
                    {contact.contacted ? "Contacted" : "Pending"}
                  </Badge>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </button>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border/70 bg-card px-4 py-16 text-center">
          <p className="font-medium">No applications found</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try a different search term or filter.
          </p>
        </div>
      )}

      {/* Detail panel */}
      <Sheet open={selected !== null} onOpenChange={(open) => !open && setSelectedId(null)}>
        <SheetContent className="w-full overflow-y-auto bg-background sm:max-w-md">
          {selected ? (
            <div className="space-y-6">
              <SheetHeader className="space-y-0 text-left">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-base font-semibold text-primary">
                    {initials(selected.fullname)}
                  </span>
                  <div>
                    <SheetTitle className="text-xl">{selected.fullname}</SheetTitle>
                    <Badge
                      variant={selected.contacted ? "success" : "warning"}
                      className="mt-1"
                    >
                      {selected.contacted ? "Contacted" : "Pending"}
                    </Badge>
                  </div>
                </div>
              </SheetHeader>

              <Button
                variant={selected.contacted ? "outline" : "default"}
                className="w-full"
                disabled={setContacted.isPending}
                onClick={() => setContacted.mutate({ contactId: selected.id })}
              >
                {setContacted.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <CheckCircle2 className="h-4 w-4" />
                )}
                {selected.contacted ? "Mark as pending" : "Mark as contacted"}
              </Button>

              <div className="space-y-2.5">
                <DetailRow icon={Mail} label="Email">
                  <a href={`mailto:${selected.email}`} className="break-all text-primary hover:underline">
                    {selected.email}
                  </a>
                </DetailRow>
                <DetailRow icon={Phone} label="Phone">
                  <a href={`tel:${selected.phone}`} className="text-primary hover:underline">
                    {selected.phone}
                  </a>
                </DetailRow>
                <DetailRow icon={CalendarClock} label="Requested appointment">
                  {selected.date}
                </DetailRow>
                <DetailRow icon={Clock} label="Requested time">
                  {selected.time}
                </DetailRow>
              </div>

              <div className="space-y-3 rounded-xl border border-border/60 bg-muted/30 p-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Situation
                  </p>
                  <p className="mt-1 text-sm">{selected.situation || "—"}</p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Other information
                  </p>
                  <p className="mt-1 text-sm">{selected.other || "—"}</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  Submitted {format(new Date(selected.createdAt), "dd MMM yyyy")}
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => router.push(`/admin/applications/edit/${selected.id}`)}
                >
                  <Pencil className="h-4 w-4" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-destructive/30 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  disabled={deleteContact.isPending}
                  onClick={() => deleteContact.mutate({ contactId: selected.id })}
                >
                  {deleteContact.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                  Delete
                </Button>
              </div>
            </div>
          ) : null}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function DetailRow({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Mail;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-card p-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
        <div className="mt-0.5 text-sm">{children}</div>
      </div>
    </div>
  );
}
