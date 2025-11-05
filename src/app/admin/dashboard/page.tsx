import { Suspense } from "react";
import { LoadingFallback } from "../Fallback";
import { ssrTrpc } from "@/backend/trpc/ssr-caller";
import ApplicationsTable from "../applications/applicationsTable";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import AnalyticsComponent from "./AnalyticsComponent";
import { UpcomingAppointments } from "./upcoming-appointments";

const Dashboard = async () => {
  const data = await ssrTrpc.contactRouter.getContacts();
  const applications = data.map(app => ({
    ...app,
    createdAtFormatted: new Date(app.createdAt).toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }));

  return (
    <div className="w-full h-full pt-20 p-6 flex flex-col gap-10">
      <Card className="shadow-xl rounded-xl p-6 flex flex-col items-start gap-6 w-full h-full">
        <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center w-full">
          <div>
            <CardTitle className="text-5xl font-extrabold">Dashboard</CardTitle>
            <CardDescription className="mt-4 max-w-3xl text-lg">
              Manage your blog posts, contact form submissions, and analytics
              effortlessly.
            </CardDescription>
          </div>
        </CardHeader>
        <AnalyticsComponent />
        <UpcomingAppointments contacts={data} />
        <Suspense fallback={<LoadingFallback />}>
          <ApplicationsTable initialData={applications} />
        </Suspense>
      </Card>
    </div>
  );
};

export default Dashboard;
