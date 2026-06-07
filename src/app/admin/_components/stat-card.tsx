import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: number | string;
  description?: string;
  icon: LucideIcon;
  /** Highlight the card with the brand gradient (use for the headline metric). */
  highlight?: boolean;
  className?: string;
}

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  highlight = false,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border p-5 shadow-sm transition-shadow hover:shadow-md",
        highlight
          ? "border-transparent bg-gradient-to-br from-primary to-[#d96090] text-primary-foreground"
          : "border-border/60 bg-card",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <p
            className={cn(
              "text-sm font-medium",
              highlight ? "text-primary-foreground/85" : "text-muted-foreground",
            )}
          >
            {title}
          </p>
          <p className="text-3xl font-bold tracking-tight tabular-nums">{value}</p>
          {description ? (
            <p
              className={cn(
                "text-xs",
                highlight ? "text-primary-foreground/75" : "text-muted-foreground",
              )}
            >
              {description}
            </p>
          ) : null}
        </div>
        <div
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
            highlight ? "bg-white/20" : "bg-primary/10 text-primary",
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
