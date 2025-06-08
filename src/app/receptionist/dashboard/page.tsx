import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { UserPlus, CalendarPlus, Users } from "lucide-react";

export default function ReceptionistDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-headline">Receptionist Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card data-ai-hint="appointment schedule">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
            <CalendarPlus className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25</div>
            <p className="text-xs text-muted-foreground">View schedule</p>
             <img src="https://placehold.co/300x150.png" alt="Appointments today" className="mt-2 rounded-md shadow-sm" />
          </CardContent>
        </Card>
        <Card data-ai-hint="new patient">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Patients Registered</CardTitle>
            <UserPlus className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">Registered today</p>
             <img src="https://placehold.co/300x150.png" alt="New patients" className="mt-2 rounded-md shadow-sm" />
          </CardContent>
        </Card>
        <Card data-ai-hint="patient checkin">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Checked-in Patients</CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">Currently in clinic</p>
             <img src="https://placehold.co/300x150.png" alt="Checked-in patients" className="mt-2 rounded-md shadow-sm" />
          </CardContent>
        </Card>
      </div>
       <Card>
        <CardHeader>
          <CardTitle>Reception Tasks</CardTitle>
          <CardDescription>Manage patient arrivals and scheduling.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
           <button className="p-4 border rounded-lg hover:bg-accent transition-colors text-left">
            <h3 className="font-semibold">Register New Patient</h3>
            <p className="text-sm text-muted-foreground">Add new patient details to the system.</p>
          </button>
          <button className="p-4 border rounded-lg hover:bg-accent transition-colors text-left">
            <h3 className="font-semibold">Schedule Appointment</h3>
            <p className="text-sm text-muted-foreground">Book or reschedule patient appointments.</p>
          </button>
        </CardContent>
      </Card>
    </div>
  );
}