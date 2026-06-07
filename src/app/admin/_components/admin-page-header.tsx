import type { ReactNode } from "react";

interface AdminPageHeaderProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export function AdminPageHeader({ title, description, action }: AdminPageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="space-y-1.5">
        <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          {title}
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </div>

      {action ? <div className="flex w-full shrink-0 md:w-auto">{action}</div> : null}
    </div>
  );
}
