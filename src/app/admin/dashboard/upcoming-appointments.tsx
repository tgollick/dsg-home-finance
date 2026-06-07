"use client";

import * as React from "react";
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
    <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold">Upcoming appointments</h2>
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <CalendarIcon className="h-4 w-4" />
        </span>
      </div>

      {sortedAppointments.length > 0 ? (
        <div className="space-y-2.5">
          {sortedAppointments.map((appointment, index) => (
            <div
              key={`${appointment.fullname}-${appointment.date}-${appointment.time}-${index}`}
              className="flex items-center gap-3 rounded-xl border border-border/60 bg-background p-3 transition-colors hover:border-primary/40"
            >
              <div className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-lg bg-primary/10 text-primary">
                <CalendarIcon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{appointment.fullname}</p>
                <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <CalendarIcon className="h-3 w-3" />
                    {appointment.date}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {appointment.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-border/70 bg-muted/20 px-4 py-10 text-center">
          <p className="text-sm font-medium">No upcoming appointments</p>
          <p className="mt-1 text-xs text-muted-foreground">
            New dated contact requests will appear here.
          </p>
        </div>
      )}
    </div>
  );
}
