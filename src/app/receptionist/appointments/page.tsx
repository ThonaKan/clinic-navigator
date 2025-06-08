import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarPlus, Search } from "lucide-react";
// Assuming Calendar component from shadcn is available
import { Calendar } from "@/components/ui/calendar"; 
import React from "react";

export default function ReceptionistAppointmentsPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-headline">Schedule Appointments</h1>
        <Button>
          <CalendarPlus className="mr-2 h-4 w-4" /> New Appointment
        </Button>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Appointment Calendar</CardTitle>
              <CardDescription>View and manage appointment slots.</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border shadow-sm"
              />
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Appointments for {date ? date.toLocaleDateString() : 'selected date'}:</h3>
                 {/* Placeholder for appointment list */}
                <div className="p-4 border rounded-md bg-muted/50 min-h-[150px]">
                  <p className="text-muted-foreground">No appointments scheduled for this day, or list will appear here.</p>
                   <img src="https://placehold.co/400x100.png" alt="Appointment list placeholder" data-ai-hint="schedule list" className="mt-2 rounded-md shadow-md w-full opacity-30" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader><CardTitle>Book Appointment</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <Input placeholder="Search Patient..." />
              <Input placeholder="Search Doctor..." />
              <Input type="time" />
              <Button className="w-full">Book Slot</Button>
            </CardContent>
          </Card>
           <Card data-ai-hint="appointment waiting">
            <CardHeader><CardTitle>Waiting List</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Patients waiting for cancellations.</p>
              <img src="https://placehold.co/300x100.png" alt="Waiting list" className="mt-2 rounded-md shadow-sm" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}