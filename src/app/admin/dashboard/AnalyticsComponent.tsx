import { ssrTrpc } from "@/backend/trpc/ssr-caller";
import { CalendarDays, CheckCircle2, Clock3, Users } from "lucide-react";

import { StatCard } from "../_components/stat-card";

async function AnalyticsComponent() {
  const data = await ssrTrpc.analyticsRouter.getUserSignUpStats();

  const stats = [
    {
      title: "Today",
      value: data?.usersSignedUpToday ?? 0,
      description: "new enquiries today",
      icon: CalendarDays,
    },
    {
      title: "Last 7 days",
      value: data?.usersSignedUpLast7Days ?? 0,
      description: "recent submissions",
      icon: Clock3,
    },
    {
      title: "This year",
      value: data?.usersSignedUpThisYear ?? 0,
      description: "contacts captured",
      icon: CheckCircle2,
    },
    {
      title: "Total contacts",
      value: data?.totalUsers ?? 0,
      description: "all-time enquiries",
      icon: Users,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          description={stat.description}
          icon={stat.icon}
        />
      ))}
    </div>
  );
}

export default AnalyticsComponent;
