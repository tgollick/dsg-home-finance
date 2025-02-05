import React, { Suspense } from "react";
import { LoadingFallback } from "../Fallback";
import { ssrTrpc } from "@/backend/trpc/ssr-caller";
import ApplicationsTable from "./applicationsTable";
import { FileText, Users, CheckCircle } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const Applications = async () => {
  const initialData = await ssrTrpc.contactRouter.getContacts();
  const totalApplications = initialData.length;
  const recentApplications = initialData.slice(0, 5);
  const processedApplications = initialData.filter(
    (contact) => contact.contacted
  ).length;
  const pendingApplications = totalApplications - processedApplications;

  const stats = [
    {
      title: "New Contacts",
      value: `${recentApplications.length} recent submissions`,
      icon: Users,
    },
    {
      title: "Processed",
      value: `${processedApplications} contacts processed`,
      icon: CheckCircle,
    },
    {
      title: "Pending Review",
      value: `${pendingApplications} awaiting action`,
      icon: FileText,
    },
  ];

  return (
    <div className="w-full min-h-screen pt-20 p-6 flex flex-col gap-10">
      <Card className="shadow-xl rounded-xl p-6 flex flex-col items-start gap-6 w-full">
        <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center ">
          <div className="flex items-start justify-between w-full">
            <div>
              <CardTitle className="text-5xl font-extrabold">
                Customer Applications
              </CardTitle>
              <CardDescription className="mt-4 max-w-3xl text-lg">
                View and manage all customer interactions and submitted contact
                forms.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-lg">
              <CardHeader className="flex flex-row items-center gap-4">
                <stat.icon size={32} />
                <div>
                  <CardTitle className="text-xl font-bold">
                    {stat.title}
                  </CardTitle>
                  <CardDescription className="text-md">
                    {stat.value}
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        <Suspense fallback={<LoadingFallback />}>
          <ApplicationsTable initialData={initialData} />
        </Suspense>
      </Card>
    </div>
  );
};

export default Applications;
