"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, CalendarIcon } from "lucide-react";

interface Contact {
  fullname: string;
  date: string;
  time: string;
}

interface UpcomingAppointmentsProps {
  contacts: Contact[];
}

export function UpcomingAppointments({ contacts }: UpcomingAppointmentsProps) {
  // Sort contacts by date and time
  const sortedAppointments = React.useMemo(() => {
    return (
      [...contacts]
        .sort((a, b) => {
          // Convert date strings to Date objects (assuming format DD/MM/YYYY)
          const [dayA, monthA, yearA] = a.date.split("/");
          const [dayB, monthB, yearB] = b.date.split("/");
          const dateA = new Date(`${yearA}-${monthA}-${dayA}T${a.time}:00`);
          const dateB = new Date(`${yearB}-${monthB}-${dayB}T${b.time}:00`);
          return dateA.getTime() - dateB.getTime();
        })
        // Get only future appointments
        .filter((contact) => {
          const [day, month, year] = contact.date.split("/");
          const appointmentDate = new Date(
            `${year}-${month}-${day}T${contact.time}:00`
          );
          return appointmentDate > new Date();
        })
        // Get next 5 appointments
        .slice(0, 5)
    );
  }, [contacts]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <CalendarIcon className="h-5 w-5" />
          Upcoming Appointments
        </CardTitle>
      </CardHeader>
      <CardContent>
        {sortedAppointments.length > 0 ? (
          <div className="space-y-4">
            {sortedAppointments.map((appointment, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
              >
                <div className="space-y-1">
                  <p className="font-medium">{appointment.fullname}</p>
                  <div className="flex items-center text-sm text-muted-foreground gap-4">
                    <span className="flex items-center gap-1">
                      <CalendarIcon className="h-4 w-4" />
                      {appointment.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {appointment.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-4">
            No upcoming appointments
          </p>
        )}
      </CardContent>
    </Card>
  );
}
