import type { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";

interface AdminPageHeaderProps {
  eyebrow?: string;
  title: string;
  description: string;
  action?: ReactNode;
}

export function AdminPageHeader({
  eyebrow = "DSG Admin",
  title,
  description,
  action,
}: AdminPageHeaderProps) {
  return (
    <Card className="overflow-hidden border-border/70 bg-card shadow-sm">
      <CardContent className="flex flex-col gap-5 p-5 md:flex-row md:items-center md:justify-between md:p-6">
        <div className="max-w-3xl space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            {eyebrow}
          </p>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {title}
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
              {description}
            </p>
          </div>
        </div>

        {action ? <div className="flex w-full md:w-auto">{action}</div> : null}
      </CardContent>
    </Card>
  );
}
