import { ssrTrpc } from "@/backend/trpc/ssr-caller";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarDays, CheckCircle2, Clock3, Users } from "lucide-react";

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
        <Card key={stat.title} className="border-border/70 bg-card shadow-sm">
          <CardHeader className="flex flex-row items-start justify-between space-y-0 p-5 pb-3">
            <div className="space-y-1">
              <CardDescription>{stat.title}</CardDescription>
              <CardTitle className="text-3xl font-bold tracking-tight">
                {stat.value}
              </CardTitle>
            </div>
            <div className="rounded-xl bg-primary/10 p-2 text-primary">
              <stat.icon className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent className="p-5 pt-0">
            <p className="text-sm text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default AnalyticsComponent;
