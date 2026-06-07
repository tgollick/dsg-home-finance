import React, { Suspense } from "react";
import { CheckCircle2, FileText, Inbox, Users } from "lucide-react";

import { ssrTrpc } from "@/backend/trpc/ssr-caller";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AdminPageHeader } from "../_components/admin-page-header";
import { StatCard } from "../_components/stat-card";
import { LoadingFallback } from "../Fallback";
import ApplicationsTable from "./applicationsTable";

const Applications = async () => {
  const initialData = await ssrTrpc.contactRouter.getContacts();
  const applications = initialData.map((app) => ({
    ...app,
    createdAt: new Date(app.createdAt).toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
  }));

  const totalApplications = initialData.length;
  const processedApplications = initialData.filter((contact) => contact.contacted).length;
  const pendingApplications = totalApplications - processedApplications;

  const stats = [
    {
      title: "Total applications",
      value: totalApplications,
      description: "All enquiries received",
      icon: Users,
    },
    {
      title: "Pending review",
      value: pendingApplications,
      description: "Still need a response",
      icon: Inbox,
    },
    {
      title: "Contacted",
      value: processedApplications,
      description: "Marked as followed up",
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 p-4 md:p-8">
      <AdminPageHeader
        title="Applications"
        description="Review the people who have submitted the contact form and keep track of who has been followed up."
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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

      <Card className="border-border/70 bg-card shadow-sm">
        <CardHeader className="flex flex-row items-start gap-3 p-5 pb-3">
          <div className="rounded-xl bg-primary/10 p-2 text-primary">
            <FileText className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold">All applications</CardTitle>
            <CardDescription>Search, review and edit submitted contact details.</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-5 pt-2">
          <Suspense fallback={<LoadingFallback />}>
            <ApplicationsTable initialData={applications} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
};

export default Applications;
