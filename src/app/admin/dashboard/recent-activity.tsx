import { formatDistanceToNow } from "date-fns";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface ActivityContact {
  id: string;
  fullname: string;
  situation: string;
  contacted: boolean;
  createdAt: Date | string;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function RecentActivity({ contacts }: { contacts: ActivityContact[] }) {
  const recent = contacts.slice(0, 6);

  return (
    <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold">Recent activity</h2>
        <span className="text-xs text-muted-foreground">Latest enquiries</span>
      </div>

      {recent.length > 0 ? (
        <ul className="space-y-1">
          {recent.map((contact) => (
            <li
              key={contact.id}
              className="flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-muted/50"
            >
              <Avatar className="h-9 w-9 border">
                <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                  {initials(contact.fullname)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{contact.fullname}</p>
                <p className="truncate text-xs text-muted-foreground">{contact.situation}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <Badge variant={contact.contacted ? "success" : "warning"}>
                  {contact.contacted ? "Contacted" : "Pending"}
                </Badge>
                <span className="text-[11px] text-muted-foreground">
                  {formatDistanceToNow(new Date(contact.createdAt), { addSuffix: true })}
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="py-8 text-center text-sm text-muted-foreground">
          No enquiries yet.
        </p>
      )}
    </div>
  );
}
