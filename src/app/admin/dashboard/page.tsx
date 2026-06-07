import { Suspense } from "react";
import { ArrowRight, Inbox, PenLine } from "lucide-react";
import Link from "next/link";

import { ssrTrpc } from "@/backend/trpc/ssr-caller";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AdminPageHeader } from "../_components/admin-page-header";
import { LoadingFallback } from "../Fallback";
import ApplicationsTable from "../applications/applicationsTable";
import AnalyticsComponent from "./AnalyticsComponent";
import { UpcomingAppointments } from "./upcoming-appointments";

const Dashboard = async () => {
  const data = await ssrTrpc.contactRouter.getContacts();
  const applications = data.map((app) => ({
    ...app,
    createdAt: new Date(app.createdAt).toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
  }));

  const pendingApplications = data.filter((contact) => !contact.contacted).length;
  const latestApplicant = data[0]?.fullname ?? "No recent enquiries";

  return (
    <div className="w-full space-y-8 p-4 pt-20 md:p-8">
      <AdminPageHeader
        title="Dashboard"
        description="A simple overview of new enquiries, appointments and the latest contact activity."
        action={
          <Button asChild className="w-full md:w-auto">
            <Link href="/admin/applications">
              View applications
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        }
      />

      <AnalyticsComponent />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)]">
        <Card className="border-border/70 bg-card shadow-sm">
          <CardHeader className="flex flex-col gap-4 p-5 pb-2 md:flex-row md:items-start md:justify-between">
            <div className="space-y-1">
              <CardTitle className="text-lg font-semibold">Recent applications</CardTitle>
              <CardDescription>
                The newest people who have submitted the contact form.
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-muted-foreground">
                <Inbox className="h-4 w-4" />
                {pendingApplications} pending
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-muted-foreground">
                <PenLine className="h-4 w-4" />
                Latest: {latestApplicant}
              </span>
            </div>
          </CardHeader>
          <CardContent className="p-5 pt-0">
            <Suspense fallback={<LoadingFallback />}>
              <ApplicationsTable initialData={applications.slice(0, 8)} />
            </Suspense>
          </CardContent>
        </Card>

        <UpcomingAppointments contacts={data} />
      </div>
    </div>
  );
};

export default Dashboard;
