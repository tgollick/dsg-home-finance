// components/AnalyticsComponent.tsx
import { ssrTrpc } from "@/backend/trpc/ssr-caller";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Users, FileText, CheckCircle } from "lucide-react";

async function AnalyticsComponent() {
  const data = await ssrTrpc.analyticsRouter.getUserSignUpStats();
  const stats = [
    {
      title: "Users Today",
      value: data?.usersSignedUpToday,
      icon: Users,
    },
    {
      title: "Users This Year",
      value: data?.usersSignedUpThisYear,
      icon: FileText,
    },
    {
      title: "Total Users",
      value: data?.totalUsers,
      icon: CheckCircle,
    },
    {
      title: "Last 7 Days",
      value: data?.usersSignedUpLast7Days,
      icon: FileText,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full">
      {stats.map((stat, index) => (
        <Card key={index} className="shadow-lg">
          <CardHeader className="flex items-center text-center">
            <stat.icon size={32} />
            <div>
              <CardTitle className="text-xl font-bold">{stat.title}</CardTitle>
              <CardDescription className="text-md">
                {stat.value} signed up
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}

export default AnalyticsComponent;
