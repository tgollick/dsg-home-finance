import { ArrowRight, CalendarDays, CheckCircle2, Clock3, PlusCircle, TrendingUp, Users } from "lucide-react";
import Link from "next/link";

import { auth } from "@/auth";
import { ssrTrpc } from "@/backend/trpc/ssr-caller";
import { Button } from "@/components/ui/button";
import { PageHero } from "../_components/page-hero";
import { StatCard } from "../_components/stat-card";
import { EnquiriesChart, type EnquiryPoint } from "./enquiries-chart";
import { RecentActivity } from "./recent-activity";
import { UpcomingAppointments } from "./upcoming-appointments";

function buildMonthlySeries(contacts: { createdAt: Date | string }[]): EnquiryPoint[] {
  const now = new Date();
  const buckets = Array.from({ length: 12 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (11 - i), 1);
    return {
      key: `${d.getFullYear()}-${d.getMonth()}`,
      month: d.toLocaleString("en-GB", { month: "short" }),
      count: 0,
    };
  });

  for (const contact of contacts) {
    const d = new Date(contact.createdAt);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    const bucket = buckets.find((b) => b.key === key);
    if (bucket) bucket.count += 1;
  }

  return buckets.map(({ month, count }) => ({ month, count }));
}

const Dashboard = async () => {
  const [session, contacts, stats] = await Promise.all([
    auth(),
    ssrTrpc.contactRouter.getContacts(),
    ssrTrpc.analyticsRouter.getUserSignUpStats(),
  ]);

  const firstName = session?.user?.name?.split(" ")[0] ?? "there";
  const monthlySeries = buildMonthlySeries(contacts);

  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const statCards = [
    { title: "Total contacts", value: stats?.totalUsers ?? 0, description: "All-time enquiries", icon: Users, highlight: true },
    { title: "Today", value: stats?.usersSignedUpToday ?? 0, description: "New enquiries today", icon: CalendarDays },
    { title: "Last 7 days", value: stats?.usersSignedUpLast7Days ?? 0, description: "Recent submissions", icon: Clock3 },
    { title: "This year", value: stats?.usersSignedUpThisYear ?? 0, description: "Captured in " + new Date().getFullYear(), icon: TrendingUp },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-4 md:space-y-8 md:p-8">
      <PageHero
        title={`Welcome back, ${firstName}`}
        description={today}
        action={
          <>
            <Button asChild className="bg-white text-primary hover:bg-white/90">
              <Link href="/admin/applications">
                View applications
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/admin/blogs/new">
                <PlusCircle className="h-4 w-4" />
                New blog
              </Link>
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            description={stat.description}
            icon={stat.icon}
            highlight={stat.highlight}
          />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="min-w-0 rounded-2xl border border-border/60 bg-card p-5 shadow-sm lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold">Enquiries over time</h2>
              <p className="text-xs text-muted-foreground">Submissions in the last 12 months</p>
            </div>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <TrendingUp className="h-4 w-4" />
            </span>
          </div>
          <EnquiriesChart data={monthlySeries} />
        </div>

        <div className="min-w-0 lg:col-span-1">
          <UpcomingAppointments contacts={contacts} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="min-w-0 lg:col-span-2">
          <RecentActivity contacts={contacts} />
        </div>

        <div className="flex min-w-0 flex-col justify-between gap-4 rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
          <div className="space-y-1">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <CheckCircle2 className="h-5 w-5" />
            </span>
            <h2 className="pt-2 text-base font-semibold">Follow-ups</h2>
            <p className="text-sm text-muted-foreground">
              {contacts.filter((c) => !c.contacted).length} enquiries still need a response.
            </p>
          </div>
          <Button asChild variant="outline" className="w-full">
            <Link href="/admin/applications">
              Review applications
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
