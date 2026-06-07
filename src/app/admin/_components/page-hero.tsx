import type { ReactNode } from "react";

interface PageHeroProps {
  title: string;
  description: string;
  action?: ReactNode;
  children?: ReactNode;
}

export function PageHero({ title, description, action, children }: PageHeroProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-[#d96090] p-6 text-primary-foreground shadow-lg shadow-primary/20 md:p-8">
      {/* decorative glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-10 h-56 w-56 rounded-full bg-black/10 blur-3xl"
      />

      <div className="relative flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
          <p className="max-w-2xl text-sm leading-6 text-primary-foreground/85 md:text-base">
            {description}
          </p>
        </div>
        {action ? <div className="flex shrink-0 flex-wrap gap-2">{action}</div> : null}
      </div>

      {children ? <div className="relative mt-6">{children}</div> : null}
    </div>
  );
}
