import { CheckCircle2, Inbox, Users } from "lucide-react";

import { ssrTrpc } from "@/backend/trpc/ssr-caller";
import { PageHero } from "../_components/page-hero";
import { StatCard } from "../_components/stat-card";
import { ApplicationsManager, type Contact } from "./applications-manager";

const Applications = async () => {
  const data = await ssrTrpc.contactRouter.getContacts();
  const contacts = data as unknown as Contact[];

  const total = contacts.length;
  const contacted = contacts.filter((c) => c.contacted).length;
  const pending = total - contacted;

  const stats = [
    { title: "Pending review", value: pending, description: "Still need a response", icon: Inbox, highlight: true },
    { title: "Contacted", value: contacted, description: "Marked as followed up", icon: CheckCircle2 },
    { title: "Total applications", value: total, description: "All enquiries received", icon: Users },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-4 md:space-y-8 md:p-8">
      <PageHero
        title="Applications"
        description="Review enquiries from the contact form, mark who you have followed up, and dive into the details of each request."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
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

      <ApplicationsManager initialData={contacts} />
    </div>
  );
};

export default Applications;
