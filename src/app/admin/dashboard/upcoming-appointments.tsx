"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, Clock } from "lucide-react";

interface Contact {
  fullname: string;
  date: string;
  time: string;
}

interface UpcomingAppointmentsProps {
  contacts: Contact[];
}

export function UpcomingAppointments({ contacts }: UpcomingAppointmentsProps) {
  const sortedAppointments = React.useMemo(() => {
    return [...contacts]
      .sort((a, b) => {
        const [dayA, monthA, yearA] = a.date.split("/");
        const [dayB, monthB, yearB] = b.date.split("/");
        const dateA = new Date(`${yearA}-${monthA}-${dayA}T${a.time}:00`);
        const dateB = new Date(`${yearB}-${monthB}-${dayB}T${b.time}:00`);
        return dateA.getTime() - dateB.getTime();
      })
      .filter((contact) => {
        const [day, month, year] = contact.date.split("/");
        const appointmentDate = new Date(`${year}-${month}-${day}T${contact.time}:00`);
        return appointmentDate > new Date();
      })
      .slice(0, 5);
  }, [contacts]);

  return (
    <Card className="h-full border-border/70 bg-card shadow-sm">
      <CardHeader className="p-5 pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold">Upcoming appointments</CardTitle>
            <CardDescription>The next calls or meetings submitted through the contact form.</CardDescription>
          </div>
          <div className="rounded-xl bg-primary/10 p-2 text-primary">
            <CalendarIcon className="h-5 w-5" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-5 pt-2">
        {sortedAppointments.length > 0 ? (
          <div className="space-y-3">
            {sortedAppointments.map((appointment, index) => (
              <div
                key={`${appointment.fullname}-${appointment.date}-${appointment.time}-${index}`}
                className="rounded-xl border bg-background p-4 transition-colors hover:bg-muted/40"
              >
                <p className="font-medium text-foreground">{appointment.fullname}</p>
                <div className="mt-3 flex flex-wrap gap-3 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarIcon className="h-4 w-4" />
                    {appointment.date}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    {appointment.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed bg-muted/20 px-4 py-8 text-center">
            <p className="font-medium text-foreground">No upcoming appointments</p>
            <p className="mt-1 text-sm text-muted-foreground">New dated contact requests will appear here.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
