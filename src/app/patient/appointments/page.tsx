import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarPlus, History } from "lucide-react";

export default function PatientAppointmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-headline">My Appointments</h1>
        <Button>
          <CalendarPlus className="mr-2 h-4 w-4" /> Request New Booking
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Placeholder for upcoming appointments */}
          <div className="p-4 border rounded-md bg-muted/50">
            <h3 className="font-semibold">Consultation with Dr. Emily White</h3>
            <p className="text-sm text-muted-foreground">Date: August 5, 2024 | Time: 02:30 PM</p>
            <p className="text-sm">Status: Confirmed</p>
            <img src="https://placehold.co/600x100.png" alt="Upcoming appointment placeholder" data-ai-hint="calendar event" className="mt-2 rounded-md shadow-md w-full opacity-20" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Appointment History <History className="inline h-5 w-5 ml-1 text-muted-foreground" /></CardTitle>
        </CardHeader>
        <CardContent>
          {/* Placeholder for past appointments */}
           <div className="p-4 border rounded-md bg-muted/50">
            <h3 className="font-semibold">Check-up with Dr. John Carter</h3>
            <p className="text-sm text-muted-foreground">Date: June 10, 2024 | Time: 09:00 AM</p>
            <p className="text-sm">Status: Completed</p>
            <img src="https://placehold.co/600x100.png" alt="Past appointment placeholder" data-ai-hint="medical history" className="mt-2 rounded-md shadow-md w-full opacity-20" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}